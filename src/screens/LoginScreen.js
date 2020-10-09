import React from 'react'
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';



class LoginScreen extends React.Component {

    state = {
        username: ''
    }

    render () {
        return(
            <View>
                <Text style={styles.textStyle}>We are in the login screen!</Text>
                <TextInput 
                    value={this.state.username} 
                    placeholder="Username" 
                    onChangeText={(text) => {
                        this.setState({username: text})
                    }}
                    style={styles.textInputStyle}
                />
                <Button 
                    title="Log in" 
                    onPress={() => this.props.loginHandler(this.state.username)}
                    />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textStyle: {
        alignSelf: 'center',
        marginTop: 50
    },
    textInputStyle: {
        alignSelf: 'center',
        marginTop: 50,
        height: 30,
        width: 180,
        backgroundColor: '#eeeeee'
    }
})

export default LoginScreen