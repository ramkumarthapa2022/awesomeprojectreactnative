import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditUser from './EditUser';

export interface UserList {
  id: string;
  username: string;
  email: string;
  password: string;
}

const Users = () => {
  const [userListData, setUserListData] = useState<UserList[] | null>(null);
  const [editingUser, setEditingUser] = useState<UserList | null>(null);

  useEffect(() => {
    // Retrieve the signup data from AsyncStorage
    const fetchUserList = async () => {
      try {
        const storedData = await AsyncStorage.getItem('userList');
        if (storedData) {
          const parsedData = JSON.parse(storedData) as UserList[];
          setUserListData(parsedData);
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    fetchUserList();
  }, []); // Empty dependency array to run only once on mount
  const handleEditUser = async(editedUser: UserList) => {
    if (editingUser) {
     try{
       const updatedUserList = (userListData || []).map(user => (
        user.id === editingUser.id ? editedUser : user
      ));
      await AsyncStorage.setItem('userList', JSON.stringify(updatedUserList));
      setUserListData(updatedUserList);
      // Update AsyncStorage and state
      // ...

      setEditingUser(null);
    } catch (error){
      console.error('Error editing user: ',error);
    }
  }
};
  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const updatedUserList = (userListData || []).filter(user => user.id !== userId);
      await AsyncStorage.setItem('userList', JSON.stringify(updatedUserList));
      setUserListData(updatedUserList);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  const renderUserItem = ({ item }: { item: UserList }) => (
    <View style={styles.userItem}>
      <Text>ID: {item.id}</Text>
      <Text>Username: {item.username}</Text>
      <Text>Email: {item.email}</Text>
      <Text>Password: {item.password}</Text>
      {/* Edit button */}
      <TouchableOpacity onPress={() => setEditingUser(item)}>
        <View style={styles.editButton}>
          <Text style={{ color: 'white' }}>Edit</Text>
        </View>
      </TouchableOpacity>
      {/* Delete button */}
      <TouchableOpacity onPress={() => handleDeleteUser(item.id)}>
        <View style={styles.deleteButton}>
          <Text style={{ color: 'white' }}>Delete</Text>
        </View>
      </TouchableOpacity>
      {/* Render EditUser component when editingUser is not null */}
      {editingUser && (
        <EditUser
          user={editingUser}
          onSave={handleEditUser}
          onCancel={handleCancelEdit}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Data</Text>
      
      {userListData && userListData.length>0 ? (
        <FlatList
          data={userListData}
          keyExtractor={(item) => item.id}
          renderItem={renderUserItem}
        />
        
      ) : (
        <Text>No user data found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#62b7c1',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'red',
  },
  userItem: {
    backgroundColor: 'black',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  editButton: {
    backgroundColor: 'blue', // Adjust the color as needed
    borderRadius: 4,
    padding: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 4,
    padding: 8,
    marginTop: 16,
    alignItems: 'center',
  },
});

export default Users;
