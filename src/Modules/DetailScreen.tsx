import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Routes';
import { AppContext } from '../Contexts/AppContext';
import { colors } from '../Constant';
import Icon from 'react-native-vector-icons/Feather';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const DetailScreen = ({ navigation }: Props) => {
	const { state } = useContext(AppContext);
	const { item } = state;

	return (
		<View style={styles.container}>

			<View style={{flexDirection :'row', backgroundColor : colors.white, alignItems : 'center', padding: 15}}>
				<Text style={{fontWeight :'600'}}>
					{`ID TRANSACTION : #${item.id}`}
				</Text>
				<Icon
					name="copy"
					size={15}
					color={colors.orange}
				/>
			</View>

			<View style={{backgroundColor : colors.white, padding :15, flexDirection :'row', justifyContent : 'space-between'}}>
				<View>
					<Text style={{fontWeight : 'bold'}}>
						{'DETAIL TRANSAKSI'}
					</Text>
				</View>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Text style={{fontWeight : 'bold', color :colors.orange}}>
						{'Tutup'}
					</Text>
				</TouchableOpacity>
			</View>


		</View>
	)
}

export default DetailScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding :5,
		gap :1
	},
});