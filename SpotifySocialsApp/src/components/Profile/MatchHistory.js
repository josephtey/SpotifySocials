import React, { useState, useEffect, useRef } from 'react'
import { Text, Animated } from 'react-native'
import styled from "styled-components";
import { connect } from 'react-redux'
import { getAllFriendRequests, respondToRequest } from '../../actions/friends'
import { closeMatchHistoryScreen } from '../../actions/ui'
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";


const screenHeight = Dimensions.get("window").height;
const mapDispatchToProps = { getAllFriendRequests, respondToRequest, closeMatchHistoryScreen }

const mapStateToProps = (state) => {
  return {
    spotifyProfile: state.auth.spotifyProfile,
    userData: state.auth.userData,
    ...state.friends,
    ...state.profile,
    ...state.ui
  }
}

const MatchHistory = (props) => {
  const [top, setTop] = useState(new Animated.Value(900))

  useEffect(() => {
    if (props.uiAction === "OPEN_MATCH_HISTORY_SCREEN") {
      Animated.spring(top, {
        toValue: 70,
        useNativeDriver: false
      }).start();
    }

    if (props.uiAction === "CLOSE_MATCH_HISTORY_SCREEN") {
      Animated.spring(top, {
        toValue: screenHeight,
        useNativeDriver: false
      }).start();
    }

  }, [props.uiAction])

  if (!props.friendRequests) return null

  return (
    <AnimatedContainer
      style={{ top }}
    >

      <Cover>
        <Title>Match History</Title>
        <Subtitle>See how your compatibility has changed over time!</Subtitle>
      </Cover>
      <TouchableOpacity
        onPress={() => {
          props.closeMatchHistoryScreen()
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
      </Content>
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
export default connect(mapStateToProps, mapDispatchToProps)(MatchHistory)

