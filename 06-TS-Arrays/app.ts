let technologies: string[] = [
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
let result: string = "";
for (let i: number = 0; i < technologies.length; i++) {
  result += `${technologies[i].toUpperCase()} `;
}
console.log(result);

// for-in loop
result = "";
for (let index in technologies) {
  result += `${technologies[index].toUpperCase()} `;
}
console.log(result);

// for-of loop
result = "";
for (let elem of technologies) {
  result += `${elem.toUpperCase()} `;
}
console.log(result);

// forEach Function
result = "";
technologies.forEach(function (elem) {
  result += `${elem.toUpperCase()} `;
});
console.log(result);

// forEach with Arrow
result = "";
technologies.forEach((elem) => (result += `${elem.toUpperCase()} `));
console.log(result);

// Object Array
interface Employee {
  sno: string;
  name: string;
  age: number;
  designation: string;
  isActive: boolean;
}
let employees: Employee[] = [
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
let juniorEmployees: Employee[] = [] as Employee[];
for (let employee of employees) {
  if (employee.age <= 35) {
    juniorEmployees.push(employee);
  }
}
console.log(juniorEmployees);

// get Junior Employees with filter function
let jrEmployees: Employee[] = employees.filter(function (employee) {
  return employee.age <= 35;
});
console.log(jrEmployees);

// get Junior Employees with filter with Arrow function
jrEmployees = employees.filter((employee) => employee.age <= 35);
console.log(jrEmployees);

// get an array of only 'sno'
let snoArray: string[] = [] as string[];
for (let employee of employees) {
  snoArray.push(employee.sno);
}
console.log(snoArray);

snoArray = employees.map((employee) => employee.sno);
console.log(snoArray);

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
