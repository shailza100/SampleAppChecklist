import * as actionSDK from 'action-sdk-sunny';
import { UxUtils } from '../common/UxUtils'
import { Utils } from '../common/Utils';
import { ChecklistColumnType, Status } from "../creationView/EnumContainer";

var root = document.getElementById("root");
var openItemDiv = document.createElement("div");
var addItemDiv = document.createElement("div");
var completeItemDiv = document.createElement("div");


let actionInstance = null;
let actionDataRows = null;
let openItems = 0;
let completedItems = 0;
let batchUpdateReq = [];
let countNewItems = 0;
let isDeleted = {};
let isCompleted = {};

OnPageLoad();

function createBody() {
    var title = document.createElement('h3');
    var save = document.createElement("BUTTON");
    title.innerHTML = actionInstance.displayName;
    save.innerHTML = "Save";
    save.style.float = "right";
    //Call update row API on Save button
    save.addEventListener("click", function () {
        updateDataRow();
    });
    UxUtils.addElement(title, root);
    UxUtils.addElement(openItemDiv, root);
    UxUtils.addElement(addItemDiv, root);
    UxUtils.addElement(completeItemDiv, root);

    createAddItemView();
    getCountOfItems();
    var heading1 = document.createElement('h5');
    heading1.innerHTML = "Open items(" + openItems + ")";
    openItemDiv.appendChild(heading1);

    var heading2 = document.createElement('h5');
    heading2.innerHTML = "Completed items(" + completedItems + ")";
    completeItemDiv.appendChild(heading2);

    //Add open items
    createOpenItemsView();

    UxUtils.addElement(UxUtils.lineBreak(), root);
    UxUtils.addElement(UxUtils.lineBreak(), root);

    //Add completed items
    createCompleteItemsView();

    UxUtils.addElement(UxUtils.lineBreak(), root);
    UxUtils.addElement(save, root);
    UxUtils.addElement(UxUtils.lineBreak(), root);
}

//GetContext
function OnPageLoad() {
    actionSDK.executeApi(new actionSDK.GetContext.Request())
        .then(function (response: actionSDK.GetContext.Response) {
            console.info("GetContext - Response: " + JSON.stringify(response));
            getActionInstance(response.context.actionId);
        })
        .catch(function (error) {
            console.error("GetContext - Error: " + JSON.stringify(error));
        });
}

//GetAction and GetActionDataRows
function getActionInstance(actionId) {
    var getActionRequest = new actionSDK.GetAction.Request(actionId);
    var getDataRowsRequest = new actionSDK.GetActionDataRows.Request(actionId);
    var batchRequest = new actionSDK.BaseApi.BatchRequest([getActionRequest, getDataRowsRequest]);
    actionSDK.executeBatchApi(batchRequest)
        .then(function (batchResponse: actionSDK.BaseApi.BatchResponse) {
            console.info("BatchResponse: " + JSON.stringify(batchResponse));
            actionInstance = (<actionSDK.GetAction.Response>batchResponse.responses[0]).action;
            actionDataRows = (<actionSDK.GetActionDataRows.Response>batchResponse.responses[1]).dataRows;
            createBody();
        })
        .catch(function (error) {
            console.error("BatchResponse: " + JSON.stringify(error));
        });
}

//UpdateActionDataRow in Batch for all items
function updateDataRow() {
    //Add new data row
    if (countNewItems > 0) {
        createAddRowsRequests(actionInstance.id);
    }
    //Post update close result view
    var closeViewRequest = new actionSDK.CloseView.Request();
    batchUpdateReq.push(closeViewRequest);
    var batchRequest = new actionSDK.BaseApi.BatchRequest(batchUpdateReq);
    actionSDK.executeBatchApi(batchRequest)
        .then(function (batchResponse: actionSDK.BaseApi.BatchResponse) {
            console.info("BatchResponse- Update: " + JSON.stringify(batchResponse));
        })
        .catch(function (error) {
            console.error("BatchResponse- Update: " + JSON.stringify(error));
        });
}

//Close Update view
function closeResponseView() {
    actionSDK.executeApi(new actionSDK.CloseView.Request)
        .then(function (response: actionSDK.CloseView.Response) {
            console.info("CloseView - Response: " + JSON.stringify(response));
        })
        .catch(function (error) {
            console.error("CloseView - Error: " + error.message);
        });

}
//CreateRequest to Add New Item
function createAddRowsRequests(actionId) {
    let row = {};
    for (var i = countNewItems - 1; i >= 0; i--) {
        var itemId = i.toString();
        var item = (<HTMLInputElement>document.getElementById(itemId)).value;
        //Not to add deleted or empty items to rows
        if (isDeleted[i.toString()] == false && (Utils.isEmptyString(item.toString())) == false) {
            var dataRow: actionSDK.ActionDataRow = {
                id: Utils.generateGUID(),
                actionId: actionId,
                dataTableName: "TestDataSet",
                columnValues: row
            };
            row[ChecklistColumnType.checklistItem.toString()] = item;
            if (isCompleted[itemId] == true) {
                row[ChecklistColumnType.status.toString()] = Status.COMPLETED;
            } else {
                row[ChecklistColumnType.status.toString()] = Status.ACTIVE;
            }
            var addRowsRequest = new actionSDK.AddActionDataRow.Request(dataRow);
            console.info("AddActionRow Request -" + i + " " + JSON.stringify(addRowsRequest));
            batchUpdateReq.push(addRowsRequest);
            row = {};//Reset to push next row's data
        }
    }
}

