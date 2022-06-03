import { StatusBar, StyleSheet, Dimensions } from 'react-native'
import * as theme from './theme'

export default StyleSheet.create({

    greyContainer: {
        flex: 1,
        // backgroundColor: theme.colors.gray5,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },


    greyContainer1: {
        flex: 1,
        width: "100%",
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },


    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    deviceName: {
        fontFamily: 'SFPro',
        fontSize: 18,
        color: theme.colors.gray4,
        letterSpacing: -0.5,
    },

    viewAccountEdit1: {
        backgroundColor: theme.colors.white,
        width: '67.5%',
        borderColor: theme.colors.white,
        borderWidth: 1,
        marginTop: 1,
    },

    viewAccountEdit: {
        backgroundColor: theme.colors.white,
        width: '83%',
        borderColor: theme.colors.white,
        borderWidth: 1,
        marginTop: 1,
    },

    containerforWebView: {
        width: '100%',
        backgroundColor: "white",
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        flex: 0.8,

    },


    mainModuleContentWithoutButtonSection: {
        flex: 6.6,
        backgroundColor: 'transparent',
        width: '90%'
    },


})


