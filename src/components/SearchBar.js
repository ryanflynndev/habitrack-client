import React from 'react'
import {View, TextInput, StyleSheet, Button} from 'react-native'
import { Feather } from '@expo/vector-icons';


const SearchBar = (props) => {

    return(
        <View style={styles.backgroundStyle}>
            <Feather name="search" color="black" style={styles.iconStyle} />
            <TextInput style={styles.inputStyle} placeholder="Search" onChangeText={(term) => props.searchHandler(term)} value={props.searchValue}/>
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundStyle: {
        marginTop: 10,
        backgroundColor: '#eeeeee',
        height: 30,
        borderRadius: 5,
        marginHorizontal: 20,
        flexDirection: 'row',
        marginBottom: 20
    },
    inputStyle: {
        flex: 1,
        fontSize: 18,
        marginHorizontal: 10
    },
    iconStyle: {
        fontSize: 20,
        alignSelf: 'center',
        marginHorizontal: 0
    }
})

export default SearchBar