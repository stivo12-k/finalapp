/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';
import LandingPage from './src/pages/LandingPage';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';

AppRegistry.registerComponent(appName, () => App);
