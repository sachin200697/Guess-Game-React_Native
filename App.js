import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './components/screens/StartGameScreen';
import GameScreen from './components/screens/GameScreen';
import React, { useState } from 'react';
import GameOver from './components/screens/GameOver';
import * as Font from 'expo-font';
// import { AppLoading } from 'expo' // it will give error
import AppLoading from 'expo-app-loading';


export default function App() {
	const [userNumber, setUserNumber] = useState();
	const [round, setRound] = useState(0);
	const onStartGame = (selectedNumber) => {
		setUserNumber(selectedNumber);
	};
	const onSetRound = (noOfRounds) => {
		setRound(noOfRounds);
	};
	const onGameOver = () => {
		setRound(0);
		setUserNumber(null);
	};
	let Screen = <StartGameScreen onStartGame={onStartGame} />;
	if (userNumber && round <= 0) {
		Screen = <GameScreen userChoice={userNumber} onSetRound={onSetRound} />;
	} else if (round > 0) {
		Screen = <GameOver round={round} onGameOver={onGameOver} />;
	}
	// Screen = <GameOver round={round} onGameOver={onGameOver}/>
	const fetchFonts = () => {
		Font.loadAsync({
			'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'), // for key('open-sence') you can write any name
			'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
		});
	};
	const [dataLoaded, setDataLoaded] = useState(false);

	//as we don't want to render anything if fonts are not loaded
	if (!dataLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setDataLoaded(true)}
				onError={(err) => {
					console.log(err);
				}}
			/>
		);
	}

	return (
		<SafeAreaView style={styles.screen}>
			<Header title={'Guess a Number'} />
			<ScrollView>{Screen}</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});
