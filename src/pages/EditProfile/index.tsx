import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput as RNTextInput,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { launchImageLibrary } from 'react-native-image-picker';
import { showMessage } from "react-native-flash-message";

// Import Component Sendiri
import Header from '../../components/molecules/Header';
import Gap from '../../components/atoms/Gap';
import TextInput from '../../components/molecules/TextInput';
import Button from '../../components/atoms/Button';

// Import Firebase
import { getAuth } from "firebase/auth";
import { ref, update, onValue } from "firebase/database";
import { database } from '../../config/Firebase';

// --- ICON COMPONENTS (Ditaruh disini agar tidak error import) ---
const CameraIcon = ({ width = 16, height = 16, color = '#FFFFFF' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M2 8.5C2 7.39543 2.89543 6.5 4 6.5H5.5C6.05228 6.5 6.5 6.05228 6.5 5.5C6.5 4.94772 6.94772 4.5 7.5 4.5H16.5C17.0523 4.5 17.5 4.94772 17.5 5.5C17.5 6.05228 17.9477 6.5 18.5 6.5H20C21.1046 6.5 22 7.39543 22 8.5V17.5C22 18.6046 21.1046 19.5 20 19.5H4C2.89543 19.5 2 18.6046 2 17.5V8.5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const CalendarIcon = ({ width = 20, height = 20, color = '#8D8D8D' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M16 2V6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M8 2V6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M3 10H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const EditProfile = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  
  const [photo, setPhoto] = useState({uri: 'https://ui-avatars.com/api/?name=User&background=random'});
  const [photoForDB, setPhotoForDB] = useState('');

  const auth = getAuth();
  const user = auth.currentUser;

  // === REQUEST PERMISSION GALERI ===
  const requestGalleryPermission = async () => {
    try {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }

      // Android 12 ke bawah
      if (Platform.OS === 'android') {
        const grantedLegacy = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
        return grantedLegacy === PermissionsAndroid.RESULTS.GRANTED;
      }

      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  // 1. Ambil Data Awal dari Firebase
  useEffect(() => {
    if (user) {
      const userRef = ref(database, 'users/' + user.uid);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setUsername(data.username);
          setEmail(data.email);
          setDateOfBirth(data.dateOfBirth || '');
          
          if (data.photo) {
            setPhoto({ uri: data.photo });
          }
        }
      }, { onlyOnce: true });
    }
  }, []);

  // === CHANGE PHOTO DENGAN PERMISSION ===
  const changePhoto = async () => {
    const hasPermission = await requestGalleryPermission();

    if (!hasPermission) {
      showMessage({
        message: "Izin Diperlukan",
        description: "Aplikasi membutuhkan izin untuk mengakses galeri.",
        type: "danger",
      });
      return;
    }

    const options = {
      mediaType: 'photo',
      quality: 0.5,
      maxWidth: 200,
      maxHeight: 200,
      includeBase64: true
    };

    launchImageLibrary(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
        showMessage({
          message: "Gagal mengambil gambar",
          type: "danger",
        });
      } else if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        const source = { uri: asset.uri };

        setPhoto(source);
        setPhotoForDB(`data:${asset.type};base64,${asset.base64}`);
      }
    });
  };

  // 3. Fungsi Simpan Data
  const handleSave = () => {
    if(user) {
        const data = {
            username: username,
            dateOfBirth: dateOfBirth,
        };

        if (photoForDB) {
            data.photo = photoForDB;
        }

        update(ref(database, `users/${user.uid}`), data)
        .then(() => {
            showMessage({
                message: "Sukses",
                description: "Profile berhasil diupdate",
                type: "success",
            });
            navigation.goBack();
        })
        .catch((err) => {
            showMessage({
                message: "Gagal",
                description: err.message,
                type: "danger",
            });
        });
    } else {
        showMessage({
            message: "Error",
            description: "User tidak ditemukan",
            type: "danger",
        });
    }
  };

  return (
    <View style={styles.container}>
      <Header label="Edit Profile" backButton={true} onPress={() => navigation.goBack()} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        <View style={styles.avatarContainer}>
          <View style={styles.avatarWrapper}>
            <Image source={photo} style={styles.avatar} />
            
            <TouchableOpacity 
              style={styles.cameraButton} 
              onPress={changePhoto}>
              <View style={styles.cameraIconContainer}>
                <CameraIcon width={16} height={16} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <Gap height={32} />

        <TextInput
          label="Username"
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <Gap height={16} />

        <TextInput
          label="Email"
          placeholder="Email"
          value={email}
          editable={false}
          selectTextOnFocus={false}
        />
        <Gap height={16} />

        <View>
          <Text style={styles.label}>Date of birth</Text>
          <View style={styles.dateInputContainer}>
            <RNTextInput
              placeholder="Contoh: 12/05/1995"
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
              style={styles.dateInput}
              placeholderTextColor="#8D8D8D"
            />
            <View style={styles.calendarIconContainer}>
              <CalendarIcon width={20} height={20} color="#8D8D8D" />
            </View>
          </View>
        </View>

        <Gap height={40} />

        <Button
          label="Save Change"
          color="#6F3E76"
          textColor="#FFFFFF"
          onPress={handleSave}
        />
      </ScrollView>
    </View>
  );
};

export default EditProfile;

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
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginBottom: 10,
    color: '#020202',
  },
  dateInputContainer: {
    position: 'relative',
  },
  dateInput: {
    borderColor: '#020202',
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    padding: 10,
    paddingRight: 50,
  },
  calendarIconContainer: {
    position: 'absolute',
    right: 12,
    top: '50%',
    marginTop: -10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
  },
});
