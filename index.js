/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';
import LandingPage from './src/pages/LandingPage';
import SignIn from './src/pages/SignIn';
import HomePage from './src/pages/HomePage';
import Profile from './src/pages/Profile';


AppRegistry.registerComponent(appName, () => App);


