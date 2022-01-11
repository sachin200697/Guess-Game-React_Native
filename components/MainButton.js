import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import colors from '../constants/colors'

export default function MainButton(props) {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
            <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>{ props.children}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create( {
    buttonContainer: {
        backgroundColor: colors.primary,
        borderRadius: 5,
        padding:10,
    },
    buttonText: {
        color: 'white',
        fontFamily: 'open-sans-bold'
    },
})

