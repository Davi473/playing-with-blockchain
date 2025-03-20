import { ec } from "elliptic";
import crypto from "crypto";

const EC = new ec("secp256k1");

function signTransaction(asset: any, privateKeyHex: string): string {
    const keyPair = EC.keyFromPrivate(privateKeyHex, "hex");
    const msgHash = crypto.createHash("sha256").update(asset).digest();
    const signature = keyPair.sign(msgHash);
    return signature.toDER("hex");
}

test("Create block", async () => {  
    const privateKey = "test";

    const keyPair = EC.keyFromPrivate(privateKey, "hex");
    const publicKey = keyPair.getPublic("hex"); 
    const asset = [
        {
            name: "VALE",
            category: "STOCK",
            quantity: 1,
            price: 8.56,
            time: new Date("03-12-2025"),
            buy: true
        }
    ]
    const sign = signTransaction(asset, privateKey);

    const transaction = {
        input: {
            id: crypto.createHash("sha256").update(`${sign}${publicKey}`).digest("hex");
            stringSig: {
                asm: sign,
                hex: publicKey
            }
        },
        asset
    }
    const response = await axios.post("http://localhost:3000/transaction", transaction);
    console.log(response);
});