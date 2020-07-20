import * as actionSDK from "action-sdk-sunny";
import { ChecklistColumnType, Status } from "./EnumContainer";
import { Utils } from '../common/Utils';
import { UxUtils } from "../common/UxUtils";

let root = document.getElementById("root");
let bodyDiv = UxUtils.getElement("div");
let itemsDiv = UxUtils.getElement("div");
let addDiv = UxUtils.getElement("div");
let footerDiv = UxUtils.getElement("div");
UxUtils.setClass(footerDiv, "footer");
let errDiv = UxUtils.getElement("div");


let itemsCount = 0;
let actionId = "";
let batchReq = [];
let isDeleted = {};
let isCompleted = {};
let userId = "";
let showError = false;

/*
* Entry Point for Building Up the Creation View
*/
OnPageLoad();

/*
* @desc Create and execute batch request to create actionInstance and add ActionDataRows
*/
function createAction(actionPackageId) {

  let columns = createChecklistColumns();
  let action = {
    id: Utils.generateGUID(),
    actionPackageId: actionPackageId,
    version: 1,
    displayName: (<HTMLInputElement>document.getElementById("ChecklistName"))
      .value,
    expiryTime: new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
    properties: [],
    dataTables: [
      {
        name: "TestDataSet",
        rowsVisibility: actionSDK.Visibility.All,
        rowsEditable: true,
        canUserAddMultipleRows: true,
        dataColumns: columns
      },
    ],
  };
  actionId = action.id;

  let createAction = new actionSDK.CreateAction.Request(action);
  batchReq.push(createAction);
  console.info("CreateAction - Request: " + JSON.stringify(action));
  getAddRowsRequests(actionId);
  console.info("BatchRequest - " + JSON.stringify(batchReq));
  let batchRequest = new actionSDK.BaseApi.BatchRequest(batchReq);
  actionSDK.executeBatchApi(batchRequest)
    .then(function (batchResponse) {
      console.info("Create Action and add rows BatchResponse: " + JSON.stringify(batchResponse));
    })
    .catch(function (error) {
      console.error("Create Action and add rows Error : " + JSON.stringify(error));
    })

}


/*
* @desc Add items to dataRows and create AddActionDataRow requests using the actionId for actionInstance
*/

function getAddRowsRequests(actionId) {
  let row = {};
  for (let i = itemsCount - 1; i >= 0; i--) {
    let item = (<HTMLInputElement>document.getElementById(i.toString())).value;
    let itemId = i.toString();
    //Not to add deleted items to rows
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
      }
      else {
        row[ChecklistColumnType.status.toString()] = Status.ACTIVE;
      }
      row[ChecklistColumnType.creationUser.toString()] = userId;
      row[ChecklistColumnType.creationTime.toString()] = new Date().getTime().toString();
      if (row[ChecklistColumnType.status.toString()] == Status.COMPLETED) {
        row[ChecklistColumnType.completionUser.toString()] = userId;
        row[ChecklistColumnType.completionTime.toString()] = new Date().getTime().toString();
      }
      let addRowsRequest = new actionSDK.AddActionDataRow.Request(dataRow);
      console.info("AddActionRow Request -" + i + " " + JSON.stringify(addRowsRequest))
      batchReq.push(addRowsRequest);
      row = {};//Reset to push next row's data
    }
  }
}

/*
* @desc Create columns for checklist
*/

function createChecklistColumns() {
  let columns = new Array();
  for (let item in ChecklistColumnType) {
    let checklistCol: actionSDK.ActionDataColumn = {
      name: item,
      valueType: actionSDK.ActionDataColumnValueType.Text,
      displayName: item,
      allowNullValue: true
    };
    if (item.match(ChecklistColumnType.checklistItem) || item.match(ChecklistColumnType.status) || item.match(ChecklistColumnType.creationTime) || item.match(ChecklistColumnType.creationUser)) {
      checklistCol.allowNullValue = false;
    }
    if (item.match(ChecklistColumnType.status)) {
      checklistCol.valueType = actionSDK.ActionDataColumnValueType.SingleOption;
      checklistCol.options = [];
      checklistCol.options.push(statusParams(Status.ACTIVE));
      checklistCol.options.push(statusParams(Status.COMPLETED));
      checklistCol.options.push(statusParams(Status.DELETED));
    }
    if (item.match(ChecklistColumnType.completionUser) || item.match(ChecklistColumnType.latestEditUser) || item.match(ChecklistColumnType.creationUser) || item.match(ChecklistColumnType.deletionUser)) {
      checklistCol.valueType = actionSDK.ActionDataColumnValueType.UserId;
    }
    if (item.match(ChecklistColumnType.completionTime) || item.match(ChecklistColumnType.latestEditTime) || item.match(ChecklistColumnType.creationTime) || item.match(ChecklistColumnType.deletionTime)) {
      checklistCol.valueType = actionSDK.ActionDataColumnValueType.DateTime;
    }
    columns.push(checklistCol);
  }
  return columns;
}

