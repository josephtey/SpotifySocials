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
  const [top, setTop] = useState(new Animated.Value(900))
  const [opacity, setOpacity] = useState(new Animated.Value(0))

  // Screen Transition
  useEffect(() => {
    if (props.uiAction === "OPEN_GENRE_SCREEN") {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 0,
        ease: Easing.out(),
        useNativeDriver: false
      }).start();

      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: false
      }).start()
    }

    if (props.uiAction === "CLOSE_GENRE_SCREEN") {


      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        ease: Easing.inOut(),
        useNativeDriver: false
      }).start();

      setTimeout(() => {
        Animated.spring(scale, {
          toValue: 0,
          useNativeDriver: false
        }).start();
      }
        , 500)
    }

  }, [props.uiAction])

  return (
    <AnimatedContainer
      style={{ transform: [{ scale }], opacity }}
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
        <Subtitle>Dummy Text</Subtitle>
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
  font-family: TTCommons-DemiBold;
  color: white;
  font-size: 24px;
  font-weight: 600;
`
const Container = styled.View`
  position: absolute;
  align-self: center;
  top: 250px;
  background: white;
  width: 87%;
  height: 500px;
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
const AnimatedContainer = Animated.createAnimatedComponent(Container);
export default connect(mapStateToProps, mapDispatchToProps)(GenreScreen)

