var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BasicCalc = /** @class */ (function () {
    function BasicCalc() {
        this.result = 0;
    }
    // sum
    BasicCalc.prototype.sum = function (a, b) {
        this.result = a + b;
        console.log(this.result);
    };
    // sub
    BasicCalc.prototype.sub = function (a, b) {
        this.result = a - b;
        console.log(this.result);
    };
    return BasicCalc;
}());
/*let basicCalc = new BasicCalc();
basicCalc.sum(10,20);
basicCalc.sub(10,20);*/
// super - sub , parent - child , base - derived
var AdvCalc = /** @class */ (function (_super) {
    __extends(AdvCalc, _super);
    function AdvCalc() {
        return _super.call(this) || this; // calling parent class constructor
    }
    // sum (over ridding - extend)
    AdvCalc.prototype.sum = function (a, b) {
        this.result = a + a + b + b;
        console.log(this.result);
    };
    // mul
    AdvCalc.prototype.mul = function (a, b) {
        this.result = a * b;
        console.log(this.result);
    };
    return AdvCalc;
}(BasicCalc));
// child
var advCalc = new AdvCalc();
advCalc.sum(10, 20); // 60
advCalc.mul(10, 20);
// parent
var basicCalc = new BasicCalc();
