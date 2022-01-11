import React, { useState, useRef, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button,
	Alert,
	ScrollView,
} from 'react-native';
import Card from '../Card';
import NumberContainer from '../NumberContainer';
import MainButton from '../MainButton';
import { Ionicons } from '@expo/vector-icons';

const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const rndNum = Math.floor(Math.random() * (max - min)) + min;
	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	}
	return rndNum;
};

export default function GameScreen(props) {
	// using useRef we can create Objects that can survice even where component rerenders
	// we can use useRef to maintain the current max and min for the next cycle
	let currentHigh = useRef(1);
	let currentLow = useRef(100);
	const [guessList, setGuessList] = useState([]);
	const [currentGuess, setCurrentGuess] = useState(
		generateRandomBetween(1, 100, props.userChoice),
	);
	// setGuessList([...guessList, currentGuess])   // it can cause infinity rerundring
	// but we can use like this:
	/*
        const initialGuess = generateRandomBetween( 1, 100, props.userChoice )
        const [currentGuess, setCurrentGuess] = useState( initialGuess );
        const [guessList, setGuessList] = useState( [initialGuess] );
    */

	const nextRandomNumber = (decision) => {
		if (
			(decision === 'low' && currentGuess > props.userChoice) ||
			(decision === 'high' && currentGuess < props.userChoice)
		) {
			Alert.alert(`Don't lie!`, `You know that this is wrong`, [
				{ text: 'Sorry', style: 'cancel' },
			]);
			return;
		}
		if (decision === 'low') {
			currentHigh.current = currentGuess;
		} else if (decision === 'high') {
			currentLow.current = currentGuess + 1; // because Math.random(include, exclude) // currentLow is included
			//so we need to add 1 so that it will never guess previous generated random no.
		}
		const nxtRandNo = generateRandomBetween(
			currentLow.current,
			currentHigh.current,
			currentGuess,
		);
		setCurrentGuess(nxtRandNo);
	};

	useEffect(() => {
		setGuessList([...guessList, currentGuess]);
		if (currentGuess === props.userChoice) {
			props.onSetRound(guessList.length);
		}
	}, [currentGuess]);
	return (
		<View style={styles.screen}>
			<Text>Opponents Guess!</Text>
			<NumberContainer>
				<Text style={styles.title}>{currentGuess}</Text>
			</NumberContainer>
			<Card style={styles.buttonContainer}>
				<MainButton
					onPress={() => {
						nextRandomNumber('high');
					}}
				>
					<Ionicons name='md-remove' size={24} color={'white'} />
				</MainButton>
				<MainButton
					onPress={() => {
						nextRandomNumber('low');
					}}
				>
					<Ionicons name='md-add' size={24} color={'white'} />
				</MainButton>
			</Card>
			<View style={styles.listContainer}>
				{/* if we want to make this scrollable then give style flex: 1 for the above View component */}
				<ScrollView>
					{/* we can not apply style on ScrollView but can apply contentContainerStyle
                        but now we can not use justifyContent as normally. to do it instead of using flex: 1
                        we will use flexGrow: 1,
                     */}
					{guessList.map((guess, index) => (
						<View key={guess} style={styles.list}>
							<Text>#{guessList.length - index}</Text>
							<Text>{guess}</Text>
						</View>
					))}
				</ScrollView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: 'center',
	},
	title: {
		fontSize: 20,
		marginVertical: 10,
	},
	buttonContainer: {
		width: '60%',
		padding: 20,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	listContainer: {
		flex: 1,
	},
	list: {
		width: 200,
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderWidth: 1,
		borderColor: 'gray',
		padding: 10,
		marginVertical: 10,
	},
});
