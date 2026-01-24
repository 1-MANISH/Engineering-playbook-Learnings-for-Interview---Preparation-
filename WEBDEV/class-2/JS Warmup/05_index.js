
/*
Date
        const currentDate = new Date()
        Creates a new date object with the current date and time.

        currentDate.getFullYear() - Returns the year (4 digits for 4-digit years)
        currentDate.getMonth() - Returns the month (0-11) - January is 0, February is 1, and so on.
        currentDate.getDate() - Returns the day of the month (1-31)
        currentDate.getHours() - Returns the hour (0-23)
        currentDate.getMinutes() - Returns the minutes (0-59)
        currentDate.getSeconds() - Returns the seconds (0-59)

        currrentDate.toDateString() - Returns the date as a string
        currrentDate.toTimeString() - Returns the time as a string
        currrentDate.toLocaleDateString() - Returns the date as a string, using locale conventions
        currrentDate.toLocaleTimeString() - Returns the time as a string, using locale conventions
*/

const currentDate = new Date();

console.log("Current Date and Time:", currentDate);
console.log("Year:", currentDate.getFullYear());
console.log("Month (0-11):", currentDate.getMonth());
console.log("Day of the Month:", currentDate.getDate());
console.log("Hours (0-23):", currentDate.getHours());
console.log("Minutes (0-59):", currentDate.getMinutes());
console.log("Seconds (0-59):", currentDate.getSeconds());

console.log("Date as String:", currentDate.toDateString());
console.log("Time as String:", currentDate.toTimeString());
console.log("Locale Date String:", currentDate.toLocaleDateString());
console.log("Locale Time String:", currentDate.toLocaleTimeString());

console.log(currentDate.getTime()); // Returns the number of milliseconds since January 1, 1970
//1970 milliseconds epoch time = 0
// use case


let timeStart = new Date().getTime();
function calculateSum(n){
        let sum = 0;
        for(let i = 0; i <= n; i++){
                sum += i;
        }
        return sum
}
calculateSum(100090); // function call

let timeEnd  = new Date().getTime();

console.log("Time taken to execute calculateSum function:",( timeEnd - timeStart)/1000, "seconds");