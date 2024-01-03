import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button,Image } from 'react-native';
import { launchImageLibrary,launchCamera, ImageLibraryOptions,ImagePickerResponse} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values'
import {v4 as uuidv4} from 'uuid'
declare function alert(message?:any):void;
const AddProduct = () => {
  const [name, setProductName] = useState('');
  const [price, setProductPrice] = useState('');
  const [description, setProductDescription] = useState('');
  const [image,setImage] =useState('');

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

        setImage(imageUri);
    
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
        setImage(imageUri);
      
      }  
      }
    });
  }
  const handleSave =async () => {
    if (!name || !price || !description || !image) {
      alert('Please fill in all fields and choose an image.');
      return;
    }
    const productId=uuidv4()
    const newProduct={
        id:productId,
        name,
        price,
        description,
        image,

    }
    try{
        const existingData=await AsyncStorage.getItem('productList')
        const productList=existingData?JSON.parse(existingData):[];
        productList.push(newProduct)
        await AsyncStorage.setItem('productList',JSON.stringify(productList))
        console.log('product data saved')

    } catch (error){
        console.error('Error saving data',error);
    }
    console.log('save button pressed');
  }
    return (
        <View style={styles.container}>
          <Text style={styles.title}>Add Product</Text>
          <TextInput
            style={styles.input}
            placeholder="Product Name"
            value={name}
            onChangeText={(text) => setProductName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Product Price"
            value={price}
            onChangeText={(text) => setProductPrice(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            
            value={description}
            onChangeText={(text) => setProductDescription(text)}
          />
          <View style={{margin:10}}>
          <Button title='Choose Image' onPress={handleChooseImage}/>
          {
            image && <Image source={{uri:image}} style={{width:100,height:100}} />
          }
          </View>
          <View style={{margin:10}}>
          <Button title='Camera' onPress={handleCameraLaunch}/>
          {
            image && <Image source={{uri:image}} style={{width:100,height:100}} />
          }
          </View>
           
          <Button title="Save data" onPress={handleSave} />
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
export default AddProduct;


