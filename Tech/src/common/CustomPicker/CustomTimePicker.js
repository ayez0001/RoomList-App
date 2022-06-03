import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { FlatList, Text, StyleSheet, View } from 'react-native'

/**
 * @param {Object} props
 * @param {String} [props.initialSelectedTime]
 * @param {Function} props.onTimeChange
 * @param {Number} [props.width]
 * @param {Number} [props.height]
 */

const CustomTimePicker = ({ initialSelectedTime, onTimeChange, width, height }) => {
	// default width and height
	let itemHeight = 30;
	let listHeight = 100;

	if (height) {
		listHeight = height;
		itemHeight = listHeight / 3;
    }

    const [hourList] = useState([
        { 'label': '', 'itemIndex': 0, 'value': 0 },
        { 'label': '01', 'itemIndex': 1, 'value': 1 },
        { 'label': '02', 'itemIndex': 2, 'value': 2 },
        { 'label': '03', 'itemIndex': 3, 'value': 3 },
        { 'label': '04', 'itemIndex': 4, 'value': 4 },
        { 'label': '05', 'itemIndex': 5, 'value': 5 },
        { 'label': '06', 'itemIndex': 6, 'value': 6 },
        { 'label': '07', 'itemIndex': 7, 'value': 7 },
        { 'label': '08', 'itemIndex': 8, 'value': 8 },
        { 'label': '09', 'itemIndex': 9, 'value': 9 },
        { 'label': '10', 'itemIndex': 10, 'value': 10 },
        { 'label': '11', 'itemIndex': 11, 'value': 11 },
        { 'label': '12', 'itemIndex': 12, 'value': 12 },
        { 'label': '', 'itemIndex': 13, 'value': 13 },
    ])
    const [minuteList] = useState([
        { 'label': '', 'itemIndex': 0, 'value': 0 },
        { 'label': '00', 'itemIndex': 1, 'value': 0 },
        { 'label': '31', 'itemIndex': 2, 'value': 30 },
        { 'label': '02', 'itemIndex': 3, 'value': 2 },
        { 'label': '03', 'itemIndex': 4, 'value': 3 },
        { 'label': '04', 'itemIndex': 5, 'value': 4 },
        { 'label': '05', 'itemIndex': 6, 'value': 5 },
        { 'label': '06', 'itemIndex': 7, 'value': 6 },
        { 'label': '07', 'itemIndex': 8, 'value': 7 },
        { 'label': '08', 'itemIndex': 9, 'value': 8 },
        { 'label': '09', 'itemIndex': 10, 'value': 9 },
        { 'label': '10', 'itemIndex': 11, 'value': 10 },
        { 'label': '11', 'itemIndex': 12, 'value': 11 },
        { 'label': '12', 'itemIndex': 13, 'value': 12 },
        { 'label': '13', 'itemIndex': 14, 'value': 13 },
        { 'label': '14', 'itemIndex': 15, 'value': 14 },
        { 'label': '15', 'itemIndex': 16, 'value': 15 },
        { 'label': '16', 'itemIndex': 17, 'value': 16 },
        { 'label': '17', 'itemIndex': 18, 'value': 17 },
        { 'label': '18', 'itemIndex': 19, 'value': 18 },
        { 'label': '19', 'itemIndex': 20, 'value': 19 },
        { 'label': '20', 'itemIndex': 21, 'value': 20 },
        { 'label': '21', 'itemIndex': 22, 'value': 21 },
        { 'label': '22', 'itemIndex': 23, 'value': 22 },
        { 'label': '23', 'itemIndex': 24, 'value': 23 },
        { 'label': '24', 'itemIndex': 25, 'value': 24 },
        { 'label': '25', 'itemIndex': 26, 'value': 25 },
        { 'label': '26', 'itemIndex': 27, 'value': 26 },
        { 'label': '27', 'itemIndex': 28, 'value': 27 },
        { 'label': '28', 'itemIndex': 29, 'value': 28 },
        { 'label': '29', 'itemIndex': 30, 'value': 29 },
        { 'label': '30', 'itemIndex': 31, 'value': 30 },
        { 'label': '31', 'itemIndex': 32, 'value': 31 },
        { 'label': '32', 'itemIndex': 33, 'value': 32 },
        { 'label': '33', 'itemIndex': 34, 'value': 33 },
        { 'label': '34', 'itemIndex': 35, 'value': 34 },
        { 'label': '35', 'itemIndex': 36, 'value': 35 },
        { 'label': '36', 'itemIndex': 37, 'value': 36 },
        { 'label': '37', 'itemIndex': 38, 'value': 37 },
        { 'label': '38', 'itemIndex': 39, 'value': 38 },
        { 'label': '39', 'itemIndex': 40, 'value': 39 },
        { 'label': '40', 'itemIndex': 41, 'value': 40 },
        { 'label': '41', 'itemIndex': 42, 'value': 41 },
        { 'label': '42', 'itemIndex': 43, 'value': 42 },
        { 'label': '43', 'itemIndex': 44, 'value': 43 },
        { 'label': '44', 'itemIndex': 45, 'value': 44 },
        { 'label': '45', 'itemIndex': 46, 'value': 45 },
        { 'label': '46', 'itemIndex': 47, 'value': 46 },
        { 'label': '47', 'itemIndex': 48, 'value': 47 },
        { 'label': '48', 'itemIndex': 49, 'value': 48 },
        { 'label': '49', 'itemIndex': 50, 'value': 49 },
        { 'label': '50', 'itemIndex': 51, 'value': 50 },
        { 'label': '51', 'itemIndex': 52, 'value': 51 },
        { 'label': '52', 'itemIndex': 53, 'value': 52 },
        { 'label': '53', 'itemIndex': 54, 'value': 53 },
        { 'label': '54', 'itemIndex': 55, 'value': 54 },
        { 'label': '55', 'itemIndex': 56, 'value': 55 },
        { 'label': '56', 'itemIndex': 57, 'value': 56 },
        { 'label': '57', 'itemIndex': 58, 'value': 57 },
        { 'label': '58', 'itemIndex': 59, 'value': 58 },
        { 'label': '59', 'itemIndex': 60, 'value': 59 },
        { 'label': '', 'itemIndex': 61, 'value': 60 },
    ])
    const [ampmList] = useState([
        { 'label': '', 'itemIndex': 0, 'value': 'AM' },
        { 'label': 'AM', 'itemIndex': 1, 'value': 'AM' },
        { 'label': 'PM', 'itemIndex': 2, 'value': 'PM' },
        { 'label': '', 'itemIndex': 3, 'value': 'AM' },
    ])
    
    // Initial index
    const [currentHourIndex, setCurrentHourIndex] = useState(getHourIndex(initialSelectedTime))
    const [currentMinuteIndex, setCurrentMinuteIndex] = useState(getMinuteIndex(initialSelectedTime))
    const [currentAMPMIndex, setCurrentAMPMIndex] = useState(getAMPMIndex(initialSelectedTime))

	const SelectedListItem = React.memo(({ name, style }) => (
		<View style={style}>
			<Text style={{ alignItems: 'flex-end', justifyContent: 'flex-end', fontSize: 24, color: '#808080', fontFamily: 'SFPro', backgroundColor: 'transparent' }}>{name}</Text>
		</View>
	));

	const DeselectedListItem = React.memo(({ name, style }) => (
		<View style={style}>
			<Text style={{ justifyContent: 'flex-end', fontSize: 20, color: '#CCCCCC', fontFamily: 'SFPro', backgroundColor: 'transparent' }}>{name}</Text>
		</View>
	));

	const styles = StyleSheet.create({
		list: {
			height: listHeight,
			width: '100%',
			backgroundColor: 'transparent',
			flexDirection: "row",
			justifyContent: "space-between"
		},

        listStyle: {
            width: '33%',
            backgroundColor: 'transparent'
        },

        listItemHour: {
            height: itemHeight,
            alignItems: 'flex-end',
            justifyContent: 'center',
            backgroundColor: 'transparent'
        },

        listItemMinute: {
            height: itemHeight,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent'
        },

        listItemAMPM: {
            height: itemHeight,
			alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: 'transparent'
		},
	});

	const flatList = useRef(null);

    function getHourIndex(initialTime) {
        console.log("initialTime= ", initialTime)
        const initialTimeSeparated = initialTime.split(':')

        for (var i = 0; i < hourList.length; i++) {
            if (initialTimeSeparated[0] == hourList[i].label){
                return i
                break
            }
        }
}

    function getMinuteIndex(initialTime) {
        console.log("initial time=",initialTime)
        const initialTimeSeparated = initialTime.split(':')
        const initialTimeSeparated1 = initialTimeSeparated[1].split(' ')

        for (var i = 0; i < minuteList.length; i++) {
            if (initialTimeSeparated1[0] == minuteList[i].label){
                return i
                break
            }
        }
    }

    function getAMPMIndex(initialTime) {
        const initialTimeSeparated = initialTime.split(' ')

        for (var i = 0; i < ampmList.length; i++) {
            if (initialTimeSeparated[1] == ampmList[i].label){
                return i
                break
            }
        }
    }

    const processTime = (type, index) => {
        var finalHour = ""
        var finalMinute = ""
        var finalAMPM = ""
        var finalTime = ""

        if (type == "Hour") {
            finalHour = hourList[index].label
            finalMinute = minuteList[currentMinuteIndex].label
            finalAMPM = ampmList[currentAMPMIndex].label
        } else if (type == "Minute") {
            finalHour = hourList[currentHourIndex].label
            finalMinute = minuteList[index].label
            finalAMPM = ampmList[currentAMPMIndex].label
        } else if (type == "AMPM") {
            finalHour = hourList[currentHourIndex].label
            finalMinute = minuteList[currentMinuteIndex].label
            finalAMPM = ampmList[index].label
            console.log("finalAMPM=" , finalAMPM)
        }

        finalTime = finalHour + ":" + finalMinute + " " + finalAMPM
        console.log(finalTime)
        onTimeChange({ item: finalTime })
    }

    return (
        <View style={styles.list}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={styles.listStyle}
                nestedScrollEnabled={true}
                onMomentumScrollEnd={(event) => {
                    let index = Math.round(event.nativeEvent.contentOffset.y / itemHeight);
                    console.log(index)
                    setCurrentHourIndex(index + 1)
                    processTime("Hour", index + 1)
                }}
                onScrollEndDrag={(event) => {
                    let index = Math.round(event.nativeEvent.contentOffset.y / itemHeight);
                    console.log(index)
                    setCurrentHourIndex(index + 1)
                    // processTime("Hour", index + 1)
                }}
                initialScrollIndex={currentHourIndex - 1}
                ref={flatList}
                data={hourList}
                renderItem={(item) => {
                    return (item.item.itemIndex == currentHourIndex) ?
                        <SelectedListItem
                            name={item.item.label}
                            style={styles.listItemHour} />
                        : <DeselectedListItem
                            name={item.item.label}
                            style={styles.listItemHour} />
                }}
                getItemLayout={(_, index) => ({ length: itemHeight, offset: index * itemHeight, index })}
                snapToOffsets={hourList.map((x, i) => (i * itemHeight))}
                bounces={false}
                pagingEnabled={true}
                ListEmptyComponent={() => <Text>No Items</Text>}
            />

            <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={styles.listStyle}
                nestedScrollEnabled={true}
                onMomentumScrollEnd={(event) => {
                    let index = Math.round(event.nativeEvent.contentOffset.y / itemHeight);
                    // console.log(event.nativeEvent.contentOffset.y / itemHeight)
                    // console.log(index)
                    setCurrentMinuteIndex(index + 1)
                    processTime("Minute", index + 1)
                }}
                onScroll={(event) => {
                    let index = Math.round(event.nativeEvent.contentOffset.y / itemHeight);
                    console.log(index)
                    setCurrentMinuteIndex(index + 1)
                    // processTime("Minute", index + 1)
                }}
                initialScrollIndex={currentMinuteIndex - 1}
                ref={flatList}
                data={minuteList}
                renderItem={(item) => {
                    return (item.item.itemIndex == currentMinuteIndex) ?
                        <SelectedListItem
                            name={item.item.label}
                            style={styles.listItemMinute} />
                        : <DeselectedListItem
                            name={item.item.label}
                            style={styles.listItemMinute} />
                }}
                getItemLayout={(_, index) => ({ length: itemHeight, offset: index * itemHeight, index })}
                snapToOffsets={minuteList.map((x, i) => (i * itemHeight))}
                bounces={false}
                pagingEnabled={true}
                ListEmptyComponent={() => <Text>No Items</Text>}
            />

            <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={styles.listStyle}
                nestedScrollEnabled={true}
                onMomentumScrollEnd={(event) => {
                    let index = Math.round(event.nativeEvent.contentOffset.y / itemHeight);
                    setCurrentAMPMIndex(index + 1)
                    processTime("AMPM", index + 1)
                }}
                onScrollEndDrag={(event) => {
                    let index = Math.round(event.nativeEvent.contentOffset.y / itemHeight);
                    console.log(index)
                    setCurrentAMPMIndex(index + 1)
                    // processTime("AMPM", index + 1)
                }}
                initialScrollIndex={currentAMPMIndex - 1}
                ref={flatList}
                data={ampmList}
                renderItem={(item) => {
                    return (item.item.itemIndex == currentAMPMIndex) ?
                        <SelectedListItem
                            name={item.item.label}
                            style={styles.listItemAMPM} />
                        : <DeselectedListItem
                            name={item.item.label}
                            style={styles.listItemAMPM} />
                }}
                getItemLayout={(_, index) => ({ length: itemHeight, offset: index * itemHeight, index })}
                snapToOffsets={ampmList.map((x, i) => (i * itemHeight))}
                bounces={false}
                pagingEnabled={true}
                ListEmptyComponent={() => <Text>No Items</Text>}
            />
        </View>
    )
}

CustomTimePicker.propTypes = {
	initialSelectedTime: PropTypes.string,
	onTimeChange: PropTypes.func,
	height: PropTypes.number,
	width: PropTypes.number
}

export default CustomTimePicker;