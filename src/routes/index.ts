import { Router } from 'express';
import userRoutes from './account';

const router: Router = Router();

router.use('/api/account', userRoutes);

export default router;
