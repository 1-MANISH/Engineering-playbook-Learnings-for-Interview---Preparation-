fn main() {

        let age: u8 = 17;
        let mut allow_to_vote :bool = false;

        if age >= 18 {
            allow_to_vote = true;
        }else {
            allow_to_vote = false;
        }
        let output:String  = if allow_to_vote {
            String::from("Yes")
        } else {
            String::from("No")
        };
        println!("Allow to vote: {}", output);

        let name :String = String::from("Hardik Pandya");
        let first_name = get_first_name(name);
        println!("First name: {}", first_name);
}

pub fn get_first_name(str:String) -> String {
        let mut first_name = String::new();

        for c in str.chars() {
                if c == ' ' {
                        break;
                }else {
                        first_name.push(c);
                }
        }
        return first_name;
}
