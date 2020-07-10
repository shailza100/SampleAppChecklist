import * as actionSDK from "action-sdk-sunny";
import { ChecklistColumnType, Status } from "./EnumContainer";
import { Utils } from '../common/Utils';
import { UxUtils } from "../common/UxUtils";

var root = document.getElementById("root");
var bodyDiv = UxUtils.getElement("div");
var itemsDiv = UxUtils.getElement("div");
var footerDiv = UxUtils.getElement("div");
UxUtils.setClass(footerDiv, "footer");

let itemsCount = 0;
let actionId = "";
let batchReq = [];
let isDeleted = {};
let isCompleted = {};
let userId = "";

OnPageLoad();

function createAction(actionPackageId) {

  var columns = createChecklistColumns();
  var action = {
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

  var createAction = new actionSDK.CreateAction.Request(action);
  batchReq.push(createAction);
  console.info("CreateAction - Request: " + JSON.stringify(action));
  getAddRowsRequests(actionId);
  console.info("BatchRequest - " + JSON.stringify(batchReq));
  var batchRequest = new actionSDK.BaseApi.BatchRequest(batchReq);
  actionSDK.executeBatchApi(batchRequest)
    .then(function (batchResponse) {
      console.info("Create Action and add rows BatchResponse: " + JSON.stringify(batchResponse));
    })
    .catch(function (error) {
      console.error("Create Action and add rows Error : " + JSON.stringify(error));
    })

}

//Add values for dataRows
function getAddRowsRequests(actionId) {
  let row = {};
  for (var i = itemsCount - 1; i >= 0; i--) {
    var item = (<HTMLInputElement>document.getElementById(i.toString())).value;
    var itemId = i.toString();
    //Not to add deleted items to rows
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
      var addRowsRequest = new actionSDK.AddActionDataRow.Request(dataRow);
      console.info("AddActionRow Request -" + i + " " + JSON.stringify(addRowsRequest))
      batchReq.push(addRowsRequest);
      row = {};//Reset to push next row's data
    }
  }
}

//Add values for dataColumns
function createChecklistColumns() {
  let columns = new Array();
  for (let item in ChecklistColumnType) {
    var checklistCol: actionSDK.ActionDataColumn = {
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
  var optionActive: actionSDK.ActionDataColumnOption = {
    name: state.toString(),
    displayName: state.toString(),
  };
  return optionActive;
}

function submitFormNew() {
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

//HTML
function OnPageLoad() {

  UxUtils.addElement(UxUtils.getElement("hr"), root);
  var title = UxUtils.createInputElement("Name your checklist", "ChecklistName", "title");
  UxUtils.addElement(title, root);
  UxUtils.addElement(bodyDiv, root);
  UxUtils.addElement(itemsDiv, root);
  UxUtils.addElement(footerDiv, root);

  var submit = UxUtils.getElement("BUTTON");
  UxUtils.setClass(submit, "button2");
  UxUtils.setText(submit, "Next");
  submit.style.float = "right";
  UxUtils.setClass(submit, "button2");

  UxUtils.addElement(UxUtils.lineBreak(), bodyDiv);
  UxUtils.addElement(UxUtils.lineBreak(), itemsDiv);
  UxUtils.addElement(addItem(), bodyDiv);//To add first item onPageLoad 
  UxUtils.addElement(createAddItemDiv(), itemsDiv);

  UxUtils.addElement(submit, footerDiv);

  submit.addEventListener("click", function () {
    submitFormNew();
  });
}

function addItem() {
  var itemDiv = UxUtils.getElement("div");

  var item = UxUtils.getElement("input");
  UxUtils.addAttribute(item, { "type": "item", "value": "" });
  UxUtils.setId(item, itemsCount.toString());

  let itemId = item.id;
  isDeleted[itemId] = false;
  isCompleted[itemId] = false;

  var checkbox = document.createElement("input");
  UxUtils.addAttribute(checkbox, { "type": "checkbox" });
  checkbox.addEventListener("click", function () {
    if (checkbox.checked == true) {
      isCompleted[itemId] = true;
    }
    else {
      isCompleted[itemId] = false;
    }
  });

  var del = UxUtils.getElement("BUTTON");
  UxUtils.setClass(del, "button1");
  UxUtils.setText(del, '<i class="fa fa-trash-o" style="font-size:15px"></i>');

  del.addEventListener("click", function () {
    isDeleted[itemId] = true;
    itemDiv.style.display = "none";
  });

  UxUtils.addElement(checkbox, itemDiv);
  UxUtils.addElement(item, itemDiv);
  UxUtils.addElement(del, itemDiv);

  itemsCount++;

  return itemDiv;
}

function createAddItemDiv() {
  var addItemDiv = UxUtils.getElement("div");
  var plus = UxUtils.getElement("BUTTON");
  UxUtils.setClass(plus, "button1");
  UxUtils.setText(plus, '<i class="fa fa-plus" style="font-size:15px;color:#6264a7"></i>');

  var add = UxUtils.getElement("input");
  UxUtils.addAttribute(add, { "type": "additem", "value": "Add Item", "readonly": "true" });

  UxUtils.addElement(plus, addItemDiv);
  UxUtils.addElement(add, addItemDiv);

  addItemDiv.addEventListener("click", function () {
    UxUtils.addElement(addItem(), bodyDiv);
  });


  return addItemDiv;
}