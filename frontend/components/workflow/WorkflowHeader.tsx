interface WorkflowHeaderProps {
    onTest?: () => void;
    onSave?: () => void;
}

export function WorkflowHeader({ onTest, onSave }: WorkflowHeaderProps) {
    return (
        <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Workflow Builder</h1>
                    <p className="text-sm text-gray-600">Drag nodes to create your automation</p>
                </div>
                <div className="flex gap-3">
                    {onTest && (
                        <button
                            onClick={onTest}
                            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Test
                        </button>
                    )}
                    {onSave && (
                        <button
                            onClick={onSave}
                            className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                        >
                            Save Workflow
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
