import React, {useEffect, useState, useContext} from 'react'
import { ActivityIndicator, StatusBar, TouchableOpacity, View, Text, StyleSheet, Button, TextInput} from 'react-native'
import styled from "styled-components";
import { getTokens } from '../api/spotifyAuth'
import DBContext from '../context/dbContext'
import { AntDesign } from '@expo/vector-icons'; 


const LoginScreen = ({navigation}) => {
    const [userProfile, setUserProfile] = useState(null)
    const [userExists, setUserExists] = useState(null)
    const [username, setUsername] = useState("")
    const [loading, setLoading] = useState(false)


    const { userAuthData, setUserAuthData, checkIfUserExists, getProfileInfo, createSpotifyObject, initialiseUser, getTopArtists, getTopTracks, getTopGenres } = useContext(DBContext)

    const getSpotifyAPIToken = async () => {
        let response = await getTokens();
        setUserAuthData(response)
    }

    const generateUserProfile = async () => {
        // setLoading
        setLoading(true)

        // Generate Spotify Data to Initialise User
        let {artists, genres} = await getTopArtists()
        let topGenres = getTopGenres(genres)
        let topTracks = await getTopTracks()
        let response = await initialiseUser(username, userProfile.id, JSON.stringify(topGenres), JSON.stringify(artists), JSON.stringify(topTracks))
        
        // Navigate to next screen when done
        navigation.navigate('Friends')
        setLoading(false)
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


    if (loading) {
        return (
            <Container>
                <ActivityIndicator color="#1DB954" animating/>
            </Container>
        )
    }
    
    // Initialise User Data Screen
    if (userAuthData) {

        if (userExists === false) {
            return (
                <Container>
                    <Title>Generate a New Profile</Title>
                    <CustomTextbox 
                        placeholder="username"
                        placeholderTextColor="#727272"
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText={(value)=> {
                            setUsername(value)
                        }}
                    />
                    <SecondaryButton 
                        onPress={()=>{
                            generateUserProfile()
                        }}
                    >
                        <SecondaryButtonText>Get Started</SecondaryButtonText>
                    </SecondaryButton>
                </Container>
            ) 
        } else {
            return (
                <Container>
                    <ActivityIndicator color="#1DB954" animating/>
                </Container>
            )
        }
    // For users who are NOT logged in
    } else {
        return (
            <Container> 
                <CustomButton 
                    onPress={()=>{
                        getSpotifyAPIToken()
                    }}
                >
                    <ButtonText>
                        Spotify
                        <AntDesign name="login" size={15} color="white"/> 
                    </ButtonText>
                </CustomButton>
            </Container>
        )
    }
    
}


const CustomTextbox = styled.TextInput`
    background: #3a3a3a;
    border-radius: 10px;
    width: 60%;
    padding: 10px;
    margin: 10px 0;
    color: white
`
const Container = styled.View`
    margin: 25px;
    alignItems: center;
    justifyContent: center;
    flex: 1
`;

const CustomButton = styled.TouchableOpacity`
    background: #1DB954;
    padding: 20px 30px;
    border-radius: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5)
`

const SecondaryButton = styled.TouchableOpacity`
    background: #1DB954;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    padding: 10px;
    width: 60%
`

const SecondaryButtonText = styled.Text`
    color: white;
    font-weight: bold;
    text-align: center
`

const ButtonText = styled.Text`
    color: white;
    font-weight: bold
`

const Title = styled.Text`
    font-size: 15px;
    font-weight: bold;
    margin: 10px 0;
    color: white
`

const styles = StyleSheet.create({
    screenStyle: {
        margin: 25
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

