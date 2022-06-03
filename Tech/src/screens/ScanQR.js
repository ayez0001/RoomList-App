import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Style from '../constants/Style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageConstants from '../constants/AsyncStorageConstants'


export default function App({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {

    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');

    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {

    var data = AsyncStorage.setItem(AsyncStorageConstants.StorageConstants.SCAN_DATA, data)
    _handleOpenWithLinking(data)
  };

  _handleOpenWithLinking = async () => {
    var data = await AsyncStorage.getItem(AsyncStorageConstants.StorageConstants.SCAN_DATA)
    console.log("retrieve scan data= ", data)
    // Linking.openURL(data);
    navigation.navigate('WebViewPage', { paramKey: data })
    setScanned(false);

  };


  if (hasPermission === null) {
    return <Text style={Style.textGarden}>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={[StyleSheet.absoluteFill, styles.container]} />

      </View>
      <View style={{ width: '80%', aspectRatio: 1, backgroundColor: 'transparent', position: 'absolute', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', borderWidth: 4, borderRadius: 20, borderColor: 'lightgray' }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    color: '#ff8c00',
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    flexDirection: 'column'
  },
});

