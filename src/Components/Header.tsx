import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../Constant';

type Props = {
	onPress: () => void,
	values: string,
	onChangeValue: (params: string) => void,
}

const Header = ({ values, onChangeValue, onPress }: Props) => {
	return (
		<View style={styles.container}>
			<View style={styles.searchSection}>
				<Icon
					name="search"
					size={20}
					color={colors.gray}
				/>
				<TextInput value={values} onChangeText={(text) => onChangeValue(text)} placeholder="Cari nama, bank, atau nominal" style={styles.input} />
			</View>
			<TouchableOpacity onPress={onPress} style={styles.sortButton}>
				<Text style={styles.sortText}>
					{'URUTKAN'}
				</Text>
				<Icon
					name="chevron-down"
					size={20}
					color={colors.orange}
				/>
			</TouchableOpacity>
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: colors.white,
		alignItems: 'center',
		padding: 10,
		borderRadius: 10,
	},
	searchSection: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	input: {
		flex: 1,
	},
	sortButton: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	sortText: {
		fontWeight: 'bold',
		color: colors.orange,
		marginRight: 5,
	},
});

