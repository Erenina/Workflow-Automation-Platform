import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import workflowRoutes from './routes/workflows';
import webhookRoutes from './routes/webhooks';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', message: 'Workflow Automation API is running' });
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/workflows', workflowRoutes);
app.use('/api/v1/webhooks', webhookRoutes);

app.get('/api/v1', (req: Request, res: Response) => {
    res.json({
        message: 'Workflow Automation Platform API',
        version: '1.0.0'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

export default app;
