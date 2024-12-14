import React from 'react';
import { ContextProvider } from './Contexts/AppContext';
import Routes from './Routes';

const Main = () => {
	return (
		<ContextProvider>
			<Routes />
		</ContextProvider>
	);
};

export default Main;
