import { Router } from 'express';
import accountRoutes from './account';
import usersRoutes from './users';

const router: Router = Router();

router.use('/account', accountRoutes);

router.use('/users', usersRoutes);

export default router;
