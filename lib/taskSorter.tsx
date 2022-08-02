import { Tasks } from '@prisma/client';

const uncompletedTodos = (tasks: Array<Tasks>) => {
  return tasks?.filter((task: Tasks) => !task.completed);
};
const completedTodos = (tasks: Array<Tasks>) => {
  return tasks?.filter((task: Tasks) => task.completed);
};

export { uncompletedTodos, completedTodos };
