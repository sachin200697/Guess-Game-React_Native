import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

export default function Card(props) {
    return (
        <View style={{ ...styles.card, ...props.style }}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create( {
    card: {
        elevation: 8,   //for shadow effect on android

        // shadow effect for ios
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 0,
        borderRadius: 6,
        padding: 10,
    }
})
