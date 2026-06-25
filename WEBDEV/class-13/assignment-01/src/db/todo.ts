

import { client } from "..";
import { QueryResult } from "pg";

interface TODO {
    id: number;
    title: string;
    description: string;
    done: boolean;
    // Additional properties if present in your database schema
}
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */

export async function createTodo(
  userId: number,
  title: string,
  description: string
) {

        const res = await client.query(
                `INSERT INTO todos (user_id,title,description) VALUES ($1,$2,$3) RETURNING *`,
                [userId, title, description]
        )
        const todo = res.rows[0]
        return {
                id: todo.id,
                title: todo.title,
                description: todo.description,
                done: todo.done
        }
}

/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */


export async function updateTodo(todoId: number) {
        const res = await client.query(
                `UPDATE todos SET done=true where id=$1 RETURNING *`,
                [todoId]
        )

        const todo = res.rows[0]
        return {
                id: todo.id,
                title: todo.title,
                description: todo.description,
                done: todo.done
        }
}
/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */

export async function getTodos(userId: number) {
        const res = await client.query(
                `SELECT * FROM todos WHERE user_id = $1`,
                [userId]
        )
        return res.rows
}