function statusParams(state: Status) {
  let optionActive: actionSDK.ActionDataColumnOption = {
    name: state.toString(),
    displayName: state.toString(),
  };
  return optionActive;
}

/*
* @desc Executes GetContext request
*/

function submitFormNew() {
  if (isTitleValid()) {
    actionSDK
      .executeApi(new actionSDK.GetContext.Request())
      .then(function (response: actionSDK.GetContext.Response) {
        console.info("GetContext - Response: " + JSON.stringify(response));
        userId = response.context.userId;
        createAction(response.context.actionPackageId);
      })
      .catch(function (error) {
        console.error("GetContext - Error: " + error.message);
      });
  }
  else {
    if (!showError)
      showErrorMessage();
  }

}


//..............HTML.............

/**
 * Render create view for checklist 
 */

function OnPageLoad() {
  UxUtils.addElement(UxUtils.getElement("hr"), root);
  let title = UxUtils.createTitle("Name your checklist", "ChecklistName");
  title.addEventListener("click", function () {
    if (showError) {
      removeErrorMessage();
    }
  });
  UxUtils.setClass(bodyDiv, "scrollCreateview");

  UxUtils.addElement(errDiv, root);
  UxUtils.addElement(title, root);
  UxUtils.addElement(bodyDiv, root);
  UxUtils.addElement(itemsDiv, bodyDiv);
  UxUtils.addElement(addDiv, bodyDiv);
  UxUtils.addElement(footerDiv, root);

  let submit = UxUtils.getElement("BUTTON");
  UxUtils.setClass(submit, "button2");
  UxUtils.setText(submit, "Next");
  submit.style.float = "right";
  UxUtils.addAttribute(submit, { "id": "submit" });
  UxUtils.setClass(submit, "button2");

  addItem();//To add first item onPageLoad 
  UxUtils.addElement(createAddItemDiv(), addDiv);

  UxUtils.addElement(submit, footerDiv);

  submit.addEventListener("click", function () {
    submitFormNew();
  });
}

/**
 * Render the items div to add items to checklist 
 */

function addItem() {
  let itemDiv = UxUtils.getElement("div");

  let item = UxUtils.getElement("input");
  UxUtils.addAttribute(item, { "type": "item", "value": "" });
  UxUtils.setId(item, itemsCount.toString());

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

  let del = UxUtils.getElement("BUTTON");
  UxUtils.setClass(del, "button1");
  UxUtils.setText(del, '<i class="fa fa-trash-o" style="font-size:15px"></i>');

  del.addEventListener("click", function () {
    isDeleted[itemId] = true;
    itemDiv.style.display = "none";
  });

  UxUtils.addElement(checkbox, itemDiv);
  UxUtils.addElement(item, itemDiv);
  UxUtils.addElement(del, itemDiv);
  UxUtils.addElement(itemDiv,itemsDiv);
  document.getElementById(itemsCount.toString()).focus();//Move focus to latest item.
  itemsCount++;
}

/**
 *  Render add item button to add more items to the checklist
 */

function createAddItemDiv() {
  let addItemDiv = UxUtils.getElement("div");
  let plus = UxUtils.getElement("i");
  UxUtils.setClass(plus, "fa fa-plus");

  let add = UxUtils.getElement("input");
  UxUtils.addAttribute(add, { "type": "additem", "value": "Add Item", "readonly": "true" });

  UxUtils.addElement(plus, addItemDiv);
  UxUtils.addElement(add, addItemDiv);

  addItemDiv.addEventListener("click", function () {
    addItem();
  });
  return addItemDiv;
}


/**
 * Render alert when checklist title is empty
 */
function getErrorDiv(errorId: string, errorMessage: string) {
  let errorDiv = UxUtils.getElement("div");
  UxUtils.addAttribute(errorDiv, { "id": errorId });
  UxUtils.setClass(errorDiv, "red right");
  errorDiv.style.fontSize = "10px";
  UxUtils.setText(errorDiv, errorMessage);
  return errorDiv;
}

/**
 * Check whether user has entered a valid checklist title or not
 */
function isTitleValid() {
  let titleValue = (<HTMLInputElement>document.getElementById("ChecklistName")).value;
  if (titleValue) {
    return true;
  }
  else {
    return false;
  }
}

/**
 * Show alert to user
 */
function showErrorMessage() {
  showError = true;
  if (showError) {
    let errorDiv = getErrorDiv("titleError", "Title cannot be left blank!");
    UxUtils.addElement(errorDiv, errDiv);
  }
}

/**
 * Remove alert 
 */
function removeErrorMessage() {
  (document.getElementById("titleError")).remove();
  showError = false;
}
