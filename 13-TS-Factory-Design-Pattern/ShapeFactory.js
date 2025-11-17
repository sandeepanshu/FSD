"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShapeFactory = void 0;
var Circle_1 = require("./Circle");
var Square_1 = require("./Square");
var Rectangle_1 = require("./Rectangle");
var ShapeFactory = /** @class */ (function () {
    function ShapeFactory() {
    }
    ShapeFactory.prototype.getShape = function (shapeType) {
        switch (shapeType) {
            case "CIRCLE":
                return new Circle_1.Circle();
            case "SQUARE":
                return new Square_1.Square();
            case "RECTANGLE":
                return new Rectangle_1.Rectangle();
            default:
                return null;
        }
    };
    return ShapeFactory;
}());
exports.ShapeFactory = ShapeFactory;
