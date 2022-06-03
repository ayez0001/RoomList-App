import React, { useState, useEffect } from 'react'
import { Platform, StatusBar, StyleSheet, View, Text, TextInput} from "react-native";
import { useFonts } from 'expo-font';
import AppNavigator from "./src/navigation/AppNavigator";
import AppLoading from 'expo-app-loading'


export default function App() {
  let [fontsLoaded] = useFonts({
    'SFPro': 'https://rsms.me/inter/font-files/Inter-SemiBoldItalic.otf?v=3.12',
  });
  if (!fontsLoaded) {
    return null;
  }

      return (
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />} 
         
          <AppNavigator />
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

// import React from "react";
// import { Platform, StatusBar, StyleSheet, View, Text, TextInput} from "react-native";

// // import MyAwesomeSplashScreen from 'expo-app-loading'
// import { Asset } from "expo-asset";
// import * as Font from "expo-font";
// import AppNavigator from "./src/navigation/AppNavigator";


// export default class App extends React.Component {
//   state = {
//     isLoadingComplete: false
//   };
  
//   constructor() {
//     super();
//      if (Text.defaultProps == null) Text.defaultProps = {};
//      Text.defaultProps.allowFontScaling = false;

//      if (TextInput.defaultProps == null) TextInput.defaultProps = {};
//      TextInput.defaultProps.allowFontScaling = false;

//  }
 
//   render() {
//     // if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
//     //   return (
//     //     <View
//     //       startAsync={this._loadResourcesAsync}
//     //       onError={this._handleLoadingError}
//     //       onFinish={this._handleFinishLoading}
//     //     />
//     //   );
//     // } else {
//       return (
//         <View style={styles.container}>
//           {Platform.OS === "ios" && <StatusBar barStyle="default" />}
//           <AppNavigator />
//         </View>
//       );
//     // }
//   }

//   _loadResourcesAsync = async () => {
//     return Promise.all([
//       // Asset.loadAsync([require("./assets/images/Base/Logo.png")]),
//       Font.loadAsync({
//         "Rubik-Black": require("./assets/fonts/Rubik-Black.ttf"),
//         "Rubik-BlackItalic": require("./assets/fonts/Rubik-BlackItalic.ttf"),
//         "Rubik-Bold": require("./assets/fonts/Rubik-Bold.ttf"),
//         "Rubik-BoldItalic": require("./assets/fonts/Rubik-BoldItalic.ttf"),
//         "Rubik-Italic": require("./assets/fonts/Rubik-Italic.ttf"),
//         "Rubik-Light": require("./assets/fonts/Rubik-Light.ttf"),
//         "Rubik-LightItalic": require("./assets/fonts/Rubik-LightItalic.ttf"),
//         "Rubik-Medium": require("./assets/fonts/Rubik-Medium.ttf"),
//         "Rubik-MediumItalic": require("./assets/fonts/Rubik-MediumItalic.ttf"),
//         "Rubik-Regular": require("./assets/fonts/Rubik-Regular.ttf"),
//         "SFPro-TextBold": require("./assets/fonts/SFPro-TextBold.ttf"),
//         "SFPro-TextLight": require("./assets/fonts/SFPro-TextLight.ttf"),
//         "SFPro-TextMedium": require("./assets/fonts/SFPro-TextMedium.ttf"),
//         "SFPro": require("./assets/fonts/SFPro-TextRegular.ttf"),
//         "SFPro-TextSemiBold": require("./assets/fonts/SFPro-TextSemibold.ttf"),
//         "SFPro-TextThin": require("./assets/fonts/SFPro-TextThin.ttf"),
//       })
//     ]);
//   };

//   _handleLoadingError = error => {
//     // In this case, you might want to report the error to your error
//     // reporting service, for example Sentry
//     console.warn(error);
//   };

//   _handleFinishLoading = () => {
//     this.setState({ isLoadingComplete: true });

//   };
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff"
//   }
// });






