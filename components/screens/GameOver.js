import React, {useState, useEffect} from 'react';
import {
	Button,
	StyleSheet,
	Text,
	View,
	Image,
	Dimensions,
} from 'react-native';
import NumberContainer from '../NumberContainer';
import MainButton from '../MainButton';

export default function GameOver ( props ) {
	const [deviceWidth, setDeviceWidth] = useState( Dimensions.get( 'window' ).width );
	useEffect(() => {
		const listener = Dimensions.addEventListener( 'change', () => setDeviceWidth( Dimensions.get( 'window' ).width ) );

		// we can use remove instead of removeEventListener
		return () => { listener.remove() };
	})
	console.log( Dimensions.get( 'window' ).width, Dimensions.get( 'screen' ).width );
	
	// Now we can use deviceWidth instead of Dimentions.get('window).width as we are maaintainng width as state.

	return (
		<View style={styles.screen}>
			<Text> Game Over </Text>
			<View style={styles.imageContainer}>
				<Image
					source={require(`../../assets/images/success.png`)}
					style={styles.image}
					// resizeMode='repeat'  // we can also use resizeMode prop to give the auto size to image
				/>
			</View>
			<Text style={styles.title}>Rounds taken to guees the correct no.</Text>
			<NumberContainer>
				<Text style={styles.title}>{props.round}</Text>
			</NumberContainer>
			{/* <Button title='Start New Game' onPress={props.onGameOver} /> */}
			<MainButton onPress={props.onGameOver}>Start New Game</MainButton>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		padding: 5,
		fontSize: 20,
		width: Dimensions.get('screen').width / 1.5,
		textAlign: 'center',
	},
	imageContainer: {
		width:
			Dimensions.get('window').width >= 300
				? Dimensions.get('window').width / 1.5
				: Dimensions.get('window').width / 2,
		height:
			Dimensions.get('window').width >= 300
				? Dimensions.get('window').width / 1.5
				: Dimensions.get('window').width / 2,
		borderRadius: 150,
		overflow: 'hidden',
	},
	image: {
		width: '100%',
		height: '100%',
	},
});
