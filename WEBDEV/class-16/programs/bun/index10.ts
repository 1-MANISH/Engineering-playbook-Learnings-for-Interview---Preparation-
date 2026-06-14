type Employee  = {
        name:string,
        age:number,
        code:string|null,
        greet(phrase:string):void
}

type Manager = {
        name:string,
        age:number,
        code:string|null,
        department:string
}


type SuperManager = Employee & Manager;

const superManager:SuperManager = {
        name:"John Doe",
        age:30,
        code:"1234",
        department:"Sales",
        greet(phrase:string): void {
                console.log(`${phrase}, I am ${this.name} .`);
        }
}
console.log(superManager.name); // Output: John Doe
console.log(superManager.age);

superManager.greet("Hello"); // Output: Hello, I am John Doe .