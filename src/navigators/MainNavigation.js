import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Text, View, StyleSheet } from 'react-native';
import StreakScreen from '../screens/StreakScreen'
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import TimeSpentScreen from '../screens/TimeSpentScreen';
import LoginScreen from '../screens/LoginScreen'
import API from '../constants/Api'

const Tab = createBottomTabNavigator();


class MainNavigation extends React.Component {

    state = {
        users: [],
        user: undefined
    }

    componentDidMount() {
        fetch(`${API}/users`)
        .then(response => response.json())
        .then(users => {
            this.setState({
                users: users
            })
        })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            throw error
            });
    }

    loginHandler = (text) => {
        let found = this.state.users.find(user => user.username === text)
        if(found){
            this.setState({
                user: found
            })
        }
        
    }

    userUpdateHandler = (userObj) => {
        fetch(`${API}/users/${userObj.id}`)
        .then(response => response.json())
        .then(theUser => {
            console.log(theUser)
            if(theUser) {
                this.setState({
                    user: theUser.user
                })
            }
        })
    }

    render() {

        return (
            <>
                { this.state.user ? (<NavigationContainer>
                            <Tab.Navigator initialRouteName="Home">
                                <Tab.Screen name="Home" children={() => <HomeScreen user={this.state.user} userUpdateHandler={this.userUpdateHandler}/>}  options={{
                                tabBarLabel: 'Home',
                                tabBarIcon: () => (
                                <MaterialCommunityIcons name="home-circle" size={32} color= "#834bff" />
                                ),
                            }} />
                                <Tab.Screen name="Streak" children={() => <StreakScreen user={this.state.user}/>}  options={{
                                tabBarLabel: 'Streaks',
                                tabBarIcon: () => (
                                <Entypo name="calendar" size={32} color="#834bff" />
                                ),
                            }} />
                                <Tab.Screen name="Time Spent" children={() => <TimeSpentScreen user={this.state.user}/>}  options={{
                                tabBarLabel: 'Time Spent',
                                tabBarIcon: () => (
                                <AntDesign name="clockcircle" size={32} color="#834bff" />
                                ),
                            }} />
                            </Tab.Navigator>
                        </NavigationContainer>) : <LoginScreen loginHandler={this.loginHandler}/>
                }
            </>
        );
    }

}

export default MainNavigation