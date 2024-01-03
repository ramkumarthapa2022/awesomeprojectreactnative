import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList,TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditProduct from './EditProduct';


export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image:string;
}

const ProductList: React.FC = () => {
  const [productListData, setProductListData] = useState<Product[] | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const storedData = await AsyncStorage.getItem('productList');
        if (storedData) {
          const parsedData = JSON.parse(storedData) as Product[];
          setProductListData(parsedData);
        }
      } catch (error) {
        console.error('Error retrieving product data:', error);
      }
    };

    fetchProductList();
  }, []); // Empty dependency array to run only once on mount
  const handleSearch = () => {
    console.log('Searching...')
    console.log('Search Query:',searchQuery)
    
    const filteredProducts = (productListData || []).filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log('Filtered Products',filteredProducts);
    setProductListData(filteredProducts);
  };
  

  const handleDeleteProduct = async (productId: string) => {
    // Display a confirmation dialog
  Alert.alert(
    'Confirm Deletion',
    'Are you sure you want to delete this product?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          try {

      const updatedProductList = (productListData || []).filter(product => product.id !== productId);
      await AsyncStorage.setItem('productList', JSON.stringify(updatedProductList));
      setProductListData(updatedProductList);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  },
    style: 'destructive',
    },
  ],
  { cancelable: true }
  );
  };


  const handleEditProduct = async (editedProduct: Product) => {
    if (editingProduct) {
      try {
        const updatedProductList = (productListData || []).map(product => (
          product.id === editingProduct.id ? editedProduct : product
        ));
        await AsyncStorage.setItem('productList', JSON.stringify(updatedProductList));
        setProductListData(updatedProductList);

        setEditingProduct(null);
      } catch (error) {
        console.error('Error editing product: ', error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={styles.productItem}>
      {/* <Text>ID: {item.id}</Text> */}
      <Text>Name: {item.name}</Text>
      <Text>Price: {item.price}</Text>
      <Text>Description: {item.description}</Text>
      {item.image && <Image source={{uri:item.image}} style={styles.productImage}/>}

    {/* Edit button */}
    <TouchableOpacity onPress={() => setEditingProduct(item)}>
      <View style={styles.editButton}>
        <Text style={{ color: 'white' }}>Edit</Text>
      </View>
    </TouchableOpacity>

      {/* Delete button */}
      <TouchableOpacity onPress={() => handleDeleteProduct(item.id)}>
        <View style={styles.deleteButton}>
          <Text style={{ color: 'white' }}>Delete</Text>
        </View>
      </TouchableOpacity>

      {/* Render EditProduct component when editingProduct is not null */}
    {editingProduct && (
      <EditProduct
        user={editingProduct}
        onSave={handleEditProduct}
        onCancel={handleCancelEdit}
      />
    )}



    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={(text) =>{
            setSearchQuery(text)
            handleSearch()
          }} 
        />
        {/* <TouchableOpacity onPress={handleSearch}>
          <View style={styles.searchButton}>
            <Text style={{ color: 'white' }}>Search</Text>
          </View>
        </TouchableOpacity> */}
      </View>
      <Text style={styles.title}>Product Data</Text>
      {productListData && productListData.length > 0 ? (
        <FlatList
          data={productListData}
          keyExtractor={(item) => item.id}
          renderItem={renderProductItem}
        />
      ) : (
        <Text>No product data found.</Text>
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
  productItem: {
    backgroundColor: 'black',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },  searchBar: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'black',
    borderWidth: 2,
    marginRight: 8,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 8,
  },
  searchButton: {
    flex:4,
    backgroundColor: 'blue',
    borderRadius: 4,
    padding: 8,
    alignItems: 'center',
  },
  editButton:{
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
  productImage:{
    width:100,
    height:100,
    marginTop:8,
    borderRadius:8,
  }
});

export default ProductList;
