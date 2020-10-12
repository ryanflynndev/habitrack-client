import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

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

    render () {
        const { minutes, seconds } = this.state
        return(
            <View>
                <Text style={styles.textStyle}>Time Remaining: { minutes }:{ seconds < 10 ? `0${ seconds }` : seconds }</Text>
                <TouchableOpacity onPress={() => {
                    this.props.endOfTimerHandler(this.props.habit)
                }}>
                    <Text>Cancel</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textStyle: {
        alignSelf: 'center',
        marginTop: 50
    }
})

export default Timer