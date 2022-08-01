import { Tasks } from '@prisma/client';
import { completedTodos } from '../lib/taskSorter';

const CompletedTasks = ({
  tasks,
  onChangeHandler,
  fetchTodos,
}: Tasks | any) => {
  const deleteHandler = async (e: any) => {
    const id = e.target.value;
    e.preventDefault();
    await fetch(`api/todos`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    fetchTodos();
  };
  return (
    <div>
      <div className="flex justify-center">
        <ul>
          <h1 className="text-4xl">Completed Tasks</h1>
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
              <div key={index} className="flex flex-row">
                <h2 className="m-2 w-max">
                  {' '}
                  <strong className=" line-through ">{todo.name}</strong>{' '}
                </h2>
                <p className="m-2">{todo.description}</p>
                <input
                  type="checkbox"
                  name="todoComplete"
                  value={todo.id}
                  checked={todo.completed}
                  id="todoComplete"
                  onChange={onChangeHandler}
                />
                <button onClick={deleteHandler} value={todo.id}>
                  x
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
