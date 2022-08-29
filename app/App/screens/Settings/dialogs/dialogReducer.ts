const DEFAULT_BASE_STATE = {
  isError: false,
  errorMessage: '',
};

export const DEFAULT_IP_STATE = {
  ...DEFAULT_BASE_STATE,
  type: 'ip',
  ip: '',
} as IPState;

export const DEFAULT_LOCATION_STATE = {
  ...DEFAULT_BASE_STATE,
  type: 'location',
  city: '',
  countryCode: '',
} as LocationState;

export const DEFAULT_TIMEZONE_STATE = {
  ...DEFAULT_BASE_STATE,
  type: 'timezone',
  timezone: '',
} as TimezoneState;

interface BaseState {
  isError: boolean;
  errorMessage: string;
}

export interface IPState extends BaseState {
  ip: string;
  type: 'ip';
}

export interface LocationState extends BaseState {
  city: string;
  countryCode: string;
  type: 'location';
}

export interface TimezoneState extends BaseState {
  timezone: string;
  type: 'timezone';
}

type DialogState = IPState | LocationState | TimezoneState;

export enum DialogActionType {
  ERROR = 'ERROR',
  DATA = 'DATA',
}

interface DialogDataAction<T extends DialogState> {
  type: DialogActionType.DATA;
  payload: Partial<Omit<T, 'isError' | 'errorMessage' | 'type'>>;
}

interface DialogErrorAction {
  type: DialogActionType.ERROR;
  payload: Omit<BaseState, 'isError'>;
}

export default function dialogReducer<T extends DialogState>(
  state: T,
  action: DialogDataAction<T> | DialogErrorAction,
) {
  switch (action.type) {
    case DialogActionType.ERROR:
      return {
        ...state,
        isError: true,
        errorMessage: action.payload.errorMessage,
      };
    case DialogActionType.DATA:
      const newState = { ...state };
      newState.isError = false;
      if (newState.type === 'ip') {
        newState.ip =
          (action as DialogDataAction<IPState>).payload.ip || newState.ip;
      } else if (newState.type === 'location') {
        newState.city =
          (action as DialogDataAction<LocationState>).payload.city ||
          newState.city;
        newState.countryCode =
          (action as DialogDataAction<LocationState>).payload.countryCode ||
          newState.countryCode;
      } else if (state.type === 'timezone') {
        newState.timezone =
          (action as DialogDataAction<TimezoneState>).payload.timezone ||
          newState.timezone;
      } else {
        return state;
      }
      return newState;
    default:
      return state;
  }
}
