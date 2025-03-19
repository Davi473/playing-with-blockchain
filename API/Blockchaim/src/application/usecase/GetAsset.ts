import Blockchain from "../../domain/blockchain/Blockchain";
import UseCase from "./UseCase";
import Asset from "../../domain/asset/Asset";
import Assets from "../../domain/assets/Assets";

export default class GetAsset implements UseCase {
    
    constructor (readonly blockchain: Blockchain) {}

    public async execute(): Promise<void> {
        const blocks = this.blockchain.chain;
        new Assets(blocks);
    }
}

type Output = {
    index: number;
    timestamp: number;
    asset: Asset | {};
    previousHash: string;
    hash: string;
    nonce: number;
}