import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView, // Ditambahkan untuk layout yang lebih baik di layar kecil
} from 'react-native';
import React, {useState} from 'react'; // Import useState
import CheckBox from '@react-native-community/checkbox'; // Import CheckBox
import TextInput from '../../components/molecules/TextInput';
import Button from '../../components/atoms/Button';
import Gap from '../../components/atoms/Gap';
import Logo from '../../assets/LogoUK.svg';
import BackButton from '../../assets/BackButton.svg';



const SignUp = ({navigation}) => {
  // State untuk checkbox
  const [agree, setAgree] = useState(true); // Di gambar, ini sudah tercentang

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
          <TextInput label="Email" placeholder="Email" />
          <Gap height={16} />
          {/* MENAMBAHKAN FIELD USERNAME */}
          <TextInput label="Username" placeholder="Username" />
          <Gap height={16} />
          <TextInput
            label="Password"
            placeholder="Password"
            secureTextEntry={true}
            // Asumsi komponen TextInput Anda menangani ikon 'show/hide'
          />
          <Gap height={24} />

          {/* MENAMBAHKAN CHECKBOX */}
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

          {/* MENGGANTI LABEL TOMBOL */}
          <Button label="SIGN UP" color="#643173" textColor="#FFFFFF" />
          <Gap height={32} />

          {/* MENAMBAHKAN PEMISAH 'Or' */}
          <View style={styles.orContainer}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>Or</Text>
            <View style={styles.orLine} />
          </View>
          <Gap height={32} />

          {/* MENAMBAHKAN TOMBOL SOCIAL LOGIN */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              {/* Ganti Text dengan komponen Ikon Anda, misal: <FacebookIcon /> */}
              <Text style={styles.socialIconText}>f</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              {/* Ganti Text dengan komponen Ikon Anda, misal: <GoogleIcon /> */}
              <Text style={[styles.socialIconText, {color: '#DB4437'}]}>G</Text>
            </TouchableOpacity>
          </View>
          <Gap height={40} />

          <View style={styles.footerTextWrapper}>
            {/* MEMPERBAIKI TYPO */}
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
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 24, // Sesuaikan padding
    paddingTop: 20, // Sesuaikan padding
  },
  logoWrapper: {
    marginTop: 20, // Mengurangi margin atas
    marginBottom: 30, // Menambah margin bawah
    justifyContent: 'center',
    alignItems: 'center',
  },
  formWrapper: {
    width: '100%',
    paddingHorizontal: 24,
  },
  // Style baru untuk Checkbox
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -8, // Kompensasi padding default checkbox
  },
  checkbox: {
    // Anda mungkin perlu menyesuaikan ini untuk iOS/Android
    transform: [{scale: 0.9}],
  },
  checkboxLabel: {
    marginLeft: 4,
    fontSize: 14,
    color: '#000000',
  },
  linkText: {
    fontWeight: 'bold',
  },
  // Style baru untuk 'Or'
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  orText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#828282',
  },
  // Style baru untuk Social Login
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF', // Background putih
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    elevation: 3, // Shadow untuk Android
    shadowColor: '#000', // Shadow untuk iOS
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  socialIconText: {
    // Ini hanya placeholder, ganti dengan Ikon
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b5998', // Warna Facebook
  },
  // Style yang sudah ada
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
    fontWeight: 'bold', // Di gambar terlihat bold
  },
});
