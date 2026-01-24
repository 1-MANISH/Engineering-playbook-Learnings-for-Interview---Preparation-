/*

Objects 

Object creation
const person = {
        name: 'John',
        age: 30,
        address: '123 Main St'
};

Accessing object properties
console.log(person.name);
console.log(person['age']);

Modifying object properties
person.age = 31;
person['address'] = '456 Elm St';

Adding new properties
person.email = '6bPfM@example.com';

obj.hasOwnProperty()
if (person.hasOwnProperty('email')) {
        console.log('Email exists');
} else {
        console.log('Email does not exist');
}

Deleting properties
delete person.address;

Iterating over object properties
for (const key in person) {
        console.log(person[key]);
}


const keys = Object.keys(person);
const values = Object.values(person);
const entries = Object.entries(person);

const clonedPerson = Object.assign({}, person);

Shallow vs Deep Copy
Shallow Copy:
 -using Object.assign() or spread operator {...obj}
 -copies only the first level of properties
 -nested objects are still referenced

Deep Copy:
 -using JSON.stringify() and JSON.parse()
 -creates a new object with independent properties
 -structuredClone() method (modern browsers)

*/

const obj1 = {
    a: 1,
    b: 2,
    c: 3
};

const obj2 = {
    b: 4,
    c: 5,
    d: 6
};

console.log(Object.keys(obj1));
console.log(Object.values(obj1));
console.log(Object.entries(obj1));

const mergedObj = Object.assign({}, obj1, obj2);
console.log(mergedObj);

const obj3  = Object.assign({}, obj1); // clone obj1 to obj3 as a new object
console.log(obj3);
obj3.a = 10;
console.log(obj1);
console.log(obj3);

// shallow copy vs deep copy

// shallow copy
const original = {
    x: 1,
    y: {
        z: 2
    }
};

const shallowCopy = Object.assign({}, original);
shallowCopy.y.z = 20;
console.log(original);
console.log(shallowCopy);

// deep copy
const deepCopy = JSON.parse(JSON.stringify(original));
deepCopy.y.z = 30;
console.log(original);
console.log(deepCopy);

// m2
const deepCopy2 = structuredClone(original);
deepCopy2.y.z = 40;
console.log(original);
console.log(deepCopy2);