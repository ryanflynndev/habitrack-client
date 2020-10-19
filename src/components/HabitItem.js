import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';

class HabitItem extends React.Component {

    state = {
        editable: false,
        editedTitle: this.props.habit.title,
        editedMinutes: `${this.props.habit.minutes}`,
        disabled: false,
        renderError: false
    }

    buttonHandler = () => {

        let mostRecent = this.props.user.user_habits.find((userHabit) => {
            return (userHabit.id === this.props.user.most_recent_user_habit.id) && (this.props.habit.id === userHabit.habit_id)
        })
        //sort by most recent userHabit
        if(mostRecent === undefined){
            this.props.timerHandler(this.props.habit)
        } else {

            console.log(mostRecent)
            let now = new Date()
            console.log('we in habitdone', now)
            let oneDay = 60 * 60 * 24 * 1000
            let testTime = 30 * 1000
            let createdAt = mostRecent.time_created
            console.log(createdAt)
            if((now - createdAt) < testTime){
                this.setState({
                    disabled: true
                })
                this.setState({
                    renderError: true
                })
                let counter = 0
                this.myInterval = setInterval(() => {
                    
                    if(counter === 1){
                        clearInterval(this.myInterval)
                        this.setState({
                            renderError: false
                        })
                        this.setState({
                            disabled: false
                        })   
                    }
                    counter += 1
  
                }, 1000)
            

            } else {

                this.props.timerHandler(this.props.habit)

            }
        }

            
    }

//     componentDidMount() {

//         let mostRecent = this.props.user.user_habits.find((userHabit) => {
//             return (userHabit.id === this.props.user.most_recent_user_habit.id) && (this.props.habit.id === userHabit.habit_id)
//         })
//         if(mostRecent === undefined){
            
//         } else {

//             console.log(mostRecent)
//             let now = new Date()
//             console.log('we in habitdone', now)
//             let oneDay = 60 * 60 * 24 * 1000
//             let testTime = 30 * 1000
//             let createdAt = mostRecent.time_created
//             console.log(createdAt)
//             if((now - createdAt) < testTime){
//                 let previous = this.state.disabled
//                 this.setState({
//                     disabled: !previous
//                 })
//             }

//     }
// }

    render() {

        return (
            <View>
                { this.state.disabled ? 
                    <TouchableOpacity  title='Timer' 
                    onPress={() => {
                        this.buttonHandler()
                    }} 
                    >
                        <View style={styles.viewStyle}>
                            <Text style={styles.disabledHabitStyle}>{this.props.habit.title}</Text>
                            <Text style={styles.disabledMinutesStyle}>{this.props.habit.minutes} min.</Text>
                        </View>
                    </TouchableOpacity> 
                    
                    :

                    <TouchableOpacity  title='Timer' 
                    onPress={() => {
                        this.buttonHandler()
                    }} 
                    >
                        <View style={styles.viewStyle}>
                            <Text style={styles.habitStyle}>{this.props.habit.title}</Text>
                            <Text style={styles.minutesStyle}>{this.props.habit.minutes} min.</Text>
                        </View>
                    </TouchableOpacity> 
                }
                <View style={styles.buttonViewStyle}>
                    <TouchableOpacity title='Edit' onPress={() => { 
                        let previousState = this.state.editable
                        this.setState({
                            editable: !previousState
                        })}}>
                        <Text style={styles.editButtonStyle}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity title='Delete' onPress={() => this.props.deleteHandler(this.props.habit)}>
                        <Text style={styles.deleteButtonStyle}>Delete</Text>
                    </TouchableOpacity>
                </View>

                {this.state.editable ? <View style={styles.editFormStyle}>
                    <TextInput style={styles.textInputStyle} placeholder="title" value={this.state.editedTitle} onChangeText={(text) => this.setState({editedTitle: text})}/>

                    <TextInput style={styles.textInputStyle} placeholder="minutes" value={this.state.editedMinutes} onChangeText={(text) => this.setState({editedMinutes: text})}/>

                    <TouchableOpacity title='Submit' onPress={() => 
                    {
                        this.props.editHandler(this.props.habit, this.state.editedTitle, this.state.editedMinutes)
                        let previousState = this.state.editable
                        this.setState({
                            editable: !previousState
                        })
                        }}>
                        <Text style={styles.editButtonStyle}>Submit</Text>
                    </TouchableOpacity>
                </View> : null}
                {this.state.renderError ? <Text style={styles.errorStyle}>You already did that habit today good job!</Text> : null}
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
    disabledHabitStyle: {
        marginLeft: 20,
        marginTop: 10,
        fontSize: 22,
        color: 'grey'
    },
    disabledMinutesStyle: {
        marginLeft: 275,
        marginTop: 10,
        fontSize: 22,
        position: 'absolute',
        color: 'grey'
    },
    errorStyle: {
        alignSelf: 'center',
        fontSize: 16,
        marginTop: 20,
        marginBottom: 20,
        color: '#834bff'
    }
    
})

export default HabitItem