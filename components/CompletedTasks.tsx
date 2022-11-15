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
      <div className="flex flex-col items-center w-full">
        <h1 className="text-4xl text-black">Completed Tasks: </h1>
        <ul className="flex flex-col items-center w-full">
          {completedTodos(tasks)?.map(
            (
              todo: {
                name: string;
                id: number;
                completed: boolean;
              },
              index: number
            ) => (
              <div
                key={index}
                className="flex flex-row items-center justify-between w-3/4 "
              >
                <h2 className="m-2 text-black">
                  {' '}
                  <strong className="line-through ">{todo.name}</strong>{' '}
                </h2>
                <div className="flex flex-row items-center justify-center">
                  <p className="mr-5 text-green-500 fort-bold">Completed!</p>
                  <p></p>
                  <input
                    type="checkbox"
                    name="todoComplete"
                    value={todo.id}
                    checked={todo.completed}
                    id="todoComplete"
                    onChange={onChangeHandler}
                  />

                  <button
                    className="px-4 py-2 m-2 font-semibold text-gray-800 bg-red-300 border border-gray-400 rounded shadow hover:bg-red-500 justify-self-end"
                    onClick={deleteHandler}
                    value={todo.id}
                  >
                    ❌ <strong>Remove</strong>
                  </button>
                </div>
              </div>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default CompletedTasks;
