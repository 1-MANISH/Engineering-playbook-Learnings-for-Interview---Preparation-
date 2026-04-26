import client from "../db.js";

const createUser = async (name,email,password) => {
        try {
               const result = await client.query(`
                INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING *`,
                [name,email,password]
                ) 

                return result.rows[0]
        } catch (error) {
                throw error
        }
}

const getUser = async (email) => {
        try {
                const result = await client.query(`
                SELECT * FROM users WHERE email = $1`,
                [email]
                )
                return result.rows[0]
        } catch (error) {
                throw error
        }
}

export {
        createUser,
        getUser
}