import useSWR from 'swr';
import { Key, useEffect, useState } from 'react';
import TodoCreator from '../components/TodoCreation';
import CompletedTasks from '../components/CompletedTasks';

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
    const data = await res.json();
    setData(data);
    console.log(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const onChangeHandler = async (e: any, id: string) => {
    console.log(e.target.value);
    e.preventDefault();
    const idData = Number(e.target.value);

    const res = await fetch(`api/todos`, {
      method: 'PATCH',
      body: JSON.stringify({ id: idData, completed: true }),
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
          {data?.map(
            (
              todo: { name: string; description: string; id: number },
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
                  value={todo.id}
                  id="todoComplete"
                  onChange={onChangeHandler}
                />
              </div>
            )
          )}
        </ul>
      </div>
      <CompletedTasks />
    </div>
  );
};

export default ListContainer;
