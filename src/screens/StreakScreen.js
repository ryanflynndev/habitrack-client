import React from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native';
import SearchBar from '../components/SearchBar';
import API from '../constants/Api'

class StreakScreen extends React.Component {

    state = {
        searchValue: ''
    }

    searchHandler = (term) => {
        this.setState({
            searchValue: term
        })  
    }

    filterHabits = () => {
        return this.props.user.habits.filter(habit => habit.title.toLowerCase().includes(this.state.searchValue.toLowerCase()))
    }   

    render () {
        return(
            <View>
                <Text style={styles.headerStyle}>My Run Streaks</Text>
                <SearchBar searchValue={this.state.searchValue} searchHandler={this.searchHandler}/>
                <FlatList
                    keyExtractor={(habit) => {
                        return `${habit.id}`
                    }}
                    data={this.filterHabits()}
                    renderItem={({item}) => {
                        return (
                            <View style={styles.viewStyle}>
                                <Text style={styles.habitStyle}>{item.title}</Text>
                                <Text style={styles.runStreakStyle}>{item.run_streak} day(s)</Text>
                            </View>)
                    }}
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
    habitStyle: {
        marginLeft: 20,
        marginTop: 10,
        fontSize: 22
    },
    runStreakStyle: {
        marginLeft: 175,
        marginTop: 10,
        fontSize: 22
    },
    viewStyle: {
        display: 'flex',
        flexDirection: 'row'
    },
    headerStyle: {
        marginTop: 75,
        marginBottom: 30,
        fontSize: 42,
        marginLeft: 20
    }
})

export default StreakScreen