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

    const cardColors = [
        "bg-purple-100 border-purple-300",
        "bg-pink-100 border-pink-300",
        "bg-blue-100 border-blue-300",
        "bg-yellow-100 border-yellow-300",
        "bg-green-100 border-green-300",
        "bg-red-100 border-red-300",
    ];


    return (
        <div className="bg-gray-50 py-10 px-4 flex flex-col items-center animate-fade-in">
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-purple-700 mb-2 flex items-center justify-center gap-2">
                    👋 Bem-vindo ao <span className="text-pink-600">Planly</span>!
                </h1>
                <p className="text-gray-600 text-base md:text-lg max-w-xl mx-auto">
                    Crie quadros, organize suas tarefas e acompanhe seu progresso com um visual simples e eficiente.
                </p>
            </div>

            <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">Seus Quadros</h2>

            <div className="w-full max-w-2xl mb-10 flex gap-2">
                <input
                    type="text"
                    value={newBoardName}
                    onChange={(e) => setNewBoardName(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleCreateBoard();
                    }}
                    placeholder="Digite o nome do novo quadro"
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <button
                    onClick={handleCreateBoard}
                    className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-3 rounded-lg font-semibold"
                >
                    Criar
                </button>
            </div>

            {boards.length === 0 ? (
                <p className="text-gray-500 text-center">Você ainda não criou nenhum quadro.</p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 w-full max-w-6xl">
                    {boards.map((board, index) => (
                        <div
                            key={board._id}
                            className={`relative p-10 rounded-xl shadow hover:shadow-lg transition group border ${cardColors[index % cardColors.length]}`}
                        >
                            <div
                                onClick={() => navigate(`/board/${board._id}`, { state: { board } })}
                                className="cursor-pointer"
                            >
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">{board.name}</h3>
                                <p className="text-sm text-gray-600">Clique para abrir</p>
                            </div>
                            <button
                                onClick={() => handleDeleteBoard(board._id)}
                                className="absolute top-2 right-2 text-red-500 text-sm opacity-80 hover:opacity-100"
                                title="Excluir quadro"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {ConfirmDialogElement}
        </div>
    );


}