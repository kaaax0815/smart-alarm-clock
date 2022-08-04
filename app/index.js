/**
 * @format
 */

import {AppRegistry} from 'react-native';
import { de, registerTranslation } from 'react-native-paper-dates';
import App from './App';
import {name as appName} from './app.json';

registerTranslation('de', de);
AppRegistry.registerComponent(appName, () => App);
