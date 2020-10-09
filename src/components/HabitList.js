import React from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';



const HABITS = [
    {title: "Running", minutes: 20},
    {title: "Reading", minutes: 5},
    {title: "Japanese", minutes: 10}
]

class HabitList extends React.Component {


    render () {

        return (
            <View>
                <FlatList
                    keyExtractor={(habit) => {
                        return habit.title
                    }}
                    data={HABITS}
                    renderItem={({item}) => {
                        return <Text style={styles.habitStyle}>{item.title}</Text>
                    }}
                />
                <TextInput/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    habitStyle: {
        marginLeft: 20,
        marginTop: 10,
        fontSize: 32
    }
})

export default HabitList