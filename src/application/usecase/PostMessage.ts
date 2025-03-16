import Blockchain from "../../domain/blockchain/Blockchain";
import Block from "../../domain/block/Block";
import UseCase from "./UseCase";
import Stock from "../../domain/stock/Stock";

export default class PostMessage implements UseCase {
    
    constructor (readonly blockchain: Blockchain) {}

    public async execute(input: Input): Promise<Output> {
        const stock = new Stock(input.timestamp, input.quantity, input.name, input.price, input.buy);
        const result = this.blockchain.addMessage(stock);
        const output = { message: result, latestBlock: this.blockchain.getLatestBlock() };
        return output;
    }
}

type Input = {
    timestamp: Date;
    quantity: number;
    name: string;
    price: number;
    buy: boolean;
}

type Output = {
    message: string,
    latestBlock: Block
}