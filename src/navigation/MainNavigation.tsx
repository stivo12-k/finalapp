import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import HomePage from '../pages/HomePage';
import Favorite from '../pages/Favorite';
import Explore from '../pages/Explore';
import Profile from '../pages/Profile';
import BottomNav from '../components/molecules/BottomNav';

const MainNavigation = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'explore':
        return <Explore />;
      case 'favorite':
        return <Favorite />;
      case 'profile':
        return <Profile />;
      default:
        return <HomePage />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.pageContainer}>{renderPage()}</View>

      {/* Bottom Navigation HANYA ADA DI SINI */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </View>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({
  container: { flex: 1 },
  pageContainer: { flex: 1 },
});
