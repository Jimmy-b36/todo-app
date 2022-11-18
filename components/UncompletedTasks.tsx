import { Tasks } from '@prisma/client';
import React, { Key, useState } from 'react';
import { uncompletedTodos } from '../lib/taskSorter';
import Task from './Task';

interface IUncompletedTasksProps {
  tasks: Array<Tasks>;
  onChangeHandler: (e: React.ChangeEvent) => void;
  fetchTodos: () => void;
}

const UncompletedTasks = ({
  tasks,
  onChangeHandler,
  fetchTodos,
}: IUncompletedTasksProps) => {
  return (
    <div className="flex flex-col w-full">
      <h1 className="mb-3 text-5xl font-bold text-center text-black">Todo: </h1>
      <ul className="flex flex-col items-center w-full">
        {uncompletedTodos(tasks)?.map(
          (
            todo: {
              name: string;
              id: number;
              completed: boolean;
            },
            index: Key
          ) => (
            <Task
              todo={todo}
              index={index}
              onChangeHandler={onChangeHandler}
              fetchTodos={fetchTodos}
            />
          )
        )}
      </ul>
    </div>
  );
};

export default UncompletedTasks;
