import React, { useState, useEffect, useRef } from 'react'
import { Easing, Animated } from 'react-native'
import styled from "styled-components";
import { connect } from 'react-redux'
import { getAllSpecificUserMatches, generateNewMatch } from '../../actions/profile'
import { closeGenreScreen } from '../../actions/ui'
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";


const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const mapDispatchToProps = { closeGenreScreen }

const mapStateToProps = (state) => {
  return {
    ...state.ui
  }
}


const GenreScreen = (props) => {
  const [scale, setScale] = useState(new Animated.Value(0))
  const [bottom, setBottom] = useState(new Animated.Value(-500))
  const [opacity, setOpacity] = useState(new Animated.Value(0))

  // Screen Transition
  useEffect(() => {
    if (props.uiAction === "OPEN_GENRE_SCREEN") {
      Animated.spring(bottom, {
        toValue: -20,
        useNativeDriver: false
      }).start();

    }

    if (props.uiAction === "CLOSE_GENRE_SCREEN") {


      Animated.spring(bottom, {
        toValue: -500,
        useNativeDriver: false
      }).start();
    }

  }, [props.uiAction])

  return (
    <AnimatedContainer
      style={{ bottom }}
    >

      <Cover>
        <CloseButtonWrapper
          onPress={() => {
            props.closeGenreScreen()
          }}
        >
          <Ionicons name="ios-close" size={30} color="rgba(255, 255, 255, 0.3)" />
        </CloseButtonWrapper>
        <Title>{props.passedData.genre}</Title>
        {/* <Subtitle>{props.passedData.score}</Subtitle> */}
      </Cover>

      <Content>

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
  font-family: TTCommons-Bold;
  color: white;
  font-size: 40px;
  font-weight: 600;
  text-transform: capitalize;
  marginTop: 7px;
`
const Container = styled.View`
  position: absolute;
  align-self: center;
  background: white;
  width: 100%;
  height: 500px;
  z-index: 100;
  border-radius: 10px;
  overflow: hidden;
`;

const Cover = styled.View`
  height: 100px;
  background: #171e31;
  align-items: flex-start;
  padding: 0 30px;
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
const AnimatedContainer = Animated.createAnimatedComponent(Container);
export default connect(mapStateToProps, mapDispatchToProps)(GenreScreen)

