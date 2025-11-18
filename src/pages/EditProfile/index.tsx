import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput as RNTextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {Button, Gap} from '../../components/atoms';
import {Header, TextInput} from '../../components/molecules';
import ipo from '../../assets/ipo.jpg';
import CalendarIcon from '../../assets/Calendar.svg';

const EditProfile = ({navigation}) => {
  const [username, setUsername] = useState('George Kaunang');
  const [email, setEmail] = useState('kunangkunang@gmail.com');
  const [dateOfBirth, setDateOfBirth] = useState('November/21/1992');

  const handleBackPress = () => {
    if (navigation && navigation.goBack) navigation.goBack();
  };

  const handleSave = () => {
    // Handle save logic here
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header label="Edit Profile" backButton={true} onPress={handleBackPress} />

      

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <View style={styles.profileHeader}>
          <Gap height={40} />
            <View style={styles.avatarContainer}>
              <View style={styles.avatarBackground} />
              

              <View style={styles.avatarPlaceholder}>
                <Image source={ipo} style={styles.avatarImage} />
                <Icon name="person" size={1} color="#5b6b73ff" />
              </View>

              <TouchableOpacity style={styles.cameraButton} onPress={() => {}}>
                <Icon name="camera" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <Gap height={60} />
          </View>

          <Gap height={40} />

          <View style={styles.formContainer}>
            <TextInput
              label="Username"
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />

            <Gap height={20} />

            <TextInput
              label="Email"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <Gap height={20} />

            <View>
              <Text style={styles.label}>Date of birth</Text>
              <View style={styles.dateInputContainer}>
                <RNTextInput
                  placeholder="Date of birth"
                  value={dateOfBirth}
                  onChangeText={setDateOfBirth}
                  style={styles.dateInput}
                />
                <TouchableOpacity style={styles.calendarIcon}>
                  <CalendarIcon width={20} height={20} />
                  <Gap height={1} />
                  <Text style={styles.calendarIconText}></Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Gap height={40} />

          <View style={styles.saveButtonWrapper}>
            <Button
              label="Save Change"
              color="#6F3E76"
              textColor="#FFFFFF"
              type={''}
              icon={null}
              onPress={handleSave}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
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
    overflow: 'hidden',
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
    zIndex: 1,
  },
  formContainer: {
    width: '100%',
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
    paddingRight: 45,
  },
  calendarIcon: {
    position: 'absolute',
    right: 15,
    top: 10,
    zIndex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonWrapper: {
    width: '100%',
    marginTop: 'auto',
  },
});

export default EditProfile;
