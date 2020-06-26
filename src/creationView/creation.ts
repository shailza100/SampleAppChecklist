import * as actionSDK from "action-sdk-sunny";
import { ChecklistColumnType, Status } from "./EnumContainer";

var root = document.getElementById("root");
var bodyDiv = document.createElement("div");
var footerDiv = document.createElement("div");
var itemsCount = 0;
let items = new Array();
let actionId = "";
let row = {};

OnPageLoad();

function createAction(actionPackageId) {
  console.info("start createAction()");
  var columns = createChecklistColumns();
  // var itemsList = getItemsList();
  var action = {
    id: generateGUID(),
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
  var addDataRows = new actionSDK.AddActionDataRow.Request(getDataRows(actionId));
  console.info("CreateAction - Request: " + JSON.stringify(action));
  var req = {};
  var batchRequest = new actionSDK.BaseApi.BatchRequest([createAction, addDataRows]);
  actionSDK.executeBatchApi(batchRequest)
    .then(function (batchResponse) {
      console.info("Create Action and add rows BatchResponse: " + JSON.stringify(batchResponse));
    })
    .catch(function (error) {
      console.error("Create Action and add rows Error : " + JSON.stringify(error));
    })
  console.info("End createAction()");
}

//Add values for dataRows

function getDataRows(actionId) {

  for (var i = 0; i < itemsCount; i++) {
    var dataRow: actionSDK.ActionDataRow = {
      id: generateGUID(),
      actionId: actionId,
      dataTableName: "TestDataSet",
      columnValues: row
    };
    var item = (<HTMLInputElement>document.getElementById(i.toString())).value;
    row[ChecklistColumnType.checklistItem.toString()] = item;
  }
  console.info("AddActionDataRow - Request" + JSON.stringify(dataRow));
  return dataRow;
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
    if (item.match(ChecklistColumnType.checklistItem)) {
      checklistCol.allowNullValue = false;
    }
    columns.push(checklistCol);
  }
  return columns;
}

/*function statusParams(state: Status) {
  var optionActive: actionSDK.ActionDataColumnOption = {
    name: state.toString(),
    displayName: state.toString(),
  };
  return optionActive;
}*/

function generateGUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function submitFormNew() {
  console.info("Start submitFormNew");
  actionSDK
    .executeApi(new actionSDK.GetContext.Request())
    .then(function (response: actionSDK.GetContext.Response) {
      console.info("GetContext - Response: " + JSON.stringify(response));
      createAction(response.context.actionPackageId);
    })
    .catch(function (error) {
      console.error("GetContext - Error: " + error.message);
    });
  console.info("End of SubmitFormNew");
}

//HTML
function OnPageLoad() {
  root.appendChild(createInputElement("Name your Checklist", "ChecklistName"));
  root.appendChild(bodyDiv);
  root.appendChild(footerDiv);

  var linebreak = document.createElement("br");
  var addQuestionButton = document.createElement("BUTTON"); // Create a <button> element
  addQuestionButton.innerHTML = "Add Item";

  var submit = document.createElement("BUTTON"); // Create a <button> element
  submit.innerHTML = "Submit";
  submit.style.float = "right";

  bodyDiv.appendChild(linebreak);
  footerDiv.appendChild(linebreak);
  footerDiv.appendChild(addQuestionButton);
  footerDiv.appendChild(submit);

  addQuestionButton.addEventListener("click", function () {
    bodyDiv.appendChild(addItem());
  });

  submit.addEventListener("click", function () {
    submitFormNew();
  });
}

function createInputElement(ph: string, id: string) {
  var inputelement = document.createElement("input"); // Create Input Field for Name
  inputelement.setAttribute("type", "text");
  inputelement.setAttribute("id", id);
  inputelement.placeholder = ph;
  return inputelement;
}

function addItem() {
  var itemDiv = document.createElement("div");
  var linebreak = document.createElement("br");
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "cid";

  var item = document.createElement("input");
  item.type = "item";
  item.setAttribute("id", itemsCount.toString());
  item.setAttribute("value", "");

  var del = document.createElement("BUTTON");
  del.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
  del.addEventListener("click", function () {
    itemDiv.style.display = "none";
    // itemsCount--;
    //itemDiv.remove();
  });

  itemDiv.appendChild(checkbox);
  itemDiv.appendChild(item);
  itemDiv.appendChild(del);

  itemsCount++;

  return itemDiv;
}
