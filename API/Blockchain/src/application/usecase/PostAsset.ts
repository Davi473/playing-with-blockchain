import Blockchain from "../../domain/blockchain/Blockchain";
import Block from "../../domain/block/Block";
import UseCase from "./UseCase";
import Transaction from "../../domain/transaction/Transaction";
import Asset from "../../domain/asset/Asset";

export default class PostAsset implements UseCase {
    
    constructor (readonly blockchain: Blockchain) {}

    public async execute(input: Input): Promise<void> {
        const inputAsset = input.asset.map(asset => new Asset(asset.time, asset.name, asset.category, asset.quantity, asset.price, asset.buy));
        const transaction = new Transaction({...input.input}, inputAsset);
        this.blockchain.addTransction(transaction);
    }
}

type Input = {
    asset: [
            {
            time: number;
            quantity: number;
            category: string
            name: string;
            price: number;
            buy: boolean;
        }
    ],
    input: {
        id: string,
        stringSig: {
            asm: string,
            hex: string
        }
    }
}