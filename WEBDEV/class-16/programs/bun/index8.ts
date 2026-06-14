type Person =  {
        name:string,
        age:number,
        greet(phrase:string):void
}

let user1: Person = {
        name: "Alice",
        age: 28,
        greet(phrase:string): void {
                console.log(`${phrase}, I am ${this.name} and I am ${this.age} years old.`);
        }
}

console.log(user1.name); // Output: Alice
console.log(user1.age);  // Output: 28

user1.greet("Hello"); // Output: Hello, I am Alice and I am 28 years old.