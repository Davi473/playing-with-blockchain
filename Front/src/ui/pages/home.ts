import BlockchainService from "../../infra/service/BlockchainService.js";
import { HttpClientAxios } from "../../infra/httpClient/HttpClient.js";
import LastTenAdded from "../../application/usecase/LastTenAdded.js";
import DivCenter from "./../components/DivCenter/index.js";
import Greeting from "../components/Greeting/index.js";
import Border from "./../components/Border/index.js";
import NavBar from "../components/NavBar/index.js";
import Text from "./../components/Text/index.js"
import Add from "./add.js";
import TableList from "../components/TableList/index.js";

export default class Home {
    readonly lastTenAdded: LastTenAdded;
    readonly token: string = (globalThis as any).token;
    readonly navBar: NavBar = new NavBar();
    readonly greeting: Greeting = new Greeting();
    readonly borderNavBar: Border = new Border("600px");
    readonly textAssetList = new Text("Last 10 added", "h7");
    readonly tableList = new TableList();
    readonly divPage: DivCenter = new DivCenter();
    readonly body: Element;

    constructor () {
        const httpClient = new HttpClientAxios();
        const blockchainService = new BlockchainService(httpClient);
        this.lastTenAdded = new LastTenAdded(blockchainService);
        this.navBar.addLink("Home", Home, true);
        this.navBar.addLink("Add", Add);
        this.navBar.addLink("Chart", Add);
        this.borderNavBar.div.appendChild(this.navBar.element);
        this.borderNavBar.element.style
        this.body = document.body;
        this.body.innerHTML = "";
        this.init();
        this.body.appendChild(this.divPage.element);
    }

    private async init(): Promise<void> {
        const assets: any[] = await this.lastTenAdded.execute({ publicKey: (globalThis as any).publicKey});
        console.log(assets)
        this.divPage.addElemente(this.borderNavBar.element);
        this.divPage.addElemente(this.greeting.element);
        this.divPage.addElemente(this.textAssetList.element);
        this.tableList.addHead(["Asset", "Category", "Type", "Quantity"]);
        assets.forEach(asset => {
            this.tableList.addBody([asset.getName(), asset.getCategory(), asset.getBuy(), asset.getQuantity()])
        });
        this.divPage.addElemente(this.tableList.element);
    }
}