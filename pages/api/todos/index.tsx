import { prisma } from '../../../db';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('TODOS');

  if (req.method === 'PATCH') {
    const { id, completed } = JSON.parse(req.body);

    console.log(req.body);

    const updateTodo = await prisma.tasks.update({
      where: {
        id: Number(id),
      },
      data: {
        completed: true,
      },
    });
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
    const todos = await prisma.tasks.findMany({
      where: {
        completed: false,
      },
    });
    return res.json(todos);
  }

  // return res.json(todos);
};

export default handler;
