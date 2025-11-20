// string , number , boolean , null , undefined , array , object , enum , void , any
// string
var employeeName = "John";
console.log("Employee Name : ".concat(employeeName));
// number
var employeeAge = 40;
console.log("Employee Age : ".concat(employeeAge));
// // boolean
var isManager = true;
console.log("Is Manager : ".concat(isManager));
// // null
var test = null;
console.log("test : ".concat(null));
// // undefined
var abc = undefined;
console.log("abc : ".concat(abc));
// // array
var colors = ["white", "black", "silver", "blue"];
console.log(colors);
// object
var mobile = {
    brand: "Apple",
    color: "silver",
    price: 35000,
};
console.log(mobile);
// enum
var Month;
(function (Month) {
    Month["JAN"] = "JANUARY";
    Month["FEB"] = "FEBRUARY";
    Month["MAR"] = "MARCH";
})(Month || (Month = {}));
console.log(Month.JAN);
// void
var greet = function (name) {
    var msg = "Hello ".concat(name);
    console.log(msg);
};
greet("Sandeep");
// any
var a = "test";
a = 10;
a = true;
a = {};
a = [];
console.log(a);
