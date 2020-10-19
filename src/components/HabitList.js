import React from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import HabitItem from '../components/HabitItem'



class HabitList extends React.Component {



    render () {
        return (
            <View>
                <FlatList
                    keyExtractor={(habit) => {
                        return `${habit.id}`
                    }}
                    data={this.props.habits}
                    renderItem={({item}) => {
                        return (<HabitItem habit={item} deleteHandler={this.props.deleteHandler} editHandler={this.props.editHandler} timerHandler={this.props.timerHandler} user={this.props.user} userUpdateHandler={this.props.userUpdateHandler} userHabits={this.props.userHabits}/>)
                    }}
                />
            </View>
        )
    }
}



export default HabitList