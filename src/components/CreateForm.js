import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Button, Modal} from 'react-native';

class CreateForm extends React.Component {

    state = {
        title: '',
        minutes: ''
    }

    numberHandler = (text) => {
     
            let num = parseInt(text, 10)

            this.setState({
                minutes: text
            })

    }

    render () {
        return (
            <View>
                <Text style={styles.formHeaderStyle}>Create New Habit</Text>
                <TextInput
                    value={this.state.title}
                    placeholder="Name of Habit"
                    onChangeText={(text) => {
                        this.setState({title: text})
                    }}
                    style={styles.textInputStyle}
                />
                <TextInput
                    value={this.state.minutes}
                    placeholder="Minutes"
                    onChangeText={(text) => {
                        this.numberHandler(text)
                    }}
                    style={styles.textInputStyle}
                />
                <TouchableOpacity
                    title="Create Habit" 
                    onPress={() => {
                        this.props.createHandler({title: this.state.title, minutes: this.state.minutes, time_spent: 0, run_streak: 0, user_id: this.props.user.id})
                        this.setState({
                            title: '',
                            minutes: ''
                        })
                    }}>
                        <Text style={styles.buttonStyle}>Create Habit</Text>
                    </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formHeaderStyle: {
        alignSelf: 'center',
        marginTop: 20,
        fontSize: 20       
    },
    textInputStyle: {
        alignSelf: 'center',
        marginTop: 20,
        height: 30,
        width: 180,
        backgroundColor: '#eeeeee'
    },
    buttonStyle: {
        alignSelf: "center",
        marginTop: 22,
        fontSize: 20,
        color: '#834bff',
        marginBottom: 20
    }
})


export default CreateForm