// string , number , boolean , null , undefined , array , object , enum , void , any

// string
let employeeName: string = "John";
console.log(`Employee Name : ${employeeName}`);

// number
let employeeAge: number = 40;
console.log(`Employee Age : ${employeeAge}`);

// // boolean
let isManager: boolean = true;
console.log(`Is Manager : ${isManager}`);

// // null
let test: null = null;
console.log(`test : ${null}`);

// // undefined
let abc: undefined = undefined;
console.log(`abc : ${abc}`);

// // array
let colors: string[] = ["white", "black", "silver", "blue"];
console.log(colors);

// object
let mobile: Object = {
  brand: "Apple",
  color: "silver",
  price: 35000,
};
console.log(mobile);

// enum
enum Month {
  JAN = "JANUARY",
  FEB = "FEBRUARY",
  MAR = "MARCH",
}
console.log(Month.JAN);

// void
let greet = function (name: string): void {
  let msg: string = `Hello ${name}`;
  console.log(msg);
};
greet("Sandeep");

// any
let a: any = "test";
a = 10;
a = true;
a = {};
a = [];

console.log(a);
