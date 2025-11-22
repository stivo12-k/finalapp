import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import TextInput from '../../components/molecules/TextInput';
import Button from '../../components/atoms/Button';
import Gap from '../../components/atoms/Gap';
import Logo from '../../assets/LogoUK.svg';
import BackButton from '../../assets/BackButton.svg';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { showMessage } from 'react-native-flash-message';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    navigation.navigate('MainNavigation', {userId: user.uid});
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    showMessage({
      message: errorMessage,
      type: "danger",
    });
  });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('LandingPage')}>
          <BackButton width={24} height={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.logoWrapper}>
        <Logo width={191} height={187} />
      </View>
      <View style={styles.formWrapper}>
        <TextInput label="Email" placeholder="Email" 
        value={email} 
        onChangeText={value => setEmail(value)} />
        <Gap height={3} />
        <TextInput
          label="Password"
          placeholder="Password"
          value={password} 
          onChangeText={value => setPassword(value)}
          secureTextEntry={true}
        />
        <Gap height={32} />
        <Button label="SIGN IN" color="#643173" textColor="#FFFFFF" 
        onPress={onSubmit}/>

        <Gap height={16} />

        <View style={styles.footerTextWrapper}>
          <Text style={styles.footerText}>Don’t have an account ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  logoWrapper: {
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formWrapper: {
    width: '100%',
    marginTop: 60,
    paddingHorizontal: 24,
  },
  footerTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    color: '#000000',
    fontSize: 14,
  },
  signUpText: {
    color: '#6F3E76',
    fontSize: 14,
  },
});
