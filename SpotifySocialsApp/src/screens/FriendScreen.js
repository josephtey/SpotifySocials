import React, {useEffect, useState, useContext} from 'react'
import { Text, ScrollView, ActivityIndicator, TouchableOpacity, View } from 'react-native'
import DBContext from '../context/dbContext'
import styled from "styled-components";
import { AntDesign } from '@expo/vector-icons'; 
import UserAnalysis from '../components/UserAnalysis'

const FriendScreen = ({navigation}) => {
    
    const { getUser, userData, compareUsers, getUserMatches } = useContext(DBContext)
    const [ friendData, setFriendData ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const [ matchData, setMatchData ] = useState([])
    const [ refresh, setRefresh ] = useState(false)

    calculateCompatibility = async () => {
        setLoading(true)
        await compareUsers(userData, friendData)
        setRefresh(!refresh)
    }

    useEffect(()=>{
        const getFriendData = async () => {
            let friend = await getUser(navigation.getParam('id'))
            let matches = await getUserMatches(userData.username, navigation.getParam('username'))
            
            setMatchData(matches)
            setFriendData(friend)
        }

        getFriendData().then(()=>{
            setLoading(false)
            
        })
        
    }, [refresh])

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
                         {matchData.length > 0 ?
                            <View>
                                <CompatibilityView>
                                    <CompatibilityPercentage>
                                        {matchData[0].compatibilityPercentage}%
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
                                <Section>
                                    <SectionTitle>
                                        Similar Genres
                                    </SectionTitle>
                                </Section>
                            </View>
                        :
                            <View>
                                <CustomButton
                                    onPress={()=>{
                                        calculateCompatibility()
                                    }}
                                > 
                                    <ButtonText>Calculate Compatibility</ButtonText>
                                </CustomButton>

                                <UserAnalysis
                                    userData={friendData}
                                />
                            </View>
                        }
                        
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
    text-align: center;
    padding: 5px;
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

const Section = styled.View`
    margin: 10px 0;
`

const SectionTitle = styled.Text`
    color: #848484;
    padding: 15px 0 5px 0;
    text-transform: uppercase;
    font-weight: bold
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

export default FriendScreen

