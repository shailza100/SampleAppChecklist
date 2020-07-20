import * as actionSDK from 'action-sdk-sunny';
import { UxUtils } from '../common/UxUtils'
import { Utils } from '../common/Utils';
import { ChecklistColumnType, Status } from "../creationView/EnumContainer";
import { Components } from '../common/Components';

let root = document.getElementById("root");
let bodyDiv = UxUtils.getElement("div");
let openItemDiv = UxUtils.getElement("div");
let completeItemDiv = UxUtils.getElement("div");
let footerDiv = UxUtils.getElement("div");
UxUtils.setClass(footerDiv, "footer");


let actionInstance = null;
let actionDataRows = null;
let actionContext = null;
let subscriptionMembers = [];
let openItems = 0;
let completedItems = 0;
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
    save.style.pointerEvents="none";
    save.style.opacity="0.4";

    UxUtils.setText(title, actionInstance.displayName.toString());

    UxUtils.addElement(bodyDiv, root);
    UxUtils.setClass(bodyDiv, "scrollUpdateView");

    UxUtils.addElement(title, bodyDiv);

    if (actionContext.userId == actionInstance.creatorId)
    UxUtils.addElement(getDeleteSettingView(),bodyDiv);//Add the Close/Delete checklist dropdown

    UxUtils.addElement(openItemDiv, bodyDiv);
    UxUtils.addElement(completeItemDiv, bodyDiv);

    UxUtils.addElement(footerDiv, root);
    UxUtils.addElement(save, footerDiv);

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
            itemDiv.style.pointerEvents="none";
           // itemDiv.style.opacity="0.4";
            let checkbox = document.createElement("input");
            UxUtils.addAttribute(checkbox, { "type": "checkbox", "id": row.id });

            let item = document.createElement("input");
            UxUtils.addAttribute(item, { "type": "item", "value": row.columnValues[column] });

            let del = UxUtils.getElement("button");
            UxUtils.setClass(del, "button1");
            UxUtils.setText(del, '<i class="fa fa-trash-o" aria-hidden="true"></i>');

            UxUtils.addElement(checkbox, itemDiv);
            UxUtils.addElement(item, itemDiv);
            UxUtils.addElement(del, itemDiv);
            UxUtils.addElement(itemDiv, openItemDiv);
        }
    });
}

//View for completed items
async function createCompleteItemsView() {
    //First fetch user details
    await getCompletionUserDetails();
    let column = ChecklistColumnType.checklistItem;
    actionDataRows.forEach((row) => {
        if (row.columnValues[ChecklistColumnType.status] == Status.COMPLETED) {
            let itemDiv = UxUtils.getElement("div");
            itemDiv.style.pointerEvents="none";
           // itemDiv.style.opacity="0.4";
            let checkbox = UxUtils.getElement("input");
            UxUtils.addAttribute(checkbox, { "type": "checkbox", "id": row.id, "checked": "true" });
    
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

    function getDeleteSettingView() {

        let data = {
            delete:{
                text:"Delete Checklist"
            }
        }    
        return Components.getChangeSettingOption(actionInstance, data);
    }

//Returns Loader for Page
function loaderforPage() {
    let loader = UxUtils.getLoadingSpinner();
    UxUtils.addCSS(loader, { "position": "absolute", "left": "45%", "top": "45%", "width": "150pt", "height": "150pt", "margin": "-75px 0 0 -75px" });
    return loader;
}