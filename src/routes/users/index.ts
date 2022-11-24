import { UserStatus } from '@prisma/client';
import { Request, Response, Router } from 'express';

import { prisma } from '../../prisma';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({ orderBy: { id: 'asc' } });
    res.status(200).send(users);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post('/delete', async (req: Request, res: Response) => {
  if (!req?.body || !req?.body?.ids) {
    return res.sendStatus(400).end();
  }

  try {
    await prisma.user.deleteMany({
      where: { id: { in: req.body.ids } },
    });

    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post('/block', async (req: Request, res: Response) => {
  if (!req?.body || !req?.body?.ids) {
    return res.sendStatus(400).end();
  }

  try {
    await prisma.user.updateMany({
      where: { id: { in: req.body.ids } },
      data: { status: UserStatus.BLOCKED },
    });

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post('/unblock', async (req: Request, res: Response) => {
  if (!req?.body || !req?.body?.ids) {
    return res.sendStatus(400).end();
  }

  try {
    await prisma.user.updateMany({
      where: { id: { in: req.body.ids } },
      data: { status: UserStatus.ACTIVE },
    });

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

export default router;
