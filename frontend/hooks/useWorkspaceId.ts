import { useState, useEffect } from 'react';
import { workflowApi } from '@/lib/api/client';

export function useWorkspaceId() {
    const [workspaceId, setWorkspaceId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Try to get workspace ID from localStorage or API
        const getWorkspaceId = async () => {
            try {
                // First check if we stored it during registration
                const storedWorkspace = localStorage.getItem('workspace_id');
                if (storedWorkspace) {
                    setWorkspaceId(storedWorkspace);
                    setLoading(false);
                    return;
                }

                // Otherwise, get first workflow and extract workspace_id
                const workflows = await workflowApi.getAll();
                if (workflows.length > 0) {
                    const id = (workflows[0] as any).workspace_id;
                    setWorkspaceId(id);
                    localStorage.setItem('workspace_id', id);
                }
            } catch (error) {
                console.error('Failed to get workspace ID:', error);
            } finally {
                setLoading(false);
            }
        };

        getWorkspaceId();
    }, []);

    return { workspaceId, loading };
}
