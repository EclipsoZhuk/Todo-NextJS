import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

import { doc, setDoc, deleteField } from 'firebase/firestore';
import { db } from '../firebase';
import useFetchTodos from '@/hooks/useFetchTodos';

import TodoCard from './TodoCard';

interface ITodosKey {
    [key: string]: any;
}

export default function UserDashboard() {
    const { currentUser } = useAuth();
    const { todos, setTodos, loading } = useFetchTodos();

    const [title, setTitle] = useState<string>('');
    const [edit, setEdit] = useState<string>('');
    const [editedValue, setEditedValue] = useState<any>('');

    async function handleAddTodo() {
        if (!title) return;
        console.log(todos);

        if (currentUser) {
            const id = !todos
                ? 1
                : Math.max(...Object.keys(todos).map(i => +i)) + 1;
            setTodos({ ...todos, [id]: title });

            const userRef = doc(db, 'users', currentUser.uid);
            await setDoc(
                userRef,
                {
                    todos: {
                        [id]: title,
                    },
                },
                { merge: true },
            );
        }
        setTitle('');
    }

    async function handleEditTodo() {
        if (!editedValue) return;

        if (currentUser && edit) {
            setTodos({ ...todos, [edit]: editedValue });
            const userRef = doc(db, 'users', currentUser.uid);
            await setDoc(
                userRef,
                {
                    todos: {
                        [edit]: editedValue,
                    },
                },
                { merge: true },
            );
        }
        setEdit('');
        setEditedValue('');
    }

    function handleAddEdit(todoKey: string) {
        return () => {
            if (todos) {
                setEdit(todoKey);
                setEditedValue(todos[todoKey as keyof typeof todos]);
            }
        };
    }

    function handleDelete(todoKey: string) {
        return async () => {
            if (currentUser) {
                const tempObj: any = { ...todos };
                delete tempObj[todoKey];

                setTodos(tempObj);
                const userRef = doc(db, 'users', currentUser.uid);
                await setDoc(
                    userRef,
                    {
                        todos: {
                            [todoKey]: deleteField(),
                        },
                    },
                    { merge: true },
                );
            }
        };
    }

    return (
        <div className="w-full max-w-[65ch] text-xs sm:text-sm mx-auto flex flex-col flex-1 gap-3 sm:gap-5">
            <div className="flex items-stretch">
                <input
                    type="text"
                    placeholder="Enter todo"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="outline-none p-3 text-base sm:text-lg text-slate-900 flex-1"
                />
                <button
                    onClick={handleAddTodo}
                    className="w-fit px-4 sm:px-6 py-2 sm:py-3 bg-cyan-400 text-white font-medium text-base duration-300 hover:bg-purple-400"
                >
                    ADD
                </button>
            </div>
            {loading && (
                <div className="flex-1 grid place-items-center">
                    <i className="fa-solid fa-spinner animate-spin text-6xl"></i>
                </div>
            )}
            {!loading && (
                <>
                    {todos &&
                        Object.keys(todos).map(todoId => {
                            return (
                                <TodoCard
                                    handleEditTodo={handleEditTodo}
                                    key={todoId}
                                    handleAddEdit={handleAddEdit}
                                    edit={edit}
                                    todoId={todoId}
                                    editedValue={editedValue}
                                    setEditedValue={setEditedValue}
                                    handleDelete={handleDelete}
                                >
                                    {todos[todoId as keyof typeof todos]}
                                </TodoCard>
                            );
                        })}
                </>
            )}
        </div>
    );
}
