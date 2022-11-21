import { Key, useState } from 'react';
import { nanoid } from 'nanoid';

interface ITaskProps {
  todo: {
    name: string;
    id: number;
    completed: boolean;
  };

  onChangeHandler: (e: React.ChangeEvent) => void;
  fetchTodos: () => void;
}

const Task = ({ todo, onChangeHandler, fetchTodos }: ITaskProps) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>('');

  const updateTodo = async (e: React.FormEvent) => {
    e.preventDefault();

    const id = (e.target as HTMLInputElement).id;
    console.log('🚀 ~ updateTodo ~ id', id);
    const res = await fetch(`api/todos`, {
      method: 'PATCH',
      body: JSON.stringify({ id, name: editValue }),
    });
    fetchTodos();
    setEditing(false);
  };
  return (
    <>
      {!editing ? (
        <li className="flex flex-row items-center justify-between w-full md:w-3/4 lg:w-3/4">
          <h2
            className="w-full m-2 text-black md:text-2xl lg:text-2xl hover:cursor-pointer"
            onClick={() => {
              setEditing(true);
              setEditValue(todo.name);
            }}
          >
            <strong>{todo.name}</strong>{' '}
          </h2>
          <input
            type="checkbox"
            name="todoComplete"
            checked={todo.completed}
            value={todo.id}
            id="todoComplete"
            onChange={onChangeHandler}
            className="bg-gray-200 checkbox checkbox-lg"
          />
        </li>
      ) : (
        <form
          action=""
          onSubmit={updateTodo}
          className="flex flex-col"
          id={todo.id.toString()}
        >
          <label htmlFor="todo">To-do: </label>
          <input
            type="text"
            name="todo"
            id="todo"
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
          />

          <button
            className="px-4 py-2 m-4 font-semibold text-gray-800 bg-white border border-gray-400 rounded shadow hover:bg-gray-100"
            type="submit"
          >
            edit
          </button>
        </form>
      )}
    </>
  );
};

export default Task;
