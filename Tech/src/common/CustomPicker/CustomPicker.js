import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { FlatList, Text, StyleSheet, View } from 'react-native'

/**
 * @param {Object} props
 * 
 * // Primary items attributes
 * @param {Array} props.items
 * @param {Function} props.onChange
 * @param {Number} [props.initialSelectedIndex]
 * 
 * // Secondary items attributes
 * @param {Array} props.secondaryItems
 * @param {Function} props.onSecondaryItemChange
 * @param {Number} [props.secondaryInitialSelectedIndex]
 * 
 * @param {Boolean} [props.showSecondaryPicker]
 * @param {Number} [props.height]
 */

const CustomPicker = ({ items, onChange, initialSelectedIndex = null, secondaryItems, onSecondaryItemChange, secondaryInitialSelectedIndex = null, showSecondaryPicker, height }) => {
	// default width and height
	let itemHeight = 30;
	let listHeight = 100;

	if (height) {
		listHeight = height;
		itemHeight = listHeight / 3;
	}

	// Initial index
	const [currentPrimaryIndex, setCurrentPrimaryIndex] = useState(initialSelectedIndex)
	const [currentSecondaryIndex, setCurrentSecondaryIndex] = useState(secondaryInitialSelectedIndex)

	const SelectedListItem = React.memo(({ name, style }) => (
		<View style={style}>
			<Text style={{ fontSize: 24, color: '#808080', fontFamily: 'SFPro' }}>{name}</Text>
		</View>
	));

	const DeselectedListItem = React.memo(({ name, style }) => (
		<View style={style}>
			<Text style={{ fontSize: 20, color: '#CCCCCC', fontFamily: 'SFPro' }}>{name}</Text>
		</View>
	));

	const styles = StyleSheet.create({
		list: {
			height: listHeight,
			width: '100%',
			backgroundColor: 'transparent',
			flexDirection: showSecondaryPicker ? "row" : "column",
			justifyContent: showSecondaryPicker ? "space-between" : "center"
		},

		listStyle: {
			width: showSecondaryPicker ? '50%' : '100%',
			backgroundColor: 'transparent'
		},

		listItemPrimary: {
			height: itemHeight,
			alignItems: showSecondaryPicker ? 'flex-end' : 'center',
			justifyContent: 'center',
			backgroundColor: 'transparent'
		},
		listItemSecondary: {
			height: itemHeight,
			alignItems: 'flex-start',
			marginLeft: 20,
			justifyContent: 'center',
		},
	});

	const flatList = useRef(null);

	// { 'label': '01', 'itemIndex': 0, 'value': 1 },

	let extendedItems = [
		{
			value: -11,
			itemIndex: ''
		},
		...items,
		{
			value: -22,
			itemIndex: ''
		}];

	let secondaryExtendedItems = [
		{
			value: -11,
			itemIndex: ''
		},
		...secondaryItems,
		{
			value: -22,
			itemIndex: ''
		}];

	return (
		<View style={{width: '100%', height: '100%'}}>
			<View style={styles.list}>
				<FlatList
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
					style={styles.listStyle}
					nestedScrollEnabled={true}
					onMomentumScrollEnd={(event) => {
						console.log(event.nativeEvent)
						let index = Math.round(event.nativeEvent.contentOffset.y / itemHeight);
						setCurrentPrimaryIndex(index)
						onChange({ index, item: items[index] });
					}}
					onScrollEndDrag={(event) => {
						let index = Math.round(event.nativeEvent.contentOffset.y / itemHeight);
						console.log(index)
						setCurrentPrimaryIndex(index)
						// processTime("Hour", index + 1)
					}}
					initialScrollIndex={currentPrimaryIndex}
					ref={flatList}
					data={extendedItems.map(item => ({
						key: item.itemIndex.toString(),
						...item
					}))}
					renderItem={(item) => {
						return (item.item.itemIndex == currentPrimaryIndex) ?
							<SelectedListItem
								name={item.item.label}
								style={styles.listItemPrimary} />
							: <DeselectedListItem
								name={item.item.label}
								style={styles.listItemPrimary} />
					}}
					getItemLayout={(_, index) => ({ length: itemHeight, offset: index * itemHeight, index })}
					bounces={false}
					pagingEnabled={true}
					snapToOffsets={extendedItems.map((x, i) => (i * itemHeight))}
					ListEmptyComponent={() => <Text>No Items</Text>}
				/>

				{showSecondaryPicker && (
					<FlatList
						showsHorizontalScrollIndicator={false}
						showsVerticalScrollIndicator={false}
						style={styles.listStyle}
						nestedScrollEnabled={true}
						onMomentumScrollEnd={(event) => {
							let index = Math.round(event.nativeEvent.contentOffset.y / itemHeight);
							setCurrentSecondaryIndex(index)
							onSecondaryItemChange({ index, item: secondaryItems[index] });
						}}
						onScrollEndDrag={(event) => {
							let index = Math.round(event.nativeEvent.contentOffset.y / itemHeight);
							console.log(index)
							onSecondaryItemChange(index)
							// processTime("Hour", index + 1)
						}}
						initialScrollIndex={ secondaryItems.length < 2 ? 0 : currentSecondaryIndex}
						ref={flatList}
						data={secondaryExtendedItems.map(item => ({
							key: item.itemIndex.toString(),
							...item
						}))}
						renderItem={(item) => {
							return (item.item.itemIndex == currentSecondaryIndex) ?
								<SelectedListItem
									name={item.item.label}
									style={styles.listItemSecondary} />
								: <DeselectedListItem
									name={item.item.label}
									style={styles.listItemSecondary} />
						}}
						getItemLayout={(_, index) => ({ length: itemHeight, offset: index * itemHeight, index })}
						bounces={false}
						pagingEnabled={true}
						snapToOffsets={secondaryExtendedItems.map((x, i) => (i * itemHeight))}
						ListEmptyComponent={() => <Text>No Items</Text>}
					/>
				)}
			</View>
		</View>
	)
}

CustomPicker.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({
		itemIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		label: PropTypes.string
	})),
	onChange: PropTypes.func,
	initialSelectedIndex: PropTypes.number,

	secondaryItems: PropTypes.arrayOf(PropTypes.shape({
		itemIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		label: PropTypes.string
	})),
	onSecondaryItemChange: PropTypes.func,
	secondaryInitialSelectedIndex: PropTypes.number,

	showSecondaryPicker: PropTypes.bool,
	height: PropTypes.number,
}

export default CustomPicker;