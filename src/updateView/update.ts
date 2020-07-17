import * as actionSDK from 'action-sdk-sunny';
import { UxUtils } from '../common/UxUtils'
import { Utils } from '../common/Utils';
import { ChecklistColumnType, Status } from "../creationView/EnumContainer";

let root = document.getElementById("root");
let bodyDiv = UxUtils.getElement("div");
let openItemDiv = UxUtils.getElement("div");
let addItemDiv = UxUtils.getElement("div");
let completeItemDiv = UxUtils.getElement("div");
let footerDiv = UxUtils.getElement("div");
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
    let title = UxUtils.getElement("h4");

    let save = UxUtils.getElement("button");
    UxUtils.setClass(save, "button2");
    UxUtils.addAttribute(save, { "id": "save" });
    UxUtils.setText(save, "Save Changes");
    save.style.float = "right";

    //Call update row API on Save button
    save.addEventListener("click", function () {
        updateDataRow();
    });

    UxUtils.setText(title, actionInstance.displayName.toString());

    UxUtils.addElement(bodyDiv, root);
    UxUtils.setClass(bodyDiv, "scrollUpdateView");

    UxUtils.addElement(title, bodyDiv);
    UxUtils.addElement(openItemDiv, bodyDiv);
    UxUtils.addElement(addItemDiv, bodyDiv);
    UxUtils.addElement(completeItemDiv, bodyDiv);

    UxUtils.addElement(footerDiv, root);
    UxUtils.addElement(save, footerDiv);

    createAddItemView();
    getCountOfItems();

    let heading1 = UxUtils.getElement("h5");
    UxUtils.setText(heading1, "Open items (" + openItems + ")");
    UxUtils.addElement(heading1, openItemDiv);

    let heading2 = UxUtils.getElement("h5");
    UxUtils.setText(heading2, "Completed items (" + completedItems + ")");
    UxUtils.addElement(heading2, completeItemDiv);

    //Add open items
    createOpenItemsView();
    //Add completed items
    createCompleteItemsView();


}

//GetContext
function OnPageLoad() {
    let loader = loaderforPage();
    UxUtils.addElement(loader, root);
    actionSDK.executeApi(new actionSDK.GetContext.Request())
        .then(function (response: actionSDK.GetContext.Response) {
            console.info("GetContext - Response: " + JSON.stringify(response));
            actionContext = response.context;
            userId = response.context.userId;
            getActionInstance(response.context.actionId);
            UxUtils.addCSS(loader, { "display": "none" });
        })
        .catch(function (error) {
            console.error("GetContext - Error: " + JSON.stringify(error));
        });
}

