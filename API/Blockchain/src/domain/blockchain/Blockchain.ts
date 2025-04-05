import Block from "../block/Block";
import Transaction from "../transaction/Transaction";
import fs from "fs";

export default class Blockchain {
  chain: any[];
  difficulty: number;

  constructor() {
    this.difficulty = 4; 
    this.chain = [this.logStart()];
    fs.writeFileSync("./database/data.json", JSON.stringify(this.chain, null, 2), "utf-8");
  }

  public logStart(): any {
    const local = "./database/data.json";
    if (!fs.existsSync(local)) return this.createGenesisBlock();
    const response = fs.readFileSync(local, "utf-8");
    const blockSave = JSON.parse(response);
    if (blockSave) return this.chain = blockSave;
    return this.createGenesisBlock();
  }

  createGenesisBlock(): Block {
    const block = new Block(0, Date.now(), 1, "Genesis Block", this.difficulty);
    block.mineBlock();
    return block;
  }

  getTheHashofTheMostRecentBlock(): string {
    return this.chain[this.chain.length - 1].hash;
  }

  addTransction(transaction: Transaction): void {
    const newBlock = new Block(this.chain.length, Date.now(), 1, this.getTheHashofTheMostRecentBlock(), this.difficulty);
    newBlock.addTransaction(transaction);
    newBlock.mineBlock();
    this.chain.push(newBlock);
    fs.writeFileSync("./database/data.json", JSON.stringify(this.chain, null, 2), "utf-8");
  }
}