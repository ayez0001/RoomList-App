import NetInfo from "@react-native-community/netinfo";
import { Alert } from 'react-native'

export default class InternetConnection {  

 static instance = InternetConnection.instance || new InternetConnection(); //Singleton Class
  constructor() {
    var netInfoUnsubscribe = NetInfo;
  }
  

  addListener() {
    netInfoUnsubscribe = NetInfo.addEventListener(this.handleConnectivityChange);
    NetInfo.fetch().done((state) => {
      if (state.isConnected) {
        console.log("isConnected ?",state.isConnected)
         }
     
    }); 
  }
 addCallBack= (callBackOnConnectin)=> {
   this.callbacks = callBackOnConnectin
 }
  removeListener() {
    netInfoUnsubscribe();
  }
  handleConnectivityChange = state => {
  
    if (state.isConnected) {
           console.log("isConnected ?",state.isConnected)
    }
    else{
      Alert.alert(
        'No Internet Connection',
        "You cannot use this feature offline."+ "\n" + "Check your connection and try again.",
        [
          {
            text: 'OK', onPress: () => {

            }
          },
        ],
        { cancelable: false }
      )
    }
    
  };


};
 
