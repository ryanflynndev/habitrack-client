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
                        console.log(item)
                        return (<HabitItem habit={item} deleteHandler={this.props.deleteHandler} editHandler={this.props.editHandler}/>)
                    }}
                />
            </View>
        )
    }
}



export default HabitList