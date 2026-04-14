
// transfer back ownership
// fn main() {
//         let str = String::from("Harkirat");
//         let (str,len) = get_length(str);
//         println!("len = {}", len);
//         print!("str = {}", str);
// }

// fn get_length(str: String) -> (String,usize) {
//         let len = str.len();
//         return (str,len)
// }

fn main () {
        
        let  mut v = vec![1,2,3,4,5];
        double_values(v.clone());
        println!("{:?}",v)

}

fn double_values(mut v: Vec<i32>) -> () {
    for i in 0..v.len() {
        v[i]*=2;
    }
    for i in 0..v.len() {
        print!("{} ",v[i]);
    }
}
