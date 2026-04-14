/*
### 2. Borrowing a Mutable Reference

**Goal:** Write a function `append_text` that takes a **mutable reference** to a `String` and appends some text to it. For example, if the string is `"Hello"`, the function could append `", World!"`.
*/

fn main() {


        let mut s :String = String::from("Harkirat");

        println!("Before  = {}",s);

        append_text(&mut s);

        println!("After = {}",s);

}

fn append_text(str:&mut String) ->() {
        str.push_str(", Hello!");
}

