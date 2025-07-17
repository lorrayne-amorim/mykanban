import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Board } from "../types/Board";
import { v4 as uuidv4 } from "uuid";
import { useConfirmDialog } from "../hooks/useConfirmDialog";
import toast from "react-hot-toast";

export const Home = () => {
    const [boards, setBoards] = useState<Board[]>([]);
    const [newBoardName, setNewBoardName] = useState("");
    const navigate = useNavigate();

    const { confirm, ConfirmDialogElement } = useConfirmDialog();

    useEffect(() => {
        const stored = localStorage.getItem("boards");
        if (!stored || JSON.parse(stored).length === 0) {
            const exampleBoard = [
                {
                    _id: "exemplo1",
                    name: "Exemplo de Projeto",
                    columns: {
                        todo: { name: "A fazer", items: [{ id: "1", content: "Criar estrutura", completed: false }] },
                        inProgress: { name: "Em progresso", items: [{ id: "2", content: "Estilizar layout", completed: false }] },
                        done: { name: "Concluído", items: [{ id: "3", content: "Configurar projeto", completed: true }] }
                    }
                },
                {
                    _id: "exemplo2",
                    name: "Exemplo de Quadro",
                    columns: {
                        todo: { name: "A fazer", items: [{ id: "1", content: "Criar estrutura", completed: false }] },
                        inProgress: { name: "Em progresso", items: [{ id: "2", content: "Estilizar layout", completed: false }] },
                        done: { name: "Concluído", items: [{ id: "3", content: "Configurar projeto", completed: true }] }
                    }
                },

            ];
            localStorage.setItem("boards", JSON.stringify(exampleBoard));
            setBoards(exampleBoard);
        } else {
            setBoards(JSON.parse(stored));
        }
    }, []);


    useEffect(() => {
        localStorage.setItem("boards", JSON.stringify(boards));
    }, [boards]);

    function handleCreateBoard() {
        const trimmed = newBoardName.trim();
        if (!trimmed) return;

        const nameExists = boards.some(
            (b) => b.name.trim().toLowerCase() === trimmed.toLowerCase()
        );

        if (nameExists) {
            toast.error("Já existe um board com esse nome.");
            return;
        }

        const newBoard: Board = {
            _id: uuidv4(),
            name: trimmed,
            columns: {
                todo: { name: "A fazer", items: [] },
                inProgress: { name: "Em progresso", items: [] },
                done: { name: "Concluído", items: [] },
            },
        };

        setBoards((prev) => [newBoard, ...prev]);
        setNewBoardName("");
        toast.success("Board criado com sucesso!");
    }

    function handleDeleteBoard(boardId: string) {
        confirm({
            message: "Tem certeza que deseja deletar este board?",
            onConfirm: () => {
                setBoards((prev) => prev.filter((board) => board._id !== boardId));
                toast.success("Board deletado!");
            },
        });
    }

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="mb-6 flex gap-2">
                <input
                    type="text"
                    value={newBoardName}
                    onChange={(e) => setNewBoardName(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleCreateBoard();
                    }}
                    placeholder="Nome do novo quadro"
                    className="p-3 flex-1 rounded border border-gray-300 bg-gray-100 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button
                    onClick={handleCreateBoard}
                    className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded"
                >
                    Criar
                </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {boards.map((board) => (
                    <div
                        key={board._id}
                        className="relative bg-gray-100 border border-gray-300 text-black p-6 rounded-md shadow hover:shadow-lg transition group"
                    >
                        <div
                            onClick={() =>
                                navigate(`/board/${board._id}`, { state: { board } })
                            }
                            className="cursor-pointer"
                        >
                            <h3 className="text-lg font-semibold">{board.name}</h3>
                        </div>
                        <button
                            onClick={() => handleDeleteBoard(board._id)}
                            className="absolute top-2 right-2 text-red-500 text-sm sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                            title="Deletar"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>

            {ConfirmDialogElement}
        </div>
    );
};
