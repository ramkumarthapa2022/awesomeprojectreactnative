// EditUser.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserList} from './Users'
interface EditUserProps {
  user: UserList;
  onSave: (editedUser: UserList) => void;
  onCancel: () => void;
}

const EditUser: React.FC<EditUserProps> = ({ user, onSave, onCancel }) => {
  const [editedUsername, setEditedUsername] = useState(user.username);
  const [editedEmail, setEditedEmail] = useState(user.email);
  const [editedPassword, setEditedPassword] = useState(user.password);

  const handleSave = () => {
    const editedUser: UserList = {
      id: user.id,
      username: editedUsername,
      email: editedEmail,
      password: editedPassword,
    };
    onSave(editedUser);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit User</Text>

      <TextInput
        style={styles.input}
        placeholder="Edit Username"
        value={editedUsername}
        onChangeText={(text) => setEditedUsername(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Edit Email"
        value={editedEmail}
        onChangeText={(text) => setEditedEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Edit Password"
        value={editedPassword}
        onChangeText={(text) => setEditedPassword(text)}
        secureTextEntry
      />
<View style={styles.button}>
<Button title="Save Changes" onPress={handleSave} />

</View>
<View>
        
<Button title="Cancel" onPress={onCancel} />

</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
    width: '100%',
    borderRadius: 8,
    color:'yellow',
    backgroundColor:'black'
  },
  button:{
    margin:8,
  }
});

export default EditUser;
