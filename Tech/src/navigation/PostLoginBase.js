import React from "react";
import { View, TouchableOpacity, Button, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import ScanQR from '../screens/ScanQR'
import * as theme from "../constants/theme"
import WebViewPage from '../screens/WebViewPage'
import RoomList from '../screens/RoomList'

const PostLoginBaseStack = createStackNavigator();


export default function App({ navigation }) {


    return (
        <PostLoginBaseStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "white",
                    elevation: 0,
                    borderBottomColor: 'transparent',
                    shadowColor: 'transparent'
                },
                headerTintColor: theme.colors.gray4,
                headerShown: false,
                headerBackTitleVisible: false
            }}>


            <PostLoginBaseStack.Screen
                name="RoomList"
                options={{
                    headerShown: true,
                    headerTintColor: theme.colors.gray4,
                    title: 'Book a Room',
                    headerTitleStyle: {
                        fontFamily: 'SFPro',
                        fontSize: 24,
                        letterSpacing: -1
                    },
                    // headerLeft: () => (
                    //     <TouchableOpacity onPress={() => navigation.goBack()}>
                    //         <Image style={{ marginLeft: 16, width: 24, height: 24 }} source={require('../../assets/arrow_back.png')} />
                    //     </TouchableOpacity>
                    // ),

                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate("ScanQR")}>
                            <Image style={{ marginRight: 30, width: 30, height: 30 }} source={require('../../assets/camera.png')} />
                        </TouchableOpacity>
                    )
                }}
                component={RoomList} />

            <PostLoginBaseStack.Screen
                name="WebViewPage"
                options={{
                    headerShown: true,
                    headerTintColor: theme.colors.gray4,
                    title: 'Book a Room',
                    headerTitleStyle: {
                        fontFamily: 'SFPro',
                        fontSize: 24,
                        letterSpacing: -1
                    },
           
                }}
                component={WebViewPage}
            />



            <PostLoginBaseStack.Screen
                name="ScanQR"
                options={{
                    headerShown: true,
                    headerTintColor: theme.colors.gray4,
                    title: '',
                    headerTitleStyle: {
                        fontFamily: 'SFPro',
                        fontSize: 24,
                        letterSpacing: -1
                    },

                }}
                component={ScanQR} />

        </PostLoginBaseStack.Navigator>
    );
}