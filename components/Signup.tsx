import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values'
import {v4 as uuidv4} from 'uuid'
const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignup = async () => {
    const userId=uuidv4()
    const newUser={
        id:userId,
        username,
        email,
        password,
    }
    try{
        const existingData=await AsyncStorage.getItem('userList');
        const userList=existingData?JSON.parse(existingData) : [];
        userList.push(newUser);
        await AsyncStorage.setItem('userList', JSON.stringify(userList));
        console.log('Signup data saved successfully.');
      } catch (error) {
        console.error('Error saving signup data:', error);
      }
      console.log('Signup button pressed');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#62b7c1',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 64,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
    color: 'red',
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
    width: '100%',
    borderRadius: 50,
    shadowColor: '#539ca4',
  },
});
export default Signup;
