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
var Mobile = /** @class */ (function () {
    // constructor
    function Mobile(brand, color, price) {
        this.brand = brand;
        this.color = color;
        this.price = price;
    }
    // getter - setter
    Mobile.prototype.getBrand = function () {
        return this.brand;
    };
    Mobile.prototype.setBrand = function (brand) {
        this.brand = brand;
    };
    Mobile.prototype.getPrice = function () {
        return this.price;
    };
    Mobile.prototype.setPrice = function (price) {
        this.price = price;
    };
    Mobile.prototype.getColor = function () {
        return this.color;
    };
    Mobile.prototype.setColor = function (color) {
        this.color = color;
    };
    // instance method
    Mobile.prototype.getMobileSpec = function () {
        var spec = "Brand : ".concat(this.getBrand(), "\n                           Color : ").concat(this.getColor(), "\n                           Price : ").concat(this.getPrice());
        console.log(spec);
    };
    // static method
    Mobile.getTime = function () {
        console.log(new Date().toLocaleTimeString());
    };
    return Mobile;
}());
var mobile = new Mobile("Apple", "Silver", 35000);
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
