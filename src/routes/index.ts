import { Router } from 'express';
import accountRoutes from './account';
import usersRoutes from './users';

const router: Router = Router();

router.use('/api/account', accountRoutes);

router.use('/api/users', usersRoutes);

export default router;
