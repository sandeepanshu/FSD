// simple function
let greet = (name: string): void => {
  let msg: string = `Hello ${name}`;
  console.log(msg);
};
greet("John");

// function with return type
let revString = (str: string): string => {
  let temp: string = "";
  for (let i: number = str.length - 1; i >= 0; i--) {
    temp += str.charAt(i);
  }
  return temp;
};
let revStr: string = revString("Good Morning");
console.log(revStr);

// function with object as a parameter
interface Mobile {
  brand: string;
  color: string;
  price: number;
}
let printMobile = (mobile: Mobile): void => {
  console.log(`Brand : ${mobile.brand}
                 Color : ${mobile.color}
                 Price : ${mobile.price}`);
};
let mobileOne: Mobile = {
  brand: "Apple",
  color: "Silver",
  price: 35000,
};
printMobile(mobileOne);
printMobile({ brand: "Lenovo", price: 25000, color: "black" });

// function with array as a parameter
let printArray = (array: string[]): void => {
  let result: string = "";
  for (let index in array) {
    result += `INDEX : ${index} VALUE : ${array[index]} \n`;
  }
  console.log(result);
};
let colors: string[] = ["white", "black", "silver", "purple"];
printArray(colors);
printArray(["html", "css", "javascript", "bootstrap"]);
