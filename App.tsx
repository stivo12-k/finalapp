import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import SplashScreen from './src/pages/SplashScreen';
import LandingPage from './src/pages/LandingPage';
import Detail from './src/pages/Detail';
import EditProfile from './src/pages/EditProfile';

import MainNavigation from './src/navigation/MainNavigation'; 


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>


        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />

        <Stack.Screen name="MainNavigation" component={MainNavigation} />

        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="EditProfile" component={EditProfile} />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
