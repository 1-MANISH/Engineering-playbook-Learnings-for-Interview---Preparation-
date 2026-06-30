import { client } from '../index';

export async function createTask(projectId: number, title: string, dueDate: string) {
        return (await client.query(
                `INSERT INTO tasks (project_id,title,due_date) VALUES ($1,$2,$3) RETURNING *`,
                [projectId, title, dueDate]
        )).rows[0];
}

export async function updateTask(taskId: number, completed: boolean) {
        return (await client.query(
                `UPDATE tasks SET completed = $2 WHERE id = $1 RETURNING *`,
                [taskId, completed]
        )).rows[0];
}

export async function getTasks(projectId: number) {
        return (await client.query(
                `SELECT * FROM tasks WHERE project_id = $1`,
                [projectId]
        )).rows;
}