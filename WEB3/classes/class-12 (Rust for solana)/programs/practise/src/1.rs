/*
### 1. Borrowing an Immutable Reference

**Goal:** Write a function `calculate_length` that takes an **immutable reference** to a `String` and returns its length. Then call this function from `main` and print both the original `String` and its length.

*/

fn main() {

        let s :String = String::from("Harkirat");

        let len = calculate_length(&s); 

        println!("{}  = len  =  {}",s,len);
    
        
}


fn calculate_length(str:&String) ->usize {
        let len = str.len();
        return len
}