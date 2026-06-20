import { workflowApi } from '@/lib/api/client';
import { Workflow } from '@/lib/types';

interface SaveWorkflowParams {
    workspaceId: string;
    name: string;
    description?: string;
    nodes: any[];
    edges: any[];
}

export async function saveWorkflow(params: SaveWorkflowParams): Promise<Workflow> {
    const { workspaceId, name, description, nodes, edges } = params;

    // Transform React Flow nodes to our format
    const workflowNodes = nodes.map((node) => ({
        id: node.id,
        type: node.type === 'input' ? 'trigger' : 'action',
        action_type: getActionType(node),
        config: node.data?.config || {},
        position: node.position,
    }));

    // Create workflow
    const workflow = await workflowApi.create({
        workspace_id: workspaceId,
        name,
        description,
    });

    // Update with nodes
    const updated = await workflowApi.update(workflow.id, {
        nodes: workflowNodes,
    });

    return updated;
}

function getActionType(node: any): string {
    const label = node.data?.label || '';

    if (label.includes('HTTP')) return 'http_request';
    if (label.includes('Email')) return 'email';
    if (label.includes('Condition')) return 'condition';

    return 'unknown';
}
