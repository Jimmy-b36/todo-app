import { Tasks } from '@prisma/client';

const uncompletedTasks = (tasks: Tasks) => {
  return tasks?.filter((task: Tasks) => !task.completed);
};
const completedTodos = (tasks: Tasks) => {
  return tasks?.filter((task: Tasks) => task.completed);
};

export { uncompletedTasks, completedTodos };
