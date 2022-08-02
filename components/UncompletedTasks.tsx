import { Key } from 'react';
import { uncompletedTodos } from '../lib/taskSorter';

const UncompletedTasks = ({ tasks, onChangeHandler }: any) => {
  return (
    <div className="flex justify-center">
      <ul>
        <h1 className="text-4xl">Todo: </h1>
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
            <div key={index} className="flex flex-row">
              <h2 className="m-2 w-max">
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
          )
        )}
      </ul>
    </div>
  );
};

export default UncompletedTasks;
