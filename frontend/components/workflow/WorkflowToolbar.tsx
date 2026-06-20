import { ToolbarButton } from './ToolbarButton';

interface WorkflowToolbarProps {
    onAddHttp: () => void;
    onAddEmail: () => void;
    onAddCondition: () => void;
}

export function WorkflowToolbar({ onAddHttp, onAddEmail, onAddCondition }: WorkflowToolbarProps) {
    return (
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
            <div className="flex gap-2">
                <ToolbarButton onClick={onAddHttp} icon="🌐" label="HTTP Request" />
                <ToolbarButton onClick={onAddEmail} icon="📧" label="Send Email" />
                <ToolbarButton onClick={onAddCondition} icon="🔀" label="Condition" />
            </div>
        </div>
    );
}
