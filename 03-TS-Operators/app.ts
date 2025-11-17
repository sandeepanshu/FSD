/*
    1. Arithmetic Operators + , - , / , * , %
    2. ShortHand Math += , -= , *= , /=
    3. Conditional Operators < , > , <= , >= , !==
    4. Logical Operators && , || , ^
    5. Ternary Operator : ?:
    6. Equality Operators : == , ===
 */

// 1. Arithmetic Operators + , - , / , * , %
let num1: number = 10;
let num2: number = 20;
console.log(`Sum : ${num1 + num2}`);
console.log(`Sub : ${num1 - num2}`);
console.log(`Mul : ${num1 * num2}`);
console.log(`Div : ${num1 / num2}`);

let givenNumber: number = 17;
if (givenNumber % 2 === 0) {
  console.log(`${givenNumber} is Even number`);
} else {
  console.log(`${givenNumber} is Odd number`);
}

// 2. ShortHand Math += , -= , *= , /=
let a: number = 10;
let b: number = 20;
let add: number = 30;
//add = add + (a * b); // add += (a * b)
add += a * b;
console.log(`Add : ${add}`);

// 3. Conditional Operators < , > , <= , >= , !==
let marks: number = 25;
let result: string = "";
if (marks >= 35) {
  result = "You Cleared the Exam";
} else {
  result = "You Failed the Exam";
}
console.log(result);

//  4. Logical Operators && , || , ^
// && -> T && T -> T
// || -> F || F -> F
// ^ -> T ^ T / F ^ F -> F
let inRelation: boolean = true;
let parentsAgreed: boolean = false;
if (inRelation && parentsAgreed) {
  console.log(`Get Marry Soon!`);
} else {
  console.log(`Wait! until your parents Agreed`);
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
let x: string = "abc";
let y: string = "ABC";
if (x === y) {
  console.log(`Both are equal`);
} else {
  console.log("Both are NOT Equal");
}
