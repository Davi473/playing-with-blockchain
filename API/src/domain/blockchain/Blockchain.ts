import Block from "../block/Block";
import Stock from "../stock/Stock";
import * as fs from 'fs';
import * as path from 'path';

export default class Blockchain {
  chain: Block[];
  difficulty: number;

  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4; 
  }

  loadChain(): Block[] {
    try {
      const data = fs.readFileSync(`${__dirname}/../../../database/blocks.json`, 'utf-8');
      const chainData = JSON.parse(data);
      return chainData.map((block: any) => new Block(block.index, block.timestamp, block.message, block.previousHash));
    } catch (error) {
      console.log('No previous blockchain found, creating a new one.');
      return [this.createGenesisBlock()];
    }
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
    this.saveChain();
    return `Message added and mined successfully: ${newBlock.stocks}`;
  }

  saveChain(): void {
    const chainData = JSON.stringify(this.chain, null, 2);
    fs.writeFileSync(`${__dirname}/../../../database/blocks.json`, chainData, 'utf-8');
  }
}