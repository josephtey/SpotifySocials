import React, {useEffect, useState, useContext} from 'react'
import { View, Text, StyleSheet, Button} from 'react-native'
import { getTokens } from '../api/spotifyAuth'
import SpotifyWebAPI from 'spotify-web-api-js';
import DBContext from '../context/dbContext'


const LoginScreen = ({navigation}) => {
    const [userData, setUserData] = useState(null)

    const { getUsers } = useContext(DBContext)

    const getSpotifyAPIToken = async () => {
        let response = await getTokens();
        setUserData(response)
    }

    useEffect(()=>{
        const fetchData = async () => {
            if (userData && new Date().getTime() > userData.expirationTime) {
                getSpotifyAPIToken()
            } 
        }
        fetchData()

    }, [])

    return (
        <View style={styles.screenStyle}>
            {userData ?
            <Text>You're logged in</Text>
            :
            <Button 
                title="Login with Spotify"
                onPress={()=>{
                    getSpotifyAPIToken()
                }}
            />
            }
            
        </View>
    )
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

