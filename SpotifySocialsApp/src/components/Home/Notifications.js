import React, { useState, useEffect, useRef } from 'react'
import { Text, Animated } from 'react-native'
import styled from "styled-components";
import { connect } from 'react-redux'
import { getAllFriendRequests, respondToRequest } from '../../actions/friends'
import { closeMenu } from '../../actions/notifications'
import FriendRequestsList from './FriendRequestsList'
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";


const screenHeight = Dimensions.get("window").height;
const mapDispatchToProps = { getAllFriendRequests, respondToRequest, closeMenu }

const mapStateToProps = (state) => {
  return {
    spotifyProfile: state.auth.spotifyProfile,
    userData: state.auth.userData,
    ...state.friends,
    ...state.profile,
    ...state.notifications
  }
}

const Notifications = (props) => {
  const [top, setTop] = useState(new Animated.Value(900))

  useEffect(() => {
    if (props.action === "openMenu") {
      props.getAllFriendRequests(props.userData.username)

      Animated.spring(top, {
        toValue: 70,
        useNativeDriver: false
      }).start();
    }

    if (props.action === "closeMenu") {
      Animated.spring(top, {
        toValue: screenHeight,
        useNativeDriver: false
      }).start();
    }

  }, [props.action])

  if (!props.friendRequests) return null

  return (
    <AnimatedContainer
      style={{ top }}
    >

      <Cover>
        <Title>Notifications</Title>
        <Subtitle>Friend Requests</Subtitle>
      </Cover>
      <TouchableOpacity
        onPress={() => {
          props.closeMenu()
        }}
        style={{
          position: "absolute",
          top: 128,
          left: "50%",
          marginLeft: -22,
          zIndex: 1
        }}
      >
        <CloseView>
          <Ionicons name="ios-close" size={30} color="#171e31" />
        </CloseView>
      </TouchableOpacity>
      <Content>
        {
          props.friendRequests && props.friendRequests.length === 0 ?

            <NoRequestsText>
              You currently have no friend requests.
          </NoRequestsText>

            :
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

        }

      </Content>

      <Text>{JSON.stringify(props.friendRequests)}</Text>
    </AnimatedContainer>
  )
}

const Title = styled.Text`
  font-family: TTCommons-DemiBold;
  color: white;
  font-size: 24px;
  font-weight: 600;
`
const Container = styled.View`
  position: absolute;
  background: white;
  width: 100%;
  height: 100%;
  z-index: 100;
  border-radius: 10px;
  overflow: hidden;
`;

const Cover = styled.View`
  height: 150px;
  background: #171e31;
  align-items: center;
  justify-content: center;
`;
const Subtitle = styled.Text`
  font-size: 13;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 3px;
`

const Content = styled.View`
height: 900px;
background: #f0f3f5;
`;
const CloseView = styled.View`
width: 44px;
height: 44px;
border-radius: 22px;
background: white;
justify-content: center;
align-items: center;
box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`
const NoRequestsText = styled.Text`
  textAlign: center;
  paddingTop: 70px;
  opacity: 0.3;
`
const AnimatedContainer = Animated.createAnimatedComponent(Container);
export default connect(mapStateToProps, mapDispatchToProps)(Notifications)

