/*
    1. Arithmetic Operators + , - , / , * , %
    2. ShortHand Math += , -= , *= , /=
    3. Conditional Operators < , > , <= , >= , !==
    4. Logical Operators && , || , ^
    5. Ternary Operator : ?:
    6. Equality Operators : == , ===
 */
// 1. Arithmetic Operators + , - , / , * , %
var num1 = 10;
var num2 = 20;
console.log("Sum : ".concat(num1 + num2));
console.log("Sub : ".concat(num1 - num2));
console.log("Mul : ".concat(num1 * num2));
console.log("Div : ".concat(num1 / num2));
var givenNumber = 17;
if (givenNumber % 2 === 0) {
    console.log("".concat(givenNumber, " is Even number"));
}
else {
    console.log("".concat(givenNumber, " is Odd number"));
}
// 2. ShortHand Math += , -= , *= , /=
var a = 10;
var b = 20;
var add = 30;
//add = add + (a * b); // add += (a * b)
add += a * b;
console.log("Add : ".concat(add));
// 3. Conditional Operators < , > , <= , >= , !==
var marks = 25;
var result = "";
if (marks >= 35) {
    result = "You Cleared the Exam";
}
else {
    result = "You Failed the Exam";
}
console.log(result);
//  4. Logical Operators && , || , ^
// && -> T && T -> T
// || -> F || F -> F
// ^ -> T ^ T / F ^ F -> F
var inRelation = true;
var parentsAgreed = false;
if (inRelation && parentsAgreed) {
    console.log("Get Marry Soon!");
}
else {
    console.log("Wait! until your parents Agreed");
}
// 5. Ternary Operator : ?:
// (condition) ? true stmt : false stmt;
marks = 25;
result = "";
marks >= 35
    ? (result = "You Cleared the Exam")
    : (result = "You Failed the Exam");
console.log(result);
// 6. Equality Operators : == , ===
// == -> automatic Type-Conversion + Comparision
// === -> comparision
var x = "abc";
var y = "ABC";
if (x === y) {
    console.log("Both are equal");
}
else {
    console.log("Both are NOT Equal");
}
