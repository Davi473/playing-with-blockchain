import * as crypto from 'crypto';
import { ec } from "elliptic";
import Asset from '../asset/Asset';

export default class Transaction {
    id: string;
    input: Input;
    asset: Asset[];

    constructor(input: Input, asset: Asset[]) {
        this.input = input;
        this.asset = asset;
        if (!this.validatedTransaction()) throw new Error("Transaction Invalid");
        this.id = this.calculateHash();
    }

    calculateHash(): string {
        return crypto.createHash('sha256').update(`${this.input}${this.asset}`).digest('hex');
    }

    validatedTransaction() {
        const keyPair = new ec("secp256k1").keyFromPublic(this.input.stringSig.hex, "hex");
        const msgHash = crypto.createHash("sha256").update(`${this.asset}`).digest();
        return keyPair.verify(msgHash, this.input.stringSig.asm);
    }
}

type Input = { 
    id: string, 
    stringSig: {
        asm: string, 
        hex: string 
    }
};