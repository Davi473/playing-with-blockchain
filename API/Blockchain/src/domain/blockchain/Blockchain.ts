import Block from "../block/Block";
import Transaction from "../transaction/Transaction";

export default class Blockchain {
  chain: Block[];
  difficulty: number;

  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4; 
  }

  createGenesisBlock(): Block {
    return new Block(0, Date.now(), 1, "", 4);
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  addTransction(transaction: Transaction): string {
    const newBlock = new Block(this.chain.length, Date.now(), 1, this.getLatestBlock().hash, 1);
    newBlock.addTransaction(transaction);
    newBlock.mineBlock();
    this.chain.push(newBlock);
    return `Message added and mined successfully: ${newBlock.hash}`;
  }
}