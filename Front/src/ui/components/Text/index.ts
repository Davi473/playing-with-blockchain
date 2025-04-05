export default class Text {
    readonly element: HTMLDivElement = document.createElement("div");

    constructor (textString: string, size: string = "h1") {
        const text = document.createElement("p");
        text.innerHTML = textString;
        text.className = size;
        this.element.appendChild(text);
    }
}