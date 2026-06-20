export interface User {
    id: string;
    email: string;
    password_hash: string;
    name?: string;
    created_at: Date;
    updated_at: Date;
}

export interface Workspace {
    id: string;
    name: string;
    owner_id: string;
    plan: 'free' | 'starter' | 'professional' | 'enterprise';
    created_at: Date;
    updated_at: Date;
}

export interface Workflow {
    id: string;
    workspace_id: string;
    name: string;
    description?: string;
    trigger_type: 'webhook' | 'schedule' | 'manual';
    trigger_config: any;
    nodes: WorkflowNode[];
    is_active: boolean;
    created_by: string;
    created_at: Date;
    updated_at: Date;
}

export interface WorkflowNode {
    id: string;
    type: 'trigger' | 'action' | 'condition';
    action_type?: string;
    config: any;
    position?: { x: number; y: number };
}

export interface WorkflowExecution {
    id: string;
    workflow_id: string;
    status: 'pending' | 'running' | 'success' | 'failed';
    trigger_data?: any;
    execution_log: ExecutionLogEntry[];
    error_message?: string;
    started_at: Date;
    completed_at?: Date;
}

export interface ExecutionLogEntry {
    timestamp: Date;
    node_id: string;
    status: 'success' | 'failed';
    message: string;
    data?: any;
}

export interface IntegrationCredentials {
    id: string;
    workspace_id: string;
    integration_type: string;
    credentials: any;
    created_at: Date;
    updated_at: Date;
}
