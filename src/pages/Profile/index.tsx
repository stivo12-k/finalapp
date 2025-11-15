import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {Button, Gap} from '../../components/atoms';
import {Header} from '../../components/molecules';
import ipo from '../../assets/ipo.jpg'

const ProfileScreen = ({navigation}) => {
  const handleBackPress = () => {
    if (navigation && navigation.goBack) navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header label="Profile" backButton={true} onPress={handleBackPress} />

      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarBackground} />

            <View style={styles.avatarPlaceholder}>
              {/* gunakan Image jika Anda punya foto profil nyata */}
              <Image source={ipo} style={styles.avatarImage} />
              <Icon name="person" size={1} color="#5B6B73" />
            </View>

            <TouchableOpacity style={styles.cameraButton} onPress={() => {}}>
              <Icon name="camera" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <Gap height={70} />

          <Text style={styles.userName}>George Kaunang</Text>
          <Text style={styles.userEmail}>kunangkunang@gmail.com</Text>
        </View>

        <Gap height={36} />

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
            <Icon name="settings-outline" size={22} color="#6B6B6B" />
            <Text style={styles.menuItemText}>Settings</Text>
            <Icon name="chevron-forward-outline" size={22} color="#C4C4C4" />
          </TouchableOpacity>
        </View>

        <View style={styles.signOutWrapper}>
          <Button
            label="Sign Out"
            color="transparent"
            textColor="#FF6B6B"
            type={''}
            icon={null}
            onPress={() => console.log('Sign Out pressed')}
          />
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => {}}>
          <Icon name="home" size={22} color="#6F3E76" />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => {}}>
          <Icon name="search" size={22} color="#999999" />
          <Text style={styles.navLabel}>Explore</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => {}}>
          <Icon name="heart-outline" size={22} color="#999999" />
          <Text style={styles.navLabel}>Favorita</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.navItem, styles.navItemActive]} onPress={() => {}}>
          <Icon name="person" size={22} color="#6F3E76" />
          <Text style={[styles.navLabel, styles.navLabelActive]}>Profila</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatarContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: 140,
  },
  avatarPlaceholder: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#E8F0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarBackground: {
    position: 'absolute',
    alignSelf: 'center',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#DCEEFF',
    top: -40,
    zIndex: 0,
  },
  avatarImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  cameraButton: {
    position: 'absolute',
    right: -6,
    bottom: -6,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#6F3E76',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#1F2A37',
    marginTop: 8,
  },
  userEmail: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#9AA0A6',
    marginTop: 4,
  },
  menuContainer: {
    marginTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    justifyContent: 'space-between',
    elevation: 1,
  },
  menuItemText: {
    flex: 1,
    marginLeft: 12,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#333333',
  },
  signOutWrapper: {
    marginTop: 'auto',
    marginBottom: 24,
    alignSelf: 'center',
    width: '60%',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#D4C4E0',
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  navLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: '#999999',
    marginTop: 4,
  },
  navLabelActive: {
    fontFamily: 'Poppins-Bold',
    fontSize: 10,
    color: '#6F3E76',
  },
});

export default ProfileScreen;