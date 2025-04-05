import Border from "../Border";

export default class InputText {
    readonly element: HTMLElement = document.createElement("div");
    readonly input: HTMLInputElement = document.createElement("input");

    constructor (
        name: string,
        type: string,
        placeholder?: string
    ) {
        const label = document.createElement("label");
        label.innerText = name;
        this.input.type = type;
        if (placeholder) this.input.placeholder = placeholder;
        this.input.style = `border: none;
        outline: none;
        background: transparent;
        width: 100%;`
        const border = new Border();
        border.div.appendChild(this.input);
        this.element.appendChild(label);
        this.element.appendChild(border.element);
    }

    public getValue(): string {
        return this.input.value;
    }
}