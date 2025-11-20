class BasicCalc {
  public result: number;

  constructor() {
    this.result = 0;
  }

  // sum
  public sum(a: number, b: number): void {
    this.result = a + b;
    console.log(this.result);
  }

  // sub
  public sub(a: number, b: number): void {
    this.result = a - b;
    console.log(this.result);
  }
}

/*let basicCalc = new BasicCalc();
basicCalc.sum(10,20);
basicCalc.sub(10,20);*/
// super - sub , parent - child , base - derived
class AdvCalc extends BasicCalc {
  constructor() {
    super(); // calling parent class constructor
  }

  // sum (over ridding - extend)
  public sum(a: number, b: number): void {
    this.result = a + a + b + b;
    console.log(this.result);
  }

  // mul
  public mul(a: number, b: number): void {
    this.result = a * b;
    console.log(this.result);
  }
}
// child
let advCalc = new AdvCalc();
advCalc.sum(10, 20); // 60
advCalc.mul(10, 20);

// parent
let basicCalc = new BasicCalc();
