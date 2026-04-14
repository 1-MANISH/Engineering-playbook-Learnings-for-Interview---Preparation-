fn main() {
        let  str = String::from("Harkirat");
        let copyStr: &String = & str;
        let len = get_length(& str);
        let len1 = get_length(& str);
        println!("{} {} {}", str,len,len1);
}

fn get_length(str:&String) -> usize {
        let len = str.len();
        return len
}