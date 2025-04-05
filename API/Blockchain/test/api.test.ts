import { ec } from "elliptic";
import crypto from "crypto";
import axios from "axios";
import * as bip39 from "bip39";

const EC = new ec("secp256k1");

function signTransaction(asset: any, privateKeyHex: Buffer): string {
    const keyPair = EC.keyFromPrivate(privateKeyHex, "hex");
    const msgHash = crypto.createHash("sha256").update(`${asset}`).digest();
    const signature = keyPair.sign(msgHash);
    return signature.toDER("hex");
}

test("Create block", async () => {  
    const mnemonic = "test";
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const privateKey = seed.slice(0, 32);
    const keyPair = EC.keyFromPrivate(privateKey, "hex");
    const publicKey = keyPair.getPublic("hex");
    const asset = [
        {
            name: "VALE",
            category: "STOCK",
            quantity: 1,
            price: 9.56,
            time: new Date("03-12-2025"),
            buy: true
        }
    ]
    const sign = signTransaction(asset, privateKey);

    const transaction = {
        input: {
            id: crypto.createHash("sha256").update(`${sign}${publicKey}`).digest("hex"),
            stringSig: {
                asm: sign,
                hex: publicKey
            }
        },
        asset
    }
    axios.post("http://localhost:3000/transaction", transaction);
    const responseGet: any = await axios.get("http://localhost:3000/blocks");
    const outputGet = responseGet.data[(responseGet.data.length - 1)].transaction[0].input
    expect(outputGet.stringSig.hex).toBe(transaction.input.stringSig.hex);
    expect(outputGet.id).toBe(transaction.input.id);
    expect(outputGet.stringSig.asm).toBe(transaction.input.stringSig.asm);
});


test("Create block transaction two", async () => {  
    const mnemonic = "test";
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const privateKey = seed.slice(0, 32);
    const keyPair = EC.keyFromPrivate(privateKey, "hex");
    const publicKey = keyPair.getPublic("hex");
    const asset = [
        {
            name: "VALE",
            category: "STOCK",
            quantity: 1,
            price: 9.56,
            time: new Date("03-12-2025"),
            buy: true
        },
        {
            name: "VALE",
            category: "STOCK",
            quantity: 3,
            price: 9.56,
            time: new Date("03-12-2025"),
            buy: true
        }
    ]
    const sign = signTransaction(asset, privateKey);

    const transaction = {
        input: {
            id: crypto.createHash("sha256").update(`${sign}${publicKey}`).digest("hex"),
            stringSig: {
                asm: sign,
                hex: publicKey
            }
        },
        asset
    }
    axios.post("http://localhost:3000/transaction", transaction);
    const responseGet: any = await axios.get("http://localhost:3000/blocks");
    const outputGet = responseGet.data[(responseGet.data.length - 1)].transaction[0].input
    expect(outputGet.stringSig.hex).toBe(transaction.input.stringSig.hex);
    expect(outputGet.id).toBe(transaction.input.id);
    expect(outputGet.stringSig.asm).toBe(transaction.input.stringSig.asm);
});