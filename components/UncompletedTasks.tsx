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
    <div className="flex justify-center">
      <ul className="flex justify-center flex-col">
        <h1 className="text-4xl flex justify-center">Todo: </h1>
        {uncompletedTodos(tasks)?.map(
          (
            todo: {
              name: string;
              description: string;
              id: number;
              completed: boolean;
            },
            index: Key
          ) => (
            <div className="flex justify-center">
              <div key={index} className="flex flex-row w-1/2">
                <h2 className="m-2 w-full">
                  {' '}
                  <strong>{todo.name}</strong>{' '}
                </h2>
                <p className="m-2">{todo.description}</p>
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
