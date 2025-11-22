import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert // Tambahkan Alert untuk debug
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Header from '../../components/molecules/Header';
import Gap from '../../components/atoms/Gap';
// Hapus dulu NullPhoto untuk memastikan dia bukan penyebab error
// import { NullPhoto } from '../../assets'; 

// Import Firebase
import { getAuth, signOut } from "firebase/auth";
import { ref, onValue } from "firebase/database";
// Pastikan path ini benar. Jika salah, aplikasi akan crash.
import { database } from '../../config/Firebase'; 

// --- ICON COMPONENTS (Sudah benar) ---
const SettingsIcon = ({ width = 24, height = 24, color = '#6F3E76' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21.08C14.08 21.6104 13.8693 22.1191 13.4942 22.4942C13.1191 22.8693 12.6104 23.08 12.08 23.08C11.5496 23.08 11.0409 22.8693 10.6658 22.4942C10.2907 22.1191 10.08 21.6104 10.08 21.08V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H2.92C2.38957 14.08 1.88086 13.8693 1.50578 13.4942C1.13071 13.1191 0.919998 12.6104 0.919998 12.08C0.919998 11.5496 1.13071 11.0409 1.50578 10.6658C1.88086 10.2907 2.38957 10.08 2.92 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V2.92C10 2.38957 10.2107 1.88086 10.5858 1.50578C10.9609 1.13071 11.4696 0.919998 12 0.919998C12.5304 0.919998 13.0391 1.13071 13.4142 1.50578C13.7893 1.88086 14 2.38957 14 2.92V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21.08C21.6104 10 22.1191 10.2107 22.4942 10.5858C22.8693 10.9609 23.08 11.4696 23.08 12C23.08 12.5304 22.8693 13.0391 22.4942 13.4142C22.1191 13.7893 21.6104 14 21.08 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15H19.4Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ArrowRightIcon = ({ width = 16, height = 16, color = '#E5E5E5' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path d="M9 18L15 12L9 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const Profile = ({ navigation, onTabChange }) => {
  const [profile, setProfile] = useState({
    username: 'Loading...',
    email: '',
    photo: undefined,
  });

  useEffect(() => {
    console.log("1. Masuk useEffect Profile"); // Cek Log ini di Chrome
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      console.log("2. User ada:", user.uid);
      
      if (!database) {
        Alert.alert("Error", "Firebase Database belum terhubung/undefined");
        return;
      }

      const userRef = ref(database, 'users/' + user.uid);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        console.log("3. Data dari DB:", data);
        if (data) {
          setProfile(data);
        }
      }, (error) => {
        console.log("Error Firebase:", error);
        Alert.alert("Error Firebase", error.message);
      });
    } else {
      console.log("User tidak ditemukan (belum login)");
    }
  }, []);

  const handleSettings = () => {
    navigation.navigate('EditProfile');
  };

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
        navigation.replace('SignIn');
    }).catch((error) => {
        console.log(error);
    });
  };

  return (
    <View style={styles.container}>
      <Header label="Profile" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        <View style={styles.avatarContainer}>
          <View style={styles.avatarWrapper}>
            {/* PERHATIKAN DI SINI: 
              Saya mengganti NullPhoto dengan URL dummy sementara.
              Jika layar putih hilang, berarti masalahnya ada di import NullPhoto kamu sebelumnya.
            */}
            <Image 
              source={
                profile.photo && profile.photo.length > 10 
                ? {uri: profile.photo} 
                : {uri: 'https://ui-avatars.com/api/?name=User&background=random'} 
              } 
              style={styles.avatar} 
            />
          </View>
        </View>

        <Gap height={16} />

        <Text style={styles.name}>{profile.username}</Text>
        <Gap height={8} />
        <Text style={styles.email}>{profile.email}</Text>

        <Gap height={24} />
        <View style={styles.divider} />
        <Gap height={24} />

        <TouchableOpacity
          style={styles.settingsItem}
          onPress={handleSettings}
          activeOpacity={0.7}>
          <View style={styles.settingsLeft}>
            <SettingsIcon width={24} height={24} color="#6F3E76" />
            <Text style={styles.settingsText}>Settings (Edit Profile)</Text>
          </View>
          <ArrowRightIcon width={16} height={16} color="#E5E5E5" />
        </TouchableOpacity>

        <Gap height={50} />

        <TouchableOpacity
          style={styles.signOutButton}
          onPress={handleSignOut}
          activeOpacity={0.7}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E3F2FD',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#6F3E76',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  cameraIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#020202',
    textAlign: 'center',
  },
  email: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#8D8D8D',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    width: '100%',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#020202',
    marginLeft: 12,
  },
  signOutButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  signOutText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#FF0000',
  },
});