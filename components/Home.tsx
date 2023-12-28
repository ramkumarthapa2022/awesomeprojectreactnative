import React from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp,NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import Login from "./Login";
type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home=({navigation}:HomeProps)=>{

    return (
        <View style={styles.container}>
            <Text style={{fontSize:32,textAlign:"center",marginTop:64,marginBottom:72}}>Welcome</Text>
            < Button title="Go to login" onPress={()=>navigation.navigate('Login')}/>
                <Text style={{fontSize:16,textAlign:'center',margin:14}}>Not already a user?</Text>
                {/* <Button title='Sign Up' onPress={()=>navigation.navigate('Signup')}/> */}
                <View style={styles.button}>
                <Button title='View Users' onPress={()=>navigation.navigate('Users')}/>
                  </View>
                  <Button title='Add Product' onPress={()=>navigation.navigate('AddProduct')}/>
                
                  <View style={styles.button}>
                <Button title='Product list' onPress={()=>navigation.navigate('ProductList')}/>
                  </View>
            </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#62b7c1',
      padding: 32,
      marginTop:20,
    },
    button:{
      margin:16,
    }
  });
export default Home