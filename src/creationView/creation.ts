import * as actionSDK from "action-sdk-sunny";

var root = document.getElementById("root");
var bodyDiv = document.createElement("div");
var footerDiv = document.createElement("div");
var itemsCount = 0;
let items = new Array();

OnPageLoad();

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

function getItemsList() {
  console.info("start getItemsList ");
  for (var i = 0; i < itemsCount; i++) {
    var val = {
      name: i.toString(),
      valueType: "Text",
      allowNullValue: false,
      displayName: (<HTMLInputElement>document.getElementById(i.toString()))
        .value,
      options: [],
    };
    items.push(val);
  }
  console.info("End getItemsList ");
  return items;
}

function createAction(actionPackageId) {
  console.info("start createAction()");

  var itemsList = getItemsList();
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
        rowsEditable: false,
        canUserAddMultipleItems: true,
        dataColumns: itemsList,
      },
    ],
  };
  console.info(
    `Value of action.dataTables[0].dataColumns ${action.dataTables[0].dataColumns[0].displayName}`
  );

  var request = new actionSDK.CreateAction.Request(action);
  actionSDK
    .executeApi(request)
    .then(function (response: actionSDK.GetContext.Response) {
      console.info("CreateAction - Response: " + JSON.stringify(response));
    })
    .catch(function (error) {
      console.error("CreateAction - Error: " + error.message);
    });
  console.info("End createAction()");
}

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
