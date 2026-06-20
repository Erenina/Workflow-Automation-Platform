interface ToolbarButtonProps {
    onClick: () => void;
    icon: string;
    label: string;
}

export function ToolbarButton({ onClick, icon, label }: ToolbarButtonProps) {
    return (
        <button
            onClick={onClick}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
        >
            <span>{icon}</span> {label}
        </button>
    );
}
