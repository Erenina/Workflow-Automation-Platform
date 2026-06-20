import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { createUser, findUserByEmail, verifyPassword } from '../models/user';
import { createWorkspace } from '../models/workspace';
import { generateToken } from '../utils/auth';

const router = Router();

// Validation schemas
const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

// Register
router.post('/register', async (req: Request, res: Response) => {
    try {
        const { email, password, name } = registerSchema.parse(req.body);

        // Check if user exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Create user
        const user = await createUser(email, password, name);

        // Create default workspace
        const workspace = await createWorkspace(`${name || email}'s Workspace`, user.id);

        // Generate token
        const token = generateToken(user.id);

        res.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
            workspace: {
                id: workspace.id,
                name: workspace.name,
            },
            token,
        });
    } catch (error: any) {
        console.error('Register error:', error);
        if (error.name === 'ZodError') {
            return res.status(400).json({ error: 'Invalid input', details: error.errors });
        }
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = loginSchema.parse(req.body);

        // Find user
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Verify password
        const isValid = await verifyPassword(password, user.password_hash);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate token
        const token = generateToken(user.id);

        res.json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
            token,
        });
    } catch (error: any) {
        console.error('Login error:', error);
        if (error.name === 'ZodError') {
            return res.status(400).json({ error: 'Invalid input', details: error.errors });
        }
        res.status(500).json({ error: 'Login failed' });
    }
});

export default router;
