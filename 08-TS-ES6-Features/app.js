/*
    1. Template Strings (`)
    2. Optional Parameters
    3. let, const
    4. for-of loop
    5. destructuring
    6. Spread Operator
    7. Arrow Function
 */
// 1. Template Strings (`)
var employeeName = "John";
var employeeAge = 45;
console.log("NAME : " + employeeName + " AGE : " + employeeAge);
console.log("NAME : ".concat(employeeName, " AGE : ").concat(employeeAge));
// 2. Optional Parameters
var printNumbers = function (start, end) {
    if (end === void 0) { end = 50; }
    var result = "";
    for (var i = start; i <= end; i++) {
        result += "".concat(i, " ");
    }
    console.log(result);
};
printNumbers(25);
