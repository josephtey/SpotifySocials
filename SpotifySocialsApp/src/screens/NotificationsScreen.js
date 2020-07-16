import React, {useEffect, useState, useContext} from 'react'
import { ActivityIndicator, TouchableOpacity, View} from 'react-native'
import styled from "styled-components";
import DBContext from '../context/dbContext'
import { AntDesign } from '@expo/vector-icons'; 


const NotificationsScreen = ({navigation}) => {

    const { userData, getFriendRequests, acceptFriendRequest, rejectFriendRequest } = useContext(DBContext)
    
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)

    useEffect(()=>{
        const fetchRequests = async () => {
            let requests = await getFriendRequests(userData.username)
            setRequests(requests)
        }

        setLoading(true)
        fetchRequests().then(()=>{
            setLoading(false)
        })
    },[refresh])

    return (
        <Container>
            <TopBar>
                <UserInfo>
                    <CurrentUserName>
                        Notifications
                    </CurrentUserName>
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
                <View style={{flex: 1}}>
                    <Section>
                        <SectionTitle>Friend Requests</SectionTitle>
                        <RequestsList 
                            data={requests}
                            keyExtractor={item=>item.currentUser}
                            renderItem={({item})=>{
                                return (
                                    <FriendCard>
                                        <FriendLeft>
                                            <FriendMain>
                                                {item.currentUser}
                                            </FriendMain>
                                        </FriendLeft>
                                        <FriendRight>
                                            <TouchableOpacity
                                                onPress={async ()=>{
                                                    await rejectFriendRequest(item.currentUser, item.otherUser)
                                                    setRefresh(!refresh)
                                                }}   
                                            >
                                                <AntDesign name="closecircleo" size={24} color="grey" />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={async ()=>{
                                                    await acceptFriendRequest(item.currentUser, item.otherUser)
                                                    setRefresh(!refresh)
                                                }}    
                                            >
                                                <AntDesign name="check" size={24} color="#1DB954" />
                                            </TouchableOpacity>
                                        </FriendRight>
                                    </FriendCard>
                                )
                            }}
                        />
                    </Section>
                </View>
            }
        </Container>
    )
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

const RequestsList = styled.FlatList`
`
const FriendCard = styled.View`
    padding: 15px 20px;
    margin: 3px 0;
    border-radius: 5px;
    background: #303030;
    flex-direction: row;
    alignItems: center;
    justify-content: space-between
`
const FriendLeft = styled.View`
    flex: 4;
`
const FriendRight = styled.View`
    flex: 1;
    flex-direction: row;
    justifyContent: space-between
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

const Section = styled.View`
    flex: 1
`

const SectionTitle = styled.Text`
    color: #848484;
    padding: 15px 0;
    text-transform: uppercase;
    font-weight: bold
`


export default NotificationsScreen

