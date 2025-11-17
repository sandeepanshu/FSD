import { ShapeFactory } from "./ShapeFactory";

export class App {
  public static main(): void {
    // get the shape factory
    let factory = new ShapeFactory();

    let shapeOne = factory.getShape("CIRCLE");
    shapeOne.draw(); // circle

    let shapeTwo = factory.getShape("SQUARE");
    shapeTwo.draw(); // square

    let shapeThree = factory.getShape("RECTANGLE");
    shapeThree.draw();
  }
}
App.main();
