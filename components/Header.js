import React from 'react'
import { Text, View, StyleSheet } from 'react-native';

function Header(props) {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>
                {props.title}
            </Text>
        </View>
    )
}
const styles = StyleSheet.create( {
    header: {
        width: '100%',
        backgroundColor: '#f7287b',
        color: 'white',
        marginTop: 36,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    headerTitle: {
        color: 'white',
        fontSize: 20
    }
})

export default Header

