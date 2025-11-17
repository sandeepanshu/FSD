"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var ShapeFactory_1 = require("./ShapeFactory");
var App = /** @class */ (function () {
    function App() {
    }
    App.main = function () {
        // get the shape factory
        var factory = new ShapeFactory_1.ShapeFactory();
        var shapeOne = factory.getShape("CIRCLE");
        shapeOne.draw(); // circle
        var shapeTwo = factory.getShape("SQUARE");
        shapeTwo.draw(); // square
        var shapeThree = factory.getShape("RECTANGLE");
        shapeThree.draw();
    };
    return App;
}());
exports.App = App;
App.main();
