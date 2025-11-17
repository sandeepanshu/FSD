/*
    1. Template Strings (`)
    2. Optional Parameters
    3. let , const
    4. for-of loop
    5. destructuring
    6. Spread Operator
    7. Arrow Function
 */

// 1. Template Strings (`)
let employeeName: string = "John";
let employeeAge: number = 45;
console.log("NAME : " + employeeName + " AGE : " + employeeAge);
console.log(`NAME : ${employeeName} AGE : ${employeeAge}`);

// 2. Optional Parameters
let printNumbers = (start: number, end: number = 50): void => {
  let result: string = "";
  for (let i: number = start; i <= end; i++) {
    result += `${i} `;
  }
  console.log(result);
};
printNumbers(25);
