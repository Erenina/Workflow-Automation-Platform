import { query } from '../utils/database';
import { WorkflowExecution } from '../types';

export const createExecution = async (
    workflow_id: string,
    trigger_data: any
): Promise<WorkflowExecution> => {
    const result = await query(
        `INSERT INTO workflow_executions (workflow_id, status, trigger_data, execution_log, started_at) 
     VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
        [workflow_id, 'pending', JSON.stringify(trigger_data), JSON.stringify([])]
    );

    return result.rows[0];
};

export const updateExecutionStatus = async (
    id: string,
    status: 'running' | 'success' | 'failed',
    execution_log: any[],
    error_message?: string
): Promise<WorkflowExecution | null> => {
    const result = await query(
        `UPDATE workflow_executions 
     SET status = $1, execution_log = $2, error_message = $3, completed_at = NOW()
     WHERE id = $4 RETURNING *`,
        [status, JSON.stringify(execution_log), error_message, id]
    );

    return result.rows[0] || null;
};

export const findExecutionsByWorkflow = async (workflow_id: string): Promise<WorkflowExecution[]> => {
    const result = await query(
        'SELECT * FROM workflow_executions WHERE workflow_id = $1 ORDER BY started_at DESC LIMIT 50',
        [workflow_id]
    );
    return result.rows;
};

export const findExecutionById = async (id: string): Promise<WorkflowExecution | null> => {
    const result = await query('SELECT * FROM workflow_executions WHERE id = $1', [id]);
    return result.rows[0] || null;
};
