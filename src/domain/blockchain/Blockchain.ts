import Block from "../block/Block";
import Stock from "../stock/Stock";

export default class Blockchain {
  chain: Block[];
  difficulty: number;

  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4; 
  }

  createGenesisBlock(): Block {
    return new Block(0, Date.now(), "", "0");
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  addStock(stock: Stock): string {
    const newBlock = new Block(this.chain.length, Date.now(), stock, this.getLatestBlock().hash);
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
    return `Message added and mined successfully: ${stock}`;
  }
}