import React, { useEffect, useState, useContext } from 'react'
import { ActivityIndicator, StatusBar, TouchableOpacity, View, Text, StyleSheet, Button, TextInput } from 'react-native'
import styled from "styled-components";
import { getTokens } from '../api/spotifyAuth'
import DBContext from '../context/dbContext'
import { AntDesign } from '@expo/vector-icons';


const LoginScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const { spotifyObject, userAuthData, getCurrentUserData, setUserAuthData, checkIfUserExists, getProfileInfo, spotifyProfile, createSpotifyObject, initialiseUser, getTopArtists, getTopTracks, getTopGenres } = useContext(DBContext)

    const getSpotifyAPIToken = async () => {
        let response = await getTokens();

        await createSpotifyObject(response.accessToken)
        setUserAuthData(response)
    }

    // Before logging in
    useEffect(() => {
        const listener = navigation.addListener('didFocus', () => {
            setLoading(false)
        })

        const connectToSpotify = async () => {
            if (userAuthData && new Date().getTime() > userAuthData.expirationTime) {
                getSpotifyAPIToken()
            }
        }
        connectToSpotify()

        return () => {
            listener.remove()
        }

    }, [])

    // Immediately after logging in, after getting API TOKEN
    useEffect(() => {
        const getSpotifyData = async () => {
            // Get user profile 
            let userInfo = await getProfileInfo()

            // Check if user exists
            let exist = await checkIfUserExists(userInfo.id)

            // Re-direct based on this
            if (exist) {
                // Get user data
                await getCurrentUserData(userInfo.id)

                // Navigate to main page
                navigation.navigate('Friends')
            } else {
                navigation.navigate('Initialise')
            }
        }

        if (userAuthData) {
            setLoading(true)
            getSpotifyData()
        }

    }, [userAuthData])

    // Initialise User Data Screen
    if (loading) {
        return (
            <Container>
                <ActivityIndicator animating color="#1DB954" />
            </Container>
        )
        // For users who are NOT logged in
    } else {
        return (
            <Container>
                <CustomButton
                    onPress={() => {
                        getSpotifyAPIToken()
                    }}
                >
                    <ButtonText>
                        Spotify
                        <AntDesign name="login" size={15} color="white" />
                    </ButtonText>
                </CustomButton>
            </Container>
        )
    }

}

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



const ButtonText = styled.Text`
    color: white;
    font-weight: bold
`
export default LoginScreen

