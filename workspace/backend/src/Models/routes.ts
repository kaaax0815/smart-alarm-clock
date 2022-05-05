import { EndpointInput, EndpointResponse } from 'express-zod-api';

import deleteAlarmsController from '../Controllers/deleteAlarms';
import deleteRingtonesController from '../Controllers/deleteRingtones';
import getAlarmsController from '../Controllers/getAlarms';
import getRingtonesController from '../Controllers/getRingtones';
import getSettingsController from '../Controllers/getSettings';
import patchAlarmsController from '../Controllers/patchAlarms';
import postAlarmsController from '../Controllers/postAlarms';
import postRingtonesController from '../Controllers/postRingtones';
import postSettingsController from '../Controllers/postSettings';

// Alarms
export type GetAlarmsInput = EndpointInput<typeof getAlarmsController>;
export type GetAlarmsOutput = EndpointResponse<typeof getAlarmsController>;

export type DeleteAlarmsInput = EndpointInput<typeof deleteAlarmsController>;
export type DeleteAlarmsOutput = EndpointResponse<typeof deleteAlarmsController>;

export type PatchAlarmsInput = EndpointInput<typeof patchAlarmsController>;
export type PatchAlarmsOutput = EndpointResponse<typeof patchAlarmsController>;

export type PostAlarmsInput = EndpointInput<typeof postAlarmsController>;
export type PostAlarmsOutput = EndpointResponse<typeof postAlarmsController>;

// Ringtones
export type GetRingtonesInput = EndpointInput<typeof getRingtonesController>;
export type GetRingtonesOutput = EndpointResponse<typeof getRingtonesController>;

export type DeleteRingtonesInput = EndpointInput<typeof deleteRingtonesController>;
export type DeleteRingtonesOutput = EndpointResponse<typeof deleteRingtonesController>;

export type PostRingtonesInput = EndpointInput<typeof postRingtonesController>;
export type PostRingtonesOutput = EndpointResponse<typeof postRingtonesController>;

// Settings
export type GetSettingsInput = EndpointInput<typeof getSettingsController>;
export type GetSettingsOutput = EndpointResponse<typeof getSettingsController>;

export type PostSettingsInput = EndpointInput<typeof postSettingsController>;
export type PostSettingsOutput = EndpointResponse<typeof postSettingsController>;
