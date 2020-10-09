import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
import HabitList from '../components/HabitList'

class HomeScreen extends React.Component {

    render () {
        return(
            <View>
                <Text style={styles.textStyle}>We are in the home screen!</Text>
                <HabitList/>
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

export default HomeScreen