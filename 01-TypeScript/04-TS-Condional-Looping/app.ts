/*
    conditional & Looping
    1. if-else, switch
    2. for , while , do-while
 */

// if-else
let currentTime: number = 10;
let result: string = "";
if (currentTime >= 0 && currentTime <= 12) {
  result = "Good Morning";
} else if (currentTime > 12 && currentTime <= 17) {
  result = "Good Afternoon";
} else if (currentTime > 17 && currentTime <= 23) {
  result = "Good Evening";
} else {
  result = "Enter a Proper Time";
}
console.log(result);

// Switch Statement
let day: number = new Date().getDay();
let today: string = "";
switch (day) {
  case 0:
    today = "SUNDAY";
    break;
  case 1:
    today = "MONDAY";
    break;
  case 2:
    today = "TUESDAY";
    break;
  case 3:
    today = "WEDNESDAY";
    break;
  case 4:
    today = "THURSDAY";
    break;
  case 5:
    today = "FRIDAY";
    break;
  case 6:
    today = "SATURDAY";
    break;
  default:
    today = "Invalid";
    break;
}
console.log(`today is : ${today}`);
