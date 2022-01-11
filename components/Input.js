import React from 'react'
import {StyleSheet, TextInput, View} from 'react-native'

export default function Input(props) {
    return (
        <TextInput {...props} style={{...props.style, ...styles.input}} />
    )
}
const styles = StyleSheet.create( {
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginVertical: 10,
        height:30,
    }
})