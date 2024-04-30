'use client'

import React, { useEffect } from 'react';
import { atom, useAtom } from 'jotai'
import axios from 'axios';
import TodoCard from './todoCard';

type Todo = {
    id: number;
    content: string;
    created_at: string;
    updated_at: string;
    completed: boolean;
};

const todoAtom = atom<Todo[]>([]);
const inputTextAtom = atom('')


const Home: React.FC = () => {
    const [todos, setTodos] = useAtom(todoAtom);
    const [inputText, setInputText] = useAtom(inputTextAtom);

    const handleAddTodo = async () => {
        if (inputText.trim() !== '') {
            let data = new FormData();
            data.append('content', inputText);

            axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/todo/`, data).then(async (res) => {
                setTodos([res.data, ...todos]);
                setInputText('');
            })
        }
    };

    const handleDeleteTodo = (index: number) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
        axios.delete(`${process.env.NEXT_PUBLIC_API_BASE}/todo/${index}/`).then(() => {
            let newTodos = todos.filter((todo) => todo.id !== index);
            setTodos(newTodos);
        });
    };

    const handleEditTodo = (index: number, content: string, completed: boolean) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);

        let data = new FormData();

        data.append('content', content);
        data.append('completed', completed ? "true" : "false");

        axios.put(`${process.env.NEXT_PUBLIC_API_BASE}/todo/${index}/`, data).then(async (res) => {
            let newTodos = todos.map((todo) => {
                if (todo.id === index) {
                    return res.data;
                }
                return todo;
            });
            setTodos(newTodos);
            setInputText('');
        });
    };

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/todo/`).then((res) => {
            setTodos(res.data.results);
        });
    }, []);

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Todo List</h1>
            <div className="flex mb-4">
                <input
                    type="text"
                    className="border rounded px-2 py-1 mr-2 flex-grow"
                    placeholder="Enter todo..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white px-4 py-1 rounded"
                    onClick={handleAddTodo}
                >
                    Add
                </button>
            </div>
            <ul>
                {todos.map((todo, index) => (
                    <TodoCard key={index} todo={todo} onDelete={handleDeleteTodo} onEdit={handleEditTodo} />
                ))}
            </ul>
        </div>
    );
};

export default Home;

