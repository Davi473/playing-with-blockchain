export default class TableList {
    readonly element: HTMLDivElement = document.createElement("div");
    private thead: HTMLDivElement = document.createElement("div");
    private tbody: HTMLDivElement = document.createElement("div");

    constructor() {
        const table = document.createElement("div");
        table.className = "styled-table";
        table.style.width = "100%";

        table.appendChild(this.thead);
        table.appendChild(this.tbody);
        this.element.appendChild(table);
        document.head.appendChild(style);
    }

    addHead(headers: string[]): void {
        const tr = document.createElement("tr");
        tr.className = "table-row-head text-center";
        headers.forEach(header => {
            const th = document.createElement("th");
            th.innerText = header;
            tr.appendChild(th);
        });

        this.thead.appendChild(tr);
    }

    addBody(values: any[]): void {
        const tr = document.createElement("tr");
        tr.className = "table-row mb-3";
        values.forEach(value => {
            const td = document.createElement("td");
            td.innerText = value;
            td.style.padding = "10px";
            tr.appendChild(td);
        });

        this.tbody.appendChild(tr);
    }
}

// Adicionando estilo global para bordas arredondadas
const style = document.createElement("style");
style.innerHTML = `
    .styled-table th {
        font-weight: bold;
    }

    .table-row-head {
        background-color: white;
        display: flex;
        justify-content: space-around;
        margin: 0 aut
    }

    .table-row {
        background-color: white;
        border: 3px solid #757575;
        border-radius: 18px;
        display: flex;
        justify-content: space-around;
        margin: 0 auto;
    }

    .table-row td {
        flex: 1;
        text-align: center;
    }
`;