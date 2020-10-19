import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import API from '../constants/Api'

class HabitItem extends React.Component {

    state = {
        editable: false,
        editedTitle: this.props.habit.title,
        editedMinutes: `${this.props.habit.minutes}`,
        disabled: false,
        habit: this.props.habit,
    }

    buttonHandler = () => {

        let mostRecent = this.props.userHabits.find((userHabit) => {
            
            return (userHabit.id === this.props.user.most_recent_user_habit.id) && (this.state.habit.id === userHabit.habit_id)
        })
        //sort by most recent userHabit
        if(mostRecent === undefined){
            this.props.timerHandler(this.state.habit)
        } else {

            let now = new Date()
            
            let oneDay = 60 * 60 * 24 * 1000
            let testTime = 10 * 1000
            let createdAt = mostRecent.time_created
            

            if((now - createdAt) < testTime){
    
            } else {
                this.props.timerHandler(this.state.habit)
            }
        }

            
    }




    // componentDidMount()  {
    //     let mostRecent = this.props.userHabits.find((userHabit) => {
    //         return (userHabit.id === this.props.user.most_recent_user_habit.id) && (this.state.habit.id === userHabit.habit_id)
    //     })
    //     console.log('WAKE UP MAN', mostRecent)
    //     if(mostRecent != undefined && this.state.habit.run_streak != 0){
    //         let now = new Date()
    //         let testTime = 30 * 1000
    //         console.log('WAKE UP seconds', now - mostRecent.time_created)
    //         console.log(testTime)
    //         if((now - mostRecent.time_created) > testTime){
    //             fetch(`${API}/habits/${this.state.habit.id}`, {
    //                 method: 'PATCH',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     accepts: 'application/json'
    //                 },
    //                 body: JSON.stringify({
    //                     run_streak: 0
    //                 })            
    //             }).then(response => response.json())
    //             .then(updatedHabit => {
    //                 console.log('HEY THIS IS THE THING', updatedHabit)
    //                 if(updatedHabit != undefined){
    //                     this.setState({
    //                         habit: updatedHabit.habit
    //                     })
    //                     this.props.userUpdateHandler(this.props.user)
    //                 }
    //             })
    //         } else {

    //         }
    //     }
    // }

    render() {
        return (
            <View>
                <TouchableOpacity  title='Timer' 
                onPress={() => {
                    this.buttonHandler()
                }} 
                disabled={this.state.disabled}>
                    <View style={styles.viewStyle}>
                        <Text style={styles.habitStyle}>{this.state.habit.title}</Text>
                        <Text style={styles.minutesStyle}>{this.state.habit.minutes} min.</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.buttonViewStyle}>
                    <TouchableOpacity title='Edit' onPress={() => { 
                        let previousState = this.state.editable
                        this.setState({
                            editable: !previousState
                        })}}>
                        <Text style={styles.editButtonStyle}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity title='Delete' onPress={() => this.props.deleteHandler(this.state.habit)}>
                        <Text style={styles.deleteButtonStyle}>Delete</Text>
                    </TouchableOpacity>
                </View>

                {this.state.editable ? <View style={styles.editFormStyle}>
                    <TextInput style={styles.textInputStyle} placeholder="title" value={this.state.editedTitle} onChangeText={(text) => this.setState({editedTitle: text})}/>

                    <TextInput style={styles.textInputStyle} placeholder="minutes" value={this.state.editedMinutes} onChangeText={(text) => this.setState({editedMinutes: text})}/>

                    <TouchableOpacity title='Submit' onPress={() => 
                    {
                        this.props.editHandler(this.state.habit, this.state.editedTitle, this.state.editedMinutes)
                        let previousState = this.state.editable
                        this.setState({
                            editable: !previousState
                        })
                        }}>
                        <Text style={styles.editButtonStyle}>Submit</Text>
                    </TouchableOpacity>
                </View> : null}
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    habitStyle: {
        marginLeft: 20,
        marginTop: 10,
        fontSize: 22
    },
    minutesStyle: {
        marginLeft: 275,
        marginTop: 10,
        fontSize: 22,
        position: 'absolute'
    },
    viewStyle: {
        display: 'flex',
        flexDirection: 'row'
    },
    deleteButtonStyle: {
        color: '#ff1744',
        fontSize: 16,
        marginLeft: 20,
        marginTop: 10,
    },
    editButtonStyle: {
        color: '#834bff',
        fontSize: 16,
        marginLeft: 20,
        marginTop: 10,
    },
    buttonViewStyle: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 10  
    },
    editFormStyle: {
        display: 'flex',
        flexDirection: 'row'
    },
    textInputStyle: {
        marginLeft: 20,
        height: 30,
        width: 120,
        backgroundColor: '#eeeeee'
    },
    checkedStyle: {

    }
})

export default HabitItem