/*
    initialization;
    do{
        statements;
        incr/decr; (last  stmt)
    }
    while(condition);
 */
// print numbers from  0 - 10
var i = 0;
var result = "";
do {
    result += "".concat(i, " ");
    i++;
} while (i <= 10);
console.log(result);
// print numbers from 20 - 0 diff 2
i = 20;
result = "";
do {
    result += "".concat(i, " ");
    i -= 2;
} while (i >= 0);
console.log(result);
// Print * in triangle
/*
 *
 * *
 * * *
 * * * *
 * * * * *
 */
var endNumber = 5;
result = "";
i = 1;
do {
    var j = 1;
    do {
        result += " * ";
        j++;
    } while (j <= i);
    result += "\n";
    i++;
} while (i <= endNumber);
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
result = "";
i = 1;
do {
    var j = 1;
    do {
        result += " ".concat(i, " ");
        j++;
    } while (j <= i);
    result += "\n";
    i++;
} while (i <= endNumber);
console.log(result);
