import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../components/molecules/Header';
import TextInput from '../../components/molecules/TextInput';
import Button from '../../components/atoms/Button';
import Gap from '../../components/atoms/Gap';
import Logo from '../../assets/LogoUK.svg';

const LandingPage = ({navigation}) => {
  return (
    <View style={styles.container}>
        <View style={styles.logoWrapper}>
        <Logo width={191} height={187} />
        <Gap height={50} />
        <Text style={{fontFamily: 'Poppins-Medium', fontSize: 24, color: '#1F2A37'}}>find <Text style={{fontWeight: 'bold',color: '#5D286B'}}>Your</Text> <Text style={{color: '#D2AA1A'}}>Kost</Text>  with us</Text>
    </View>
        <Gap height={120} />
    <View style={styles.formWrapper}>
        <Gap height={24} />
        <Button label="Sign In"
            color="#6F3E76"
            textColor="#FFFFFF"
            onPress={() => navigation.navigate('SignIn')}

         />
        <Gap height={12} />
        <Button
          label="Create New Account"
          color="#6F3E76"
          textColor="#FFFFFF"
          onPress={() => navigation.navigate('SignUp')}

        />
    </View>

    </View>
  );
};

export default LandingPage;

const styles = StyleSheet.create({

  contentWrapper: {
    marginTop: 24,
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 26,
  },
    container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    alignItems: 'center'
    
  },
  formWrapper: {
    width: '100%',            
    marginTop: 60,
    paddingHorizontal: 24,
  },
  logoWrapper: {
    marginTop: 80,            
    justifyContent: 'center',
    alignItems: 'center',
  },
});