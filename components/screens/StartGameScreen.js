import React, { useState } from 'react';
import {
	Button,
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
	ScrollView,
	KeyboardAvoidingView,
} from 'react-native';
import Card from '../Card';
import Colors from '../../constants/colors';
import Input from '../Input';
import NumberContainer from '../NumberContainer';

export default function StartGameScreen(props) {
	const [enteredText, setEnteredText] = useState('');
	const [confirmed, setConfirmed] = useState(false);
	const [selectedNumber, setSelectedNumber] = useState();
	const validateText = (text) => {
		//here we are replacing everyting that is not a number with empty string('')
		// regular expressiton /[^0-9]   = not a number and /g means for entire string
		setEnteredText(text.replace(/[^0-9]/g, ''));
	};
	const onReset = () => {
		setEnteredText('');
		setConfirmed(false);
	};
	const onConfirmInput = () => {
		debugger;
		const val = parseInt(enteredText);
		if (isNaN(val) || val < 1 || val > 99) {
			// we can not check like val === NaN, we need to use isNaN function
			console.log('hellow', val);
			Alert.alert('Invalid Number!', 'Number should be b/w 1 to 99', [
				{ text: 'Okay', style: 'destructive', onPress: onReset },
			]);
			return;
		}
		setConfirmed(true);
		setSelectedNumber(val);
		setEnteredText('');
		Keyboard.dismiss();
	};
	let selectedOutputText;
	if (confirmed) {
		selectedOutputText = (
			<Card style={styles.selectedOutputText}>
				<Text>You Selected</Text>
				<NumberContainer>
					<Text style={styles.title}>{selectedNumber}</Text>
				</NumberContainer>
				<Button
					title='Start Game'
					onPress={(e) => {
						props.onStartGame(selectedNumber);
					}}
				/>
			</Card>
		);
	}
	return (
		<KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
			{/* it is better to use position for ios and padding for android for behavior prop */}
			<TouchableWithoutFeedback
				onPress={(e) => {
					Keyboard.dismiss();
				}}
			>
				<View style={styles.screen}>
					<Text style={styles.title}>Start New Game</Text>
					<Card style={styles.inputContainer}>
						<Text style={styles.title}>Select a Number</Text>
						<Input
							placeholder='Select a number'
							style={styles.textInput}
							blurOnSubmit
							maxLength={2}
							keyboardType={'number-pad'}
							autoCorrect={false}
							onChangeText={validateText}
							value={enteredText}
						/>
						<View style={styles.buttonContainer}>
							<View style={styles.button}>
								<Button
									title='Confirm'
									color={Colors.primary}
									onPress={onConfirmInput}
								/>
							</View>
							<View style={styles.button}>
								<Button title='Reset' color={Colors.danger} onPress={onReset} />
							</View>
						</View>
					</Card>
					{selectedOutputText}

					{/* empty text to have some space at bottom */}
					<Text></Text>
					<Text></Text>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: 'center',
		width: '100%',
	},
	title: {
		fontSize: 20,
		marginVertical: 10,
		fontFamily: 'open-sans-bold',
	},
	textInput: {
		width: 100,
		fontSize: 17,
		textAlign: 'center',
	},
	inputContainer: {
		width: '80%',
		alignItems: 'center',
		backgroundColor: 'white',
	},
	buttonContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginVertical: 15,
	},
	button: {
		width: '40%',
	},
	selectedOutputText: {
		padding: 20,
		alignItems: 'center',
		width: '60%',
	},
});
