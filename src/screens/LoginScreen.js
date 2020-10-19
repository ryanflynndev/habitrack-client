import React from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';


class LoginScreen extends React.Component {

    state = {
        username: ''
    }

    render () {
        return(
            <View style={styles.backgroundStyle}>
                <Text style={styles.textStyle}>Welcome to Habitrack!</Text>
                <Feather style={styles.logoStyle} name="book-open" size={100} color="#FFFFFF" />
                <TextInput 
                    value={this.state.username} 
                    placeholder="Username" 
                    onChangeText={(text) => {
                        this.setState({username: text})
                    }}
                    style={styles.textInputStyle}
                />
                <TouchableOpacity
                    title="Log In/Sign Up" 
                    onPress={() => this.props.loginHandler(this.state.username)}
                    >
                        <Text style={styles.loginButtonStyle}>Login/Sign Up</Text>
                    </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textStyle: {
        alignSelf: 'center',
        marginTop: 150,
        color: '#FFFFFF',
        fontSize: 28
    },
    textInputStyle: {
        alignSelf: 'center',
        marginTop: 75,
        height: 30,
        width: 180,
        backgroundColor: '#eeeeee'
    },
    backgroundStyle: {
        flex: 1,
        backgroundColor: '#834bff'
    },
    logoStyle: {
        alignSelf: 'center',
        marginTop: 50
    },
    loginButtonStyle: {
        alignSelf: 'center',
        color: '#FFFFFF',
        marginTop: 20,
        fontSize: 18
    }
})

export default LoginScreen