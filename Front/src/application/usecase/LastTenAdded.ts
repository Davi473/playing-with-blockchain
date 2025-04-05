import Asset from "../../domain/asset/Asset";
import BlockchainService from "../../infra/service/BlockchainService";
import UseCase from "./UseCase";

export default class LastTenAdded implements UseCase{
    constructor (readonly service: BlockchainService) {}

    public async execute(input: Input): Promise<any> {
        let blocks: any[] = await this.service.get();
        const transactions: any[] = [];
        blocks.forEach(block => {
			if (!block.transaction[0]) return;
			block.transaction.forEach(transaction => {
				const publicKeyBlock = transaction.input.stringSig.hex;
				if (publicKeyBlock !== input.publicKey) return;
				const assets: any[] = transaction.asset;
				assets.forEach(asset => {
					transactions.push(new Asset(new Date(asset.time), asset.name, 
						asset.category, asset.quantity, asset.price, asset.buy));
				});
			});
		});
        return transactions.slice(-5).reverse();
    }
}

type Input = {
	publicKey: string
}