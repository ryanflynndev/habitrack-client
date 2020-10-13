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
        timedHabit: {},
        timedHabits: []
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
            this.props.userUpdateHandler(this.props.user)
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
                this.props.userUpdateHandler(this.props.user)
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
            this.props.userUpdateHandler(this.props.user)
            let newArray = [...this.state.habits]
            let found = newArray.find(habit => updatedObj.habit.id == habit.id)
            found.title = updatedObj.habit.title
            found.minutes = updatedObj.habit.minutes
            this.setState({
                habits: newArray
            })
        })
    }

    timerHandler = (habit) => {
        let previousState = this.state.showTimer
        this.setState({
            showTimer: !previousState,
            timedHabit: habit
        })
    }

    endOfTimerHandler = (habit) => {
        console.log('Are we hitting the end handler?')
        let previousState = this.state.showTimer
        let newArray = [...this.state.timedHabits, habit]
        this.setState({
            showTimer: !previousState,
            timedHabits: newArray
        })
        fetch(`${API}/habits/${habit.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                accepts: 'application/json'
            },
            body: JSON.stringify({
                run_streak: habit.run_streak + 1,
                time_spent: habit.time_spent + habit.minutes
            })            
        }).then(response => response.json())
        .then(updatedHabit => {
            if(updatedHabit){
                this.props.userUpdateHandler(this.props.user)
                let newHabitArray = [...this.state.habits]
                let found = newHabitArray.find(habit => updatedHabit.habit.id == habit.id) 
                found.run_streak = updatedHabit.habit.run_streak
                found.time_spent = updatedHabit.habit.time_spent               
                this.setState({
                    habits: newHabitArray
                })
            }
        })    
    }


    render () {
        return(
            <View>
                { this.state.showTimer ? <Timer habit={this.state.timedHabit} endOfTimerHandler={this.endOfTimerHandler}/> : <View>
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