//GetAction and GetActionDataRows
function getActionInstance(actionId) {
    let loader = loaderforPage();
    UxUtils.addElement(loader, root);

    let getActionRequest = new actionSDK.GetAction.Request(actionId);
    let getDataRowsRequest = new actionSDK.GetActionDataRows.Request(actionId);
    let batchRequest = new actionSDK.BaseApi.BatchRequest([getActionRequest, getDataRowsRequest]);
    actionSDK.executeBatchApi(batchRequest)
        .then(function (batchResponse: actionSDK.BaseApi.BatchResponse) {
            console.info("BatchResponse: " + JSON.stringify(batchResponse));
            actionInstance = (<actionSDK.GetAction.Response>batchResponse.responses[0]).action;
            actionDataRows = (<actionSDK.GetActionDataRows.Response>batchResponse.responses[1]).dataRows;
            UxUtils.addCSS(loader, { "display": "none" });
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
    let closeViewRequest = new actionSDK.CloseView.Request();
    batchUpdateReq.push(closeViewRequest);
    let batchRequest = new actionSDK.BaseApi.BatchRequest(batchUpdateReq);
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
    for (let i = countNewItems - 1; i >= 0; i--) {
        let itemId = i.toString();
        let item = (<HTMLInputElement>document.getElementById(itemId)).value;
        //Not to add deleted or empty items to rows
        if (isDeleted[i.toString()] == false && (Utils.isEmptyString(item.toString())) == false) {
            let dataRow: actionSDK.ActionDataRow = {
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

            let addRowsRequest = new actionSDK.AddActionDataRow.Request(dataRow);
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
    console.info("Update Row Request - " + JSON.stringify(updateReq));
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
        let request = new actionSDK.GetSubscriptionMembers.Request(actionContext.subscription, memberIds);
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
    let date = new Date(parseInt(timeStamp));
    let hour = date.getHours();
    let min = date.getMinutes();
    return (date.toDateString() + ", " + hour + ":" + min);
}


//---HTML----

//View for open items
function createOpenItemsView() {
    let column = ChecklistColumnType.checklistItem;
    actionDataRows.forEach((row) => {
        if (row.columnValues[ChecklistColumnType.status] == Status.ACTIVE) {
            let itemDiv = UxUtils.getElement("div");

            let checkbox = document.createElement("input");
            UxUtils.addAttribute(checkbox, { "type": "checkbox", "id": row.id });
            checkbox.addEventListener("click", function () {
                //Update the row
                console.info("value of data status BEFORE" + JSON.stringify(row));
                updateStatusOfChecklistItem(row);
                createUpdateRequest(row);
                console.info("value of data status AFTER" + JSON.stringify(row));
            });

            let item = document.createElement("input");
            UxUtils.addAttribute(item, { "type": "item", "value": row.columnValues[column] });
            item.addEventListener("change", function () {
                console.info("value of data value BEFORE" + JSON.stringify(row));
                if (isValueUpdated(row.columnValues[column], item.value)) {
                    updateValueOfChecklistItem(row, item.value);
                    createUpdateRequest(row);
                    console.info("value of data value AFTER" + JSON.stringify(row));
                }
            });


            let del = UxUtils.getElement("button");
            UxUtils.setClass(del, "button1");
            UxUtils.setText(del, '<i class="fa fa-trash-o" aria-hidden="true"></i>');
            del.addEventListener("click", function () {
                updateStatusOfChecklistItem(row, true);
                item.disabled = true;
                checkbox.disabled = true;
                createUpdateRequest(row);
            });

            UxUtils.addElement(checkbox, itemDiv);
            UxUtils.addElement(item, itemDiv);
            UxUtils.addElement(del, itemDiv);
            UxUtils.addElement(itemDiv, openItemDiv);
        }
    });
}

//Add Item View
function createAddItemView() {

    let plus = UxUtils.getElement("i");
    UxUtils.setClass(plus, "fa fa-plus");

    let add = UxUtils.getElement("input");
    UxUtils.addAttribute(add, { "type": "additem", "value": "Add Item", "readonly": "true" });

    UxUtils.addElement(plus, addItemDiv);
    UxUtils.addElement(add, addItemDiv);

    addItemDiv.addEventListener("click", function () {
        createNewItemDiv();
    });
}

function createNewItemDiv() {
    let itemDiv = UxUtils.getElement("div");
    let item = document.createElement("input");
    UxUtils.addAttribute(item, { "type": "item", "value": "", "id": countNewItems.toString() });

    let itemId = item.id;
    isDeleted[itemId] = false;
    isCompleted[itemId] = false;

    let checkbox = document.createElement("input");
    UxUtils.addAttribute(checkbox, { "type": "checkbox" });
    checkbox.addEventListener("click", function () {
        if (checkbox.checked == true) {
            isCompleted[itemId] = true;
        }
        else {
            isCompleted[itemId] = false;
        }
    });

    let del = UxUtils.getElement("button");
    UxUtils.setClass(del, "button1");
    UxUtils.setText(del, '<i class="fa fa-trash-o" aria-hidden="true"></i>');
    del.addEventListener("click", function () {
        isDeleted[itemId] = true;
        item.disabled = true;
        checkbox.disabled = true;
    });
    UxUtils.addElement(checkbox, itemDiv);
    UxUtils.addElement(item, itemDiv);
    UxUtils.addElement(del, itemDiv);
    UxUtils.addElement(itemDiv, openItemDiv);
    countNewItems++;
}

//View for completed items
async function createCompleteItemsView() {
    //First fetch user details
    await getCompletionUserDetails();
    let column = ChecklistColumnType.checklistItem;
    actionDataRows.forEach((row) => {
        if (row.columnValues[ChecklistColumnType.status] == Status.COMPLETED) {
            let itemDiv = UxUtils.getElement("div");
            let checkbox = UxUtils.getElement("input");
            UxUtils.addAttribute(checkbox, { "type": "checkbox", "id": row.id, "checked": "true" });
            checkbox.addEventListener("click", function () {
                //Update the row
                console.info("value of data row BEFORE" + JSON.stringify(row));
                updateStatusOfChecklistItem(row);
                createUpdateRequest(row);
                console.info("value of data row AFTER" + JSON.stringify(row));
            });

            let item = UxUtils.getElement("input");
            UxUtils.addAttribute(item, { "type": "item", "value": row.columnValues[column], "readOnly": "true" });

            let completedBy = UxUtils.getElement("h6");
            let time = dateConverter(row.columnValues[ChecklistColumnType.completionTime]);
            let completionUser = getUserDisplayName(row.columnValues[ChecklistColumnType.completionUser]);
            UxUtils.setText(completedBy, "Completed by " + completionUser + " on " + time.toString());

            UxUtils.addElement(checkbox, itemDiv);
            UxUtils.addElement(item, itemDiv);
            UxUtils.addElement(completedBy, itemDiv);

            UxUtils.addElement(itemDiv, completeItemDiv);
        }
    });
}

//Returns Loader for Page
function loaderforPage() {
    let loader = UxUtils.getLoadingSpinner();
    UxUtils.addCSS(loader, { "position": "absolute", "left": "45%", "top": "45%", "width": "150pt", "height": "150pt", "margin": "-75px 0 0 -75px" });
    return loader;
}