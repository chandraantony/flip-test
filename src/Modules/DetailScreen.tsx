import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Routes';
import { AppContext } from '../Contexts/AppContext';
import { colors, formatCurrency, formatDate } from '../Constant';
import Icon from 'react-native-vector-icons/Feather';
import Clipboard from '@react-native-clipboard/clipboard';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const DetailScreen = ({ navigation }: Props) => {
	const { state } = useContext(AppContext);
	const {
		amount,
		id,
		sender_bank,
		beneficiary_name,
		account_number,
		remark,
		created_at,
		unique_code,
		beneficiary_bank,
	} = state.item;

	return (
		<View style={styles.container}>
			<View style={styles.idContainer}>
				<Text style={styles.textBold}>
					{`ID TRANSACTION : #${id}`}
				</Text>
				<Icon
					onPress={() => Clipboard.setString(id || '')}
					name="copy"
					size={15}
					color={colors.orange}
				/>
			</View>
			<View style={styles.labelContainer}>
				<View>
					<Text style={styles.textBold}>
						{'DETAIL TRANSAKSI'}
					</Text>
				</View>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Text style={[styles.textBold, { color: colors.orange }]}>
						{'Tutup'}
					</Text>
				</TouchableOpacity>
			</View>
			<View style={{ backgroundColor : colors.white, padding :15, gap: 10}}>
				<Text style={styles.textBold}>
					{`${sender_bank?.toUpperCase()} -> ${beneficiary_bank?.toUpperCase()}`}
				</Text>
				<View style={styles.infoContainer}>
					<View style={styles.infoChild}>
						<Text style={styles.textBold}> 
							{beneficiary_name}
						</Text>
						<Text>
							{account_number}
						</Text>
					</View>
					<View style={styles.infoChild}>
						<Text style={styles.textBold}> 
							{'NOMINAL'}
						</Text>
						<Text>
							{formatCurrency(amount)}
						</Text>
					</View>
					<View style={styles.infoChild}>
						<Text style={styles.textBold}> 
							{'BERITA TRANSFER'}
						</Text>
						<Text>
							{remark}
						</Text>
					</View>
					<View style={styles.infoChild}>
						<Text style={styles.textBold}> 
							{'KODE UNIK'}
						</Text>
						<Text>
							{unique_code}
						</Text>
					</View>
					<View style={styles.infoChild}>
						<Text style={styles.textBold}> 
							{'WAKTU DIBUAT'}
						</Text>
						<Text>
							{formatDate(created_at)}
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

export default DetailScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 5,
		gap: 3
	},
	idContainer: {
		flexDirection: 'row',
		backgroundColor: colors.white,
		alignItems: 'center',
		padding: 15, 
		gap: 10
	},
	labelContainer: {
		backgroundColor: colors.white,
		padding: 15,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	infoContainer : {
		flexDirection : 'row', 
		flexWrap :'wrap', 
		gap :10, 
		justifyContent :'space-between'
	},
	infoChild : {
		width :'40%' 
	},
	textBold: {
		fontWeight: '600',
	}
});