import { Utils } from './Utils'

export class UxUtils {

    public static setClass(element: HTMLElement, className: string) {
        if (!Utils.isEmptyString(className)) {
            element.className = className;
        }
    }

    public static addElement(element: HTMLElement = null, parentElement: HTMLElement = null) {
        if (element && parentElement) {
            parentElement.appendChild(element);
        }
    }
    public static lineBreak() {
        return document.createElement('br');
    }
}