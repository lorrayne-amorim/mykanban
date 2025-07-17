import { Draggable } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";

type Props = {
    taskId: string;
    content: string;
    index: number;
    completed: boolean;
    onRemove: () => void;
    onUpdate: (newContent: string) => void;
    onToggleComplete: () => void;
};

export function TaskCard({
    taskId,
    content,
    index,
    completed,
    onRemove,
    onUpdate,
    onToggleComplete,
}: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(content);

    useEffect(() => {
        setEditedContent(content);
    }, [content]);

    const handleEdit = () => {
        const trimmed = editedContent.trim();
        if (!trimmed) return;
        onUpdate(trimmed);
        setIsEditing(false);
    };

    return (
        <Draggable draggableId={taskId} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`bg-white rounded-lg p-3 mb-3 shadow-sm flex items-center justify-between gap-2 transition-colors ${snapshot.isDragging ? "bg-purple-100" : ""}`}
                >
                    <span
                        onClick={onToggleComplete}
                        className="cursor-pointer text-lg select-none"
                        title="Concluir tarefa"
                    >
                        {completed ? "🟣" : "⚪"}
                    </span>

                    {isEditing ? (
                        <input
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            onBlur={handleEdit}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleEdit();
                            }}
                            autoFocus
                            className="flex-1 text-sm border-b border-purple-300 focus:outline-none"
                        />
                    ) : (
                        <span
                            onDoubleClick={() => setIsEditing(true)}
                            className={`flex-1 text-sm cursor-pointer truncate ${completed ? "line-through text-gray-400" : "text-gray-800"}`}
                            title="Clique duas vezes ou use o botão para editar"
                        >
                            {content}
                        </span>
                    )}

                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="text-gray-400 hover:text-purple-600"
                            title="Editar tarefa"
                        >
                            <FiEdit2 className="w-4 h-4" />
                        </button>
                    )}

                    <button
                        onClick={onRemove}
                        className="text-gray-400 hover:text-red-500"
                        title="Remover tarefa"
                    >
                        ✕
                    </button>
                </div>
            )}
        </Draggable>
    );
}