
// union type in TypeScript allows you to define a variable that can hold 
// multiple types of values. In this example, 
// we define a union type called `Pincode` that can be either a `number` or a `string`.
type Pincode = number | string;

let pincode:Pincode  = 12345; // Valid

pincode = "ABCDE"; // Valid

console.log(pincode); // Output: ABCDE