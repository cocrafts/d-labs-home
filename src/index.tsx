import type { FC } from 'react';
import { StyleSheet, View, Image } from 'react-native';

export const App: FC = () => {
	const commingSrc = {
		uri: '/img/coming-soon.png',
	};

  return (
    <View style={styles.container}>
			<Image style={styles.comingSoonImg} source={commingSrc}/>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
  },
	comingSoonImg: {
		width: 350,
		height: 350,
	},
});
