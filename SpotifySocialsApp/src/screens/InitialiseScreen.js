import React, {useState, useEffect, useContext} from 'react'
import { ActivityIndicator } from 'react-native'
import styled from "styled-components";
import DBContext from '../context/dbContext' 


const InitialiseScreen = ({navigation}) => {
    const { spotifyProfile, initialiseUser, getTopArtists, getTopTracks, getTopGenres, getCurrentUserData } = useContext(DBContext)
    
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState("")

    useEffect(()=>{
        const listener = navigation.addListener('didFocus', ()=>{
            setLoading(false)
        })

        return () => {
            listener.remove()
        }
    }, [])

    const generateUserProfile = async () => {
        // Loading
        setLoading(true)

        // Generate Spotify Data to Initialise User
        let {artists, genres} = await getTopArtists()
        let topGenres = getTopGenres(genres)
        let topTracks = await getTopTracks()
        let response = await initialiseUser(spotifyProfile.display_name, username, spotifyProfile.id, JSON.stringify(topGenres), JSON.stringify(artists), JSON.stringify(topTracks))

        // Get user data
        await getCurrentUserData(spotifyProfile.id) 

        // Navigate to next screen when done
        navigation.navigate('Friends')
    }

    if (loading) {
        return (
            <Container>
                <ActivityIndicator animating color="#1DB954"/>
            </Container>
        )
    } else  {
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

const Title = styled.Text`
    font-size: 15px;
    font-weight: bold;
    margin: 10px 0;
    color: white
`



export default InitialiseScreen

