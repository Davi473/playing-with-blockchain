import * as crypto from 'crypto';
import Stock from '../stock/Stock';

export default class Block {
  index: number;
  timestamp: number;
  stocks: Stock | "";
  previousHash: string;
  hash: string;
  nonce: number;

  constructor(index: number, timestamp: number, stocks: Stock | "", previousHash: string = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.stocks = stocks;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash(): string {
    return crypto.createHash('sha256').update(`${this.index}${this.timestamp}${this.stocks}${this.previousHash}${this.nonce}`).digest('hex');
  }

  mineBlock(difficulty: number): void {
    while (this.hash.substring(0, difficulty) !== "0".repeat(difficulty)) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log(`Block mined: ${this.hash}`);
  }
}