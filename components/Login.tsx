import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log(
      `logging in with username: ${username} and password: ${password}`,
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>
      <Text style={{color:'black',textAlign:'left',alignSelf:'stretch',padding:12}}>Email or Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Username or Email"
        value={username}
        onChangeText={text => setUsername(text)}
        />
      <Text style={{color:'black',textAlign:'left',alignSelf:'stretch',padding:12}}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button  title="Login" onPress={handleLogin} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#62b7c1',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 64,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 16,
    padding:12,
    borderRadius:12,
    color:'red',

  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
    width: '100%',
    borderRadius:50,
    shadowColor:'#539ca4',
  },
});
export default Login;
