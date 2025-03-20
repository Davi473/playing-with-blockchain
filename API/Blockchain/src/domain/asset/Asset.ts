import Category from '../vo/Category';
import Quantity from '../vo/Quantity';
import Price from '../vo/Price';

export default class Asset {
  category: Category;
  quantity: Quantity;
  price: Price;
  time: number;
  buy: boolean;

  constructor(
    time: number, readonly name: string, 
    category: string, quantity: number,  
    price: number, buy: boolean
  ) {
    this.time = time;
    this.category = new Category(category);
    this.quantity = new Quantity(quantity);
    this.price = new Price(price);
    this.buy = buy;
  }

  public getBuy(): boolean {
    return this.buy;
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