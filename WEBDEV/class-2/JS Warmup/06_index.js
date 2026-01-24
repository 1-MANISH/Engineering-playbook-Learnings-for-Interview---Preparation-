/*

JSON - JavaScript Object Notation
        is a lightweight data-interchange format that is easy 
        for humans to read and write, and easy for 
        machines to parse and generate. It is commonly 
        used for transmitting data in web applications 
        between a server and a client.

        const object = {
            key: "value",
            key2: "value2"
        }
        const jsonString = JSON.stringify(object);
        console.log(jsonString); // '{"key":"value","key2":"value2"}'

        const parsedObject = JSON.parse(jsonString);
        console.log(parsedObject); // { key: 'value', key2: 'value2' }
*/

const user = {
    name: "Alice",
    age: 30,
    city: "New York"
  };

        // Convert the user object to a JSON string     
const jsonString = JSON.stringify(user);
console.log("JSON String:", jsonString);
        // Convert the JSON string back to a JavaScript object
const parsedUser = JSON.parse(jsonString);
console.log("Parsed Object:", parsedUser);