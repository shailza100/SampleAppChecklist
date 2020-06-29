import * as actionSDK from 'action-sdk-sunny';
import { UxUtils } from '../common/UxUtils'
import { ChecklistColumnType, Status } from "../creationView/EnumContainer";


var root = document.getElementById("root");
let actionInstance = null;
let actionDataRows = null;
let actionDataRowsLength = 0;


OnPageLoad();

function createBody() {
    var title = document.createElement('h3');
    var save = document.createElement("BUTTON");
    title.innerHTML = actionInstance.displayName;
    save.innerHTML = "Save";
    save.style.float = "right";
    save.addEventListener("click", function () {
        closeResponseView();
    });
    UxUtils.addElement(title, root);
    createChecklistView();
    UxUtils.addElement(UxUtils.lineBreak(), root);
    UxUtils.addElement(UxUtils.lineBreak(), root);
    UxUtils.addElement(save, root);
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
            actionDataRowsLength = actionDataRows == null ? 0 : actionDataRows.length;
            createBody();
        })
        .catch(function (error) {
            console.error("BatchResponse: " + JSON.stringify(error));
        });
}

//UpdateActionDataRow
function updateDataRow(datarow: actionSDK.ActionDataRow) {
    actionSDK.executeApi(new actionSDK.UpdateActionDataRow.Request(datarow))
        .then(function (response: actionSDK.UpdateActionDataRow.Response) {
            console.info("UpdateActionDataRow - Response: " + JSON.stringify(response));
        })
        .catch(function (error) {
            console.error("UpdateActionDataRow - Error: " + error.message);
        });
}

// Update status 
function updateStatusOfChecklistItem(row: actionSDK.ActionDataRow) {
    let statusCol = ChecklistColumnType.status.toString();
    let currentStatus = row.columnValues[statusCol];
    if (currentStatus == Status.ACTIVE) {
        row.columnValues[ChecklistColumnType.status.toString()] = Status.COMPLETED;
    }
    else if (currentStatus == Status.COMPLETED) {
        row.columnValues[ChecklistColumnType.status.toString()] = Status.ACTIVE;
    }
}

function closeResponseView() {
    actionSDK.executeApi(new actionSDK.CloseView.Request)
        .then(function (response: actionSDK.CloseView.Response) {
            console.info("CloseView - Response: " + JSON.stringify(response));
        })
        .catch(function (error) {
            console.error("CloseView - Error: " + error.message);
        });

}

//HTML 
function createChecklistView() {
    var column = ChecklistColumnType.checklistItem;
    actionDataRows.forEach((row) => {
        var itemDiv = document.createElement("div");
        var linebreak = document.createElement("br");
        var checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", row.id);
        checkbox.addEventListener("click", function () {
            //Update the row
            console.info("value of data row BEFORE" + JSON.stringify(row));
            updateStatusOfChecklistItem(row);
            //Call UpdateActionDataRow
            updateDataRow(row);
            console.info("value of data row AFTER" + JSON.stringify(row));
        });

        var item = document.createElement("input");
        item.setAttribute("type", "item");
        item.setAttribute("value", row.columnValues[column]);
        item.setAttribute("readOnly", "true");

        itemDiv.appendChild(checkbox);
        itemDiv.appendChild(item);
        itemDiv.appendChild(linebreak);
        root.appendChild(itemDiv)
    });
}

