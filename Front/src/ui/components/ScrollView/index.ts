export default class ScrollView {
    readonly element: HTMLDivElement;

    constructor () {
        this.element = document.createElement("div");
        this.element.style = "width: 300px; height: 200px; overflow-y: auto; border: 1px solid black; padding: 10px;";
    }

    public addElement(element: Element): void {
        this.element.appendChild(element);
    }
}