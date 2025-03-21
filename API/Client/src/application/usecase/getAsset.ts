import BlockchainService from "../../infra/service/BlockchainService";
import UseCase from "./UseCase";

export default class GetAsset implements UseCase {
    constructor (readonly service: BlockchainService) {}

    public async execute(input: Input): Promise<any> {
        const blocks: any = await this.service.get();
		const transactions: any[] = [];
		blocks.forEach(block => {
			if (!block.transaction[0]) return;
			block.transaction.forEach(transaction => {
				const publicKeyBlock = transaction.input.stringSig.hex;
				if (publicKeyBlock !== input.publicKey) return;
				const assets = transaction.asset;
				assets.forEach(asset => {
					transactions.push(asset);
				});
			});
		});
		const assets = {};
		transactions.forEach(asset => { 
			const name = asset.name;
			const exist = name in assets;
			if(!exist) {
				assets[name] = {
					price: asset.price, quantity: asset.quantity,
					category: asset.category
				};
				return;
			}
			const quantity = assets[name].quantity + (asset.buy ? 
				asset.quantity : - asset.quantity);
			const amountTotal = (assets[name].quantity * assets[name].price) + (asset.buy ? 
				(asset.quantity * asset.price) : - (asset.quantity * asset.price));
			const price = amountTotal / quantity;
			asset[name] = {...asset[name], quantity, price };
		});
		const categorys = {};
		Object.keys(assets).forEach(asset => {
			const category = assets[asset].category;
			const exist = category in categorys;
			if (!exist) categorys[category] = [];
			categorys[category].push({...assets[asset], name: asset});
		});
		return categorys;
	}
}

type Input = {
	publicKey: string
}
