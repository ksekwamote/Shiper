import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {createStackNavigator } from '@react-navigation/stack'
import * as screens from '../screens'
import Verification from '../screens/Login/Verification'


export default function StackNavigator() {

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteName="signup">
            <Stack.Screen name='home' 
                component={screens.Home}
                options={{
                    header: () => null,
                }}
            />
            <Stack.Screen name='onboarding' 
                component={screens.OnboardingScreen}
                options={{
                    header: () => null,
                }}
            />
            <Stack.Screen name='signin' 
                component={screens.SignIn} 
                options={{
                    header: () => null,
                }}
            />
            <Stack.Screen name='signup' 
                component={screens.SignUp} 
                options={{
                    header: () => null,
                }}
            />
            <Stack.Screen name ='verification'
                component={Verification}
                options={{
                    header: () => null,
                }}
            />
            <Stack.Screen name='success' 
                component={screens.Success} 
                options={{
                    header: () => null,
                }}
            />
            <Stack.Screen name="tracker"
             component={screens.Tracker}
             options={{
                header: () => null,
            }}
              />

            <Stack.Screen name="notifications"
             component={screens.Notifications}
             options={{
                header: () => null,
            }}
              />

            <Stack.Screen name="trackingDetails"
             component={screens.TrackingDetails}
              />


            <Stack.Screen name="addTracker"
             component={screens.AddTracker}
              />

            <Stack.Screen name='taxCalculator'
             component={screens.TaxCalculator}
             options={{
                header: () => null,
            }}
             />

            <Stack.Screen name='history' component={screens.History} />
            
      </Stack.Navigator>
    )
}

