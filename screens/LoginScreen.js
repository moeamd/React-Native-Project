import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../Redux/userSlcie';

const LoginScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('SignIn');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch()
  

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{7,15}$/; 
    if (!emailOrPhone) {
      newErrors.emailOrPhone = 'Email or Phone is required';
    } else if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
      newErrors.emailOrPhone = 'Enter a valid Email or Phone';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleLogin =async () => {
    if (validate()) {
      const res = await axios.post('http://localhost:5000/api/auth/login',
        {email:emailOrPhone , password:password}
      )
      // console.log(res.data.token);
      dispatch(fetchUser(res.data.token));
      localStorage.setItem('token',res.data.token)
      navigation.replace("Main");
    }
  };

  return (
    <View style={styles.container}>
      
      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setActiveTab('SignIn')}>
          <Text style={[styles.tabText, activeTab === 'SignIn' && styles.activeTab]}>
            Sign in
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('SignUp')}>
          <Text style={[styles.tabText, activeTab === 'SignUp' && styles.activeTab]}>
            Sign up
          </Text>
        </TouchableOpacity>
      </View>

      {/* Email/Phone Input */}
      <TextInput
        style={[styles.input, errors.emailOrPhone && { borderColor: 'red' }]}
        placeholder="Email or Phone"
        value={emailOrPhone}
        onChangeText={setEmailOrPhone}
      />
      {errors.emailOrPhone && <Text style={styles.errorText}>{errors.emailOrPhone}</Text>}

      {/* Password Input */}
      <TextInput
        style={[styles.input, errors.password && { borderColor: 'red' }]}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Forgot password as button */}
      <TouchableOpacity style={styles.forgotButton} onPress={() => console.log('Forgot Password')}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFF',
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  tabText: {
    fontSize: 18,
    color: '#999',
    marginHorizontal: 10,
    fontWeight: '500',
  },
  activeTab: {
    color: '#007AFF',
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    width: '100%',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotButton: {
    marginTop: 12,
    alignItems: 'center',
    paddingVertical: 4,
  },
  forgotText: {
    color: '#007AFF',
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
});
