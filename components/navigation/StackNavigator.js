import React from 'react'
import { StyleSheet, View } from 'react-native'
import {createStackNavigator } from '@react-navigation/stack'
import * as screens from '../screens'
import Verification from '../screens/Login/Verification'


export default function StackNavigator() {

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteName="success">
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
            <Stack.Screen name='Menu' 
                component={screens.Menu} 
            />
            <Stack.Screen name='Account' 
                component={screens.Account} 
            />
            <Stack.Screen name='about' 
                component={screens.AboutUs} 
                options={{title:"About Us"}}
            />
            <Stack.Screen name='report' 
                component={screens.Report} 
                options={{title:"Report A Bug"}}
            />
            <Stack.Screen name='Settings' 
                component={screens.Settings} 
            />
            <Stack.Screen name="tracker"
             component={screens.Tracker}
             options={{
                header: () => null,
            }}
              />
            <Stack.Screen name="Notifications"
             component={screens.Notifications}
              />
            <Stack.Screen name="Whatsapp Notifications"
             component={screens.Whatsapp}
              />
            <Stack.Screen name="Push Notifications"
             component={screens.Push}
              />
          
            <Stack.Screen name="Whatsapp Notification"
             component={screens.Whatsapp}
              />
            <Stack.Screen name="Verify Number"
             component={screens.VerifyNumber}
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

