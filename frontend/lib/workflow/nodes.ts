import { Node } from 'reactflow';

export const createTriggerNode = (): Node => ({
    id: '1',
    type: 'input',
    data: { label: '🎯 Webhook Trigger' },
    position: { x: 250, y: 25 },
    style: {
        background: '#4F46E5',
        color: 'white',
        border: '1px solid #4338CA',
        borderRadius: '8px',
        padding: '10px',
    },
});

export const createHttpNode = (): Node => ({
    id: `http-${Date.now()}`,
    type: 'default',
    data: { label: '🌐 HTTP Request' },
    position: { x: Math.random() * 400, y: Math.random() * 400 },
    style: {
        background: '#10B981',
        color: 'white',
        border: '1px solid #059669',
        borderRadius: '8px',
        padding: '10px',
    },
});

export const createEmailNode = (): Node => ({
    id: `email-${Date.now()}`,
    type: 'default',
    data: { label: '📧 Send Email' },
    position: { x: Math.random() * 400, y: Math.random() * 400 },
    style: {
        background: '#F59E0B',
        color: 'white',
        border: '1px solid #D97706',
        borderRadius: '8px',
        padding: '10px',
    },
});

export const createConditionNode = (): Node => ({
    id: `condition-${Date.now()}`,
    type: 'default',
    data: { label: '🔀 Condition' },
    position: { x: Math.random() * 400, y: Math.random() * 400 },
    style: {
        background: '#8B5CF6',
        color: 'white',
        border: '1px solid #7C3AED',
        borderRadius: '8px',
        padding: '10px',
    },
});
