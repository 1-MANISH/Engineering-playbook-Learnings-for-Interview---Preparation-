import client from "../db.js";

const createTodo = async (title,description,userId) =>{
        try {
                const result = await client.query(
                        `INSERT INTO todos (title,description,user_id) VALUES ($1,$2,$3) RETURNING *`,
                        [title,description,userId]
                )
                return result.rows[0]
        } catch (error) {
                throw error
        }
}

const getTodo = async (todoId) =>{
        try {
                const result = await client.query(
                        `SELECT * FROM todos WHERE id = $1`,
                        [todoId]
                )
                return result.rows[0]
        } catch (error) {
                throw error
        }
}

// toggle todo done
const updateTodo = async (todoId,done)=>{
        try {
                const result = await client.query(
                        `UPDATE todos set done = $1 WHERE id = $2 RETURNING *`,
                        [done,todoId]
                )
                return result.rows[0]
        } catch (error) {
                throw error
        }
}

const deleteTodo = async (todoId)=>{
        try {
                const result = await client.query(
                        `DELETE FROM todos WHERE id = $1 RETURNING *`,
                        [todoId]
                )
                return result.rows[0]
        } catch (error) {
                throw error
        }
}

export {
        createTodo,
        getTodo,
        updateTodo,
        deleteTodo
}