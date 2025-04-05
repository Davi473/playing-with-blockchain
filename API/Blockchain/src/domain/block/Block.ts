import Transaction from '../transaction/Transaction';
import * as crypto from 'crypto';

export default class Block {
  hash: string;
  height: number;
  version: number;
  previsionBlockHash: string;
  time: number;
  bits: number;
  nonce: number;
  transaction: Transaction[];

  constructor(height: number, time: number, version: number, previsionBlockHash: string, bits: number) {
    this.height = height;
    this.time = time;
    this.version = version;
    this.previsionBlockHash = previsionBlockHash;
    this.bits = bits;
    this.nonce = 0;
    this.transaction = [];
    this.hash = this.calculateHash();
  }

  calculateHash(): string {
    return crypto.createHash('sha256')
      .update(`${this.height}${this.version}${this.previsionBlockHash}${this.time}${this.bits}${this.nonce}${this.transaction}`)
      .digest('hex');
  }

  addTransaction(transaction: Transaction): void {
    this.transaction.push(transaction);
  }

  mineBlock(): void {
    while (this.hash.substring(0, this.bits) !== "0".repeat(this.bits)) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}