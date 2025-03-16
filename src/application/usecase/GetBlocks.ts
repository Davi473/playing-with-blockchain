import Blockchain from "../../domain/blockchain/Blockchain";
import Block from "../../domain/block/Block";
import UseCase from "./UseCase";
import Stock from "../../domain/stock/Stock";

export default class GetBlocks implements UseCase {
    
    constructor (readonly blockchain: Blockchain) {}

    public async execute(): Promise<Output[]> {
        const output = this.blockchain.chain;
        return output;
    }
}

type Output = {
    index: number;
    timestamp: number;
    stocks: Stock | "";
    previousHash: string;
    hash: string;
    nonce: number;
}