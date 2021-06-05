import React, { useState, useEffect, useRef } from 'react'
import { RefreshControl, Animated } from 'react-native'
import styled from "styled-components";
import { connect } from 'react-redux'
import { getAllSpecificUserMatches, generateNewMatch } from '../../actions/profile'
import { closeMatchHistoryScreen } from '../../actions/ui'
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";


const screenHeight = Dimensions.get("window").height;
const mapDispatchToProps = { getAllSpecificUserMatches, closeMatchHistoryScreen, generateNewMatch }

const mapStateToProps = (state) => {
  return {
    spotifyProfile: state.auth.spotifyProfile,
    userData: state.auth.userData,
    ...state.friends,
    ...state.profile,
    ...state.ui
  }
}

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const MatchHistory = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const [scale, setScale] = useState(new Animated.Value(0))
  const [top, setTop] = useState(new Animated.Value(900))

  // Refreshing
  const onRefresh = () => {
    setRefreshing(true);

    props.getAllSpecificUserMatches(props.userData.username, props.userProfile.username)

    wait(1000).then(() => {
      setRefreshing(false)
    });
  };

  // Screen Transition
  useEffect(() => {
    if (props.uiAction === "OPEN_MATCH_HISTORY_SCREEN") {
      props.getAllSpecificUserMatches(props.userData.username, props.userProfile.username)

      Animated.spring(top, {
        toValue: 70,
        useNativeDriver: false
      }).start();

      setTimeout(() => {
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: false
        }).start()
      }, 500)
    }

    if (props.uiAction === "CLOSE_MATCH_HISTORY_SCREEN") {
      Animated.spring(top, {
        toValue: screenHeight,
        useNativeDriver: false
      }).start();
    }

  }, [props.uiAction])

  if (!props.allUserMatches) return null

  return (
    <AnimatedContainer
      style={{ top }}
    >

      <Cover>
        <CloseButtonWrapper
          onPress={() => {
            props.closeMatchHistoryScreen()
          }}
        >
          <Ionicons name="ios-close" size={30} color="rgba(255, 255, 255, 0.3)" />
        </CloseButtonWrapper>
        <Title>Match History</Title>
        <Subtitle>See how your compatibility has changed over time!</Subtitle>
      </Cover>
      <NewMatchButton
        onPress={() => {
          props.generateNewMatch(props.userData.username, props.userProfile.username)
          props.getAllSpecificUserMatches(props.userData.username, props.userProfile.username)
        }}
      >
        <ButtonText>
          New Match
        </ButtonText>
      </NewMatchButton>
      <Content>
        <FriendList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 100
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          {props.allUserMatches.map((match, i) => {
            return (
              <User
                key={i}
                onPress={() => {

                }}
              >
                <AnimatedFriendCard
                  style={{
                    transform: [
                      { scale }
                    ]
                  }}
                >
                  <FriendCard>
                    <FriendLeft>
                      <FriendMain>
                        {new Date(match.dateMatched).toLocaleDateString()}
                      </FriendMain>
                      {/* <FriendCaption>
                        @{friend.username}
                      </FriendCaption> */}
                    </FriendLeft>
                    <FriendRight
                      place={i}
                    >
                      <FriendStats>
                        {Math.round(match.overallScore)}%
                      </FriendStats>
                    </FriendRight>
                  </FriendCard>

                  <ProgressLine
                    progress={match.overallScore}
                  />
                </AnimatedFriendCard>

              </User>
            )
          })}
        </FriendList>
      </Content>
    </AnimatedContainer>
  )
}

const CloseButtonWrapper = styled.TouchableOpacity`
  position: absolute;
  padding: 15px;
  top: 0;
  right: 0;
`
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
  height: 200px;
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
height: 100%;
padding: 0 20px;
paddingTop: 50px;
background: #f0f3f5;

`;
const ButtonText = styled.Text`
color: white;
fontFamily: TTCommons-DemiBold;
fontSize: 18px;
`
const NoRequestsText = styled.Text`
  textAlign: center;
  paddingTop: 70px;
  opacity: 0.3;
`
const NewMatchButton = styled.TouchableOpacity`
  position: absolute;
  top: 173;
  alignSelf: center;
  zIndex: 1
  border-radius: 15px;
  background: #1EB955;
  padding: 20px 25px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`

const User = styled.TouchableOpacity`
  margin-bottom: 15px;
`
const FriendCard = styled.View`
border-radius: 5px;
background: rgba(0,0,0,0.03);
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
flex: ${props => props.place < 3 ? '1.12' : '1'};
background: ${props => props.disabled ? '#b7b7b7' : '#2ac940'};
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

const ProgressLine = styled.View`
  height: 3px;
  background: #2ac940;
  width: ${props => (props.progress / 100) * 82.5}%;
  margin-top: -3px;
  border-bottom-left-radius: 5px;

`
const FriendList = styled.ScrollView`
`

const FriendCardWrapper = styled.View`
  
`
const AnimatedFriendCard = Animated.createAnimatedComponent(FriendCardWrapper);
const AnimatedContainer = Animated.createAnimatedComponent(Container);
export default connect(mapStateToProps, mapDispatchToProps)(MatchHistory)

