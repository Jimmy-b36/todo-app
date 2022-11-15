import { Tasks } from '@prisma/client';
import React, { Key } from 'react';
import { uncompletedTodos } from '../lib/taskSorter';

interface IUncompletedTasksProps {
  tasks: Array<Tasks>;
  onChangeHandler: (e: React.ChangeEvent) => void;
}

const UncompletedTasks = ({
  tasks,
  onChangeHandler,
}: IUncompletedTasksProps) => {
  return (
    <div className="flex justify-center w-full">
      <ul className="flex flex-col">
        <h1 className="text-4xl text-center text-black">Todo: </h1>
        {uncompletedTodos(tasks)?.map(
          (
            todo: {
              name: string;
              id: number;
              completed: boolean;
            },
            index: Key
          ) => (
            <div className="flex justify-center">
              <div key={index} className="flex flex-row w-full">
                <h2 className="w-full m-2 text-black">
                  {' '}
                  <strong>{todo.name}</strong>{' '}
                </h2>
                <input
                  type="checkbox"
                  name="todoComplete"
                  checked={todo.completed}
                  value={todo.id}
                  id="todoComplete"
                  onChange={onChangeHandler}
                />
              </div>
            </div>
          )
        )}
      </ul>
    </div>
  );
};

export default UncompletedTasks;
