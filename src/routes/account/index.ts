import { Request, Response, Router } from 'express';
import { UserStatus } from '@prisma/client';
import { prisma } from '../../prisma';

const router: Router = Router();

router.post('/login', async (req: Request, res: Response) => {
  if (!req?.body) {
    return res.sendStatus(400).end();
  }

  const requiredFields = ['email', 'password'];
  const hasRequiredFiels = requiredFields.every((field) => field in req.body);
  if (!hasRequiredFiels) {
    return res.sendStatus(400).end();
  }

  try {
    let user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    const notEqualPassword = user?.password !== req.body.password;
    const userIsNotExist = !user || notEqualPassword;

    if (userIsNotExist) {
      return res.sendStatus(404);
    }

    const isBlockedUser = user.status === UserStatus.BLOCKED;
    if (isBlockedUser) {
      return res.sendStatus(403);
    }

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post('/signup', async (req: Request, res: Response) => {
  if (!req?.body) {
    return res.sendStatus(400).end();
  }

  const requiredFields = ['name', 'email', 'password'];
  const hasRequiredFiels = requiredFields.every(
    (field) => field in req.body && req.body[field] != null
  );
  if (!hasRequiredFiels) {
    return res.sendStatus(400).end();
  }

  const { name, email, password } = req.body;

  try {
    let user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      return res.status(409).send({
        message: 'The User already exists',
      });
    }

    let createdUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    res.status(201).send(createdUser);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

export default router;
