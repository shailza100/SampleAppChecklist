import { UxUtils } from "./UxUtils";
import { Utils } from "./Utils";
import { ActionSdkHelper } from "./ActionSdkHelper";


export class Components {
    public static getChangeSettingOption(actionInstance, data) {
           let userMainDiv=document.createElement("div");
           userMainDiv.className="right smallerSize";

        // Adding dropdown on button
        let button = UxUtils.getElement("button");
        UxUtils.setClass(button,"nonebg-button settingButton");
        UxUtils.setText(button, "...");
        let options=null;
        // dropdown for due date settings
        if(actionInstance.status=="Active"){
         options = [ {
            text: data.close.text,
            callback: closeEvent
        },
         {
             text:data.delete.text,
             callback:deleteEvent
        }]
    }
    else{
         options = [ 
         {
             text:data.delete.text,
             callback:deleteEvent
        }]

    }
        let dropdown = UxUtils.getDropDown(options);

        let closeDiv = this.getCloseModal(actionInstance, "Are you sure you want to close this Checklist?" );
        let deleteDiv = this.getDeleteModal(actionInstance, "Are you sure you want to delete this Checklist?");


        // listener to open change modal and close dropdown 
        function closeEvent() {
            UxUtils.addCSS(closeDiv, { display: "block" });
            UxUtils.toggleClass("myDropdown", "show");
        }
        function deleteEvent() {
            UxUtils.addCSS(deleteDiv, { display: "block" });
            UxUtils.toggleClass("myDropdown", "show");
        }

        // listener to close and open dropdown when someone click on button 
        UxUtils.addClickEvent(button, () => {
            UxUtils.toggleClass("myDropdown", "show");
        });

        UxUtils.addElement(button, userMainDiv);
    
        UxUtils.addElement(closeDiv, userMainDiv);
        UxUtils.addElement(deleteDiv, userMainDiv);
        UxUtils.addElement(dropdown, userMainDiv);
        return userMainDiv;
    }

    public static getModal(id, topView, submitListener) {
        let modalDiv=UxUtils.getElement("div");
        UxUtils.setClass(modalDiv,"modal");
        modalDiv.id=id;
        modalDiv.style.display="none";

        let modalContentDiv=UxUtils.getElement("div");
        UxUtils.setClass(modalContentDiv,"modal-content");

        // Confirm button 
        let confirmButton = UxUtils.getPrimaryButton("Confirm", submitEvent, null, "right");
        
        function submitEvent() {
            submitListener();
            UxUtils.addCSS(document.getElementById(id), { display: "none" });
        }

        // Cancel button to cancel this operation
        let cancelButton = UxUtils.getSecondaryButton("Cancel", cancelEvent, null, "right rightMargin");
        function cancelEvent() {
            UxUtils.addCSS(document.getElementById(id), { display: "none" });
        }


        UxUtils.addElement(topView, modalContentDiv);
        UxUtils.addElement(UxUtils.lineBreak(), modalContentDiv);
        UxUtils.addElement(confirmButton, modalContentDiv);
        UxUtils.addElement(cancelButton, modalContentDiv);
        UxUtils.addElement(UxUtils.lineBreak(), modalContentDiv);

        UxUtils.addElement(modalContentDiv, modalDiv);
        return modalDiv;
    }

    public static getCloseModal(actionInstance, text) {
        let id = "closeModal";

        let modalContentDiv=UxUtils.getElement("div");
        let textToShow = UxUtils.getElement("text", { class: "bold" });
        UxUtils.setText(textToShow,text);

        async function submitListener() {
            actionInstance = await ActionSdkHelper.updateActionInstance(actionInstance, { status: "Closed", expiryTime: new Date().getTime() });
            UxUtils.addCSS(document.getElementById(id), { display: "none" });
        }

        UxUtils.addElement(textToShow, modalContentDiv);

        return this.getModal(id, modalContentDiv, submitListener);
    }

    public static getDeleteModal(actionInstance, text) {
        let id = "deleteModal";

        let modalContentDiv = UxUtils.getElement("div");

        let textToShow = UxUtils.getElement("text", { class: "bold" });
        UxUtils.setText(textToShow, text);

        async function submitListener() {
           await ActionSdkHelper.deleteActionInstance(actionInstance.id);
            UxUtils.addCSS(document.getElementById(id), { display: "none" });
        }

        UxUtils.addElement(textToShow, modalContentDiv);

        return this.getModal(id, modalContentDiv, submitListener);
    }

}
