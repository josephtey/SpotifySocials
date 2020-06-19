import React, {useEffect, useState, useContext} from 'react'
import { Text, ScrollView, ActivityIndicator, TouchableOpacity, View } from 'react-native'
import DBContext from '../context/dbContext'
import styled from "styled-components";
import { AntDesign } from '@expo/vector-icons'; 
import UserAnalysis from '../components/UserAnalysis'

const CompareScreen = ({navigation}) => {
    
    const { getUser, userData, compareUsers } = useContext(DBContext)
    const [ friendData, setFriendData ] = useState(null)
    const [ loading, setLoading ] = useState(true)

    calculateCompatibility = async () => {
        await compareUsers(userData, friendData)
    }

    useEffect(()=>{
        const getFriendData = async () => {
            let friend = await getUser(navigation.getParam('id'))
            setFriendData(friend)
        }

        getFriendData().then(()=>{
            setLoading(false)
        })
        
    }, [])

        return (
            <Container>

                <TopBar>
                    <UserInfo>
                        <CurrentUserName>
                            {navigation.getParam("displayName")}
                        </CurrentUserName>
                        <CurrentUserCaption>
                            @{navigation.getParam("username")}
                        </CurrentUserCaption>
                    </UserInfo>
                    <TouchableOpacity
                        onPress={()=>{
                            navigation.goBack()
                            navigation.getParam("setLoading")(true)
                        }}
                    >
                        <AntDesign name="closecircle" size={24} color="grey" />
                    </TouchableOpacity>
                </TopBar>

                {loading ? 
                    <LoadingContainer>
                        <ActivityIndicator animating color="#1DB954"/>
                    </LoadingContainer>    
                : 
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                         {navigation.getParam('latestMatch') ?
                            <CompatibilityView>
                                <CompatibilityPercentage>
                                    {navigation.getParam('latestMatch').compatibilityPercentage}%
                                </CompatibilityPercentage>
                                <CustomButton
                                    bg='#2b2b2b'
                                    onPress={()=>{
                                        calculateCompatibility()
                                    }}
                                >
                                    <ButtonText>Re-calculate</ButtonText>
                                </CustomButton>
                            </CompatibilityView>
                        :
                            <ActionBar>
                                <CustomButton
                                    onPress={()=>{
                                        calculateCompatibility()
                                    }}
                                >
                                    <ButtonText>Calculate Compatibility</ButtonText>
                                </CustomButton>
                            </ActionBar>
                        }
                        <UserAnalysis
                                userData={friendData}
                            />
                    </ScrollView>
                }
                
                
            </Container>
        )
    
}
const CompatibilityView = styled.View`
    margin: 0 auto
`

const CompatibilityPercentage = styled.Text`
    color: #1DB954;
    font-size: 90px;
    font-weight: bold;
    text-align: center
    padding: 10px;
`

const Container = styled.View`
    margin: 60px 20px;
    flex: 1
`

const TopBar = styled.View`
    flex-direction: row;
    justifyContent: space-between;
    margin: 20px 0
`
const UserInfo = styled.View`
    flex-direction: column
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

const LoadingContainer = styled.View`
    alignItems: center;
    justifyContent: center;
    flex: 1;
`

const ActionBar = styled.View`

`

const CustomButton = styled.TouchableOpacity`
    background: ${props => props.bg ? props.bg : '#1DB954'};
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5)
`

const ButtonText = styled.Text`
    color: white;
    font-weight: bold;
    text-align: center
`

export default CompareScreen

