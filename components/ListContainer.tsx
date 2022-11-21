import useSWR from 'swr';
import { Key, useEffect, useState } from 'react';
import TodoCreator from './TodoCreator';
import CompletedTasks from '../components/CompletedTasks';
import UncompletedTasks from '../components/UncompletedTasks';
import { Tasks } from '@prisma/client';

const ListContainer = () => {
  const [data, setData] = useState<Array<Tasks>>([]);

  const fetchTodos = async () => {
    const res = await fetch(`/api/todos`);
    let data: Array<Tasks> = await res.json();
    setData(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const onChangeHandler = async (e: React.ChangeEvent) => {
    e.preventDefault();
    const idData = Number((e.target as HTMLInputElement).value);
    const completedData = (e.target as HTMLInputElement).checked;

    const res = await fetch(`api/todos`, {
      method: 'PATCH',
      body: JSON.stringify({ id: idData, completed: completedData }),
    });
    fetchTodos();
  };

  return (
    <div className="p-5 bg-black">
      <p className="pt-10 text-5xl font-bold text-center underline">
        TO-DO List
      </p>
      <div className="flex items-center justify-center text-center lg:m-5 md:m-5">
        <TodoCreator fetchTodos={fetchTodos} />
      </div>
      <p className="text-center">(click on a task to edit)</p>
      <div className="flex justify-center">
        <div className="block w-4/5 p-6 bg-white rounded-lg shadow-lg lg:w-2/3 md:w-2/3">
          <UncompletedTasks
            tasks={data}
            onChangeHandler={onChangeHandler}
            fetchTodos={fetchTodos}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="block w-4/5 p-6 m-10 bg-white rounded-lg shadow-lg lg:w-2/3 md:w-2/3">
          <CompletedTasks
            tasks={data}
            onChangeHandler={onChangeHandler}
            fetchTodos={fetchTodos}
          />
        </div>
      </div>
    </div>
  );
};

export default ListContainer;
