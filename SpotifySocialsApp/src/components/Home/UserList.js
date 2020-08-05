import React, { useEffect, useState, useContext } from 'react'
import { TouchableOpacity, View } from 'react-native'
import styled from "styled-components";

const UserList = ({
  users,
  type
}) => {
  return (
    <View>
      <ContentTitle>
        {type}
      </ContentTitle>

      <FriendList>
        {users.map((friend, i) => {
          return (
            <TouchableOpacity
              key={i}
            >
              <FriendCard>
                <FriendLeft>
                  <FriendMain>
                    {friend.displayName}
                  </FriendMain>
                  <FriendCaption>
                    @{friend.username}
                  </FriendCaption>
                </FriendLeft>
                <FriendRight>
                  <FriendStats>
                    20%
                    </FriendStats>
                </FriendRight>
              </FriendCard>
              <ProgressLine
                progress={1}
              />
            </TouchableOpacity>
          )
        })}
      </FriendList>
    </View>
  )
}

export default UserList


const FriendCard = styled.View`
border-radius: 5px;
background: rgba(0,0,0,0.03);
flex-direction: row;
alignItems: center;
justifyContent: space-between;
`
const FriendLeft = styled.View`
padding: 15px 20px;
flex: 4;
position: relative;
`
const FriendRight = styled.View`
flex: 1;
background: #2ac940;
height: 100%;
border-top-right-radius: 5px;
border-bottom-right-radius: 5px;
justify-content: center;
align-items: center;
`
const FriendStats = styled.Text`
color: white;
font-size: 20px;
margin-top: 7px;
font-family: TTCommons-Bold;
text-align: right;
`
const FriendMain = styled.Text`
color: white;
font-family: TTCommons-Bold;
color: #171e31;
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
  width: ${props => props.progress * 82.5}%;
  margin-top: -3px;
  border-bottom-left-radius: 5px;

`


const FriendList = styled.ScrollView`

`