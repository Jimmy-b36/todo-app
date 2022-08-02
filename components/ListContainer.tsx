import useSWR from 'swr';
import { Key, useEffect, useState } from 'react';
import TodoCreator from '../components/TodoCreation';
import CompletedTasks from '../components/CompletedTasks';
import UncompletedTasks from './unCompletedTasks';
import { Tasks } from '@prisma/client';

const ListContainer = () => {
  const [data, setData] = useState<Array<Tasks>>([]);
  const fetchTodos = async () => {
    const res = await fetch(`http://localhost:3000/api/todos`);
    let data: Array<Tasks> = await res.json();
    setData(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const onChangeHandler = async (e: any) => {
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
      {/* {console.log('data', data)} */}
      <UncompletedTasks tasks={data} onChangeHandler={onChangeHandler} />
      <CompletedTasks
        tasks={data}
        onChangeHandler={onChangeHandler}
        fetchTodos={fetchTodos}
      />
    </div>
  );
};

export default ListContainer;
