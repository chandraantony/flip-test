import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { colors, sortBy } from '../Constant';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../Components/Header';
import { AppContext, Transaction } from '../Contexts/AppContext';
import CustomModal from '../Components/CustomModal';
import Card from '../Components/Card';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Routes';

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;

const ModalContent = () => {
	const { state, onChangeOrder } = useContext(AppContext);
	return (
		<View style={styles.modalContainer}>
			{
				sortBy.map((v, index) => (
					<TouchableOpacity
						key={index}
						onPress={() => onChangeOrder(v.value)}
						style={styles.buttonSort}
					>
						<Icon
							name={v.value === state.orderType ? 'disc' : 'circle'}
							size={20}
							color={colors.orange}
						/>
						<Text style={styles.label}>
							{v.label}
						</Text>
					</TouchableOpacity>
				))
			}
		</View>
	);
};

const ListScreen = ({ navigation }: Props) => {

	const { state, getData, onChangeKeyword, list, onChangeItem } = useContext(AppContext);
	const {
		keyword,
		isLoading,
	} = state;

	const [modalVisible, setModalVisible] = useState(false);
	const fetchData = useRef(() => { });
	fetchData.current = () => getData(); // do thing just satisfy lint;

	useEffect(() => {
		fetchData.current();
	}, []);

	const listEmpty = () => {
		return isLoading ? <ActivityIndicator /> : <Text style={styles.textCenter}>{'Empty List'}</Text>;
	};

	const onPress = (item: Transaction) => {
		onChangeItem(item);
		navigation.navigate('Detail');
	};

	return (
		<View style={styles.container}>
			<Header onPress={() => setModalVisible(true)} values={keyword} onChangeValue={onChangeKeyword} />
			<FlatList
				data={list}
				keyExtractor={(item, index) => item.id || index.toString()}
				renderItem={({ item }) => <Card item={item} onPress={onPress} />}
				ListEmptyComponent={listEmpty}
				initialNumToRender={20}
				maxToRenderPerBatch={20}
				decelerationRate={0.9}
				keyboardShouldPersistTaps="never"
				refreshControl={
					<RefreshControl
						refreshing={isLoading}
						onRefresh={getData}
					/>
				}
			/>
			<CustomModal
				visible={modalVisible}
				onClose={() => setModalVisible(false)}
			>
				<ModalContent />
			</CustomModal>
		</View>
	);
};

export default ListScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 10,
		padding: 5,
	},
	modalContainer: {
		gap: 30,
	},
	buttonSort: {
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: 1, gap: 10,
	},
	label: {
		fontWeight: 'bold',
		color: colors.black,
	},
	textCenter: {
		textAlign: 'center',
	},
});
