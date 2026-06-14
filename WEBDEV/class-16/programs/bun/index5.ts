interface User {
        name:string;
        age:number;
        email:string;
}

let user1:User = {
        name:"John Doe",
        age:30,
        email:"t7A7o@example.com"
}

function isLegalAge(user:User):boolean {
        return user.age >=18;
}

if(isLegalAge(user1)) {
        console.log(`${user1.name} is of legal age.`);
}else{
        console.log(`${user1.name} is not of legal age.`);
}