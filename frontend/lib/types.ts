export interface User {
    id: string;
    email: string;
    name?: string;
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
    created_at: string;
    updated_at: string;
}

export interface WorkflowNode {
    id: string;
    type: 'trigger' | 'action' | 'condition';
    action_type?: string;
    config: any;
    position?: { x: number; y: number };
}

export interface AuthResponse {
    user: User;
    token: string;
    workspace?: {
        id: string;
        name: string;
    };
}
