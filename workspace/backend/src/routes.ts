import { Router } from 'express';

import getRingtonesController from './Controllers/getRingtones';
import getSettingsController from './Controllers/getSettings';
import postRingtonesController from './Controllers/postRingtones';
import postSettingsController from './Controllers/postSettings';
import JWTMiddleware from './Middlewares/token';

const router = Router();

router.get('/settings', JWTMiddleware, getSettingsController);
router.post('/settings', JWTMiddleware, postSettingsController);
router.post('/ringtones', JWTMiddleware, postRingtonesController);
router.get('/ringtones', JWTMiddleware, getRingtonesController);

export default router;
