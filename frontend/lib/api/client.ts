// API client configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Helper to get auth token
const getAuthToken = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
};

// Generic fetch wrapper
async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const token = getAuthToken();

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
}

// Auth API
export const authApi = {
    register: (data: { email: string; password: string; name?: string }) =>
        apiFetch('/api/v1/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    login: (data: { email: string; password: string }) =>
        apiFetch('/api/v1/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
};

// Workflow API
export const workflowApi = {
    getAll: () => apiFetch('/api/v1/workflows'),

    getById: (id: string) => apiFetch(`/api/v1/workflows/${id}`),

    create: (data: { workspace_id: string; name: string; description?: string }) =>
        apiFetch('/api/v1/workflows', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    update: (id: string, data: any) =>
        apiFetch(`/api/v1/workflows/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        }),

    delete: (id: string) =>
        apiFetch(`/api/v1/workflows/${id}`, {
            method: 'DELETE',
        }),
};
