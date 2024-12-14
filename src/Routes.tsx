import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from './Modules/ListScreen';
import DetailScreen from './Modules/DetailScreen';

export type RootStackParamList = {
	List: undefined;
	Detail: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Routes: React.FC = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{ headerShown: false }}
			>
				<Stack.Screen name="List" component={ListScreen} options={{ title: 'Item List' }} />
				<Stack.Screen
					name="Detail"
					component={DetailScreen}
					options={{ title: 'Item Details' }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Routes;
