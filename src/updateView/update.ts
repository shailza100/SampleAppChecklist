import * as actionSDK from 'action-sdk-sunny';
import { UxUtils } from '../common/UxUtils'
import { Utils } from '../common/Utils';
import { ChecklistColumnType, Status } from "../creationView/EnumContainer";

var root = document.getElementById("root");
var openItemDiv = document.createElement("div");
var addItemDiv = document.createElement("div");
var completeItemDiv = document.createElement("div");
var footerDiv = UxUtils.getElement("div");
UxUtils.setClass(footerDiv, "footer");


let actionInstance = null;
let actionDataRows = null;
let actionContext = null;
let subscriptionMembers = [];
let openItems = 0;
let completedItems = 0;
let batchUpdateReq = [];
let countNewItems = 0;
let isDeleted = {};
let isCompleted = {};
let userId = "";


OnPageLoad();

function createBody() {
    UxUtils.addElement(UxUtils.getElement("hr"), root);
    var title = document.createElement('h4');
    var save = document.createElement("BUTTON");
    save.className = "button2"
    title.innerHTML = actionInstance.displayName;
    save.innerHTML = "Save Changes";
    save.style.float = "right";
    //Call update row API on Save button
    save.addEventListener("click", function () {
        updateDataRow();
    });
    UxUtils.addElement(title, root);
    UxUtils.addElement(openItemDiv, root);
    UxUtils.addElement(addItemDiv, root);
    UxUtils.addElement(completeItemDiv, root);
    UxUtils.addElement(footerDiv, root);
    UxUtils.addElement(save, footerDiv);

    createAddItemView();
    getCountOfItems();
    var heading1 = document.createElement('h5');
    heading1.innerHTML = "Open items (" + openItems + ")";
    openItemDiv.appendChild(heading1);

    var heading2 = document.createElement('h5');
    heading2.innerHTML = "Completed items (" + completedItems + ")";
    completeItemDiv.appendChild(heading2);

    //Add open items
    createOpenItemsView();
    //Add completed items
    createCompleteItemsView();


}

//GetContext
function OnPageLoad() {
    actionSDK.executeApi(new actionSDK.GetContext.Request())
        .then(function (response: actionSDK.GetContext.Response) {
            console.info("GetContext - Response: " + JSON.stringify(response));
            actionContext = response.context;
            userId = response.context.userId;
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
            row[ChecklistColumnType.creationUser.toString()] = userId;
            row[ChecklistColumnType.creationTime.toString()] = new Date().getTime().toString();
            if (row[ChecklistColumnType.status.toString()] == Status.COMPLETED) {
                row[ChecklistColumnType.completionUser.toString()] = userId;
                row[ChecklistColumnType.completionTime.toString()] = new Date().getTime().toString();
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
        row.columnValues[ChecklistColumnType.completionUser.toString()] = userId;
        row.columnValues[ChecklistColumnType.completionTime.toString()] = new Date().getTime().toString();
    }
    else if (currentStatus == Status.COMPLETED && isDeleted == false) {
        row.columnValues[ChecklistColumnType.status.toString()] = Status.ACTIVE;
    }
    else if (isDeleted == true) {
        row.columnValues[ChecklistColumnType.status.toString()] = Status.DELETED;
        row.columnValues[ChecklistColumnType.deletionUser.toString()] = userId;
        row.columnValues[ChecklistColumnType.deletionTime.toString()] = new Date().getTime().toString();
    }
    row.columnValues[ChecklistColumnType.latestEditUser.toString()] = userId;
    row.columnValues[ChecklistColumnType.latestEditTime.toString()] = new Date().getTime().toString();
}

//Update value for a row
function updateValueOfChecklistItem(row: actionSDK.ActionDataRow, newVal) {
    let itemCol = ChecklistColumnType.checklistItem.toString();
    row.columnValues[itemCol] = newVal;
    row.columnValues[ChecklistColumnType.latestEditUser.toString()] = userId;
    row.columnValues[ChecklistColumnType.latestEditTime.toString()] = new Date().getTime().toString();
}

//create a new upadte req
function createUpdateRequest(row: actionSDK.ActionDataRow) {
    let updateReq = new actionSDK.UpdateActionDataRow.Request(row);
    batchUpdateReq.push(updateReq);
}

//Get user details who completed the item

async function getCompletionUserDetails() {
    try {
        let memberIds = [];
        actionDataRows.forEach((row) => {
            if (row.columnValues[ChecklistColumnType.status] == Status.COMPLETED) {
                memberIds.push(row.columnValues[ChecklistColumnType.completionUser]);
            }
        });
        var request = new actionSDK.GetSubscriptionMembers.Request(actionContext.subscription, memberIds);
        console.info("GetSubscriptionMembers Request " + JSON.stringify(request));
        let response = await actionSDK.executeApi(request) as actionSDK.GetSubscriptionMembers.Response;
        subscriptionMembers = response.members;
        console.info("GetSubscriptionMembers - Response" + JSON.stringify(response));
    }
    catch (error) {
        console.error("GetSubscriptionMembers - Error" + error.message);
    }
}

//Get completion User displayName
function getUserDisplayName(memberId) {
    let displayName = "";
    subscriptionMembers.forEach((member) => {
        if (member.id == memberId) {
            displayName = member.displayName;
        }
    });
    return displayName;
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


function dateConverter(timeStamp) {
    var date = new Date(parseInt(timeStamp));
    let hour = date.getHours();
    let min = date.getMinutes();
    return (date.toDateString() + ", " + hour + ":" + min);
}


//---HTML----

//View for open items
function createOpenItemsView() {
    var column = ChecklistColumnType.checklistItem;
    actionDataRows.forEach((row) => {
        if (row.columnValues[ChecklistColumnType.status] == Status.ACTIVE) {
            var itemDiv = document.createElement("div");

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
            del.className = "button1";
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

    var plus = UxUtils.getElement("i");
    UxUtils.setClass(plus, "fa fa-plus");

    var add = UxUtils.getElement("input");
    UxUtils.addAttribute(add, { "type": "additem", "value": "Add Item", "readonly": "true" });

    UxUtils.addElement(plus, addItemDiv);
    UxUtils.addElement(add, addItemDiv);

    addItemDiv.addEventListener("click", function () {
        createNewItemDiv();
    });
}

function createNewItemDiv() {
    var itemDiv = document.createElement("div");
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
    del.className = "button1";
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
async function createCompleteItemsView() {
    //First fetch user details
    await getCompletionUserDetails();
    var column = ChecklistColumnType.checklistItem;
    actionDataRows.forEach((row) => {
        if (row.columnValues[ChecklistColumnType.status] == Status.COMPLETED) {
            var itemDiv = document.createElement("div");
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

            var completedBy = document.createElement("h6");
            var time = dateConverter(row.columnValues[ChecklistColumnType.completionTime]);
            var completionUser = getUserDisplayName(row.columnValues[ChecklistColumnType.completionUser]);
            completedBy.innerHTML = "Completed by " + completionUser + " on " + time.toString();

            itemDiv.appendChild(checkbox);
            itemDiv.appendChild(item);
            itemDiv.appendChild(completedBy);

            completeItemDiv.appendChild(itemDiv);
        }
    });
}



