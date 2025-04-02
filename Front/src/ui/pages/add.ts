import BlockchainService from "../../infra/service/BlockchainService.js";
import { HttpClientAxios } from "../../infra/httpClient/HttpClient.js";
import LastTenAdded from "../../application/usecase/LastTenAdded.js";
import DivCenter from "./../components/DivCenter/index.js";
import Border from "./../components/Border/index.js";
import NavBar from "../components/NavBar/index.js";
import Text from "./../components/Text/index.js"
import Home from "./home.js";
import TableList from "../components/TableList/index.js";
import InputText from "../components/InputText/index.js";
import Button from "../components/Button/index.js";
import Asset from "../../domain/asset/Asset.js";

export default class Add {
    readonly lastTenAdded: LastTenAdded;
    readonly token: string = (globalThis as any).token;
    readonly navBar: NavBar = new NavBar();
    readonly borderNavBar: Border = new Border("600px");
    readonly buttonAsset =  new InputText("Asset", "input", "ex: VALE");
    readonly buttonCategory =  new InputText("Category", "input", "ex: STOCK");
    readonly buttonQuantity =  new InputText("Quantity", "input", "ex: 0.12");
    readonly buttonOrderType =  new InputText("Order Type", "input", "ex: Buy or Sell");
    readonly buttonPurchaseDate =  new InputText("Purchase Date", "date");
    readonly buttonPrice = new InputText("Price", "input", "ex: 8.30");
    readonly buttonListAdd =  new Button("List Add");
    readonly buttonSing =  new Button("Sing");
    readonly textAssetList = new Text("List To Add", "h7");
    readonly tableList = new TableList();
    readonly divPage: DivCenter = new DivCenter();
    readonly body: Element;

    constructor () {
        const httpClient = new HttpClientAxios();
        const blockchainService = new BlockchainService(httpClient);
        this.lastTenAdded = new LastTenAdded(blockchainService);
        this.navBar.addLink("Home", Home);
        this.navBar.addLink("Add", Add, true);
        this.navBar.addLink("Chart", Add);
        this.borderNavBar.div.appendChild(this.navBar.element);
        this.buttonAsset.element.className = "mt-3";
        this.buttonListAdd.element.className = "mt-3";
        this.buttonSing.element.className = "mt-3";
        this.body = document.body;
        this.body.innerHTML = "";
        this.init();
        this.addList();
        this.body.appendChild(this.divPage.element);
    }

    private init(): void {
        this.divPage.addElemente(this.borderNavBar.element);
        this.divPage.addElemente(this.buttonAsset.element);
        this.divPage.addElemente(this.buttonCategory.element);
        this.divPage.addElemente(this.buttonQuantity.element);
        this.divPage.addElemente(this.buttonPrice.element);
        this.divPage.addElemente(this.buttonOrderType.element);
        this.divPage.addElemente(this.buttonPurchaseDate.element);
        this.divPage.addElemente(this.buttonListAdd.element);
        this.textAssetList.element.className = "mt-4"
        this.divPage.addElemente(this.textAssetList.element);
        this.tableList.addHead(["Asset", "Category", "Type", "Quantity", "Date"]);
        this.divPage.addElemente(this.tableList.element);
        this.divPage.addElemente(this.buttonSing.element);
    }

    private addList(): void {
        this.buttonListAdd.button.addEventListener("click", () => {
            const asset = this.buttonAsset.getValue();
            const category = this.buttonCategory.getValue();
            const quantity = this.buttonQuantity.getValue();
            const orderType = this.buttonOrderType.getValue();
            const purchaseDate = this.buttonPurchaseDate.getValue();
            const price = this.buttonPrice.getValue();
            if (!asset && !category && !quantity && !price && !purchaseDate) return;
            const assetNew = new Asset(new Date(purchaseDate), asset, category, Number(quantity), Number(price), (orderType ? true : false))
            this.tableList.addBody([assetNew.getName(), assetNew.getCategory(), assetNew.getBuy(), assetNew.getQuantity(), assetNew.getTime().split("T")[0]]);
        });
    }
}