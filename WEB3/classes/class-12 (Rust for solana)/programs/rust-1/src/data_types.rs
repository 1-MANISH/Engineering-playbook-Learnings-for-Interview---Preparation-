fn main() {

        // numbers
       
//        let x: i32 = 1; // 32 bits =  4 byte
//        let y: i32 = 2;
//        let z: i32 = x + y;
//        println!("{} + {} = {}", x, y, z);

        // overflow
        // let mut num:i8  = 124;
        // for i in 0..100 {
        //         num+=127+i;
        // }
        // println!("{}",num);

        // booleans
        // let is_active = true;
        
        // if is_active {
        //         println!("active");
        // }else  {
        //         println!("not active");
        // }

        // strings

        // let greeting  =  String::from("hello");
        // println!("{}",greeting);

        // arrays
        // let mut arr:[i32;5] = [1,2,3,4,5];
        // println!("{:?}",arr);
        // println!("{}",arr.len());
        // arr[0] = 10;
        // println!("{:?}",arr);

        // for i in 0..arr.len() {
        //         println!("{}",arr[i]);
        // }

        // vectors

        let mut xs = vec![1,2,3,4,5];
        println!("{:?}",xs);
        println!("{}",xs.len());
        xs.push(6);
        println!("{:?}",xs);
}
