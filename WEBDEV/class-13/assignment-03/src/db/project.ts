import { client } from '../index';

export async function createProject(userId: number, title: string, description: string) {
        return (await client.query(
                `INSERT into projects (user_id,title,description) VALUES ($1,$2,$3) RETURNING *`,
                [userId, title, description]
        )).rows[0];
}

// ordered by most recent
export async function getProjects(userId: number) {
        return (await client.query(
                `SELECT * FROM projects WHERE user_id = $1 ORDER BY created_at DESC`,
                [userId]
        )).rows;
}