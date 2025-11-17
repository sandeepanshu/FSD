/*
    initialization;
    while(condition){
        statements;
        incr / decr/ (always last line)
    }
 */
// print numbers from  0 - 10
let i:number = 0;
let result:string = '';
while(i <= 10){
    result += `${i} `
    i++;
}
console.log(result);

// print numbers from 20 - 0 diff 2
i = 20;
result = '';
while(i >= 0){
    result += `${i} `
    i -= 2;
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
let endNumber:number = 5;
result = '';
i = 1;
while(i <= endNumber){
    let j:number = 1;
    while(j <= i){
        result += ` * `;
        j++;
    }
    result += `\n`;
    i++;
}
console.log(result);

// Print * in triangle
/*
    1
    22
    333
    4444
    55555
 */
endNumber = 5;
result = '';
i = 1;
while(i <= endNumber){
    let j:number = 1;
    while(j <= i){
        result += ` ${i} `;
        j++;
    }
    result += `\n`;
    i++;
}
console.log(result);
