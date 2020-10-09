import React from 'react'
import { Text, View, StyleSheet } from 'react-native';

class StreakScreen extends React.Component {

    render () {
        return(
            <View>
                <Text style={styles.textStyle}>We are in the Streak screen!</Text>
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

export default StreakScreen