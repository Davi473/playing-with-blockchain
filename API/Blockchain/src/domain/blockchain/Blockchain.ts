import Block from "../block/Block";
import Transaction from "../transaction/Transaction";

export default class Blockchain {
  chain: any[];
  difficulty: number;

  constructor() {
    this.difficulty = 4; 
    this.chain = [this.createGenesisBlock()];
  }

  logStart(): void {
    
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
  }
}