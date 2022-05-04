import { DependsOnMethod, Routing, ServeStatic } from 'express-zod-api';
import { join } from 'path';

import deleteAlarmsController from './Controllers/deleteAlarms';
import deleteRingtonesController from './Controllers/deleteRingtones';
import getAlarmsController from './Controllers/getAlarms';
import getRingtonesController from './Controllers/getRingtones';
import getSettingsController from './Controllers/getSettings';
import patchAlarmsController from './Controllers/patchAlarms';
import postAlarmsController from './Controllers/postAlarms';
import postRingtonesController from './Controllers/postRingtones';
import postSettingsController from './Controllers/postSettings';

const routing: Routing = {
  api: {
    alarms: new DependsOnMethod({
      get: getAlarmsController,
      delete: deleteAlarmsController,
      patch: patchAlarmsController,
      post: postAlarmsController
    }),
    ringtones: new DependsOnMethod({
      get: getRingtonesController,
      delete: deleteRingtonesController,
      post: postRingtonesController
    }),
    settings: new DependsOnMethod({
      get: getSettingsController,
      post: postSettingsController
    })
  },
  ringtones: new ServeStatic(join(__dirname, '../Ringtones'), {
    index: false,
    redirect: false
  })
};

export default routing;
