import { Tasks } from '@prisma/client';
import React from 'react';
import { completedTodos } from '../lib/taskSorter';

interface ICompletedTasksProps {
  tasks: Array<Tasks>;
  onChangeHandler: (e: React.ChangeEvent) => {};
  fetchTodos: () => {};
}

const CompletedTasks = ({
  tasks,
  onChangeHandler,
  fetchTodos,
}: ICompletedTasksProps) => {
  const deleteHandler = async (e: React.MouseEvent) => {
    const id = (e.target as HTMLInputElement).value;
    e.preventDefault();
    await fetch(`api/todos`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    fetchTodos();
  };

  return (
    <div>
      <div className="flex justify-between w-full">
        <ul>
          <h1 className="text-4xl text-black">Completed Tasks: </h1>
          {completedTodos(tasks)?.map(
            (
              todo: {
                name: string;
                description: string;
                id: number;
                completed: boolean;
              },
              index: number
            ) => (
              <div key={index} className="flex flex-row w-full items-center ">
                <h2 className="m-2 w-full text-black">
                  {' '}
                  <strong className=" line-through ">{todo.name}</strong>{' '}
                </h2>
                <p className="m-2 text-black">{todo.description}</p>
                <input
                  type="checkbox"
                  name="todoComplete"
                  value={todo.id}
                  checked={todo.completed}
                  id="todoComplete"
                  onChange={onChangeHandler}
                />
                <button
                  className="bg-red-300 hover:bg-red-500 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow m-2"
                  onClick={deleteHandler}
                  value={todo.id}
                >
                  ❌ <strong>DELETE</strong>
                </button>
              </div>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default CompletedTasks;
