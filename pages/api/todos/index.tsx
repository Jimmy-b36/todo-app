import { prisma } from '../../../db';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    const { id } = JSON.parse(req.body);
    const deleted = await prisma.tasks.delete({
      where: {
        id: Number(id),
      },
    });
    return res.json('deleted');
  }
  if (req.method === 'PATCH') {
    const { id, completed, name } = JSON.parse(req.body);
    const updateTodo = await prisma.tasks.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
        completed: completed ? true : false,
      },
    });
    return res.json(updateTodo);
  }

  if (req.method === 'POST') {
    const { name, completed } = JSON.parse(req.body);
    const createTodo = await prisma.tasks.create({
      data: {
        name,
        completed,
      },
    });
    return res.json(createTodo);
  }

  if (req.method === 'GET') {
    const todos = await prisma.tasks.findMany();
    return res.json(todos);
  }
};

export default handler;
