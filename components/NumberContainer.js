import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Colors from '../constants/colors'

export default function NumberContainer(props) {
    return (
        <View style={styles.numbercontainer}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create( {
    numbercontainer: {
        color: 'blue',
        borderWidth: 2,
        borderColor: Colors.danger,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        paddingHorizontal:10,
    }
})

