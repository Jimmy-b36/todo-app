import { uncompletedTodos, completedTodos } from '../lib/taskSorter';
import { Tasks } from '@prisma/client';

const todos: Array<Tasks> = [
  {
    id: 1,
    name: 'test1',
    completed: false,
    userId: 1,
    createdAt: new Date('2022-08-04T23:13:08.248Z'),
    updatedAt: new Date('2022-08-04T23:13:08.248Z'),
  },
  {
    id: 2,
    name: 'test2',
    userId: 1,
    completed: true,
    createdAt: new Date('2022-08-04T23:13:08.248Z'),
    updatedAt: new Date('2022-08-04T23:13:08.248Z'),
  },
  {
    id: 3,
    name: 'test3',
    userId: 1,
    completed: false,
    createdAt: new Date('2022-08-04T23:13:08.248Z'),
    updatedAt: new Date('2022-08-04T23:13:08.248Z'),
  },
  {
    id: 4,
    name: 'test4',
    userId: 1,
    completed: true,
    createdAt: new Date('2022-08-04T23:13:08.248Z'),
    updatedAt: new Date('2022-08-04T23:13:08.248Z'),
  },
];

test('function should filter completed todos', () => {
  expect(uncompletedTodos(todos)).toEqual([
    {
      id: 1,
      name: 'test1',
      completed: false,
      userId: 1,
      createdAt: new Date('2022-08-04T23:13:08.248Z'),
      updatedAt: new Date('2022-08-04T23:13:08.248Z'),
    },
    {
      id: 3,
      name: 'test3',
      userId: 1,
      completed: false,
      createdAt: new Date('2022-08-04T23:13:08.248Z'),
      updatedAt: new Date('2022-08-04T23:13:08.248Z'),
    },
  ]);
  expect(uncompletedTodos(todos)).not.toEqual([
    {
      id: 2,
      name: 'test2',
      userId: 1,
      completed: true,
      createdAt: new Date('2022-08-04T23:13:08.248Z'),
      updatedAt: new Date('2022-08-04T23:13:08.248Z'),
    },
    {
      id: 4,
      name: 'test4',
      userId: 1,
      completed: true,
      createdAt: new Date('2022-08-04T23:13:08.248Z'),
      updatedAt: new Date('2022-08-04T23:13:08.248Z'),
    },
  ]);
});

test('function should filter out uncompleted todos', () => {
  expect(completedTodos(todos)).toEqual([
    {
      id: 2,
      name: 'test2',
      userId: 1,
      completed: true,
      createdAt: new Date('2022-08-04T23:13:08.248Z'),
      updatedAt: new Date('2022-08-04T23:13:08.248Z'),
    },
    {
      id: 4,
      name: 'test4',
      userId: 1,
      completed: true,
      createdAt: new Date('2022-08-04T23:13:08.248Z'),
      updatedAt: new Date('2022-08-04T23:13:08.248Z'),
    },
  ]);
  expect(completedTodos(todos)).not.toEqual([
    {
      id: 1,
      name: 'test1',
      completed: false,
      userId: 1,
      createdAt: new Date('2022-08-04T23:13:08.248Z'),
      updatedAt: new Date('2022-08-04T23:13:08.248Z'),
    },
    {
      id: 3,
      name: 'test3',
      userId: 1,
      completed: false,
      createdAt: new Date('2022-08-04T23:13:08.248Z'),
      updatedAt: new Date('2022-08-04T23:13:08.248Z'),
    },
  ]);
});
