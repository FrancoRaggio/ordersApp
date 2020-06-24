import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Menu from './views/Menu';
import ProductDetail from './views/ProductDetail';
import SummaryOrder from './views/SummaryOrder';
import ProgressOrder from './views/ProgressOrder';
import Profile from './views/Profile';
import NewOrder from './views/NewOrder';
import FormProduct from './views/FormProduct';

import FirebaseState from './context/firebase/firebaseState';
import OrdersState from './context/orders/ordersState';

import { NavigationContainer } from '@react-navigation/native'
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import { createStackNavigator } from '@react-navigation/stack'
import {decode, encode} from 'base-64';

if (!global.btoa) { global.btoa = encode }

if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

const App = () => {

  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    fontExpo()
  }, [])

  const fontExpo = async () => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    setIsReady(true);
  }

  if (!isReady) {
    return <AppLoading />;
  }

  return (
    <>
    
      <FirebaseState >
        <OrdersState>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#ffda00'
                },
                headerTitleStyle: 'bold',
                headerTintColor: '#000'
              }}
            >
              <Stack.Screen
                name="NewOrder"
                component={NewOrder}
                options={{
                  title: "Nuevo Orden"
                }}
              />
              <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                  title: "Perfil"
                }}
              />
              <Stack.Screen
                name="Menu"
                component={Menu}
                options={{
                  title: "Nuestro Menu"
                }}
              />
              <Stack.Screen
                name="ProductDetail"
                component={ProductDetail}
                options={{
                  title: "Detalle Platillo"
                }}
              />
              <Stack.Screen
                name="FormProduct"
                component={FormProduct}
                options={{
                  title: "Ordenar Platillo"
                }}
              />
              <Stack.Screen
                name="SummaryOrder"
                component={SummaryOrder}
                options={{
                  title: "Resumen Pedido"
                }}
              />
              <Stack.Screen
                name="ProgressOrder"
                component={ProgressOrder}
                options={{
                  title: "Progreso Pedido"
                }}
              />

            </Stack.Navigator>
          </NavigationContainer>
        </OrdersState>
      </FirebaseState>
    </>
  );
};

const styles = StyleSheet.create({
 
});

export default App;