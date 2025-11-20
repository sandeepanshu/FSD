var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var mobile = {
    brand: "Apple",
    color: "Silver",
    price: 35000,
};
console.log(mobile);
console.log(mobile.brand);
var student = {
    name: "Kabir Singh",
    age: 24,
    course: "MBBS",
    address: {
        street: "Road No 10, New Delhi",
        city: "Delhi",
        state: "DL",
        country: "India",
    },
};
console.log("STREET : ".concat(student.address.street, "\n             CITY : ").concat(student.address.city, " \n             STATE : ").concat(student.address.state, " \n             COUNTRY : ").concat(student.address.country));
// ES6 Feature :  Destructuring
var _a = student.address, street = _a.street, city = _a.city, state = _a.state, country = _a.country;
console.log("STREET : ".concat(street, "\n             CITY : ").concat(city, " \n             STATE : ").concat(state, " \n             COUNTRY : ").concat(country));
var product = {
    sno: "AA102",
    name: "Mi Watch",
    color: "black",
    price: 1520,
    qty: 20,
};
var newProduct = __assign(__assign({}, product), { sales: 1400 });
console.log(newProduct);