// Update status for a row
function updateStatusOfChecklistItem(row: actionSDK.ActionDataRow, isDeleted = false) {
    let statusCol = ChecklistColumnType.status.toString();
    let currentStatus = row.columnValues[statusCol];
    if (currentStatus == Status.ACTIVE && isDeleted == false) {
        row.columnValues[ChecklistColumnType.status.toString()] = Status.COMPLETED;
    }
    else if (currentStatus == Status.COMPLETED && isDeleted == false) {
        row.columnValues[ChecklistColumnType.status.toString()] = Status.ACTIVE;
    }
    else if (isDeleted == true) {
        row.columnValues[ChecklistColumnType.status.toString()] = Status.DELETED;
    }
}

//Update value for a row
function updateValueOfChecklistItem(row: actionSDK.ActionDataRow, newVal) {
    let itemCol = ChecklistColumnType.checklistItem.toString();
    row.columnValues[itemCol] = newVal;
}

//create a new upadte req
function createUpdateRequest(row: actionSDK.ActionDataRow) {
    let updateReq = new actionSDK.UpdateActionDataRow.Request(row);
    batchUpdateReq.push(updateReq);
}


//Get count of open and completed items
function getCountOfItems() {
    actionDataRows.forEach((row) => {

        if (row.columnValues[ChecklistColumnType.status] == Status.ACTIVE) {
            openItems++;
        }
        else if (row.columnValues[ChecklistColumnType.status] == Status.COMPLETED) {
            completedItems++;
        }

    })
}

//Check if value of item is updated or not
function isValueUpdated(oldval, newval) {
    console.info("Old value " + oldval + " new value " + newval);
    if (oldval != newval)
        return true;
    else return false;
}

//---HTML----

//View for open items
function createOpenItemsView() {
    var column = ChecklistColumnType.checklistItem;
    actionDataRows.forEach((row) => {
        if (row.columnValues[ChecklistColumnType.status] == Status.ACTIVE) {
            var itemDiv = document.createElement("div");
            var linebreak = document.createElement("br");

            var checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("id", row.id);
            checkbox.addEventListener("click", function () {
                //Update the row
                console.info("value of data status BEFORE" + JSON.stringify(row));
                updateStatusOfChecklistItem(row);
                createUpdateRequest(row);
                console.info("value of data status AFTER" + JSON.stringify(row));
            });

            var item = document.createElement("input");
            item.setAttribute("type", "item");
            item.setAttribute("value", row.columnValues[column]);
            item.addEventListener("change", function () {
                console.info("value of data value BEFORE" + JSON.stringify(row));
                if (isValueUpdated(row.columnValues[column], item.value)) {
                    updateValueOfChecklistItem(row, item.value);
                    createUpdateRequest(row);
                    console.info("value of data value AFTER" + JSON.stringify(row));
                }
            });


            var del = document.createElement("BUTTON");
            del.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
            del.addEventListener("click", function () {
                updateStatusOfChecklistItem(row, true);
                item.disabled = true;
                checkbox.disabled = true;
                createUpdateRequest(row);
            });

            itemDiv.appendChild(checkbox);
            itemDiv.appendChild(item);
            itemDiv.appendChild(del);
            openItemDiv.appendChild(itemDiv);
        }
    });
}

//Add Item View
function createAddItemView() {

    var addItem = document.createElement("BUTTON");
    addItem.innerHTML = "Add Item";
    addItem.addEventListener("click", function () {
        createNewItemDiv();
    });
    addItemDiv.appendChild(addItem);
}

function createNewItemDiv() {
    var itemDiv = document.createElement("div");
    var linebreak = document.createElement("br");

    var item = document.createElement("input");
    item.setAttribute("type", "item");
    item.setAttribute("value", "");
    item.setAttribute("id", countNewItems.toString());
    var itemId = item.id;
    isDeleted[itemId] = false;
    isCompleted[itemId] = false;

    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.addEventListener("click", function () {
        if (checkbox.checked == true) {
            isCompleted[itemId] = true;
        }
        else {
            isCompleted[itemId] = false;
        }
    });

    var del = document.createElement("BUTTON");
    del.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
    del.addEventListener("click", function () {
        isDeleted[itemId] = true;
        item.disabled = true;
        checkbox.disabled = true;
    });
    itemDiv.appendChild(checkbox);
    itemDiv.appendChild(item);
    itemDiv.appendChild(del);
    openItemDiv.appendChild(itemDiv);
    countNewItems++;
}

//View for completed items
function createCompleteItemsView() {
    var column = ChecklistColumnType.checklistItem;
    actionDataRows.forEach((row) => {
        if (row.columnValues[ChecklistColumnType.status] == Status.COMPLETED) {
            var itemDiv = document.createElement("div");
            var linebreak = document.createElement("br");
            var checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("id", row.id);
            checkbox.setAttribute("checked", "true");
            checkbox.addEventListener("click", function () {
                //Update the row
                console.info("value of data row BEFORE" + JSON.stringify(row));
                updateStatusOfChecklistItem(row);
                createUpdateRequest(row);
                console.info("value of data row AFTER" + JSON.stringify(row));
            });

            var item = document.createElement("input");
            item.setAttribute("type", "item");
            item.setAttribute("value", row.columnValues[column]);
            item.setAttribute("readOnly", "true");

            itemDiv.appendChild(checkbox);
            itemDiv.appendChild(item);
            completeItemDiv.appendChild(itemDiv);
        }
    });
}


