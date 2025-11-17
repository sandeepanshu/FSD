/*
    for(initialization; condition ; incr/decr){
        statements
    }
 */
// print numbers from  0 - 10
let result: string = "";
for (let i: number = 0; i <= 10; i++) {
  result += `${i} `;
}
console.log(result);

// print numbers from 20 - 0 diff 2
result = "";
for (let i: number = 20; i >= 0; i -= 2) {
  result += `${i} `;
}
console.log(result);

// Print * in triangle
/*
 *
 * *
 * * *
 * * * *
 * * * * *
 */
let endNumber: number = 5;
result = "";
for (let i: number = 1; i <= endNumber; i++) {
  for (let j: number = 1; j <= i; j++) {
    result += ` * `;
  }
  result += `\n`;
}
console.log(result);

// Print * in triangle
/*
 *
 * *
 * * *
 * * * *
 * * * * *
 */
endNumber = 5;
result = "";
for (let i: number = 1; i <= endNumber; i++) {
  for (let j: number = 1; j <= i; j++) {
    result += i;
  }
  result += `\n`;
}
console.log(result);
