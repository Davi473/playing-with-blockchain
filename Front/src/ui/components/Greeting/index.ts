export default class Greeting {
    readonly element: HTMLDivElement;

    constructor () {
        const p = document.createElement("p");
        p.className = "h6";
        p.innerHTML = "Good Morning,";
        const p2 = document.createElement("p");
        p2.className = "h3";
        p2.innerHTML = "Fulano";
        this.element = document.createElement("div");
        this.element.className = "mb-4 mt-4"
        this.element.appendChild(p);
        this.element.appendChild(p2);
    }
}