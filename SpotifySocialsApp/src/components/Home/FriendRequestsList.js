import React, { useEffect, useState, useContext } from 'react'
import { TouchableOpacity, View, ScrollView, Text } from 'react-native'
import styled from "styled-components";

const FriendRequestsList = ({
  friendRequests,
  acceptRequest,
  rejectRequest
}) => {

  return (
    <Container>
      <FriendList
        showsVerticalScrollIndicator={false}
      >

        {friendRequests.map((friend, i) => {
          return (
            <User
              key={i}
            >
              <FriendCard>
                <FriendLeft>
                  <FriendMain>
                    @{friend.username}
                  </FriendMain>
                </FriendLeft>
                <FriendRight
                  place={i}
                >
                  <FriendResponse
                    type="accept"
                    onPress={() => {
                      acceptRequest(friend.username)
                    }}
                  >
                    <FriendResponseText>
                      Yes
                    </FriendResponseText>
                  </FriendResponse>
                  <FriendResponse
                    type="reject"
                    onPress={() => {
                      rejectRequest(friend.username)
                    }}
                  >
                    <FriendResponseText>
                      No
                    </FriendResponseText>
                  </FriendResponse>
                </FriendRight>

              </FriendCard>
            </User>
          )
        })}
      </FriendList>
    </Container>
  )
}

export default FriendRequestsList

const Container = styled.View`
  height: 100%;
  padding: 20px 0;
`

const User = styled.TouchableOpacity`
  margin-bottom: 15px;
`
const FriendCard = styled.View`
border-radius: 5px;
background: rgba(255,255,255,0.05);
flex-direction: row;
alignItems: center;
justifyContent: space-between;
height: 70px;
`
const FriendLeft = styled.View`
padding: 15px 20px;
flex: 4;
position: relative;
`


const FriendRight = styled.View`
display: flex;
flexDirection: row;
height: 100%;
border-top-right-radius: 5px;
border-bottom-right-radius: 5px;
justify-content: center;
align-items: center;
`

const FriendResponse = styled.TouchableOpacity`
  background: rgba(255,255,255,0.2);
  marginRight: 15px;
  borderRadius: 5px;
  height: 50%;
  display: flex;
  justifyContent: center;
  alignItems: center;
  width: 70px;
`
const FriendResponseText = styled.Text`
  color: white;
  font-size: 15px;
  font-family: TTCommons-Medium;
`
const FriendMain = styled.Text`
color: white;
font-family: TTCommons-Bold;
font-size: 20px;
margin-bottom: -4px;
`

const FriendCaption = styled.Text`
color: rgba(0,0,0,0.32);
font-size: 15px;
font-family: TTCommons-Medium;
`


const ContentTitle = styled.Text`
  font-family: TTCommons-Bold;
  font-size: 20px;
  padding: 15px;
  text-align: center;
`


const ProgressLine = styled.View`
  height: 3px;
  background: #2ac940;
  width: ${props => (props.progress / 100) * 82.5}%;
  margin-top: -3px;
  border-bottom-left-radius: 5px;

`
const FriendList = styled.ScrollView`
 margin-bottom: 60px
`