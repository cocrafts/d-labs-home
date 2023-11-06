import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet }	from 'react-native';
import {
	modalActions,
	ModalManager,
	paperTheme,
	themeActions,
	View,
} from '@walless/gui';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import 'raf/polyfill';

import '../style.css';

themeActions.setTheme(paperTheme);

export const App: FC<AppProps> = ({ Component, pageProps }) => {
	const [, setRender] = useState({});
	const containerRef = useRef(null);

	useEffect(function updateState() {
		//  This effect makes reanimated work
		setRender({});
		modalActions.setContainerRef(containerRef);
	}, []);

	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>D-Labs</title>
			</Head>
			<View style={styles.container} ref={containerRef}>
				<Component {...pageProps} />
			</View>
			<ModalManager />
		</>
	);
};

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'fixed' as never,
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
});
