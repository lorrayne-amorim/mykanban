import { DragDropContext } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Board, ColumnType, Task } from "../types/Board";
import type { DropResult } from "@hello-pangea/dnd";
import { useConfirmDialog } from "../hooks/useConfirmDialog";
import { Column } from "../components/Column";

export const BoardPage = () => {
    const { id: boardId } = useParams();
    const navigate = useNavigate();
    const [board, setBoard] = useState<Board | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState("");
    const { confirm, ConfirmDialogElement } = useConfirmDialog();

    useEffect(() => {
        const savedBoards = JSON.parse(localStorage.getItem("boards") || "[]") as Board[];
        const found = savedBoards.find((b) => b._id === boardId);
        if (found) {
            setBoard(found);
        } else {
            navigate("/");
        }
    }, [boardId, navigate]);

    const updateBoard = (newBoard: Board) => {
        setBoard(newBoard);
        const saved = JSON.parse(localStorage.getItem("boards") || "[]") as Board[];
        const updatedBoards = saved.map((b) => (b._id === newBoard._id ? newBoard : b));
        localStorage.setItem("boards", JSON.stringify(updatedBoards));
    };

    const handleUpdateTask = (columnId: ColumnType, taskId: string, newContent: string) => {
        if (!board) return;

        const updated = { ...board };
        const taskList = updated.columns[columnId].items;
        const taskIndex = taskList.findIndex((task) => task.id === taskId);

        if (taskIndex !== -1) {
            taskList[taskIndex].content = newContent;
            updateBoard(updated);
        }
    };

    const handleDragEnd = (result: DropResult) => {
        if (!board || !result.destination) return;

        const sourceColId = result.source.droppableId as ColumnType;
        const destColId = result.destination.droppableId as ColumnType;

        const sourceItems = Array.from(board.columns[sourceColId].items);
        const destItems = sourceColId === destColId
            ? sourceItems
            : Array.from(board.columns[destColId].items);

        const [movedTask] = sourceItems.splice(result.source.index, 1);
        destItems.splice(result.destination.index, 0, movedTask);

        const newBoard: Board = {
            ...board,
            columns: {
                ...board.columns,
                [sourceColId]: {
                    ...board.columns[sourceColId],
                    items: sourceColId === destColId ? destItems : sourceItems,
                },
                [destColId]: {
                    ...board.columns[destColId],
                    items: destItems,
                },
            },
        };

        updateBoard(newBoard);
    };

    const handleAddTask = (columnId: ColumnType, content: string) => {
        if (!board) return;

        const newTask: Task = {
            id: Date.now().toString(),
            content,
            completed: false,
        };

        const updated = { ...board };
        updated.columns[columnId].items.push(newTask);
        updateBoard(updated);
    };

    const handleToggleComplete = (columnId: ColumnType, taskId: string, currentState: boolean) => {
        if (!board) return;

        const updated = { ...board };
        const taskList = updated.columns[columnId].items;
        const taskIndex = taskList.findIndex((task) => task.id === taskId);

        if (taskIndex !== -1) {
            taskList[taskIndex].completed = !currentState;
            updateBoard(updated);
        }
    };


    const handleRemoveTask = (columnId: ColumnType, taskId: string) => {
        confirm({
            message: "Tem certeza que deseja excluir esta tarefa?",
            onConfirm: () => {
                if (!board) return;
                const updated = { ...board };
                updated.columns[columnId].items = updated.columns[columnId].items.filter(
                    (task) => task.id !== taskId
                );
                updateBoard(updated);
            },
        });
    };

    if (!board) return null;

    return (
        <div className="p-6 bg-gray-100 text-gray-900 flex flex-col items-center">
            <h2
                className="text-3xl font-bold text-purple-600 mb-6 cursor-pointer text-center"
                onDoubleClick={() => {
                    setIsEditing(true);
                    setEditedName(board.name);
                }}
            >
                {isEditing ? (
                    <input
                        className="text-center border px-2 py-1 rounded shadow-sm text-lg"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        onBlur={() => {
                            updateBoard({ ...board, name: editedName });
                            setIsEditing(false);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                updateBoard({ ...board, name: editedName });
                                setIsEditing(false);
                            }
                        }}
                        autoFocus
                    />
                ) : (
                    `Quadro: ${board.name}`
                )}
            </h2>

            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="flex flex-col items-center gap-6 pb-6 sm:flex-row sm:items-start sm:justify-center">
                    {(Object.keys(board.columns) as ColumnType[]).map((colId) => {
                        const col = board.columns[colId];
                        return (
                            <Column
                                key={colId}
                                columnId={colId}
                                columnName={col.name}
                                tasks={col.items}
                                onAddTask={handleAddTask}
                                onRemoveTask={handleRemoveTask}
                                onUpdateTask={handleUpdateTask}
                                onToggleComplete={handleToggleComplete}
                            />
                        );
                    })}

                </div>
                <p className="text-sm text-gray-500 mt-4">🖱️ Dê dois cliques em um nome ou tarefa para editar</p>
            </DragDropContext>

            {ConfirmDialogElement}
        </div>
    );
};
