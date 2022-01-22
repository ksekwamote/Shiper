import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , SafeAreaView } from 'react-native';
import Tracker from './components/screens/Tracker/Tracker';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './components/navigation/StackNavigator';
import { createStore , applyMiddleware } from "redux"
import reducers from "./components/redux/reducers/index"
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'



const store  = createStore(reducers ,applyMiddleware(thunk))

export default function App() {
  return (

    <Provider store={store}>

        <NavigationContainer>

            <StackNavigator />

        </NavigationContainer>

    </Provider>
        
         
    
       

   
    
   
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contain: {
   paddingHorizontal: 20
  }
});
