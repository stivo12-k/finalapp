// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// --- Impor dari folder 'pages' Anda ---
import SignIn from './src/pages/SignIn'; 
import SignUp from './src/pages/SignUp'; // Asumsi Anda punya ini
import SplashScreen from './src/pages/SplashScreen';
import LandingPage from './src/pages/LandingPage';

// --- Impor Navigator Tab dari folder 'navigators' ---
import MainTabNavigator from './src/navigators/MainTabNavigator'; 

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        
        {/* === ALUR AUTENTIKASI === */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen} // dari pages/SplashScreen
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LandingPage"
          component={LandingPage} // dari pages/LandingPage
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn} // dari pages/SignIn
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen name="SignUp" component={SignUp} ... /> */}

        {/* === ALUR APLIKASI UTAMA === */}
        <Stack.Screen
          name="MainApp" 
          component={MainTabNavigator} // Ini adalah navigator tab Anda
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;