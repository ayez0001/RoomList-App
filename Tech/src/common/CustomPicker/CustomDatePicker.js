import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { FlatList, Text, StyleSheet, View } from 'react-native'
import moment from 'moment'

/**
 * @param {Object} props
 * @param {String} [props.initialSelectedDate]
 * @param {Function} props.onDateChange
 * @param {Number} [props.futureDayCount]
 * @param {Number} [props.width]
 * @param {Number} [props.height]
 */

const CustomDatePicker = ({ initialSelectedDate, onDateChange, futureDayCount, width, height }) => {
	// default width and height
	let itemHeight = 30;
	let listHeight = 100;

	if (height) {
		listHeight = height;
		itemHeight = listHeight / 3;
    }

    const [tempIndex, setTempIndex] = useState(0)
    const [dateList] = useState(listDateToFutureSetCount(futureDayCount))
    
    // Initial index
    const [currentDateIndex, setCurrentDateIndex] = useState(getDateIndex(initialSelectedDate))

	const SelectedListItem = React.memo(({ name, style }) => (
		<View style={style}>
			<Text style={{ alignItems: 'flex-end', justifyContent: 'flex-end', fontSize: 24, color: '#808080', fontFamily: 'SFPro', backgroundColor: 'transparent', letterSpacing: -1 }}>{name}</Text>
		</View>
	));

	const DeselectedListItem = React.memo(({ name, style }) => (
		<View style={style}>
			<Text style={{ justifyContent: 'flex-end', fontSize: 20, color: '#CCCCCC', fontFamily: 'SFPro', backgroundColor: 'transparent', letterSpacing: -1 }}>{name}</Text>
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
            width: '100%',
            backgroundColor: 'transparent'
        },

        listItem: {
            height: itemHeight,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent'
        },
	});

    const flatList = useRef(null);
    
    function getDateIndex(initialDate) {
        for (var i = 0; i < dateList.length; i++) {
            if (initialDate == dateList[i].label){
                return i
                break
            }
        }
    }

    function listDateToFutureSetCount(dayCount) {
        let dayList = []
        for (var i = 0; i < dayCount + 2; i++) {
            let tomorrow = new Date()
            tomorrow = moment(tomorrow).add(i - 1, 'day').format('D MMM yyyy') 
            var datemani = tomorrow.split(" ")
            console.log(datemani)
            
            switch (datemani[0]){
            case "1":
                datemani[0]= datemani[0]+ 'st';
                break;
                case "2":
                    datemani[0] = datemani[0] + 'nd';
                    break;
                    case "3":
                        datemani[0]= datemani[0] + 'rd';
                        break;
                        case "31":
                            datemani[0]=  datemani[0]+ 'st';
                            break;
                            default:
                                datemani[0] =  datemani[0]+ 'th';
                                break;
                       
            }
              var finalDate = datemani[0] + " " + datemani[1] + " " + datemani[2]
    
            if(i == 0) {
                dayList.push({ 'label': '', 'itemIndex': i, 'value': 0 })
            } else if (i == dayCount + 1) {
                dayList.push({ 'label': '', 'itemIndex': i, 'value': 0 })
            } else {
                dayList.push({ 'label':  finalDate, 'itemIndex': i, 'value': 0 })
            }
        }
        // console.log(dayList)
        return dayList
    }

    return (
        <View style={styles.list}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={styles.listStyle}
                nestedScrollEnabled={true}
                onMomentumScrollEnd={(event) => {
                    // console.log(event.nativeEvent)
                    let index = Math.round(event.nativeEvent.contentOffset.y / itemHeight);
                    console.log("momentum" + index)
                    setCurrentDateIndex(index + 1)
                    // setCurrentDateIndex(index)
                    onDateChange({ index, item: dateList[index + 1].label });
                }}
                // onScrollEndDrag={(event) => {
                //     let index = Math.round(event.nativeEvent.contentOffset.y / itemHeight);
                //     setCurrentDateIndex(index)
                // }}
                onScrollEndDrag={(event) => {
                    let index = Math.round(event.nativeEvent.contentOffset.y / itemHeight);
                    console.log("onScroll" + index)
                    setCurrentDateIndex(index + 1)
                }}
                initialScrollIndex={currentDateIndex - 1}
                ref={flatList}
                data={dateList}
                renderItem={(item) => {
                    return (item.item.itemIndex == currentDateIndex) ?
                        <SelectedListItem
                            name={item.item.label}
                            style={styles.listItem} />
                        : <DeselectedListItem
                            name={item.item.label}
                            style={styles.listItem} />
                }}
                getItemLayout={(_, index) => ({ length: itemHeight, offset: index * itemHeight, index })}
                bounces={false}
                pagingEnabled={true}
                snapToOffsets={dateList.map((x, i) => (i * itemHeight))}
                ListEmptyComponent={() => <Text>No Items</Text>}
            />
        </View>
    )
}

CustomDatePicker.propTypes = {
	initialSelectedDate: PropTypes.string,
    onDateChange: PropTypes.func,
    futureDayCount: PropTypes.number,
	height: PropTypes.number,
	width: PropTypes.number
}

export default CustomDatePicker;