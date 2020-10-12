import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
import CreateForm from '../components/CreateForm';
import HabitList from '../components/HabitList'
import API from '../constants/Api';
import Timer from '../components/Timer'

class HomeScreen extends React.Component {

    state = {
        habits: this.props.user.habits,
        showTimer: false,
        timerHabit: {}
    }

    createHandler = (habitObj) => {
        console.log(habitObj)
        fetch(`${API}/habits`, 
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify(habitObj)
        }   
        ).then(response => response.json())
        .then(newHabit => {
            console.log(newHabit)
            let newArray = [...this.state.habits, newHabit.habit]
            this.setState({
                habits: newArray
            })
        })
    }

    deleteHandler = (habitObj) => {
        fetch(`${API}/habits/${habitObj.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                accepts: 'application/json'
            }
        }).then(response => response.json())
        .then(deletedObj => {
            if(deletedObj.id === undefined) {
                let newArray = this.state.habits.filter(habit => habit.id !== habitObj.id)
                this.setState({
                    habits: newArray
                })
            }
            
        })
    }

    editHandler = (habitObj, updatedTitle, updatedMinutes) => {
        fetch(`${API}/habits/${habitObj.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                accepts: 'application/json'
            },
            body: JSON.stringify({
                title: updatedTitle,
                minutes: updatedMinutes
            })            
        }).then(response => response.json())
        .then(updatedObj => {
            console.log('The updated habit', updatedObj.id)
            console.log('The updated habit', updatedObj)
            let newArray = [...this.state.habits]
            let found = newArray.find(habit => updatedObj.habit.id == habit.id)
            console.log(found)
            found.title = updatedObj.habit.title
            found.minutes = updatedObj.habit.minutes
            console.log(newArray)
            this.setState({
                habits: newArray
            })
        })
    }

    timerHandler = (habit) => {
        let previousState = this.state.showTimer
        this.setState({
            showTimer: !previousState,
            timerHabit: habit
        })
    }

    endOfTimerHandler = (habit) => {
        let previousState = this.state.showTimer
        this.setState({
            showTimer: !previousState
        })
    }


    render () {
        return(
            <View>
                { this.state.showTimer ? <Timer habit={this.state.timerHabit} endOfTimerHandler={this.endOfTimerHandler}/> : <View>
                    <Text style={styles.textStyle}>We are in the home screen!</Text>
                    <CreateForm user={this.props.user} createHandler={this.createHandler}/>
                    <HabitList user={this.props.user} habits={this.state.habits} deleteHandler={this.deleteHandler} editHandler={this.editHandler} timerHandler={this.timerHandler}/> 
                </View> }
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