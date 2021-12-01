import { Router } from 'express';

import testController from './Controllers/test';
import testMiddleware from './Middlewares/test';

const router = Router();

router.get('/', testMiddleware, testController);

export default router;
