export default class NavBar {
    readonly element: HTMLElement

    constructor () {
        this.element = document.createElement("nav");
        this.element.className = "nav";
    }

    public addLink(name: string, callback: any, active: boolean = false): void {
        const a = document.createElement("a");
        a.className = "nav-link";
        a.style = `color: ${active ? "#757575" : "#1e1e1e"}`
        a.innerText = name
        a.onclick = () => {
            new callback();
        }
        this.element.appendChild(a);
    }
}