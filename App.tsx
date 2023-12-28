import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useCallback } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Users from "./components/Users";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";

export type RootStackParamList={
  Home:undefined;
  Login:undefined
  Signup:undefined
  Users:undefined
  AddProduct:undefined
  ProductList:undefined
  EditUser:{userId:string}
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function App (): JSX.Element {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Users" component={Users} />
          <Stack.Screen name="AddProduct" component={AddProduct} />
          <Stack.Screen name="ProductList" component={ProductList} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default App;
