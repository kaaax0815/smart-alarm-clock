import { Router } from 'express';

import deleteAlarmsController from './Controllers/deleteAlarms';
import deleteRingtonesController from './Controllers/deleteRingtones';
import getAlarmsController from './Controllers/getAlarms';
import getRingtonesController from './Controllers/getRingtones';
import getSettingsController from './Controllers/getSettings';
import patchAlarmsController from './Controllers/patchAlarms';
import postAlarmsController from './Controllers/postAlarms';
import postRingtonesController from './Controllers/postRingtones';
import postSettingsController from './Controllers/postSettings';

const router = Router();

// Settings
router.get('/settings', getSettingsController);
router.post('/settings', postSettingsController);

// Ringtons
router.get('/ringtones', getRingtonesController);
router.post('/ringtones', postRingtonesController);
router.delete('/ringtones', deleteRingtonesController);

// Alarms
router.get('/alarms', getAlarmsController);
router.post('/alarms', postAlarmsController);
router.delete('/alarms', deleteAlarmsController);
router.patch('/alarms', patchAlarmsController);

export default router;
