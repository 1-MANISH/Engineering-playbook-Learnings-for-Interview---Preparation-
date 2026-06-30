import { client } from '../index';

export async function createUser(username: string, password: string, name: string) {
        return (await client.query(
                `INSERT INTO users (username,password,name) VALUES ($1,$2,$3) RETURNING *`,
                [username, password, name]
        )).rows[0];
}

export async function getUser(id: number) {
        return (await client.query(
                `SELECT * FROM users WHERE id = $1`,                
                [id]
        )).rows[0];
}