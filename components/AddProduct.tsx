import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values'
import {v4 as uuidv4} from 'uuid'

const AddProduct = () => {
  const [name, setProductName] = useState('');
  const [price, setProductPrice] = useState('');
  const [description, setProductDescription] = useState('');

  const handleSave =async () => {
    const productId=uuidv4()
    const newProduct={
        id:productId,
        name,
        price,
        description,

    }
    try{
        const existingData=await AsyncStorage.getItem('productList')
        const productList=existingData?JSON.parse(existingData):[];
        productList.push(newProduct)
        await AsyncStorage.setItem('productList',JSON.stringify(productList))
        console.log('product data saved')

    } catch (error){
        console.error('error saving data',error);
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