import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Button} from 'react-native';

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
                <TextInput
                    value={this.state.title}
                    placeholder="name of habit"
                    onChangeText={(text) => {
                        this.setState({title: text})
                    }}
                    style={styles.textInputStyle}
                />
                <TextInput
                    value={this.state.minutes}
                    placeholder="minutes"
                    onChangeText={(text) => {
                        this.numberHandler(text)
                    }}
                    style={styles.textInputStyle}
                />
                <Button 
                    title="Create Habit" 
                    onPress={() => this.props.createHandler({title: this.state.title, minutes: this.state.minutes, time_spent: 0, run_streak: 0, user_id: this.props.user.id})}
                    />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInputStyle: {
        alignSelf: 'center',
        marginTop: 50,
        height: 30,
        width: 180,
        backgroundColor: '#eeeeee'
    }
})


export default CreateForm