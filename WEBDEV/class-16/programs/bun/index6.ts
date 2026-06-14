interface Person {
        name: string;
        age: number;
        greet(phrase:string):void;
}

class Employee implements Person {
        name:string;
        age:number;
        private code:string|null;

        constructor(name:string, age:number,code:string|null) {
                this.name = name;
                this.age = age;
                this.code = code;
        }

        greet(phrase:string): void {
                console.log(`${phrase}, I am ${this.name} and I am ${this.age} years old.`);
        }

        setCode(code:string):void{
                this.code = code;
        }
        getCode():string|null {
                return this.code;
        }
}

let employee1: Employee = new Employee("Alice", 28, null);
employee1.greet("Hello");