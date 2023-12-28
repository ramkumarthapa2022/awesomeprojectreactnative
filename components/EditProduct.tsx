import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from './ProductList';

interface EditProductProps {
  user: Product;
  onSave: (editedProduct: Product) => void;
  onCancel: () => void;
}

const EditProduct: React.FC<EditProductProps> = ({ user, onSave, onCancel }) => {
  const [editedProductname, setEditedProductname] = useState<string>(user.name); // Ensure that the state type matches the data type
  const [editedPrice, setEditedPrice] = useState<number>(user.price); // Ensure that the state type matches the data type
  const [editedDescription, setEditedDescription] = useState<string>(user.description); // Ensure that the state type matches the data type

  const handleSave = () => {
    const editedProduct: Product = {
      id: user.id,
      name: editedProductname,
      price: editedPrice,
      description: editedDescription,
    };
    onSave(editedProduct);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit User</Text>

      <TextInput
        style={styles.input}
        placeholder="Edit Username"
        value={editedProductname}
        onChangeText={(text) => setEditedProductname(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Edit Email"
        value={editedPrice.toString()} // Convert to string
        onChangeText={(text) => setEditedPrice(Number(text))}
      />

      <TextInput
        style={styles.input}
        placeholder="Edit Description"
        value={editedDescription}
        onChangeText={(text) => setEditedDescription(text)}
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
    color: 'yellow',
    backgroundColor: 'black',
  },
  button: {
    margin: 8,
  },
});

export default EditProduct;
