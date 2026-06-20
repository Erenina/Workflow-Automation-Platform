import { query } from '../utils/database';
import bcrypt from 'bcryptjs';
import { User } from '../types';

export const createUser = async (email: string, password: string, name?: string): Promise<User> => {
    const password_hash = await bcrypt.hash(password, 10);

    const result = await query(
        'INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING *',
        [email, password_hash, name]
    );

    return result.rows[0];
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0] || null;
};

export const findUserById = async (id: string): Promise<User | null> => {
    const result = await query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0] || null;
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
};
