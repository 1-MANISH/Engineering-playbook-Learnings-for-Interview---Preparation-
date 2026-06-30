// Problem Statement
// Create a type for a Product with the following properties:

type Product  = {
        name:string ,
        price:number,
}

// name (a string)
// price (a number)
// Create another type for DigitalProduct with the following properties:


type DigitalProduct = {
        downloadLink:string
}
// downloadLink (a string)
// Combine these two types into a new type FullProduct to represent a product that can either be digital or physical. Create an object of type FullProduct and print its details.
// Example Input:


type FullProduct = Product & DigitalProduct

export const fullProduct:FullProduct = {
        name:"E-book",
        price:10,
        downloadLink:"https://example.com/ebook",
}

// const fullProduct = {
//     name: "E-book",
//     price: 10,
//     downloadLink: "https://example.com/ebook",
//   };
// console.log(fullProduct);

// Example Output:

// {
//     name: 'E-book',
//     price: 10,
//     downloadLink: 'https://example.com/ebook'
// }



