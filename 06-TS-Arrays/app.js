var technologies = [
    "html",
    "css",
    "javascript",
    "node js",
    "mongodb",
];
console.log(technologies);
// Loop an array ES6 for-of , Arrow function
// for-loop , for-in , for-of , forEach function , forEach Arrow function
// normal for-loop
var result = "";
for (var i = 0; i < technologies.length; i++) {
    result += "".concat(technologies[i].toUpperCase(), " ");
}
console.log(result);
// for-in loop
result = "";
for (var index in technologies) {
    result += "".concat(technologies[index].toUpperCase(), " ");
}
console.log(result);
// for-of loop
result = "";
for (var _i = 0, technologies_1 = technologies; _i < technologies_1.length; _i++) {
    var elem = technologies_1[_i];
    result += "".concat(elem.toUpperCase(), " ");
}
console.log(result);
// forEach Function
result = "";
technologies.forEach(function (elem) {
    result += "".concat(elem.toUpperCase(), " ");
});
console.log(result);
// forEach with Arrow
result = "";
technologies.forEach(function (elem) { return (result += "".concat(elem.toUpperCase(), " ")); });
console.log(result);
var employees = [
    {
        sno: "AA102",
        name: "Rajan",
        age: 25,
        designation: "Software Engineer",
        isActive: true,
    },
    {
        sno: "AA103",
        name: "Naveen",
        age: 32,
        designation: "Tech Lead",
        isActive: false,
    },
    {
        sno: "AA104",
        name: "Sandeep Sharma",
        age: 40,
        designation: "Project Manager",
        isActive: true,
    },
    {
        sno: "AA105",
        name: "Wilson",
        age: 45,
        designation: "Sr. Manager",
        isActive: false,
    },
];
console.log(employees);
// get Junior Employees without filter function
var juniorEmployees = [];
for (var _a = 0, employees_1 = employees; _a < employees_1.length; _a++) {
    var employee = employees_1[_a];
    if (employee.age <= 35) {
        juniorEmployees.push(employee);
    }
}
console.log(juniorEmployees);
// get Junior Employees with filter function
var jrEmployees = employees.filter(function (employee) {
    return employee.age <= 35;
});
console.log(jrEmployees);
// get Junior Employees with filter with Arrow function
jrEmployees = employees.filter(function (employee) { return employee.age <= 35; });
console.log(jrEmployees);
// get an array of only 'sno'
var snoArray = [];
for (var _b = 0, employees_2 = employees; _b < employees_2.length; _b++) {
    var employee = employees_2[_b];
    snoArray.push(employee.sno);
}
console.log(snoArray);
snoArray = employees.map(function (employee) { return employee.sno; });
console.log(snoArray);
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
