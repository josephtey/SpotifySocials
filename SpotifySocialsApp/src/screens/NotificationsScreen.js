import React, { useState, useEffect, useRef } from 'react'
import { Text } from 'react-native'
import styled from "styled-components";
import { connect } from 'react-redux'
import { getAllFriendRequests, respondToRequest } from '../actions/friends'
import FriendRequestsList from '../components/Home/FriendRequestsList'

const mapDispatchToProps = { getAllFriendRequests, respondToRequest }

const mapStateToProps = (state) => {
  return {
    spotifyProfile: state.auth.spotifyProfile,
    userData: state.auth.userData,
    ...state.friends,
    ...state.profile
  }
}

const NotificationsScreen = (props) => {
  useEffect(() => {
    props.getAllFriendRequests(props.userData.username)
  }, [])

  if (!props.friendRequests) return null

  return (
    <Container>
      <Header>
        <Title>
          Notifications
        </Title>
      </Header>

      <Content>
        <FriendRequestsList
          friendRequests={props.friendRequests.map((friend) => {
            return {
              username: friend.currentUser
            }
          })}

          acceptRequest={async (userThatAddedMe) => {
            props.respondToRequest("accept", props.userData.username, userThatAddedMe)
          }}

          rejectRequest={async (userThatAddedMe) => {
            props.respondToRequest("reject", props.userData.username, userThatAddedMe)
          }}

        />
      </Content>

      <Text>{JSON.stringify(props.friendRequests)}</Text>
    </Container>
  )
}

const Content = styled.View`

`
const Header = styled.View`
  margin-top: 50px;
`

const Title = styled.Text`
  font-size: 40px;
  font-weight: bold;
  color: white;
  font-family: TTCommons-DemiBold;
`
const Container = styled.View`
  background: #171e31;
  height: 100%;
  padding: 30px 20px;
`

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsScreen)

