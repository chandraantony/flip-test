import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { memo } from 'react';
import { colors, formatCurrency, formatDate } from '../Constant';
import useColorPalette from '../Hooks/useColorPallete';
import { Transaction } from '../Contexts/AppContext';

const Card = ({ item, onPress }:{ item: Transaction, onPress : (params : Transaction) => void }) => {

	const colorPalette = useColorPalette(item.status || '');

	return (
		<TouchableOpacity onPress={() => onPress(item)} style={[styles.itemContainer, { borderColor: colorPalette }]}>
			<View style={styles.cardInfo}>
				<Text style={styles.label}>
					{`${item?.sender_bank?.toUpperCase()} -> ${item?.beneficiary_bank?.toUpperCase()}`}
				</Text>
				<Text>
					{item.beneficiary_name}
				</Text>
				<Text>
					{`${formatCurrency(item.amount)} • ${formatDate(item.created_at)}`}
				</Text>
			</View>
			<View style={[styles.cardStatus, { backgroundColor: colorPalette }]}>
				<Text style={styles.statusLabel}>
					{item.status}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default memo(Card); // memo component

const styles = StyleSheet.create({
	itemContainer: {
		flexDirection: 'row',
		borderLeftWidth: 10,
		marginBottom: 10,
		borderRadius: 10,
		padding: 10,
		backgroundColor: colors.white,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	cardInfo: {
		gap: 5,
		flex: 1,
	},
	cardStatus: {
		paddingVertical: 5,
		paddingHorizontal: 15,
		borderRadius: 10,
	},
	statusLabel: {
		color: colors.white,
		fontSize: 12,
		fontWeight: 'bold',
	},
	label: {
		fontWeight: 'bold',
		color: colors.black,
	},
});

