import React from 'react'
import { Text, View, StyleSheet } from 'react-native';

class TimeSpentScreen extends React.Component {

    render () {
        return(
            <View>
                <Text style={styles.textStyle}>We are in the TimeSpent screen!</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textStyle: {
        alignSelf: 'center',
        marginTop: 50
    }
})

export default TimeSpentScreen