import React from 'react'
import { Text, View, StyleSheet } from 'react-native';

class Timer extends React.Component {

    timerCountdown = () => {
        let time = this.props.habit.minutes
        let timer = setInterval(() => {

            time = time - 1
            if (time <= 0){
                clearInterval(timer)
                this.props.endOfTimerHandler(this.props.habit)
            }
        }, 1000)
    }

    render () {
        return(
            <View>
                {this.timerCountdown()}
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