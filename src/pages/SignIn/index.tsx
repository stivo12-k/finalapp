import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import TextInput from '../../components/molecules/TextInput';
import Button from '../../components/atoms/Button';
import Gap from '../../components/atoms/Gap';
import Logo from '../../assets/LogoUK.svg';
import BackButton from '../../assets/BackButton.svg';




const SignIn = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackButton width={24} height={24} />
        </TouchableOpacity>
        </View>
      <View style={styles.logoWrapper}>
        <Logo width={191} height={187} />
      </View>
      <View style={styles.formWrapper}>
        <TextInput 
        label="Email"
        placeholder="Email" />
        <Gap height={3} />      
        <TextInput 
        label="Password"
        placeholder="Password" secureTextEntry={true} />
        <Gap height={32} />
        <Button label="SIGN IN" color="#643173" textColor="#FFFFFF" />
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
