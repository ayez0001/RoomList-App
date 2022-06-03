import { Dimensions, View, StyleSheet, Text, Button, TouchableOpacity } from "react-native";
import { Portal } from "@gorhom/portal";
import { Modalize } from "react-native-modalize";
import * as theme from '../constants/theme'
import RadioButtonRN from 'radio-buttons-react-native';
import React, { useState, useEffect, useRef } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage'
import AsyncStorageConstants from '../constants/AsyncStorageConstants'

const { height } = Dimensions.get("screen");
const modalHeight = height * 0.74;

const BottomSheet = ({ modalRef, onClose, navigation }) => {
    const [isLocationSelected, setLocationSelection] = useState(isLocationSelected)
    const [isCapacitySelected, setCapacitySelection] = useState(isCapacitySelected)
    const [isAvailabilitySelected, setAvailabilitySelection] = useState(isAvailabilitySelected)
    const [selection, setSelection] = useState(selection)
    const [selectedData, setSelectedData] = useState()



    useEffect(() => {

    }, [selection]);



    const handleReset = () => {
        setSelection(!selection)

        console.log(selection)

    }

    const handleApply = () => {
        
        if (selectedData == 'Location') {
            console.log("sort by location")
            AsyncStorage.setItem(AsyncStorageConstants.StorageConstants.SELECTED_DATA, selectedData)

        }
        if (selectedData == 'Capacity') {
            AsyncStorage.setItem(AsyncStorageConstants.StorageConstants.SELECTED_DATA, selectedData)


        }
        if (selectedData == 'Availability') {
            AsyncStorage.setItem(AsyncStorageConstants.StorageConstants.SELECTED_DATA, selectedData)


        }

    }

    const data = [
        {
            label: 'Location',
            accessibilityLabel: 'location'
        },
        {
            label: 'Capacity',
            accessibilityLabel: 'Capacity'
        },
        {
            label: 'Availability',
            accessibilityLabel: 'Availability'
        }
    ];

    const sorting = (data) => {

        const selectedData = data
        setSelectedData(selectedData.label)

    }



    return (
        <Portal>
            <Modalize ref={modalRef} modalHeight={modalHeight}>
                <View style={styles.content}>
                    <View>
                        <Text style={styles.text}>Sort</Text>
                    </View>
                    <View style={{ width: '100%', backgroundColor: 'transparent', flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', marginTop: -100 }}>

                        <View>
                            <View>
                                <Text style={styles.textBlack} >Location</Text>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.textBlack} >Capacity</Text>
                            </View>

                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.textBlack} >Availability</Text>
                            </View>

                        </View>

                        <View style={{ marginStart: Dimensions.get("window").width * 0.037, backgroundColor: 'transparent' }} >
                            <RadioButtonRN
                                data={data}
                                selectedBtn={(data) => sorting(data)}
                                // box={false}
                                boxStyle={styles.radio}
                                activeColor='red'
                                deactiveColor='#000000'

                                icon={
                                    <Icon
                                        name="check-circle"
                                        size={25}
                                        color='#4169e1'
                                    />
                                }
                            />
                        </View>
                    </View>

                    <View style={{ width: '100%', backgroundColor: 'transparent', flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                            <Text style={styles.textWhite} >Reset</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
                            <Text style={styles.textWhite} >Apply</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modalize>
        </Portal>
    );
};

export default BottomSheet;

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: "space-between",
        height: modalHeight,
        paddingHorizontal: 20,
        paddingVertical: 32,
        backgroundColor: "white",
    },
    text: {
        fontSize: 18,
        fontWeight: "600",
        letterSpacing: 48 * 0.02,
        alignSelf: "center",
        color: "#808080",
    },

    textWhite: {
        fontFamily: 'SFPro',
        color: theme.colors.white,
        fontSize: 18,
        letterSpacing: -0.5,
        textAlign: "center",
        textAlignVertical: "center"
    },

    textBlack: {
        fontFamily: 'SFPro',
        color: theme.colors.black3,
        fontSize: 18,
        letterSpacing: -0.5
    },

    resetButton: {
        height: 45,
        width: '28%',
        backgroundColor: '#625959',
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 10
    },

    applyButton: {
        height: 45,
        width: '70%',
        backgroundColor: '#6495ed',
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 10
    },

    radio: {
        backgroundColor: "transparent",
        borderColor: "transparent",
        width: 10,
        height: 10
    },

});