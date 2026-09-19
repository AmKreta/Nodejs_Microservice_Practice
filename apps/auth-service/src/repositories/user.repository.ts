import type { User } from "../types/auth.types";
import { getPool } from "@nodejsmicroservices/packages-shared";

export async function createUser(userInput: Omit<User, "id" | "createdAt" | "updatedAt">) {
    const user = await getPool().query<Omit<User, "password_hash">>(`
        INSERT INTO users (name, email, password_hash, role) 
        VALUES ($1, $2, $3, $4) 
        RETURNING id, name, email, role, created_at, updated_at
    `, [userInput.name, userInput.email, userInput.password_hash, userInput.role]);
    return user.rows[0];
}

export async function getUserByEmail(email: string, selectPasswordHash: boolean = false) {
    const user = await getPool().query<User>(`
        SELECT id, name, email, role ${selectPasswordHash ? ", password_hash" : ""}
        FROM users 
        WHERE email = $1
    `, [email]);
    return user.rows[0];
}

export async function getUserById(id: string) {
    const user = await getPool().query<User>(`
        SELECT id, name, email, role
        FROM users 
        WHERE id = $1
    `, [id]);
    return user.rows[0];
}