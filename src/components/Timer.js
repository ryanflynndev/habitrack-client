import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

class Timer extends React.Component {
    
    state = {
        minutes: this.props.habit.minutes,
        seconds: 0
    }

    componentDidMount () {
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state
            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval)
                    this.props.endOfTimerHandler(this.props.habit)
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            } 
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render () {
        const { minutes, seconds } = this.state
        return(
            <View>
                <Text style={styles.headerStyle}>{this.props.habit.title}</Text>
                <MaterialCommunityIcons name="clock" size={250} color="#834bff" style={styles.timerStyle} />
                <Text style={styles.timeStyle}>Time Remaining: { minutes }:{ seconds < 10 ? `0${ seconds }` : seconds }</Text>
                <TouchableOpacity onPress={() => {
                    clearInterval(this.myInterval)
                    this.props.endOfTimerHandler(this.props.habit)
                }}>
                    <Text style={styles.cancelButtonStyle}>Cancel</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    timeStyle: {
        alignSelf: 'center',
        marginTop: 40,
        fontSize: 24
    },
    headerStyle: {
        alignSelf: 'center',
        marginTop: 40,
        fontSize: 42
    },
    timerStyle: {
        alignSelf: 'center',
        marginTop: 75
    },
    cancelButtonStyle: {
        alignSelf: 'center',
        marginTop: 30,
        color: '#ff1744',
    }
})

export default Timer