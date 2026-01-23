
console.log("JS Warmup Topics Listed");

console.log(typeof [1,2,3])
console.log(typeof NaN)
console.log(typeof null)
console.log(typeof undefined)
console.log(typeof true)
// let var const  if else , functions, loops
// number - NaN is a number
// string
//boolean - true false
// undefined
// array - typeof is object
// object -// typeof of null is object

// operators
        // comparison operators
        // logical operators
        // ternary operator
// type conversion
// type coercion
// truthy falsy
// equality
// functions
// arrow functions
// callbacks
// scope
// hoisting
// closures
// prototypes
// this keyword
// classes
// inheritance
// modules
// error handling
// try catch
// promises
// async await
// fetch API
// JSON
// DOM manipulation
// events
// event listeners
// BOM
// local storage
// session storage
// cookies
// regular expressions
// debugging
// best practices
// coding standards
// performance optimization
// security
// frameworks overview (React, Angular, Vue)
// build tools (Webpack, Babel)
// package managers (npm, yarn)
// version control (Git basics)
// deployment basics

const jsTopics = [
        {
                topic: "Variables & Data Types",
                learn: ["var, let, const declarations", "Hoisting behavior", "Scope rules", "Primitive types: number, string, boolean, null, undefined", "Reference types: objects, arrays"]
        },
        {
                topic: "Operators",
                learn: ["Arithmetic operators", "Comparison operators", "Logical operators (&&, ||, !)", "Ternary operator", "Bitwise operators", "Assignment operators"]
        },
        {
                topic: "Type Conversion & Coercion",
                learn: ["Explicit type conversion", "Implicit type coercion", "Truthy and falsy values", "NaN handling"]
        },
        {
                topic: "Control Flow",
                learn: ["if, else if, else statements", "switch statements", "Breaking and continuing loops"]
        },
        {
                topic: "Loops",
                learn: ["for loop", "while loop", "do-while loop", "for-in loop", "for-of loop", "Array methods: forEach, map, filter, reduce"]
        },
        {
                topic: "Functions",
                learn: ["Function declarations", "Function expressions", "Arrow functions", "Parameters and arguments", "Return values", "Default parameters", "Rest parameters", "Spread operator"]
        },
        {
                topic: "Callbacks",
                learn: ["Understanding callbacks", "Callback hell", "Higher-order functions"]
        },
        {
                topic: "Scope & Closure",
                learn: ["Global scope", "Function scope", "Block scope", "Lexical scoping", "Closures", "Module pattern"]
        },
        {
                topic: "Hoisting",
                learn: ["Variable hoisting", "Function hoisting", "Temporal dead zone"]
        },
        {
                topic: "Objects",
                learn: ["Object creation", "Properties and methods", "Accessing properties", "Modifying objects", "Object methods: keys, values, entries", "Destructuring"]
        },
        {
                topic: "Arrays",
                learn: ["Array creation", "Accessing elements", "Array methods: push, pop, shift, unshift, slice, splice", "Iteration methods", "Array destructuring"]
        },
        {
                topic: "Strings",
                learn: ["String creation", "String methods", "Template literals", "String interpolation", "Regular expressions basics"]
        },
        {
                topic: "Prototypes & Inheritance",
                learn: ["Prototype chain", "Prototype methods", "Object.create()", "Prototype-based inheritance", "Constructor functions"]
        },
        {
                topic: "This Keyword",
                learn: ["Global this", "this in functions", "this in methods", "call, apply, bind methods", "Arrow functions and this"]
        },
        {
                topic: "Classes",
                learn: ["Class declarations", "Constructor method", "Instance methods", "Static methods", "Getters and setters", "Class inheritance", "super keyword"]
        },
        {
                topic: "Error Handling",
                learn: ["try-catch-finally blocks", "Error types", "Throwing errors", "Error stack trace"]
        },
        {
                topic: "Promises",
                learn: ["Promise creation", "Promise states", "then, catch, finally", "Promise chaining", "Promise.all, Promise.race, Promise.allSettled"]
        },
        {
                topic: "Async/Await",
                learn: ["async functions", "await keyword", "Error handling in async", "Async iteration"]
        },
        {
                topic: "Fetch API",
                learn: ["Making HTTP requests", "Request methods", "Response handling", "JSON parsing", "Error handling", "Headers and authentication"]
        },
        {
                topic: "JSON",
                learn: ["JSON.stringify()", "JSON.parse()", "JSON structure", "Working with APIs"]
        },
        {
                topic: "DOM Manipulation",
                learn: ["Selecting elements", "Modifying content", "Modifying attributes", "Modifying CSS", "Creating elements", "Removing elements", "DOM traversal"]
        },
        {
                topic: "Events",
                learn: ["Event listeners", "Event types", "Event object", "Event delegation", "Event bubbling and capturing", "preventDefault and stopPropagation"]
        },
        {
                topic: "Web Storage",
                learn: ["localStorage", "sessionStorage", "Cookies", "Storage limits", "Key-value operations"]
        },
        {
                topic: "Regular Expressions",
                learn: ["Pattern syntax", "Regex methods", "Common patterns", "String matching and replacing", "Flags"]
        },
        {
                topic: "Debugging",
                learn: ["console methods", "Debugger breakpoints", "Browser dev tools", "Error messages"]
        },
        {
                topic: "Best Practices",
                learn: ["Code organization", "Naming conventions", "DRY principle", "Code comments", "Performance optimization", "Security concerns", "Memory management"]
        }
];

const jsTopicElement = document.getElementsByClassName("jsTopic");

function displayJSTopics(){
    
        jsTopics.forEach(topicObj =>{
                let jsTopicDiv = document.createElement("div");
                let topicTitle = `<h2>${topicObj.topic}</h2>`;
                let learnList = "<ul>";
                topicObj.learn.forEach(learnItem=>{
                        learnList+=`<li>${learnItem}</li>`;
                })
                learnList += "</ul>";
                jsTopicDiv.innerHTML = topicTitle + learnList;
                jsTopicElement[0].appendChild(jsTopicDiv);
        })
}

displayJSTopics()