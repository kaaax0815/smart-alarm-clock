import { Router } from 'express';

import settingsController from './Controllers/settings';

const router = Router();

router.get('/settings', settingsController);

export default router;
