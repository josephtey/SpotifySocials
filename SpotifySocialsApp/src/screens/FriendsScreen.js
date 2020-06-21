import React, {useEffect, useState, useContext} from 'react'
import { ActivityIndicator, TouchableOpacity, FlatList, Image} from 'react-native'
import styled from "styled-components";
import DBContext from '../context/dbContext'
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 


const FriendsScreen = ({navigation}) => {

    const { spotifyProfile, userData, searchUsers, getMatches } = useContext(DBContext)
    
    const [users, setUsers] = useState([])
    const [matches, setMatches] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const fetchData = async () => {
            setUsers(await searchUsers(""))
            setMatches(await getMatches(userData.username))
        }

        const listener = navigation.addListener('didFocus', ()=>{
            setLoading(true)
            fetchData().then(()=>{
                setLoading(false)
            })
        })

        return () => {
            listener.remove()
        }
    },[])

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
                    <TouchableOpacity
                        onPress={()=>{
                            navigation.navigate("CurrentUser", {setLoading})
                        }}>

                        <CurrentUser>
                            {spotifyProfile.images.length > 0 ? 
                            <UserIcon 
                                source={{uri: spotifyProfile.images[0].url}}
                            />
                            : <AntDesign name="user" size={24} color="white" />
                            }
                            <UserInfo>
                                <UserName>
                                    {spotifyProfile.display_name}
                                </UserName>
                                <UserCaption>
                                    {spotifyProfile.followers.total} followers
                                </UserCaption>
                            </UserInfo>
                        </CurrentUser>
                    </TouchableOpacity>
                    
                    <NotificationIcon>
                        <Ionicons name="ios-notifications" size={30} color="white" />
                    </NotificationIcon>

                </TopBar>
                <Section>
                    <SectionTitle>
                        Friends
                    </SectionTitle>
                    <FlatList 
                        data={users}
                        keyExtractor={(user)=>user.spotifyId}
                        renderItem={({item})=>{
                            if (item.spotifyId !== spotifyProfile.id) {
                                let comparisons = matches.filter(match => match.comparedUser === item.username)
                                let latestTime = Math.max.apply(Math, comparisons.map(function(o) { return o.dateMatched }))
                                let latestMatch = comparisons.find(function(o){ return o.dateMatched == latestTime })

                                return (
                                    <TouchableOpacity
                                        onPress={()=>{
                                            navigation.navigate('Friend', {
                                                id: item.spotifyId, 
                                                username: item.username, 
                                                displayName: item.displayName,
                                                comparisons: comparisons,
                                                latestMatch: latestMatch,
                                                setLoading
                                            })
                                        }}
                                    >
                                        <FriendCard>
                                            <FriendLeft>
                                                <FriendMain>
                                                    {item.displayName}
                                                </FriendMain>
                                                <FriendCaption>
                                                    @{item.username}
                                                </FriendCaption>
                                            </FriendLeft>
                                            <FriendRight>
                                                <FriendStats>
                                                   {latestMatch ? 
                                                    latestMatch.compatibilityPercentage : null} 
                                                </FriendStats>
                                            </FriendRight>
                                        </FriendCard>
                                    </TouchableOpacity>
                                )
                            }
                        }}
                    />
                </Section>
            </Container>
        )
    }
}

const LoadingContainer = styled.View`
    alignItems: center;
    justifyContent: center;
    flex: 1
`
const Container = styled.View`
    margin: 50px 20px;
    flex: 1
`;

const FriendCard = styled.View`
    padding: 15px 20px;
    margin: 3px 0;
    border-radius: 5px;
    background: #303030;
    flex-direction: row;
    alignItems: center;
    justifyContent: space-between
`
const FriendLeft = styled.View`
    flex: 4
`
const FriendRight = styled.View`
    flex: 1
`

const FriendStats = styled.Text`
    color: #1DB954;
    font-size: 15px;
    font-weight: bold;
    text-align: right
`
const FriendMain = styled.Text`
    color: white;
    font-weight: bold;
    font-size: 18px
`

const FriendCaption = styled.Text`
    color: grey;
    font-size: 13px
`

const TopBar = styled.View`
    margin: 20px 0;
    flex-direction: row;
    alignItems: center;
    justifyContent: space-between
`

const CurrentUser = styled.View`
    flex-direction: row;
    justifyContent: flex-start;
    alignItems: center;
`

const UserIcon = styled.Image`
    width: 50px; 
    height: 50px;
    border-radius: 50px
`

const UserInfo = styled.View`
    flex-direction: column
`

const UserName = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: white;
    margin-left: 20px;
`
const UserCaption = styled.Text`
    font-size: 15px;
    color: #848484;
    margin-left: 20px;
`

const Section = styled.View`
`

const SectionTitle = styled.Text`
    color: #848484;
    padding: 15px 0;
    text-transform: uppercase;
    font-weight: bold

`

const NotificationIcon = styled.View`
`

export default FriendsScreen

