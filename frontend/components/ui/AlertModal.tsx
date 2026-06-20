'use client';

interface AlertModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onClose: () => void;
    type?: 'success' | 'error' | 'warning' | 'info';
}

export function AlertModal({ isOpen, title, message, onClose, type = 'info' }: AlertModalProps) {
    if (!isOpen) return null;

    const colors = {
        success: 'bg-green-50 border-green-200 text-green-800',
        error: 'bg-red-50 border-red-200 text-red-800',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        info: 'bg-blue-50 border-blue-200 text-blue-800',
    };

    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️',
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
                <div className={`${colors[type]} border rounded-lg p-4 mb-4`}>
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">{icons[type]}</span>
                        <div className="flex-1">
                            <h3 className="font-bold mb-2">{title}</h3>
                            <p className="whitespace-pre-line text-sm">{message}</p>
                        </div>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                    Tamam
                </button>
            </div>
        </div>
    );
}
