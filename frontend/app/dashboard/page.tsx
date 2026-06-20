'use client';

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-8">
                            <h1 className="text-xl font-bold text-gray-900">
                                Workflow Automation
                            </h1>
                            <div className="flex gap-4">
                                <a href="/dashboard" className="text-gray-600 hover:text-gray-900">
                                    Dashboard
                                </a>
                                <a href="/dashboard/workflows" className="text-gray-600 hover:text-gray-900">
                                    Workflows
                                </a>
                            </div>
                        </div>
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
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Dashboard
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Hoş geldiniz! Workflow builder yakında eklenecek.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-blue-900 mb-2">
                                Toplam Workflow
                            </h3>
                            <p className="text-3xl font-bold text-blue-600">0</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-green-900 mb-2">
                                Çalıştırmalar
                            </h3>
                            <p className="text-3xl font-bold text-green-600">0</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-purple-900 mb-2">
                                Aktif Workflow
                            </h3>
                            <p className="text-3xl font-bold text-purple-600">0</p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <a
                            href="/dashboard/workflows/new"
                            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
                        >
                            + Yeni Workflow Oluştur
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
