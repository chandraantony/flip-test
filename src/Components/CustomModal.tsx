import React from 'react';
import {
	Modal,
	View,
	StyleSheet,
	GestureResponderEvent,
	TouchableWithoutFeedback,
} from 'react-native';

interface CustomModalProps {
	visible: boolean;
	onClose: (event?: GestureResponderEvent) => void;
	children?: React.ReactNode;
}

const CustomModal = ({ visible, onClose, children } : CustomModalProps) => {

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={onClose}
		>
			<TouchableWithoutFeedback onPress={onClose}>
				<View style={styles.overlay}>
					<TouchableWithoutFeedback>
						<View style={styles.modalContainer}>
							{children}
						</View>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalContainer: {
		width: '90%',
		padding: 20,
		backgroundColor: 'white',
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	content: {
		marginBottom: 20,
	},
});

export default CustomModal;
