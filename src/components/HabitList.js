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
                    scrollEnabled={false}
                    data={this.props.habits}
                    renderItem={({item}) => {
                        return (<HabitItem habit={item} deleteHandler={this.props.deleteHandler} editHandler={this.props.editHandler} timerHandler={this.props.timerHandler} user={this.props.user}/>)
                    }}
                
                />
            </View>
        )
    }
}



export default HabitList