import React from 'react';
import { ContextProvider } from './Contexts/AppContext';
import Routes from './Routes';
import { SafeAreaView } from 'react-native';

const Main = () => {
	return (
		<ContextProvider>
			<SafeAreaView style={{flex :1}}>
				<Routes />
			</SafeAreaView>
		</ContextProvider>
	);
};

export default Main;
