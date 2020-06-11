import React, {useEffect, useState, useContext} from 'react'
import { View, Text, StyleSheet, Button, TextInput} from 'react-native'
import { getTokens } from '../api/spotifyAuth'
import DBContext from '../context/dbContext'


const LoginScreen = ({navigation}) => {
    const [userProfile, setUserProfile] = useState(null)
    const [userExists, setUserExists] = useState(null)
    const [username, setUsername] = useState("")
    const [message, setMessage] = useState("")


    const { userAuthData, setUserAuthData, checkIfUserExists, getProfileInfo, createSpotifyObject, initialiseUser, getTopArtists, getTopTracks, getTopGenres } = useContext(DBContext)

    const getSpotifyAPIToken = async () => {
        let response = await getTokens();
        setUserAuthData(response)
    }

    const generateUserProfile = async () => {
        setMessage("Loading ...")

        let {artists, genres} = await getTopArtists()
        let topGenres = getTopGenres(genres)
        let topTracks = await getTopTracks()

        let response = await initialiseUser(username, userProfile.id, JSON.stringify(topGenres), JSON.stringify(artists), JSON.stringify(topTracks))
        navigation.navigate('Friends')
    }

    // Before logging in
    useEffect(()=>{
        const fetchData = async () => {
            if (userAuthData && new Date().getTime() > userAuthData.expirationTime) {
                getSpotifyAPIToken()
            } 
        }
        fetchData()

    }, [])

    // After logging in 
    useEffect(()=>{
        const getSpotifyData = async () => {
            
            // Initialise spotify object
            await createSpotifyObject(userAuthData.accessToken)

            // Get user profile 
            let userInfo = await getProfileInfo()
            setUserProfile(userInfo)

            // Check if user exists
            let exist = await checkIfUserExists(userInfo.id)
            setUserExists(exist)
        }

        if (userAuthData) {
            getSpotifyData()
        } else {
            setUserExists(null)
        }

        

    }, [userAuthData])

    // After checking if userExists
    useEffect(()=>{
        if (userExists) {
            navigation.navigate('Friends')
        }
    }, [userExists])

    // Initialise User Data Screen
    if (userAuthData) {

        if (userExists === false) {
            return (
                <View style={styles.screenStyle}>
                    <Text>Username: </Text>
                    <TextInput 
                        style={styles.textbox}
                        onChangeText={(value)=> {
                            setUsername(value)
                        }}
                    />
                    <Button 
                        title={"Get Spotify Data"}
                        onPress={()=>{
                            generateUserProfile()
                        }}
                    />
                    <Text>{message}</Text>
                </View>
            ) 
        } else {
            return (
                <View style={styles.screenStyle}>
                    <Text>Loading ...</Text>
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
        margin: 25
    },
    profileIcon: {
        height: 200,
        width: 200
    },
    textbox: {
        borderWidth: 1,
        borderColor: 'black',
        marginVertical: 10,
        fontSize: 15,
        padding: 10
    }
})

export default LoginScreen

