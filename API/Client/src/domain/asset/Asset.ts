import * as crypto from 'crypto';
import Category from '../vo/Category';
import Quantity from '../vo/Quantity';
import Price from '../vo/Price';

export default class Asset {
  category: Category;
  quantity: Quantity;
  price: Price;
  timestamp: number;

  constructor(
    readonly id: string, timestamp: Date, readonly name: string, 
    category: string, quantity: number,  price: number, readonly buy: boolean
  ) {
    this.timestamp = timestamp.getTime();
    this.category = new Category(category);
    this.quantity = new Quantity(quantity);
    this.price = new Price(price);
  }

  static create(timestamp: Date, name: string, category: string, quantity: number, price: number, buy: boolean) {
    const id = crypto.randomUUID();
    return new Asset(id, timestamp, name, category, quantity, price, buy);
  }

  public getCategory(): string {
    return this.category.getValue();
  }

  public getQuantity(): number {
    return this.quantity.getValue();
  }

  public getPrice(): number {
    return this.price.getValue();
  }
}