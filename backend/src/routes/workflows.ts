import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { authMiddleware } from '../utils/auth';
import {
    createWorkflow,
    findWorkflowsByWorkspace,
    findWorkflowById,
    updateWorkflow,
    deleteWorkflow,
} from '../models/workflow';
import { findWorkspacesByOwnerId } from '../models/workspace';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Validation schemas
const createWorkflowSchema = z.object({
    workspace_id: z.string().uuid(),
    name: z.string().min(1).max(255),
    description: z.string().optional(),
});

const updateWorkflowSchema = z.object({
    name: z.string().min(1).max(255).optional(),
    description: z.string().optional(),
    nodes: z.array(z.any()).optional(),
    is_active: z.boolean().optional(),
    trigger_config: z.any().optional(),
});

// Get all workflows for user's workspaces
router.get('/', async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;

        // Get user's workspaces
        const workspaces = await findWorkspacesByOwnerId(userId);

        if (workspaces.length === 0) {
            return res.json([]);
        }

        // Get workflows from first workspace (for now)
        const workflows = await findWorkflowsByWorkspace(workspaces[0].id);

        res.json(workflows);
    } catch (error: any) {
        console.error('Get workflows error:', error);
        res.status(500).json({ error: 'Failed to fetch workflows' });
    }
});

// Get single workflow
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const workflow = await findWorkflowById(id);

        if (!workflow) {
            return res.status(404).json({ error: 'Workflow not found' });
        }

        res.json(workflow);
    } catch (error: any) {
        console.error('Get workflow error:', error);
        res.status(500).json({ error: 'Failed to fetch workflow' });
    }
});

// Create workflow
router.post('/', async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const { workspace_id, name, description } = createWorkflowSchema.parse(req.body);

        const workflow = await createWorkflow(workspace_id, name, description || '', userId);

        res.status(201).json(workflow);
    } catch (error: any) {
        console.error('Create workflow error:', error);
        if (error.name === 'ZodError') {
            return res.status(400).json({ error: 'Invalid input', details: error.errors });
        }
        res.status(500).json({ error: 'Failed to create workflow' });
    }
});

// Update workflow
router.patch('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const updates = updateWorkflowSchema.parse(req.body);

        const workflow = await updateWorkflow(id, updates);

        if (!workflow) {
            return res.status(404).json({ error: 'Workflow not found' });
        }

        res.json(workflow);
    } catch (error: any) {
        console.error('Update workflow error:', error);
        if (error.name === 'ZodError') {
            return res.status(400).json({ error: 'Invalid input', details: error.errors });
        }
        res.status(500).json({ error: 'Failed to update workflow' });
    }
});

// Delete workflow
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const success = await deleteWorkflow(id);

        if (!success) {
            return res.status(404).json({ error: 'Workflow not found' });
        }

        res.json({ message: 'Workflow deleted successfully' });
    } catch (error: any) {
        console.error('Delete workflow error:', error);
        res.status(500).json({ error: 'Failed to delete workflow' });
    }
});

export default router;
