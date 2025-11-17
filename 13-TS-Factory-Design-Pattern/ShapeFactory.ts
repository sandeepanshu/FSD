import { Shape } from "./Shape";
import { Circle } from "./Circle";
import { Square } from "./Square";
import { Rectangle } from "./Rectangle";

export class ShapeFactory {
  constructor() {}

  public getShape(shapeType: string): Shape {
    switch (shapeType) {
      case "CIRCLE":
        return new Circle();
      case "SQUARE":
        return new Square();
      case "RECTANGLE":
        return new Rectangle();
      default:
        return null;
    }
  }
}
