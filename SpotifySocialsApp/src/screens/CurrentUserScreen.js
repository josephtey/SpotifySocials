import React, {useEffect, useState, useContext} from 'react'
import { ActivityIndicator, TouchableOpacity, ScrollView, Text } from 'react-native'
import DBContext from '../context/dbContext'
import styled from "styled-components";
import { AntDesign } from '@expo/vector-icons'; 
import UserAnalysis from '../components/UserAnalysis'

const CurrentUserScreen = ({navigation}) => {
    
    const { spotifyProfile, userData, setUserAuthData } = useContext(DBContext)
    const [loading, setLoading] = useState(false)


    if (loading) {
        return (
            <LoadingContainer>
                <ActivityIndicator animating color="#1DB954"/>
            </LoadingContainer>   
        )
    } else {
        return (
            <Container>
                <TopBar>
                    <UserInfo>
                        <CurrentUserName>
                            {spotifyProfile.display_name}
                        </CurrentUserName>
                        <CurrentUserCaption>
                            @{userData.username}
                        </CurrentUserCaption>
                    </UserInfo>

                    <TouchableOpacity
                        onPress={()=>{
                            navigation.navigate('Login')
                            setUserAuthData(null)

                        }}
                        style={{flex: 1}}
                    >
                        <AntDesign name="logout" size={24} color="grey" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={()=>{
                            navigation.goBack()
                            navigation.getParam("setLoading")(true)
                        }}
                        style={{flex: 1}}
                    >
                        <AntDesign name="closecircle" size={24} color="grey" />
                    </TouchableOpacity>
                    
                </TopBar>
                
                <ScrollView>
                    <UserAnalysis 
                        userData={userData}
                    />
                </ScrollView>
                
            </Container>
        )
    }
    
}

const Container = styled.View`
    margin: 60px 20px;
`

const LoadingContainer = styled.View`
    alignItems: center;
    justifyContent: center;
    flex: 1
`

const UserInfo = styled.View`
    flex-direction: column;
    flex: 7
`

const CurrentUserName = styled.Text`
    color: white;
    font-size: 30px;
    font-weight: bold
`

const CurrentUserCaption = styled.Text`
    color: grey;
    font-size: 20px;
`

const TopBar = styled.View`
    flex-direction: row;
    justifyContent: space-between;
    alignItems: center;
    margin: 20px 0
`



export default CurrentUserScreen

