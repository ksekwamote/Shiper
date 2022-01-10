import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , SafeAreaView } from 'react-native';
import Tracker from './components/screens/Tracker/Tracker';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './components/navigation/StackNavigator';



export default function App() {
  return (

          <NavigationContainer>

             <StackNavigator />

          </NavigationContainer>
         
    
       

   
    
   
  
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
