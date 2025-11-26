import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import HomePage from '../pages/HomePage';
import Favorite from '../pages/Favorite';
import Explore from '../pages/Explore';
import Profile from '../pages/Profile';
import BottomNav from '../components/molecules/BottomNav';

const MainNavigation = () => {
  const [activeTab, setActiveTab] = useState('home');

  const navigation = useNavigation();

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage navigation={navigation} />;
      case 'explore':
        return <Explore navigation={navigation} />;
      case 'favorite':
        return <Favorite navigation={navigation} />;
      case 'profile':
        return <Profile navigation={navigation} onTabChange={setActiveTab} />;
      default:
        return <HomePage navigation={navigation} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.pageContainer}>{renderPage()}</View>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </View>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({
  container: { flex: 1 },
  pageContainer: { flex: 1 },
});
