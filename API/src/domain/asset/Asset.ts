import * as crypto from 'crypto';

export default class Asset {
  id: string;
  timestamp: Date;
  name: string;
  category: string;
  quantity: number;
  price: number;
  buy: boolean;

  constructor(id: string, timestamp: Date, name: string, category: string, quantity: number,  price: number, buy: boolean) {
    this.id = id;
    this.timestamp = timestamp;
    this.name = name;
    this.category = category;
    this.quantity = quantity;
    this.price = price;
    this.buy = buy;
  }

  static create(timestamp: Date, name: string, category: string, quantity: number, price: number, buy: boolean) {
    const id = crypto.randomUUID();
    return new Asset(id, timestamp, name, category, quantity, price, buy);
  }
}