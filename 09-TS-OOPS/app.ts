interface IMobile {
  brand: string;
  price: number;
  color: string;
}
/*let mobile:Mobile = {
    brand : 'Apple',
    color : 'Silver',
    price : 35000
};
console.log(mobile);
console.log(mobile.brand);*/
/*
    private : only access inside the class
    protected : inside the class + its child class only
    public : access every where
 */
class Mobile {
  // properties
  private brand: string;
  private price: number;
  private color: string;

  // constructor
  constructor(brand: string, color: string, price: number) {
    this.brand = brand;
    this.color = color;
    this.price = price;
  }

  // getter - setter
  public getBrand(): string {
    return this.brand;
  }

  public setBrand(brand: string): void {
    this.brand = brand;
  }

  public getPrice(): number {
    return this.price;
  }

  public setPrice(price: number): void {
    this.price = price;
  }

  public getColor(): string {
    return this.color;
  }

  public setColor(color: string): void {
    this.color = color;
  }

  // instance method
  public getMobileSpec(): void {
    let spec: string = `Brand : ${this.getBrand()}
                           Color : ${this.getColor()}
                           Price : ${this.getPrice()}`;
    console.log(spec);
  }

  // static method
  public static getTime(): void {
    console.log(new Date().toLocaleTimeString());
  }
}
let mobile = new Mobile("Apple", "Silver", 35000);
console.log(mobile);
// access the props of a class
console.log(mobile.getBrand());
console.log(mobile.getPrice());
console.log(mobile.getColor());

// set the props values
mobile.setPrice(45000);
console.log(mobile.getPrice());

// call instance method
mobile.getMobileSpec();

// call static method
Mobile.getTime();
