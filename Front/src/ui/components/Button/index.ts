import Border from "../Border";

export default class InputText {
    readonly element: HTMLElement = document.createElement("div");
    readonly button: HTMLButtonElement = document.createElement("button")

    constructor (
        name: string,
    ) {
        this.button.innerText = name;
        this.button.style = `border: none;
        outline: none;
        background: #1e1e1e;
        width: 100%;
        color: #ffffff;
        `
        const border = new Border();
        border.div.appendChild(this.button);
        border.div.style.backgroundColor = "#1e1e1e";
        this.element.appendChild(border.element);
    }

}