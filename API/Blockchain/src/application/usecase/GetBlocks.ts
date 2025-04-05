import Blockchain from "../../domain/blockchain/Blockchain";
import UseCase from "./UseCase";
import Asset from "../../domain/asset/Asset";

export default class GetBlocks implements UseCase {
    
    constructor (readonly blockchain: Blockchain) {}

    public async execute(): Promise<Output[]> {
        const output = this.blockchain.chain;
        return output;
    }
}

type Output = any;