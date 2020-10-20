import React from 'react'
import { Text, View, StyleSheet, Modal, ScrollView } from 'react-native';
import CreateForm from '../components/CreateForm';
import HabitList from '../components/HabitList'
import API from '../constants/Api';
import Timer from '../components/Timer'
import SearchBar from '../components/SearchBar';
import { FontAwesome } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import { LogBox } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

class HomeScreen extends React.Component {

    state = {
        habits: this.props.user.habits,
        showTimer: false,
        timedHabit: {},
        timedHabits: [],
        searchValue: '',
        canCreate: false,
        modalVisible: false
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
            timedHabits: newArray,
            
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
        console.log('this is the habit for userhabit', habit.id)
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
            console.log('then new date', newDate)
        })
    }

    render () {
        return(
            
            <ScrollView>
                { this.state.showTimer ? <Timer habit={this.state.timedHabit} endOfTimerHandler={this.endOfTimerHandler}/> : <View>
                    <Text style={styles.headerStyle}>My Daily Habits</Text>
                    {/* <CreateForm user={this.props.user} createHandler={this.createHandler}/> */}
                    <SearchBar searchValue={this.state.searchValue} searchHandler={this.searchHandler}/>
                {/* <ScrollView> */}
                    <HabitList user={this.props.user} habits={this.filterHabits()} deleteHandler={this.deleteHandler} editHandler={this.editHandler} timerHandler={this.timerHandler}/>
                    <View style={styles.buttonViewStyle}>
                        
                        <TouchableOpacity
                            onPress={() => {
                                let previous = this.state.modalVisible
                                this.setState({
                                    modalVisible: !previous
                                })
                            }}
                            >
                                <Entypo name="info-with-circle" size={34} color="#834bff" style={styles.infoButtonStyle} />
                            </TouchableOpacity>
                            <View style={styles.modalStyle}>
                                <Modal
                                    animationType="slide"
                                    transparent={false}
                                    visible={this.state.modalVisible}
                                    
                                    onRequestClose={() => {
                                        Alert.alert("Modal has been closed.");
                                    }}
                                >   
                                    <TouchableOpacity
                                    onPress={() => {
                                        let previous = this.state.modalVisible
                                        this.setState({
                                            modalVisible: !previous
                                        })  
                                    }}
                                    >
                                        <AntDesign name="closecircle" size={24} style={styles.exitButtonStyle} />
                                    </TouchableOpacity>
                                    
                                    <Text style={styles.modalHeaderStyle}>Getting Started</Text>
                                    <Feather style={styles.logoStyle} name="book-open" size={100} color="#834bff" />
                                    <Text style={styles.paragraphStyle}>Habitrack is a habit tracking app that is designed to keep you on top of your daily habits.</Text>
                                    <Text style={styles.paragraphStyle}>Habitrack works on a 24 hour cycle system where each habit is tracked by daily completion. </Text>
                                    <Text style={styles.paragraphStyle}>To get started tap the "plus" button to create a habit. Here you will enter the name of the habit and the amount of minutes you want to do the habit each day. </Text>
                                    <Text style={styles.paragraphStyle}>After the habit has been created, you can tap the habit when you are ready to do that habit. This will bring up a timer screen which when finished, will add to your run streak and minutes spent for that particular habit. </Text>
                                    <Text style={styles.paragraphStyle}>If you ever need to edit or delete a habit make sure to tap the edit or delete buttons on the bottom of each habit. </Text>
                                    
                                </Modal>
                            </View>
                            <TouchableOpacity 
                                onPress={() => {
                                    let previousState = this.state.canCreate
                                    this.setState({
                                        canCreate: !previousState
                                    })}}
                                >
                                <Ionicons style={styles.addButtonStyle} name="md-add-circle" size={40} color='#834bff' />
                            </TouchableOpacity>
                        </View> 
                            {this.state.canCreate ?  <CreateForm user={this.props.user} createHandler={this.createHandler}/> : null }
                            
                    
                    {/* </ScrollView> */}
                </View> }
            </ScrollView>
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
        marginLeft: 270,
        marginTop: 10,
        
    },
    modalHeaderStyle: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 32,
        marginLeft: 20,
        alignSelf: 'center'
    },
    logoStyle: {
        alignSelf: 'center',
        marginTop: 20
    },
    paragraphStyle: {
        marginLeft: 10,
        marginRight: 10,
        fontSize: 16,
        marginTop: 20,
        
    },
    buttonViewStyle: {
        display: 'flex',
        flexDirection: 'row'
    },
    infoButtonStyle: {
        marginLeft: 20,
        marginTop: 14,

    },
    exitButtonStyle: {
        color: '#ff1744',
        marginLeft: 10,
        marginTop: 30
    }
})

export default HomeScreen