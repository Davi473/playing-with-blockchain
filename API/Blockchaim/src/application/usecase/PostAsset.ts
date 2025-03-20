import Blockchain from "../../domain/blockchain/Blockchain";
import Block from "../../domain/block/Block";
import Asset from "../../domain/asset/Asset";
import UseCase from "./UseCase";

export default class PostAsset implements UseCase {
    
    constructor (readonly blockchain: Blockchain) {}

    public async execute(input: Input): Promise<Output> {
        const inputAsset = input.asset;
        const asset = Asset.create(inputAsset.timestamp, inputAsset.name, inputAsset.category, inputAsset.quantity, inputAsset.price, inputAsset.buy);
        const result = this.blockchain.addStock(asset, input.stringSig);
        const output = { message: result, latestBlock: this.blockchain.getLatestBlock() };
        return output;
    }
}

type Input = {
    asset: {
        timestamp: Date;
        quantity: number;
        category: string
        name: string;
        price: number;
        buy: boolean;
    },
    stringSig: {
        asn: string,
        hex: string
    }
}

type Output = {
    message: string,
    latestBlock: Block
}