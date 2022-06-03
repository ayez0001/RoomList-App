import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet, FlatList, Modal, ActivityIndicator, Dimensions, Image, TouchableOpacity } from 'react-native'
import Style from '../constants/Style'
import * as theme from '../constants/theme'
import { SafeAreaView } from 'react-navigation'
import CustomDatePicker from '../common/CustomPicker/CustomDatePicker';
import CustomTimePicker from '../common/CustomPicker/CustomTimePicker';
import Moment from 'moment';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import { useRef } from "react";
import { PortalProvider } from "@gorhom/portal";
import BottomSheet from "./BottomSheet";
import AsyncStorage from '@react-native-async-storage/async-storage'
import AsyncStorageConstants from '../constants/AsyncStorageConstants'
import { NavigationContainer, useIsFocused } from '@react-navigation/native';

function RoomList({ route, navigation }) {

    const [isLoading, setIsLoading] = useState(false)
    const [roomDataList, setRoomDataList] = useState(undefined)
    const [ sortedValue, setSortedValue]= useState(undefined)
    const [ selectedData, setSelectedData]= useState(1)
    const isFocused = useIsFocused();
    const [isFocus, setIsFocus] = useState(false)

    var todate = Moment(new Date()).format('D MMM yyyy')
    var datemani = todate.split(" ")
    console.log(datemani)

    switch (datemani[0]) {
        case "1":
            datemani[0] = datemani[0] + 'st';
            break;
        case "2":
            datemani[0] = datemani[0] + 'nd';
            break;
        case "3":
            datemani[0] = datemani[0] + 'rd';
            break;
        case "31":
            datemani[0] = datemani[0] + 'st';
            break;
        default:
            datemani[0] = datemani[0] + 'th';
            break;

    }
    var finalDate = datemani[0] + " " + datemani[1] + " " + datemani[2]

    const [date, setDate] = useState(finalDate)

    var currentTime = new Date().getHours() + ":" + new Date().getMinutes()
    var isPM = new Date().getHours() >= 12;
    if (isPM) {
        var finalTime = currentTime + ' ' + 'PM'
    } else {
        var finalTime = currentTime + ' ' + 'AM'
    }
    const [time, setTime] = useState(finalTime)



    useEffect(async() => {
        console.log("update info")
            getRoomData()

    }, [isFocused])


    const modalRef = useRef(null);

    const onOpen = () => {
        modalRef.current?.open();
    };

    const onClose = () => {
        modalRef.current?.close();
    };

    const getRoomData = async () => {

    
        const selection = await AsyncStorage.getItem(AsyncStorageConstants.StorageConstants.SELECTED_DATA)
        console.log("selection= ", selection)
        if (selection!= null){ setSelectedData(0)}
console.log(selectedData)
        try {
            setIsLoading(true)


            const response = await fetch("https://gist.githubusercontent.com/yuhong90/7ff8d4ebad6f759fcc10cc6abdda85cf/raw/463627e7d2c7ac31070ef409d29ed3439f7406f6/room-availability.json")
            const data = await response.json()
            // console.log("room= ", data)

            var temps = []

            for (var i = 0; i < data.length; i++) {
                var item = data[i]
              temps.push({ pax: item.capacity, level: item.level, name: item.name })
            }
     
            
            setRoomDataList(temps)
           // console.log("rawdata=",temps)
          
            let rawdata = temps
            // // console.log("rawdata=",roomDataList)
            // setSortedValue (rawdata)
            // setIsLoading(false)
           
            if (selection == null){
              //  console.log("rawdata=",rawdata)
                const value = rawdata.sort((a, b) => {
                 return a.level - b.level;
                });
    
                setSortedValue (value)
                setIsLoading(false)
            }


            if (selection == "Location"){
        //    console.log("rawdata=",rawdata)
            const value = rawdata.sort((a, b) => {
             return a.level - b.level;
            });

            setSortedValue (value)
            setIsLoading(false)
        }

        if (selection == "Capacity"){
        //    console.log("rawdata=",rawdata)
            const value = rawdata.sort((a, b) => {
                return a.pax - b.pax;
            });

            setSortedValue (value)
            setIsLoading(false)
        }

        if (selectedData == "Availability"){
        //    console.log("rawdata=",rawdata)
            const value = rawdata.sort((a, b) => {
                return a.availability - b.vailability;
            });

            setSortedValue (value)
            setIsLoading(false)
        }

        } catch (err) {

            console.log('Error  except no current user - ', err)

        }
    }

    const handleInputFocus = () => {
        setIsFocus(true)
    }

    function RoomElement({ pax, level, name, availability }) {
        // console.log("room list= ", level, pax, name)

        return (
            <View style={styles.smartElementContainer}>

                <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-between', marginTop: 10, marginStart: 10, marginEnd: 10, backgroundColor: 'transparent' }}>
                    <View style={{ backgroundColor: 'transparent', justifyContent: 'space-between' }}>
                        <Text style={Style.deviceName}>{name}</Text>
                    </View>
                    <View style={{ justifyContent: 'flex-end', marginBottom: 2, paddingLeft: 5 }}>
                        <Text style={Style.deviceName}> Available</Text>

                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-between', marginStart: 10, marginEnd: 10, marginBottom: 10, backgroundColor: 'transparent' }}>
                    <View style={{ backgroundColor: 'transparent', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <Text style={Style.deviceName}>Level {level}</Text>
                    </View>
                    <View style={{ backgroundColor: 'transparent', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <Text style={Style.deviceName}>{pax} Pax</Text>
                    </View>

                </View>
            </View>
        )
    }


    return (
        <SafeAreaView style={Style.greyContainer}>
            <View style={{ flexDirection: 'row', marginTop: (Dimensions.get("window").height * .335) / 17 }}>
                {/* <View style={{ flexDirection: 'row', marginTop:Dimensions.get("window").height*.0412 }}> */}
                <View style={Style.viewAccountEdit}>
                    <Text style={{ fontSize: 18, color: '#808080', fontFamily: 'SFPro', }}>Date</Text>

                </View>
                <View>
                    <View style={{ backgroundColor: 'transparent', marginStart: Dimensions.get("window").width * 0.070, marginTop: 10, }}>
                        {/* <Image source={require('../../../../../assets/images/icons/edit.png')} style={{ width: 20, height: 20, backgroundColor: 'transparent', }} ></Image> */}
                    </View>
                </View>
            </View>


            <View style={{ marginBottom: 15, backgroundColor: 'white', borderRadius: 10 }}>
                <Collapse>
                    <CollapseHeader>

                        <View style={{
                            marginStart: 10, backgroundColor: "transparent", width: Dimensions.get("window").width * 0.9, height: Dimensions.get("window").height * 0.050
                        }}>
                            <Text style={{
                                fontSize: 18,
                                fontFamily: 'SFPro', color: theme.colors.gray4, textAlign: "left", textAlignVertical: 'center',
                            }}>{date}</Text>
                            <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5, width: Dimensions.get("window").width * 0.9 }} />

                        </View>
                    </CollapseHeader>
                    <CollapseBody>
                        <View style={{ backgroundColor: 'transparent', alignItems: 'left', justifyContent: 'left' }}>
                            <CustomDatePicker
                                initialSelectedDate={date}
                                futureDayCount={90}
                                onDateChange={({ index, item }) => {
                                    setDate(item)
                                }}
                                height={100} />
                        </View>
                    </CollapseBody>
                </Collapse>
            </View>



            <View style={{ flexDirection: 'row', marginTop: (Dimensions.get("window").height * .335) / 17 }}>
                {/* <View style={{ flexDirection: 'row', marginTop:Dimensions.get("window").height*.0412 }}> */}
                <View style={Style.viewAccountEdit}>
                    <Text style={{ fontSize: 18, color: '#808080', fontFamily: 'SFPro', }}>Time</Text>

                </View>
                <View>
                    <View style={{ backgroundColor: 'transparent', marginStart: Dimensions.get("window").width * 0.070, marginTop: 10, }}>
                        {/* <Image source={require('../../../../../assets/images/icons/edit.png')} style={{ width: 20, height: 20, backgroundColor: 'transparent', }} ></Image> */}
                    </View>
                </View>
            </View>



            <View style={{ marginBottom: 15, backgroundColor: 'white', borderRadius: 10 }}>
                <Collapse>
                    <CollapseHeader>

                        <View style={{
                            marginStart: 10, backgroundColor: "transparent", width: Dimensions.get("window").width * 0.9, height: Dimensions.get("window").height * 0.050
                        }}>
                            <Text style={{
                                fontSize: 18,
                                fontFamily: 'SFPro', color: theme.colors.gray4, textAlign: "left", textAlignVertical: 'center',
                            }}>{time}</Text>
                            <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5, width: Dimensions.get("window").width * 0.9 }} />
                        </View>
                    </CollapseHeader>
                    <CollapseBody>
                        <View style={{ backgroundColor: 'transparent', alignItems: 'left', justifyContent: 'left' }}>
                            <CustomTimePicker
                                initialSelectedTime={time}
                                onTimeChange={({ index, item }) => {
                                    setTime(item)
                                }}
                                height={100} />
                        </View>
                    </CollapseBody>
                </Collapse>
            </View>



            <View style={{ width: '90%', backgroundColor: 'transparent', flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                <View style={Style.viewAccountEdit1}>
                    <Text style={{ fontSize: 18, color: '#808080', fontFamily: 'SFPro', }}>Rooms</Text>

                </View>


                <View style={{ flex: 1.3, width: '90%', backgroundColor: 'transparent', flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ backgroundColor: 'transparent', marginStart: Dimensions.get("window").width * 0.070 }}>
                        <Text style={{ fontSize: 18, color: '#808080', fontFamily: 'SFPro', }}>Sort</Text>
                    </View>

                    <PortalProvider>
                <View >
                    <BottomSheet modalRef={modalRef} onClose={onClose} />
                    {/* <Button title="Open Modal" color="#1E2022" onPress={onOpen} /> */}
                    <TouchableOpacity onPress={onOpen}>
                    <View style={{ backgroundColor: 'transparent', marginStart: Dimensions.get("window").width * 0.070, marginTop: 10, }}>
                        <Image source={require('../../assets/menu.png')} style={{ width: 20, height: 20, backgroundColor: 'transparent', }} ></Image>
                    </View>
                    </TouchableOpacity>
                </View>
            </PortalProvider>

                    

                </View>
            </View>

            <View style={Style.mainModuleContentWithoutButtonSection} behavior={Platform.OS == "ios" ? "padding" : "height"} enabled>
                <FlatList
                    style={{
                        backgroundColor: 'transparent', marginTop: 5
                    }}
                    showsVerticalScrollIndicator={false}
                    vertical={true}
                    data={sortedValue}
                    renderItem={({ item }) => <RoomElement pax={item.pax} level={item.level} name={item.name} availability={item.availability} />}
                    keyExtractor={item => item.name} />
            </View>

            <PortalProvider>
                <View style={styles.container}>
                    <BottomSheet modalRef={modalRef} onClose={onClose} />
                    {/* <Button title="Open Modal" color="#1E2022" onPress={onOpen} /> */}
                </View>
            </PortalProvider>

         {isLoading ? (
                <Modal
                    transparent={true}
                    animationType={'none'}
                    onRequestClose={() => { console.log('close modal') }}>
                    <View style={Style.modalBackground}>
                        <View style={Style.activityIndicatorWrapper}>
                            <ActivityIndicator
                                animating
                                color="#000"
                                size="large"
                                style={Style.activityIndicatorWrapper}
                            />
                        </View>
                    </View>
                </Modal>
            ) : null} 

        </SafeAreaView>
    )
}

export default RoomList

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#C9D6DF",
        alignItems: "center",
        justifyContent: "center",
    },

    airQualityStatusContainer: {
        flexDirection: "row",
        alignItems: 'center',
        borderRadius: 10,
        width: '100%',
        marginTop: 0,
        height: '12%',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.white,
        alignContent: 'center',
        borderRadius: 10,
        borderColor: theme.colors.yellow,
        marginBottom: 15,
    },

    statusTitle: {
        fontFamily: 'SFPro',
        color: theme.colors.gray4,
        fontSize: theme.sizes.font18,
        padding: 10,
        letterSpacing: -0.5
    },

    statusTextRed: {
        fontFamily: 'SFPro',
        color: theme.colors.red1,
        fontSize: theme.sizes.font24,
        padding: 10,
        justifyContent: "flex-end",
        letterSpacing: -0.5
    },

    statusTextYellow: {
        fontFamily: 'SFPro',
        color: theme.colors.yellow1,
        fontSize: theme.sizes.font24,
        padding: 10,
        justifyContent: "flex-end",
        letterSpacing: -0.5
    },

    statusTextGreen: {
        fontFamily: 'SFPro',
        color: theme.colors.green1,
        fontSize: theme.sizes.font24,
        padding: 10,
        justifyContent: "flex-end",
        letterSpacing: -0.5
    },

    statusElement1: {
        fontFamily: 'SFPro',
        color: "#5ABE8D",
        fontSize: theme.sizes.font15,
        letterSpacing: -0.5
    },

    statusElement2: {
        fontFamily: 'SFPro',
        color: "#FFC30E",
        fontSize: theme.sizes.font15,
        letterSpacing: -0.5
    },

    number: {
        fontFamily: 'SFPro',
        fontSize: 24,
        color: theme.colors.gray4,
        alignItems: 'center',
        letterSpacing: -0.5
    },

    signText: {
        fontFamily: 'SFPro',
        color: theme.colors.gray4,
        fontSize: theme.sizes.font15,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',

        letterSpacing: -0.5
    },

    smartTitle: {
        fontFamily: 'SFPro',
        color: theme.colors.gray4,
        fontSize: 18,
        marginTop: Dimensions.get("window").height * 0.1072,
        letterSpacing: -0.5
    },

    smartElementContainer: {
        backgroundColor: theme.colors.gray5,
        borderRadius: 10,
        borderColor: theme.colors.yellow,
        marginBottom: 15,

    },
})