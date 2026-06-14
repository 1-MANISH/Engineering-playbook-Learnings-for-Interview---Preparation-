import UserModel from "./index12";

function maxValue(arr:number[]) :number{
        let max:number = arr[0] ;
        for(let i=0; i<arr.length; i++){
                if ( arr[i] > max){
                        max = arr[i];
                }
        }
        return max;
}

let arr:number[] = [1, 2, 3, 4, 5];
console.log(maxValue(arr));


interface User {
	firstName: string;
	lastName: string;
	age: number;
}

function filteredUsers(users: User[]):User[] {
    return users.filter(x => x.age >= 18);
}

console.log(filteredUsers([{
    firstName: "harkirat",
    lastName: "Singh",
    age: 21
}, {
    firstName: "Raman",
    lastName: "Singh",
    age: 16
}, ]));