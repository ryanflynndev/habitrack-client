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

const Tab = createBottomTabNavigator();

class MainNavigation extends React.Component {

    state = {
        users: [],
        user: undefined
    }

    componentDidMount() {
        fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(users => console.log(users))
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
             // ADD THIS THROW error
            throw error;
            });
    }

    loginHandler = () => {

    }

    render() {
        return (
            <>
                { this.state.user ? (<NavigationContainer>
                            <Tab.Navigator initialRouteName="Home">
                                <Tab.Screen name="Home" component={HomeScreen}  options={{
                                tabBarLabel: 'Home',
                                tabBarIcon: () => (
                                <MaterialCommunityIcons name="home-circle" size={32} color= "#834bff" />
                                ),
                            }} />
                                <Tab.Screen name="Streak" component={StreakScreen}  options={{
                                tabBarLabel: 'Streaks',
                                tabBarIcon: () => (
                                <Entypo name="calendar" size={32} color="#834bff" />
                                ),
                            }} />
                                <Tab.Screen name="Time Spent" component={TimeSpentScreen}  options={{
                                tabBarLabel: 'Time Spent',
                                tabBarIcon: () => (
                                <AntDesign name="clockcircle" size={32} color="#834bff" />
                                ),
                            }} />
                            </Tab.Navigator>
                        </NavigationContainer>) : <LoginScreen/>
                }
            </>
        );
    }

}

export default MainNavigation