import { useState } from 'react';
import { useRouter } from 'next/router';

interface ITodoItem {
  name: string;
  completed: boolean;
  description: string;
}

const TodoCreator = (props: { fetchTodos: () => void }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: ITodoItem = {
      name: title,
      completed: false,
      description,
    };
    const response = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    props.fetchTodos();
    setTitle('');
    setDescription('');
  };

  return (
    <div className="flex flex-col justify-center">
      <form
        action=""
        onSubmit={submitHandler}
        method="post"
        className="flex flex-col"
      >
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <label htmlFor="description">Description: </label>
        <input
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow m-4"
          type="submit"
        >
          Submit
        </button>
      </form>
      <div className="flex justify-center"></div>
    </div>
  );
};
export default TodoCreator;
