import { Router } from 'express';

import getSettingsController from './Controllers/getSettings';
import postSettingsController from './Controllers/postSettings';
import JWTMiddleware from './Middlewares/token';

const router = Router();

router.get('/settings', JWTMiddleware, getSettingsController);
router.post('/settings', JWTMiddleware, postSettingsController);

export default router;
