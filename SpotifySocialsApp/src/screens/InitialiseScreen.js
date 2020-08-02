import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { connect } from 'react-redux'
import { generateProfile } from '../actions/auth'

const mapDispatchToProps = { generateProfile }

const mapStateToProps = (state) => {
  return state
}


const InitialiseScreen = (props) => {

  const [username, setUsername] = useState()

  useEffect(() => {
    if (props.auth.userData) {
      props.navigation.navigate('Home')
    }
    console.log(props)
  }, [props])

  return (
    <Container>
      <Title>Generate a New Profile</Title>
      <CustomTextbox
        placeholder="username"
        placeholderTextColor="#727272"
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={(value) => {
          setUsername(value)
        }}
      />
      <SecondaryButton
        onPress={() => {
          props.generateProfile(username, props.auth.spotifyProfile)
        }}
      >
        <SecondaryButtonText>Get Started</SecondaryButtonText>
      </SecondaryButton>
    </Container>
  )
}


const CustomTextbox = styled.TextInput`
    background: #3a3a3a;
    border-radius: 10px;
    width: 60%;
    padding: 10px;
    margin: 10px 0;
    color: white
`
const Container = styled.View`
    margin: 25px;
    alignItems: center;
    justifyContent: center;
    flex: 1
`;

const SecondaryButton = styled.TouchableOpacity`
    background: #1DB954;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    padding: 10px;
    width: 60%
`

const SecondaryButtonText = styled.Text`
    color: white;
    font-weight: bold;
    text-align: center
`

const Title = styled.Text`
    font-size: 15px;
    font-weight: bold;
    margin: 10px 0;
    color: white
`



export default connect(mapStateToProps, mapDispatchToProps)(InitialiseScreen)

