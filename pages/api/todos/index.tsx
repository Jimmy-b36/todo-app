import { prisma } from '../../../db';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    console.log('deleted body', req.body);
    const { id } = JSON.parse(req.body);
    const deleted = await prisma.tasks.delete({
      where: {
        id: Number(id),
      },
    });
    return res.json('deleted');
  }
  if (req.method === 'PATCH') {
    const { id, completed } = JSON.parse(req.body);
    console.log('id', id);
    console.log('completed', completed);

    const updateTodo = await prisma.tasks.update({
      where: {
        id: Number(id),
      },
      data: {
        completed: completed ? true : false,
      },
    });
    console.log('updateTodo', updateTodo);
    return res.json(updateTodo);
  }

  if (req.method === 'POST') {
    const { name, completed, description } = JSON.parse(req.body);
    const createTodo = await prisma.tasks.create({
      data: {
        name,
        completed,
        description,
      },
    });
    return res.json(createTodo);
  }

  if (req.method === 'GET') {
    const todos = await prisma.tasks.findMany();
    return res.json(todos);
  }

  // return res.json(todos);
};

export default handler;
