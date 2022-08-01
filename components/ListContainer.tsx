import useSWR from 'swr';
import { Key, useEffect, useState } from 'react';
import TodoCreator from '../components/TodoCreation';
import CompletedTasks from '../components/CompletedTasks';
import { uncompletedTasks } from '../lib/taskSorter';

interface IListContainerProps {
  map: any;
  data: {
    name: string;
    description: string;
  }[];
}

const ListContainer = () => {
  const [data, setData] = useState<IListContainerProps | null>(null);
  const fetchTodos = async () => {
    const res = await fetch(`http://localhost:3000/api/todos`);
    let data = await res.json();
    setData(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const onChangeHandler = async (e: any, id: string) => {
    e.preventDefault();
    const idData = Number(e.target.value);
    const completedData = e.target.checked;

    const res = await fetch(`api/todos`, {
      method: 'PATCH',
      body: JSON.stringify({ id: idData, completed: completedData }),
    });
    fetchTodos();
  };

  return (
    <div className="m-5">
      <div className="flex justify-center m-5">
        <TodoCreator fetchTodos={fetchTodos} />
      </div>
      <div className="flex justify-center">
        <ul>
          <h1 className="text-4xl">List container</h1>
          {uncompletedTasks(data)?.map(
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
      <CompletedTasks
        tasks={data}
        onChangeHandler={onChangeHandler}
        fetchTodos={fetchTodos}
      />
    </div>
  );
};

export default ListContainer;
