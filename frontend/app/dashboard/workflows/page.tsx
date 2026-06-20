'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Workflow {
    id: string;
    name: string;
    description?: string;
    is_active: boolean;
    created_at: string;
}

export default function WorkflowsListPage() {
    const router = useRouter();
    const [workflows, setWorkflows] = useState<Workflow[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWorkflows();
    }, []);

    const fetchWorkflows = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/workflows`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (res.ok) {
                const data = await res.json();
                setWorkflows(data);
            }
        } catch (error) {
            console.error('Failed to fetch workflows:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <h1 className="text-xl font-bold text-gray-900">
                            Workflow Automation
                        </h1>
                        <button
                            onClick={() => {
                                localStorage.removeItem('token');
                                localStorage.removeItem('user');
                                window.location.href = '/';
                            }}
                            className="text-gray-600 hover:text-gray-900"
                        >
                            Çıkış Yap
                        </button>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Workflows</h2>
                    <a
                        href="/dashboard/workflows/new"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                    >
                        + Yeni Workflow
                    </a>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600">Yükleniyor...</p>
                    </div>
                ) : workflows.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-12 text-center">
                        <p className="text-gray-600 mb-4">Henüz workflow oluşturmadınız</p>
                        <a
                            href="/dashboard/workflows/new"
                            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
                        >
                            İlk Workflow'unuzu Oluşturun
                        </a>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {workflows.map((workflow) => (
                            <div
                                key={workflow.id}
                                className="bg-white rounded-lg shadow p-6 hover:shadow-md transition cursor-pointer"
                                onClick={() => router.push(`/dashboard/workflows/${workflow.id}`)}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {workflow.name}
                                        </h3>
                                        {workflow.description && (
                                            <p className="text-gray-600 mt-1">{workflow.description}</p>
                                        )}
                                    </div>
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm ${workflow.is_active
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                            }`}
                                    >
                                        {workflow.is_active ? 'Aktif' : 'Pasif'}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 mt-4">
                                    Oluşturulma: {new Date(workflow.created_at).toLocaleDateString('tr-TR')}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
