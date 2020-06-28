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
    var submit = document.createElement("BUTTON");
    title.innerHTML = actionInstance.displayName;
    submit.innerHTML = "Submit";
    UxUtils.setClass(submit, 'responseSubmitButton');
    submit.addEventListener("click", function () {
        //      submitForm();
    });
    UxUtils.addElement(title, root);
    createChecklistView();
    UxUtils.addElement(submit, root);
    UxUtils.addElement(UxUtils.lineBreak(), root);
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
            actionDataRowsLength = actionDataRows == null ? 0 : actionDataRows.length;
            createBody();
        })
        .catch(function (error) {
            console.log("Console log: Error: " + JSON.stringify(error));
        });
}


//HTML 
function createChecklistView() {
    // console.info("ActionDataRows" + actionDataRows[0].columnValues[ChecklistColumnType.checklistItem]);
    actionDataRows.forEach((row) => {
        var column = ChecklistColumnType.checklistItem;

        var itemDiv = document.createElement("div");
        var checkbox = document.createElement("input");
        checkbox.type = 'checkbox';
        checkbox.id = 'cid';
        checkbox.value = 'car';

        var label = document.createElement('label')
        label.htmlFor = 'car';
        label.appendChild(document.createTextNode(row.columnValues[column]));

        var br = document.createElement('br');
        itemDiv.appendChild(checkbox);
        itemDiv.appendChild(label);
        itemDiv.appendChild(br);
        root.appendChild(itemDiv);
    });
}

