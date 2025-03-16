import * as crypto from 'crypto';

export default class Stock {
  timestamp: Date;
  quantity: number;
  name: string;
  price: number;
  buy: boolean;

  constructor(timestamp: Date, quantity: number, name: string, price: number, buy: boolean) {
    this.timestamp = timestamp;
    this.quantity = quantity;
    this.name = name;
    this.price = price;
    this.buy = buy;
  }
}