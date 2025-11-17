// simple function
var greet = function (name) {
    var msg = "Hello " + name;
    console.log(msg);
};
greet('John');
// function with return type
var revString = function (str) {
    var temp = '';
    for (var i = str.length - 1; i >= 0; i--) {
        temp += str.charAt(i);
    }
    return temp;
};
var revStr = revString('Good Morning');
console.log(revStr);
var printMobile = function (mobile) {
    console.log("Brand : " + mobile.brand + "\n                 Color : " + mobile.color + "\n                 Price : " + mobile.price);
};
var mobileOne = {
    brand: 'Apple',
    color: 'Silver',
    price: 35000
};
printMobile(mobileOne);
printMobile({ brand: 'Lenovo', price: 25000, color: 'black' });
// function with array as a parameter
var printArray = function (array) {
    var result = '';
    for (var index in array) {
        result += "INDEX : " + index + " VALUE : " + array[index] + " \n";
    }
    console.log(result);
};
var colors = ['white', 'black', 'silver', 'purple'];
printArray(colors);
printArray(['html', 'css', 'javascript', 'bootstrap']);
