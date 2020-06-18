var root = document.getElementById("root");
var bodyDiv = document.createElement("div");
var footerDiv = document.createElement("div");
var itemsCount = 0;
let items = new Array();

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

    addQuestionButton.addEventListener("click", function() {
        addItem();
    });

    submit.addEventListener("click", function() {
        getItemsList();
        submitFormNew();
    });
}

function createInputElement(ph, id) {
    var inputelement = document.createElement("input"); // Create Input Field for Name
    inputelement.setAttribute("type", "text");
    inputelement.setAttribute("id", id);
    inputelement.placeholder = ph;
    return inputelement;
}

function addItem() {
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "cid";
    var item = document.createElement("input");
    item.type = "item";
    item.setAttribute("id", itemsCount.toString());
    item.setAttribute("value", "");
    var linebreak = document.createElement("br");
    bodyDiv.appendChild(linebreak);
    bodyDiv.appendChild(checkbox);
    bodyDiv.appendChild(item);
    itemsCount++;
}

function getItemsList() {
    for (var i = 0; i < itemsCount; i++) {
        var val = {
            id: i.toString(),
            // type: actionSDK.ActionDataFieldType.SingleOption,
            allowNullValue: false,
            itemValue: document.getElementById(i).value,
        };
        items.push(val);
        console.log(val.itemValue);
    }
    return items;
}

function createAction(actionPackageId) {
    var itemsList = getItemsList();
    var action = {
        id: generateGUID(),
        actionPackageId: actionPackageId,
        version: 1,
        title: document.getElementById("ChecklistName").value,
        expiryTime: new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
        properties: [],
        dataSets: [{
            id: "TestDataSet",
            itemsVisibility: actionSDK.Visibility.All,
            itemsEditable: false,
            canUserAddMultipleItems: true,
            dataFields: itemsList,
        }, ],
    };
    var request = new actionSDK.CreateAction.Request(action);
    actionSDK
        .executeApi(request)
        .then(function(response) {
            console.info("CreateAction - Response: " + JSON.stringify(response));
        })
        .catch(function(error) {
            console.error("CreateAction - Error: " + JSON.stringify(error));
        });
}

function createInputElement(ph, id) {
    var inputelement = document.createElement("input"); // Create Input Field for Name
    inputelement.setAttribute("type", "text");
    inputelement.setAttribute("id", id);
    inputelement.placeholder = ph;
    return inputelement;
}

function generateGUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

function submitFormNew() {
    console.log("Inside submitFormNew");
    actionSDK
        .executeApi(new actionSDK.GetContext.Request())
        .then(function(response) {
            console.info("GetContext - Response: " + JSON.stringify(response));
            createAction(response.context.actionPackageId);
        })
        .catch(function(error) {
            console.error("GetContext - Error: " + JSON.stringify(error));
        });
    console.log("End of SubmitFormNew");
}