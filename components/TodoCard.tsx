import React from 'react';

interface IProps {
    children: string;
    editedValue: string;
    edit: string;
    todoId: string;
    handleAddEdit: (todoId: string) => React.MouseEventHandler<HTMLElement>;
    setEditedValue: (edit: string) => void;
    handleEditTodo: () => Promise<void>;
    handleDelete: (todoId: string) => React.MouseEventHandler<HTMLElement>;
}

export default function TodoCard(props: IProps) {
    const {
        children,
        edit,
        handleAddEdit,
        editedValue,
        setEditedValue,
        todoId,
        handleEditTodo,
        handleDelete,
    } = props;
    return (
        <div className="p-2 relative sm:p-3 border flex items-stretch border-white border-solid ">
            <div className="flex-1 flex">
                {!(edit === todoId) ? (
                    <>{children}</>
                ) : (
                    <input
                        className="bg-inherit flex-1 text-white outline-none"
                        value={editedValue}
                        onChange={e => setEditedValue(e.target.value)}
                    />
                )}
            </div>
            <div className="flex items-center">
                {edit === todoId ? (
                    <i
                        onClick={handleEditTodo}
                        className="fa-solid fa-circle-check px-2 duration-300 hover:scale-125 cursor-pointer"
                    ></i>
                ) : (
                    <i
                        onClick={handleAddEdit(todoId)}
                        className="fa-solid fa-pen px-2 duration-300 hover:rotate-45 cursor-pointer"
                    ></i>
                )}

                <i
                    onClick={handleDelete(todoId)}
                    className="fa-solid fa-trash-can px-2 duration-300 hover:scale-125 cursor-pointer"
                ></i>
            </div>
        </div>
    );
}
