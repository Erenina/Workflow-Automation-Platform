import { Router, Request, Response } from 'express';
import { findWorkflowById } from '../models/workflow';
import { workflowEngine } from '../services/workflow-engine';
import { findExecutionsByWorkflow, findExecutionById } from '../models/execution';

const router = Router();

// Webhook endpoint - triggers workflow execution
router.post('/webhook/:workflow_id', async (req: Request, res: Response) => {
    try {
        const workflow_id = req.params.workflow_id as string;
        const trigger_data = req.body;

        // Find workflow
        const workflow = await findWorkflowById(workflow_id);
        if (!workflow) {
            return res.status(404).json({ error: 'Workflow not found' });
        }

        if (!workflow.is_active) {
            return res.status(400).json({ error: 'Workflow is not active' });
        }

        // Execute workflow asynchronously
        workflowEngine.executeWorkflow(workflow, trigger_data)
            .then((execution_id) => {
                console.log(`Workflow ${workflow_id} executed successfully: ${execution_id}`);
            })
            .catch((error) => {
                console.error(`Workflow ${workflow_id} execution failed:`, error);
            });

        // Return immediately
        res.json({
            message: 'Workflow execution started',
            workflow_id,
        });
    } catch (error: any) {
        console.error('Webhook error:', error);
        res.status(500).json({ error: 'Failed to trigger workflow' });
    }
});

// Get executions for a workflow
router.get('/:workflow_id/executions', async (req: Request, res: Response) => {
    try {
        const workflow_id = req.params.workflow_id as string;
        const executions = await findExecutionsByWorkflow(workflow_id);
        res.json(executions);
    } catch (error: any) {
        console.error('Get executions error:', error);
        res.status(500).json({ error: 'Failed to fetch executions' });
    }
});

// Get single execution
router.get('/executions/:execution_id', async (req: Request, res: Response) => {
    try {
        const execution_id = req.params.execution_id as string;
        const execution = await findExecutionById(execution_id);

        if (!execution) {
            return res.status(404).json({ error: 'Execution not found' });
        }

        res.json(execution);
    } catch (error: any) {
        console.error('Get execution error:', error);
        res.status(500).json({ error: 'Failed to fetch execution' });
    }
});

export default router;
