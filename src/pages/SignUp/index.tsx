import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
 
} from 'react-native';
import React, {useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import TextInput from '../../components/molecules/TextInput';
import Button from '../../components/atoms/Button';
import Gap from '../../components/atoms/Gap';
import Logo from '../../assets/LogoUK.svg';
import BackButton from '../../assets/BackButton.svg';
import { showMessage } from "react-native-flash-message";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, database } from '../../config/Firebase';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(true);

  const onSignUp = () => {
    // 1. Validasi Input
    if (!email || !password || !username) {
      showMessage({
        message: "Data tidak lengkap",
        description: "Email, Username, dan Password wajib diisi.",
        type: "danger",
        icon: "danger",
      });
      return;
    }

    // 2. Proses Register
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        
        const data = {
          username: username,
          email: email,
          uid: user.uid,
        };

        
        set(ref(database, 'users/' + user.uid), data)
          .then(() => {
            console.log('Register & Database Write Berhasil');
            showMessage({
              message: "Registrasi Berhasil",
              description: "Akun Anda berhasil dibuat! Silakan Login.",
              type: "success", 
              icon: "success",
            });
            navigation.navigate('SignIn');
          })
          .catch((dbError) => {
             showMessage({
               message: "Gagal menyimpan data user",
               description: dbError.message,
               type: "danger",
             });
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error Register:", errorCode, errorMessage);
        
        let message = "Terjadi kesalahan saat registrasi.";
        if (errorCode === 'auth/email-already-in-use') {
            message = "Email sudah terdaftar.";
        } else if (errorCode === 'auth/weak-password') {
            message = "Password terlalu lemah (min. 6 karakter).";
        } else if (errorCode === 'auth/invalid-email') {
            message = "Format email tidak valid.";
        } else {
            message = errorMessage;
        }

        showMessage({
          message: "Registrasi Gagal",
          description: message,
          type: "danger",
          icon: "danger",
        });
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('LandingPage')}>
            <BackButton width={24} height={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.logoWrapper}>
          <Logo width={191} height={187} />
        </View>
        <View style={styles.formWrapper}>
          <TextInput 
            label="Email" 
            placeholder="Email" 
            value={email} 
            onChangeText={text => setEmail(text)} 
          />
          <Gap height={16} />
          
          <TextInput 
            label="Username" 
            placeholder="Username"
            value={username}
            onChangeText={text => setUsername(text)} 
          />
          <Gap height={16} />
          
          <TextInput
            label="Password"
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={text => setPassword(text)} 
          />
          <Gap height={24} />

          <View style={styles.checkboxContainer}>
            <CheckBox
              value={agree}
              onValueChange={setAgree}
              tintColors={{true: '#643173', false: '#000000'}}
              style={styles.checkbox}
            />
            <Text style={styles.checkboxLabel}>
              Agree with <Text style={styles.linkText}>terms</Text> and{' '}
              <Text style={styles.linkText}>privacy</Text>
            </Text>
          </View>
          <Gap height={24} />

          {/* Button Sign Up */}
          <Button 
            label="SIGN UP" 
            color="#643173" 
            textColor="#FFFFFF" 
            onPress={onSignUp} 
          />
          
          <Gap height={32} />

          {/* Or Divider */}
          <View style={styles.orContainer}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>Or</Text>
            <View style={styles.orLine} />
          </View>
          <Gap height={32} />

          {/* Social Buttons */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialIconText}>f</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={[styles.socialIconText, {color: '#DB4437'}]}>G</Text>
            </TouchableOpacity>
          </View>
          <Gap height={40} />

          {/* Footer */}
          <View style={styles.footerTextWrapper}>
            <Text style={styles.footerText}>Already have an account ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.signUpText}>Sign in</Text>
            </TouchableOpacity>
          </View>
          <Gap height={40} />
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 24, paddingTop: 20 },
  logoWrapper: { marginTop: 20, marginBottom: 30, justifyContent: 'center', alignItems: 'center' },
  formWrapper: { width: '100%', paddingHorizontal: 24 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginLeft: -8 },
  checkbox: { transform: [{scale: 0.9}] },
  checkboxLabel: { marginLeft: 4, fontSize: 14, color: '#000000' },
  linkText: { fontWeight: 'bold' },
  orContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  orLine: { flex: 1, height: 1, backgroundColor: '#E0E0E0' },
  orText: { marginHorizontal: 16, fontSize: 14, color: '#828282' },
  socialContainer: { flexDirection: 'row', justifyContent: 'center' },
  socialButton: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', marginHorizontal: 16, elevation: 3, shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.22, shadowRadius: 2.22 },
  socialIconText: { fontSize: 24, fontWeight: 'bold', color: '#3b5998' },
  footerTextWrapper: { flexDirection: 'row', justifyContent: 'center' },
  footerText: { color: '#000000', fontSize: 14 },
  signUpText: { color: '#6F3E76', fontSize: 14, fontWeight: 'bold' },
});