import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';

class HabitItem extends React.Component {

    state = {
        editable: false,
        editedTitle: this.props.habit.title,
        editedMinutes: `${this.props.habit.minutes}`
    }

    render() {
        return (
            <View>
                <View style={styles.viewStyle}>
                    <Text style={styles.habitStyle}>{this.props.habit.title}</Text>
                    <Text style={styles.minutesStyle}>{this.props.habit.minutes} min.</Text>
                </View>
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
        marginLeft: 175,
        marginTop: 10,
        fontSize: 22
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
    }
})

export default HabitItem