import Asset from "../asset/Asset";
import Block from "../block/Block";

export default class Assets {
    private category: {} = {};
    private listAsset: {} = {};

    constructor (blocks: Block[]) {
        const assets = blocks.reduce((asset: any[], block) => {
            if (block.asset) asset.push(block.asset);
            return asset;
        }, []);
        this.averageAsset(assets);
        this.createListCategory();
    }

    public getCategory(): Object {
        return this.category;
    }

    private averageAsset(assets: any[]): void {
        for (const asset of assets) {
            const assetName = asset.name;
            const exist = assetName in this.listAsset;
            if(!exist) {
                this.listAsset[assetName] = {
                    name: assetName, category: asset.category, quantity: asset.quantity,
                    amount: (asset.price * asset.quantity), price: asset.price, buy: asset.buy
                };
                continue;
            }
            let quantity, amount;
            if(asset.buy) {
                quantity = asset.quantity + this.listAsset[assetName].quantity;
                amount = (asset.price * asset.quantity) + this.listAsset[assetName].amount;
            } else {
                quantity = this.listAsset[assetName].quantity - asset.quantity
                amount = this.listAsset[assetName].amount - (asset.price * asset.quantity);
            }
            const price = amount / quantity;
            this.listAsset[assetName] = {...this.listAsset[assetName], 
                quantity, amount, price}
        }
    }

    private createListCategory (): void {
        for (const asset in this.listAsset) {
            const valueAsset = this.listAsset[asset]
            const category = valueAsset.category;
            const exist = category in this.category
            if(!exist) this.category[category] = [];
            this.category[category].push({
                name: valueAsset.name, quantity: valueAsset.quantity,
                price: valueAsset.price, buy: valueAsset.buy
            })
        }
    }
}