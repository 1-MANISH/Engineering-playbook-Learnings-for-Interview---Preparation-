/*
Classes
        Class is a blueprint for creating objects with
         predefined properties and methods.
        Classes in JavaScript are syntactical sugar over 
        the existing prototype-based inheritance.
        They provide a cleaner and more intuitive way to 
        create objects and handle inheritance.

        // Public and Private Fields
        In JavaScript, classes can have public and private fields.
        Public fields are accessible from outside the class.
        Private fields are not accessible from outside the class.

        example
        class Person {
                // Public field
                name;

                // Private field
                #age;

                constructor(name, age) {
                        this.name = name;
                        this.#age = age;
                }
                getAge() {
                        return this.#age;
                }

                setAge(newAge) {
                        this.#age = newAge;
                }
                static species() {
                        return "Homo sapiens";
                }
        }

        // object of Person class
        const person = new Person("Alice", 30);
        console.log(person.name); // Output: Alice
        console.log(person.getAge()); // Output: 30
        person.setAge(31);
        console.log(person.getAge()); // Output: 31

        // static Methods
        Static methods are called on the class itself, not
        on instances of the class.
        They are often used for utility functions that are
        related to the class but do not require access to 
        instance-specific data.

        Static means associated with the class rather than
        instances of the class.

        we can access static methods without creating an instance of the class

*/

class Animal{

        #bark
        constructor(name,species){
                this.name = name;
                this.species = species;
                this.#bark="Barking";
        }
        describe(){
                return `${this.name} is a ${this.species}`;
        }
        setBarkSound(sound){
                this.#bark=sound;
        }
        printBarkSound(){       
                console.log(this.#bark);
        }

        static kingdom(){
                return "Animalia";
        }
}

class Dog extends Animal{
        constructor(name){
                super(name,"Dog"); 
                // call the parent constructor with species set to "Dog"
        }
}

const dog = new Animal("Buddy","Dog");
console.log(dog.describe()); // Output: Buddy is a Dog

const cat = new Animal("Whiskers","Cat");
console.log(cat.describe()); // Output: Whiskers is a Cat

const myDog = new Dog("Rex");
// const myDog = new Dog("Rex","Dog");
console.log(myDog.describe()); // Output: Rex is a Dog

dog.setBarkSound("Woof Woof");
// console.log(dog.#bark); // Error: Private field '#bark' must be declared in an enclosing class
dog.printBarkSound(); // Output: Woof Woof

console.log(Animal.kingdom()); // Output: Animalia
console.log(Dog.kingdom()); // Output: Animalia
// console.log(dog.kingdom()); // Output: undefined