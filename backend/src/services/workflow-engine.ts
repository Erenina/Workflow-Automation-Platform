import { Workflow, WorkflowNode, ExecutionLogEntry } from '../types';
import { createExecution, updateExecutionStatus } from '../models/execution';
import axios from 'axios';

interface ExecutionContext {
    workflow: Workflow;
    trigger_data: any;
    execution_id: string;
    logs: ExecutionLogEntry[];
}

export class WorkflowEngine {
    async executeWorkflow(workflow: Workflow, trigger_data: any): Promise<string> {
        // Create execution record
        const execution = await createExecution(workflow.id, trigger_data);

        const context: ExecutionContext = {
            workflow,
            trigger_data,
            execution_id: execution.id,
            logs: [],
        };

        try {
            // Execute nodes sequentially
            for (const node of workflow.nodes) {
                if (node.type === 'trigger') continue; // Skip trigger node

                await this.executeNode(node, context);
            }

            // Mark as success
            await updateExecutionStatus(execution.id, 'success', context.logs);
            return execution.id;
        } catch (error: any) {
            // Mark as failed
            await updateExecutionStatus(
                execution.id,
                'failed',
                context.logs,
                error.message
            );
            throw error;
        }
    }

    private async executeNode(node: WorkflowNode, context: ExecutionContext): Promise<void> {
        const startTime = new Date();

        try {
            let result: any;

            switch (node.action_type) {
                case 'http_request':
                    result = await this.executeHttpRequest(node, context);
                    break;
                case 'email':
                    result = await this.executeEmail(node, context);
                    break;
                case 'condition':
                    result = await this.executeCondition(node, context);
                    break;
                default:
                    throw new Error(`Unknown action type: ${node.action_type}`);
            }

            // Log success
            context.logs.push({
                timestamp: startTime,
                node_id: node.id,
                status: 'success',
                message: `Node executed successfully`,
                data: result,
            });
        } catch (error: any) {
            // Log failure
            context.logs.push({
                timestamp: startTime,
                node_id: node.id,
                status: 'failed',
                message: error.message,
            });
            throw error;
        }
    }

    private async executeHttpRequest(node: WorkflowNode, context: ExecutionContext): Promise<any> {
        const { url, method = 'GET', headers = {}, body } = node.config;

        if (!url) {
            throw new Error('HTTP Request: URL is required');
        }

        const response = await axios({
            method,
            url,
            headers,
            data: body,
            timeout: 30000, // 30 seconds
        });

        return {
            status: response.status,
            data: response.data,
        };
    }

    private async executeEmail(node: WorkflowNode, context: ExecutionContext): Promise<any> {
        const { to, subject, body } = node.config;

        if (!to || !subject) {
            throw new Error('Email: to and subject are required');
        }

        // TODO: Implement actual email sending (SendGrid/Resend)
        console.log('Sending email:', { to, subject, body });

        return {
            sent: true,
            to,
            subject,
        };
    }

    private async executeCondition(node: WorkflowNode, context: ExecutionContext): Promise<any> {
        const { condition } = node.config;

        // TODO: Implement condition evaluation
        console.log('Evaluating condition:', condition);

        return {
            result: true,
        };
    }
}

export const workflowEngine = new WorkflowEngine();
