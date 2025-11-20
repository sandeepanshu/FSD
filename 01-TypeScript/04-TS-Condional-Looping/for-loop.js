/*
    for(initialization; condition ; incr/decr){
        statements
    }
 */
// print numbers from  0 - 10
var result = "";
for (var i = 0; i <= 10; i++) {
    result += "".concat(i, " ");
}
console.log(result);
// print numbers from 20 - 0 diff 2
result = "";
for (var i = 20; i >= 0; i -= 2) {
    result += "".concat(i, " ");
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
result = "";
for (var i = 1; i <= endNumber; i++) {
    for (var j = 1; j <= i; j++) {
        result += " * ";
    }
    result += "\n";
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
for (var i = 1; i <= endNumber; i++) {
    for (var j = 1; j <= i; j++) {
        result += i;
    }
    result += "\n";
}
console.log(result);
