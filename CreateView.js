var root = document.getElementById("root");
var bodyDiv = document.createElement("div");
var footerDiv = document.createElement("div");

function OnPageLoad() {
    root.appendChild(createInputElement("Name your Checklist", "ChecklistName"));
    root.appendChild(createInputElement("First Item", "Item"));
    root.appendChild(bodyDiv);
    root.appendChild(footerDiv);


    var linebreak = document.createElement('br');

    var item = document.createElement("input");

    var addQuestionButton = document.createElement("BUTTON"); // Create a <button> element
    addQuestionButton.innerHTML = "Add Item";


    var submit = document.createElement("BUTTON"); // Create a <button> element
    submit.innerHTML = "Next";
    submit.style.float = "right";

    //bodyDiv.appendChild(item);
    bodyDiv.appendChild(linebreak);

    footerDiv.appendChild(linebreak);
    footerDiv.appendChild(addQuestionButton);
    footerDiv.appendChild(submit);

    /*addQuestionButton.addEventListener("click", function () {
      bodyDiv.appendChild(addQuestion());
    });
    submit.addEventListener("click", function () {
      submitFormNew();
    });*/
}


function createInputElement(ph, id) {
    var inputelement = document.createElement('input'); // Create Input Field for Name
    inputelement.setAttribute("type", "text");
    inputelement.setAttribute("id", id);
    inputelement.placeholder = ph;
    return inputelement;
}