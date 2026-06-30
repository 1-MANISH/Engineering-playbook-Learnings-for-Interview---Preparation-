import { client } from '../index';

export async function createPost(userId: number, content: string) {
        return (await client.query(
                `INSERT INTO posts (user_id, content) VALUES ($1,$2) RETURNING *`,
                [userId, content]
        )).rows[0];
}

export async function likePost(userId: number, postId: number) {
        return (await client.query(
                `INSERT INTO likes (user_id,post_id) VALUES ($1,$2) RETURNING *`,
                [userId, postId]
        )).rows[0];
}

// Retrieves all posts with author username and an integer like_count, ordered by created_at descending.
export async function getFeed() {
        return (await client.query(
                `SELECT 
                        p.id, 
                        p.content, 
                        p.created_at, 
                        u.username, 
                        COUNT(l.id)::int AS like_count 
                        FROM posts p 
                        JOIN users u ON p.user_id = u.id 
                        LEFT JOIN likes l ON l.post_id = p.id 
                        GROUP BY p.id, u.username 
                        ORDER BY p.created_at DESC;`
        )).rows;
}