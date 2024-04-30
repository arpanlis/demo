// components/TodoCard.tsx
import { atom, useAtom } from 'jotai';
import React from 'react';

type Todo = {
    id: number;
    content: string;
    completed: boolean;
    created_at: string;
    updated_at: string;
};

type TodoCardProps = {
    todo: Todo;
    onDelete: (id: number) => void;
    onEdit: (id: number, content: string, completed: boolean) => void;
};


const TodoCard: React.FC<TodoCardProps> = ({ todo, onDelete, onEdit }) => {
    const cardAtom = atom<string>(todo.content || "");
    const completeAtom = atom<boolean>(todo.completed || false);

    const [cardText, setCard] = useAtom<string>(cardAtom);
    const [completed, setCompleted] = useAtom<boolean>(completeAtom);

    const handleDelete = () => {
        onDelete(todo.id);
    };

    const handleEdit = () => {
        const newContent = prompt('Edit todo:', todo.content);
        setCard(newContent || "");

        if (newContent !== null && newContent !== todo.content) {
            onEdit(todo.id, newContent, completed);
        }
    };

    const handleCompleteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCompleted(event.target.checked);
        onEdit(todo.id, cardText, event.target.checked);
    };

    return (
        <div className={`border rounded p-4 mb-4 ${todo.completed ? 'bg-gray-100' : ''}`}>
            <div className="flex items-center justify-between">
                <div>
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={handleCompleteChange}
                        className="mr-2"
                    />
                    <p className={`text-lg ${todo.completed ? 'line-through text-gray-500' : 'font-semibold'}`}>
                        {todo.content}
                    </p>
                </div>
                <div>
                    <button className="text-red-500 hover:text-red-700" onClick={handleDelete}>
                        Delete
                    </button>
                    <button className="ml-2 text-blue-500 hover:text-blue-700" onClick={handleEdit}>
                        Edit
                    </button>
                </div>
            </div>
            <div className="flex justify-between mt-2">
                <p className="text-gray-500 text-sm">Created at: {new Date(todo.created_at).toDateString()}</p>
                <p className="text-gray-500 text-sm">Last updated: {new Date(todo.updated_at).toDateString()}</p>
            </div>
        </div>
    );
};

export default TodoCard;

