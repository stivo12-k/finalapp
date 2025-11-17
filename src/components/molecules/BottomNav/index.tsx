import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import HomeIcon from '../../../assets/home.svg';
import ExploreIcon from '../../../assets/explore.svg';
import FavoriteIcon from '../../../assets/favorite.svg';
import ProfileIcon from '../../../assets/profile.svg';

const BottomNav = ({activeTab, onTabChange}) => {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={[styles.navItem, activeTab === 'Home' && styles.navItemActive]}
        onPress={() => onTabChange('Home')}>
        <HomeIcon width={24} height={24} />
        <Text
          style={[
            styles.navLabel,
            activeTab === 'Home' && styles.navLabelActive,
          ]}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.navItem,
          activeTab === 'Explore' && styles.navItemActive,
        ]}
        onPress={() => onTabChange('Explore')}>
        <ExploreIcon width={24} height={24} />
        <Text
          style={[
            styles.navLabel,
            activeTab === 'Explore' && styles.navLabelActive,
          ]}>
          Explore
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.navItem,
          activeTab === 'Favorite' && styles.navItemActive,
        ]}
        onPress={() => onTabChange('Favorite')}>
        <FavoriteIcon width={24} height={24} />
        <Text
          style={[
            styles.navLabel,
            activeTab === 'Favorite' && styles.navLabelActive,
          ]}>
          Favorite
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.navItem,
          activeTab === 'Profile' && styles.navItemActive,
        ]}
        onPress={() => onTabChange('Profile')}>
        <ProfileIcon width={24} height={24} />
        <Text
          style={[
            styles.navLabel,
            activeTab === 'Profile' && styles.navLabelActive,
          ]}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#C4A9D6',
    paddingVertical: 12,
    paddingHorizontal: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  navItemActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  navLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: '#FFFFFF',
    marginTop: 4,
  },
  navLabelActive: {
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
});
