import React, {useEffect, useState, useContext} from 'react'
import { View, Text, StyleSheet, Button} from 'react-native'
import { getTokens } from '../api/spotifyAuth'
import DBContext from '../context/dbContext'


const LoginScreen = ({navigation}) => {
    const [userData, setUserData] = useState(null)
    const [userExists, setUserExists] = useState(null)

    const { checkIfUserExists, createSpotifyObject } = useContext(DBContext)

    const getSpotifyAPIToken = async () => {
        let response = await getTokens();
        setUserData(response)
    }

    // Before logging in
    useEffect(()=>{
        const fetchData = async () => {
            if (userData && new Date().getTime() > userData.expirationTime) {
                getSpotifyAPIToken()
            } 
        }
        fetchData()

    }, [])

    // After logging in 
    useEffect(()=>{
        const getSpotifyData = async () => {
            // Initialise spotify object
            await createSpotifyObject(userData.accessToken)

            // Check if user exists
            setUserExists(checkIfUserExists())
        }

        getSpotifyData()
        

    }, [userData])

    // Initialise User Data Screen
    if (userData) {

        if (userExists) {
            return (
                <View style={styles.screenStyle}>
                    <Text>User already initialised!</Text>
                </View>
            )    
        } else {
            return (
                <View style={styles.screenStyle}>
                    <Text>Prepare to initialise data!</Text>
                </View>
            )
        }
    // For users who are NOT logged in
    } else {
        return (
            <View style={styles.screenStyle}>
                <Button 
                    title="Login with Spotify"
                    onPress={()=>{
                        getSpotifyAPIToken()
                    }}
                />
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    screenStyle: {
        margin: 25,
        alignItems: 'center'
    },
    profileIcon: {
        height: 200,
        width: 200
    }
})

export default LoginScreen

