import { Router } from 'express';

import settingsController from './Controllers/settings';
import JWTMiddleware from './Middlewares/token';

const router = Router();

router.get('/settings', JWTMiddleware, settingsController);

export default router;
