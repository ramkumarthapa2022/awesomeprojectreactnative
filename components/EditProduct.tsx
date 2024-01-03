import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from './ProductList';
import { launchImageLibrary,launchCamera,ImageLibraryOptions,ImagePickerResponse } from 'react-native-image-picker';
interface EditProductProps {
  user: Product;
  onSave: (editedProduct: Product) => void;
  onCancel: () => void;
}
declare function alert(message?:any):void; 
const EditProduct: React.FC<EditProductProps> = ({ user, onSave, onCancel }) => {
  const [editedProductname, setEditedProductname] = useState<string>(user.name); // Ensure that the state type matches the data type
  const [editedPrice, setEditedPrice] = useState<number>(user.price); // Ensure that the state type matches the data type
  const [editedDescription, setEditedDescription] = useState<string>(user.description); // Ensure that the state type matches the data type
  const [editedImage, setEditedImage] = useState<string>(user.image); // Ensure that the state type matches the data type
  const handleChooseImage=()=>{
    const options:ImageLibraryOptions={
      mediaType:'photo',
      includeBase64:false,
      maxHeight:2000,
      maxWidth:2000,
    }

  launchImageLibrary(options, (response:ImagePickerResponse) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorMessage) {
      console.log('Image picker error: ', response.errorMessage);
      alert('Image picker error: '+ response.errorMessage);
    } else {
      let imageUri = response.assets && response.assets[0]?.uri;
      if(imageUri!==undefined){

        setEditedImage(imageUri);
    
      }
    }
  });
};
  const handleCameraLaunch=()=>{
    const options:ImageLibraryOptions={
      mediaType:'photo',
      includeBase64:false,
      maxHeight:2000,
      maxWidth:2000,
    }
    launchCamera(options, (response:ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorMessage) {
        console.log('Camera Error: ', response.errorMessage);
        alert('Camera Error: '+ response.errorMessage);
      } else {
        
        let imageUri = response.assets && response.assets[0]?.uri;
      if(imageUri!==undefined){
        setEditedImage(imageUri);
      
      }  
      }
    });
  }
  const handleSave = () => {
    const editedProduct: Product = {
      id: user.id,
      name: editedProductname,
      price: editedPrice,
      description: editedDescription,
      image:editedImage,
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
      <View style={{margin:10}}>
          <Button title='Choose Image' onPress={handleChooseImage}/>
          {
            editedImage && <Image source={{uri:editedImage}} style={{width:100,height:100}} />
          }
          </View>
          <View style={{margin:10}}>
          <Button title='Camera' onPress={handleCameraLaunch}/>
          {
            editedImage && <Image source={{uri:editedImage}} style={{width:100,height:100}} />
          }
          </View>
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
