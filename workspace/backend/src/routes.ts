import { Router } from 'express';

import getRingtonesController from './Controllers/getRingtones';
import getSettingsController from './Controllers/getSettings';
import postRingtonesController from './Controllers/postRingtones';
import postSettingsController from './Controllers/postSettings';

const router = Router();

router.get('/settings', getSettingsController);
router.post('/settings', postSettingsController);
router.post('/ringtones', postRingtonesController);
router.get('/ringtones', getRingtonesController);

export default router;
