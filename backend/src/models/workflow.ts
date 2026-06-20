import { query } from '../utils/database';
import { Workflow } from '../types';

export const createWorkflow = async (
    workspace_id: string,
    name: string,
    description: string,
    created_by: string
): Promise<Workflow> => {
    const result = await query(
        `INSERT INTO workflows (workspace_id, name, description, trigger_type, trigger_config, nodes, created_by) 
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [workspace_id, name, description, 'webhook', {}, [], created_by]
    );

    return result.rows[0];
};

export const findWorkflowById = async (id: string): Promise<Workflow | null> => {
    const result = await query('SELECT * FROM workflows WHERE id = $1', [id]);
    return result.rows[0] || null;
};

export const findWorkflowsByWorkspace = async (workspace_id: string): Promise<Workflow[]> => {
    const result = await query(
        'SELECT * FROM workflows WHERE workspace_id = $1 ORDER BY created_at DESC',
        [workspace_id]
    );
    return result.rows;
};

export const updateWorkflow = async (
    id: string,
    updates: Partial<Workflow>
): Promise<Workflow | null> => {
    const fields = [];
    const values = [];
    let paramCount = 1;

    if (updates.name !== undefined) {
        fields.push(`name = $${paramCount++}`);
        values.push(updates.name);
    }
    if (updates.description !== undefined) {
        fields.push(`description = $${paramCount++}`);
        values.push(updates.description);
    }
    if (updates.nodes !== undefined) {
        fields.push(`nodes = $${paramCount++}`);
        values.push(JSON.stringify(updates.nodes));
    }
    if (updates.is_active !== undefined) {
        fields.push(`is_active = $${paramCount++}`);
        values.push(updates.is_active);
    }
    if (updates.trigger_config !== undefined) {
        fields.push(`trigger_config = $${paramCount++}`);
        values.push(JSON.stringify(updates.trigger_config));
    }

    fields.push(`updated_at = NOW()`);
    values.push(id);

    const result = await query(
        `UPDATE workflows SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
        values
    );

    return result.rows[0] || null;
};

export const deleteWorkflow = async (id: string): Promise<boolean> => {
    const result = await query('DELETE FROM workflows WHERE id = $1', [id]);
    return result.rowCount ? result.rowCount > 0 : false;
};
