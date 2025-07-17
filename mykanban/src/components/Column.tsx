import { Droppable } from "@hello-pangea/dnd";
import type { Task, ColumnType } from "../types/Board";
import { IoIosAdd } from "react-icons/io";
import { useState } from "react";
import { TaskCard } from "./TaskCard";

type Props = {
    columnId: ColumnType;
    columnName: string;
    tasks: Task[];
    onAddTask: (columnId: ColumnType, content: string) => void;
    onRemoveTask: (columnId: ColumnType, taskId: string) => void;
    onUpdateTask: (columnId: ColumnType, taskId: string, newContent: string) => void;
    onToggleComplete: (columnId: ColumnType, taskId: string, currentState: boolean) => void;
};


export function Column({ columnId, columnName, tasks, onAddTask, onRemoveTask, onUpdateTask, onToggleComplete }: Props) {
    const [newTask, setNewTask] = useState("");
    const columnColors: Record<ColumnType, string> = {
        todo: "bg-red-50 border-red-200",
        inProgress: "bg-yellow-50 border-yellow-100",
        done: "bg-green-50 border-green-200",
    };

    const handleAdd = () => {
        if (!newTask.trim()) return;
        onAddTask(columnId, newTask);
        setNewTask("");
    };

    return (
        <Droppable droppableId={columnId}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`w-[18rem] rounded-xl p-4 shadow-md min-h-[200px] flex flex-col justify-between border ${columnColors[columnId]}`}
                >
                    <div>
                        <h3 className="text-purple-700 font-bold mb-3">{columnName}</h3>

                        {tasks.map((task, index) => (
                            <TaskCard
                                key={task.id}
                                taskId={task.id}
                                content={task.content}
                                index={index}
                                completed={task.completed}
                                onRemove={() => onRemoveTask(columnId, task.id)}
                                onUpdate={(newContent) => onUpdateTask(columnId, task.id, newContent)}
                                onToggleComplete={() => onToggleComplete(columnId, task.id, task.completed)}
                            />

                        ))}

                        {provided.placeholder}
                    </div>

                    <div className="flex mt-4">
                        <input
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                            placeholder="Nova tarefa"
                            className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                        <button
                            onClick={handleAdd}
                            className="bg-purple-600 hover:bg-purple-500 text-white px-3 rounded-r"
                            title="Adicionar tarefa"
                        >
                            <IoIosAdd className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </Droppable>
    );
}
