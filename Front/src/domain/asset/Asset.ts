import Category from '../vo/Category';
import Quantity from '../vo/Quantity';
import Price from '../vo/Price';

export default class Asset {
  private name: string;
  private category: Category;
  private quantity: Quantity;
  private price: Price;
  private timestamp: string;

  constructor(
    timestamp: Date, name: string, 
    category: string, quantity: number,  price: number, readonly buy: boolean
  ) {
    this.timestamp = timestamp.toISOString();
    this.name = name;
    this.category = new Category(category);
    this.quantity = new Quantity(quantity);
    this.price = new Price(price);
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

  public getTime(): string {
    return this.timestamp;
  }

  public getName(): string {
    return this.name;
  }

  public getBuy(): string {
    return this.buy ? "Buy" : "Sell";
  }

  public update(price: number, quantity: number): void {
    const amountTotal = price * quantity;
    const amount = this.getPrice() * this.getQuantity();
    this.quantity = new Quantity((quantity + this.getQuantity()));
    this.price = new Price((amount + amountTotal) / this.getQuantity());
  }
}