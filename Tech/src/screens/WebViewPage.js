import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import * as theme from '../constants/theme'
import { WebView } from 'react-native-webview'
import React, { useState, useEffect } from 'react';
import Style from '../constants/Style'

function WebViewPage({ route, navigation }) {

    const INJECTED_JAVASCRIPT = `
    const meta = document.createElement('meta');
    meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
    meta.setAttribute('name', 'viewport');
    document.getElementsByTagName('head')[0].appendChild(meta);
    window.ReactNativeWebView.postMessage(Math.max(document.body.offsetHeight, document.body.scrollHeight));
`;
    const [webViewHeight, setWebViewHeight] = useState(null)
    const onMessage = (event) => {
        setWebViewHeight(Number(event.nativeEvent.data));
    }
    const injectedJavaScript = `window.ReactNativeWebView.postMessage(Math.max(document.body.offsetHeight, document.body.scrollHeight));`

    var dataUrl = route.params.paramKey
    // dataUrl = 'https://dev.to/franciscomendes10866/how-to-create-a-bottom-sheet-in-react-native-3n4d'
    console.log("dataUrl= ", dataUrl)


    const handleBackPress = () => {
        navigation.navigate("RoomList")
    }

    return (

        <SafeAreaView style={Style.greyContainer1}>
            <View style={Style.containerforWebView}>


                <WebView
                    scrollEnabled={true}
                    onMessage={onMessage}
                    source={{ uri: dataUrl }}
                    style={{ backgroundColor: 'transparent', justifyContent: 'center', marginTop: -150 }}
                    injectedJavaScript={INJECTED_JAVASCRIPT}
                    scalesPageToFit={false}
                />

            </View>

            <View style={{ backgroundColor: 'transparent', width: "90%" }}>
                <TouchableOpacity style={styles.blueButton} onPress={handleBackPress}>
                    <Text style={styles.textWhite} >Back to Home</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>

    )

}

export default WebViewPage

const styles = StyleSheet.create({

    blueButton: {
        height: 50,
        width: '100%',
        backgroundColor: '#6495ed',
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 25,
    },

    textWhite: {
        fontFamily: 'SFPro',
        color: theme.colors.white,
        fontSize: 18,
    },

    textValue: {
        fontFamily: 'SFPro',
        color: theme.colors.gray4,
        fontSize: 15,
        letterSpacing: -0.5,
    },

})




