import React from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';


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
                        return <Text>{item.title}</Text>
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({

})

export default HabitList