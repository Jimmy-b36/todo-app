import { useState } from 'react';
import { useRouter } from 'next/router';

interface ITodoItem {
  name: string;
  completed: boolean;
}

const TodoCreator = (props: { fetchTodos: () => void }) => {
  const [todo, setTodo] = useState('');

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: ITodoItem = {
      name: todo,
      completed: false,
    };
    const response = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    props.fetchTodos();
    setTodo('');
    return;
  };

  return (
    <div className="flex flex-col justify-center m-5">
      <form
        action=""
        onSubmit={submitHandler}
        method="post"
        className="flex flex-col"
      >
        <label htmlFor="todo" className="text-3xl">
          Create new todo:{' '}
        </label>
        <input
          type="text"
          name="todo"
          id="todo"
          value={todo}
          onChange={e => setTodo(e.target.value)}
          className="h-10"
        />

        <button
          className="px-4 py-2 m-4 font-semibold text-gray-800 rounded bg-gradient-to-r from-orange-500 to-pink-500 hover:bg-gray-100"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
};
export default TodoCreator;
