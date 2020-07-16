import React, {useEffect, useState, useContext} from 'react'
import { ActivityIndicator, TouchableOpacity, View} from 'react-native'
import styled from "styled-components";
import DBContext from '../context/dbContext'
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 


const SearchScreen = ({navigation}) => {

    const { addFriend, spotifyProfile, userData, searchUsers } = useContext(DBContext)
    
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchUsers = async (username) => {
        let searchResults = await searchUsers(username)
        setUsers(searchResults)
    }

    useEffect(()=>{
        fetchUsers("").then(()=>{
            setLoading(false)
        })
    },[])

    return (
        <Container>
            <TopBar>
                <UserInfo>
                    <CurrentUserName>
                        Search Users
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
            
            <CustomTextbox 
                placeholder="Search username ..."
                placeholderTextColor="#727272"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={async (value)=> {
                    setLoading(true)
                    await fetchUsers(value)
                    setLoading(false)
                }}
            />

            {loading ?
                <LoadingContainer>
                    <ActivityIndicator animating color="#1DB954"/>
                </LoadingContainer>       
            :
            <View style={{flex: 1}}>
                <FriendList 
                    data={users}
                    keyExtractor={(user)=>user.spotifyId}
                    renderItem={({item})=>{
                        if (item.spotifyId !== spotifyProfile.id) {
                            return (
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
                                        <TouchableOpacity
                                            onPress={async ()=>{
                                                setLoading(true)
                                                await addFriend(userData.username, item.username)
                                                setLoading(false)
                                            }}
                                        >
                                            <AntDesign name="adduser" size={24} color="grey" />
                                        </TouchableOpacity>
                                    </FriendRight>
                                </FriendCard>
                            )
                        }
                    }}
                />
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
    flex-direction: column
`
const FriendRight = styled.View`
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

const UserInfo = styled.View`
    flex-direction: column
`
const CurrentUserName = styled.Text`
    color: white;
    font-size: 30px;
    font-weight: bold
`

const FriendList = styled.FlatList`
    
`

const CustomTextbox = styled.TextInput`
    background: #3a3a3a;
    border-radius: 5px;
    padding: 10px;
    margin: 4PX 0;
    color: white
`


export default SearchScreen

