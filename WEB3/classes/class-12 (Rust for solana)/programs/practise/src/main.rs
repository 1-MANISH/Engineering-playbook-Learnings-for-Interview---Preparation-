fn main() {


        let mut s :String = String::from("Harkirat");

        println!("Before  = {}",s);

        append_text(&mut s);

        println!("After = {}",s);

}

fn append_text(str:&mut String) ->() {
        str.push_str(", Hello!");
}

