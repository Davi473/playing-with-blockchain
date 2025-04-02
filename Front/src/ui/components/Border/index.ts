export default class Border {
    readonly div: HTMLDivElement;
    readonly element: HTMLDivElement;
    constructor (
        size: string = "auto"
    ) {
        this.div = document.createElement("div");
        this.div.className = "form-control";
        this.div.style = "border-radius: 18px; border: 3px solid #757575";
        this.element = document.createElement("div");
        this.element.style.width = size;
        this.element.appendChild(this.div);
    }
}