/*
    initialization;
    while(condition){
        statements;
        incr / decr/ (always last line)
    }
 */
// print numbers from  0 - 10
var i = 0;
var result = '';
while (i <= 10) {
    result += "".concat(i, " ");
    i++;
}
console.log(result);
// print numbers from 20 - 0 diff 2
i = 20;
result = '';
while (i >= 0) {
    result += "".concat(i, " ");
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
var endNumber = 5;
result = '';
i = 1;
while (i <= endNumber) {
    var j = 1;
    while (j <= i) {
        result += " * ";
        j++;
    }
    result += "\n";
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
while (i <= endNumber) {
    var j = 1;
    while (j <= i) {
        result += " ".concat(i, " ");
        j++;
    }
    result += "\n";
    i++;
}
console.log(result);
