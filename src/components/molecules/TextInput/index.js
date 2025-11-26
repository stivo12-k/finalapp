import { StyleSheet, Text, View, TextInput as Input, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Svg, { Path } from 'react-native-svg';

// Eye Icon (Visible)
const EyeIcon = ({ color = '#8D8D8D' }) => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// Eye Off Icon (Hidden)
const EyeOffIcon = ({ color = '#8D8D8D' }) => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M1 1l22 22" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const TextInput = ({ label, placeholder, secureTextEntry, ...rest }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordField = secureTextEntry !== undefined;

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder={placeholder}
          style={[styles.input, isPasswordField && styles.inputWithIcon]}
          secureTextEntry={isPasswordField && !isPasswordVisible}
          {...rest}
        />
        {isPasswordField && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? <EyeIcon /> : <EyeOffIcon />}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginBottom: 10,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    borderColor: '#020202',
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    padding: 10,
  },
  inputWithIcon: {
    paddingRight: 45,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    marginTop: -10,
    padding: 5,
  },
});
