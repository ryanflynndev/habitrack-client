import React from 'react'
import { Text, View, StyleSheet, Modal } from 'react-native';
import CreateForm from '../components/CreateForm';
import HabitList from '../components/HabitList'
import API from '../constants/Api';
import Timer from '../components/Timer'
import SearchBar from '../components/SearchBar';
import { FontAwesome } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';

class HomeScreen extends React.Component {

    state = {
        habits: this.props.user.habits,
        showTimer: false,
        timedHabit: {},
        timedHabits: [],
        searchValue: '',
        canCreate: false,
        userHabits: this.props.user.user_habits
    }

    createHandler = (habitObj) => {
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
            let previous = this.state.canCreate
            this.setState({
                habits: newArray,
                canCreate: !previous
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
        this.dateCreated(habit)    
        
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

    searchHandler = (term) => {
        this.setState({
            searchValue: term
        })  
    }

    filterHabits = () => {
        return this.state.habits.filter(habit => habit.title.toLowerCase().includes(this.state.searchValue.toLowerCase()))
    }    

    dateCreated = (habit) => {
        fetch(`${API}/user_habits`, 
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify({
                habit_id: habit.id,
                user_id: this.props.user.id
            })
        }   
        ).then(response => response.json())
        .then(newDate => {
            console.log(this.state.userHabits)
            let newArray = [...this.state.userHabits, newDate]
            this.setState({
                userHabits: newArray
            })
            this.props.userUpdateHandler(this.props.user)
        })
    }

    render () {
        return(
            <View>
                { this.state.showTimer ? <Timer habit={this.state.timedHabit} endOfTimerHandler={this.endOfTimerHandler}/> : <View>
                    <Text style={styles.headerStyle}>My Daily Habits</Text>
                    {/* <CreateForm user={this.props.user} createHandler={this.createHandler}/> */}
                    <SearchBar searchValue={this.state.searchValue} searchHandler={this.searchHandler}/>
                    <HabitList user={this.props.user} habits={this.filterHabits()} deleteHandler={this.deleteHandler} editHandler={this.editHandler} timerHandler={this.timerHandler} userUpdateHandler={this.props.userUpdateHandler} userHabits={this.state.userHabits}/> 
                    <TouchableOpacity 
                        onPress={() => {
                            let previousState = this.state.canCreate
                            this.setState({
                                canCreate: !previousState
                            })}}
                        >
                        <Ionicons style={styles.addButtonStyle} name="md-add-circle" size={40} color='#834bff' />
                    </TouchableOpacity>
                    {this.state.canCreate ?  <CreateForm user={this.props.user} createHandler={this.createHandler}/> : null }
                </View> }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textStyle: {
        alignSelf: 'center',
        marginTop: 50
    },
    headerStyle: {
        marginTop: 75,
        marginBottom: 30,
        fontSize: 42,
        marginLeft: 20
    },
    addButtonStyle: {
        marginLeft: 310,
        marginTop: 10
    }
})

export default HomeScreen