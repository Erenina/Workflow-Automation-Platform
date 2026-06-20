import { query } from '../utils/database';
import { Workspace } from '../types';

export const createWorkspace = async (name: string, owner_id: string): Promise<Workspace> => {
    const result = await query(
        'INSERT INTO workspaces (name, owner_id) VALUES ($1, $2) RETURNING *',
        [name, owner_id]
    );

    return result.rows[0];
};

export const findWorkspaceById = async (id: string): Promise<Workspace | null> => {
    const result = await query('SELECT * FROM workspaces WHERE id = $1', [id]);
    return result.rows[0] || null;
};

export const findWorkspacesByOwnerId = async (owner_id: string): Promise<Workspace[]> => {
    const result = await query('SELECT * FROM workspaces WHERE owner_id = $1', [owner_id]);
    return result.rows;
};
