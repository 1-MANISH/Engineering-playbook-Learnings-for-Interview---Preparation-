import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const client = new PrismaClient({
        adapter:new PrismaPg({
                connectionString: process.env.DATABASE_URL
        })
});
async function createDummyUsers() {

        console.log(`Seeding some dummy users....`);
        const users = [
                {
                        username: "test1",
                        password: "123123",
                        age: 23,
                        city: "baroda",
                        todos:{
                                create:{
                                        title:"title1-test1",
                                        description:"description1-test1",
                                        completed:false
                                }
                        }
                },
                {
                        username: "test2",
                        password: "123123",
                        age: 20,
                        city: "rajkot",
                },
        ];
        
        await client.user.createMany({
                data: users,
                skipDuplicates: true
        });

        console.log(`Seeding completed....`);
}

createDummyUsers().catch((e)=>{
        console.error(`Error seeding dummy users: ${e}`);
        process.exit(1);
}).then(() => {
        // client.$disconnect();
});