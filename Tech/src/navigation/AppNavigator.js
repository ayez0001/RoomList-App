import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import PostLoginBase from "./PostLoginBase"
import InternetConnection from '../common/InternetConnection'
// create base stack
const BaseStack = createStackNavigator();

export default function App() {

    InternetConnection.instance.addListener()   // check internet available or not
    
    return (
        <NavigationContainer>
            <BaseStack.Navigator screenOptions={{
                headerShown: false
            }}>
               
                <BaseStack.Screen
                    name="PostLogin"
                    component={PostLoginBase}
                />
               
            </BaseStack.Navigator>
        </NavigationContainer>
    );
}