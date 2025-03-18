import Blockchain from "../../domain/blockchain/Blockchain";
import Block from "../../domain/block/Block";
import Asset from "../../domain/asset/Asset";
import UseCase from "./UseCase";

export default class PostAsset implements UseCase {
    
    constructor (readonly blockchain: Blockchain) {}

    public async execute(input: Input): Promise<Output> {
        const stock = Asset.create(input.timestamp, input.name, input.category, input.quantity, input.price, input.buy);
        const result = this.blockchain.addStock(stock);
        const output = { message: result, latestBlock: this.blockchain.getLatestBlock() };
        return output;
    }
}

type Input = {
    timestamp: Date;
    quantity: number;
    category: string
    name: string;
    price: number;
    buy: boolean;
}

type Output = {
    message: string,
    latestBlock: Block
}