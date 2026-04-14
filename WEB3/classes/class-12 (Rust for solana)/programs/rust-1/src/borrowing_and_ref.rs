// fn main () {
        
//         let   v = vec![1,2,3,4,5];
//         print_values(&v);
//         println!("{:?}",v)

// }

// fn print_values( v: &Vec<i32>) -> () {
//     for i in 0..v.len() {
//         print!("{} ",v[i]);
//     }
// }


// fn main() {
//     let str = String::from("Harkirat");
//     let len = get_length(&str);
//     println!("{} {}", str, len);
// }

// fn get_length(str: &String) -> usize {
//     let len = str.len();
//     return len
// }




// fn main() {
//         let mut str = String::from("Harkirat");
//         let len = get_length(&mut str);
//         println!("{} {}", str,len);
// }

// fn get_length(str:&mut String) -> usize {
//         str.push('!');
//         let len = str.len();
//         return len
// }


// also one mutable reference at TIME
// fn main() {
//         let mut str = String::from("Harkirat");

//         let len = get_length(&mut str);
//         let len1 = get_length(&mut str);
//         println!("{} {} {}", str,len,len1);
// }

// fn get_length(str:&mut String) -> usize {
//         str.push('!');
//         let len = str.len();
//         return len
// }


fn main() {
        let mut str = String::from("Harkirat");
        let copyStr: &mut String = &mut str;
        let len = get_length(&mut str);
        let len1 = get_length(&mut copyStr);
        println!("{} {} {}", str,len,len1);
}

fn get_length(str:&mut String) -> usize {
        str.push('!');
        let len = str.len();
        return len
}




fn main() {
        let  str = String::from("Harkirat");
        let copyStr: &String = & str;
        let len = get_length(& str);
        let len1 = get_length(& str);
        println!("{} {} {}", str,len,len1);
}

fn get_length(str:&String) -> usize {
        let len = str.len();
     
