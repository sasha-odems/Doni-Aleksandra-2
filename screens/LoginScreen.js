import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import {
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';
const LoginScreen = ({ onLoginChange, onLoginPress }) => {
  const [login, setLogin] = useState('');
  const navigation = useNavigation()
  const handleChange = (text) => {
    setLogin(text);
    if (onLoginChange) {
      onLoginChange(text);
    }
  };

  const handlePress = () => {
    navigation.navigate("ProductsList")
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={login}
        onChangeText={handleChange}
        placeholder="Enter Login"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="done"
      />
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Войти</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  input: {
    width: '80%',
    height: 48,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    fontSize: 16,
  },
  button: {
    width: '80%',
    height: 48,
    backgroundColor: '#007AFF',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LoginScreen;
