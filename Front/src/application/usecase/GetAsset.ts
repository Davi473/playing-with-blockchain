import Asset from "../../domain/asset/Asset";
import BlockchainService from "../../infra/service/BlockchainService";
import UseCase from "./UseCase";

export default class GetAsset implements UseCase {
    constructor (readonly service: BlockchainService) {}

    public async execute(input: Input): Promise<any> {
        const blocks: any[] = await this.service.get();
		const transactions: any[] = [];
		blocks.forEach(block => {
			if (!block.transaction[0]) return;
			block.transaction.forEach(transaction => {
				const publicKeyBlock = transaction.input.stringSig.hex;
				if (publicKeyBlock !== input.publicKey) return;
				const assets: any[] = transaction.asset;
				assets.forEach(asset => {
					transactions.push(asset);
				});
			});
		});
		const assets: Record<string, Asset> = {};
		transactions.forEach(asset => { 
			const name = asset.name;
			const exist = name in assets;
			if(!exist) {
				assets[name] = new Asset(asset.time, asset.name, 
					asset.category, asset.quantity, asset.price, asset.buy)
				return;
			}
			assets[name].update(asset.price, asset.quantity);
		});
		const categorys: Record<string, any> = {};
		Object.keys(assets).forEach(asset => {
			const category = assets[asset].getCategory();
			const exist = category in categorys;
			if (!exist) categorys[category] = [];
			categorys[category].push([asset]);
		});
		return categorys;
	}
}

type Input = {
	publicKey: string
}
