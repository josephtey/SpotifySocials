import React, { useState, useEffect } from 'react'
import { Text } from 'react-native'
import styled from "styled-components";
import { connect } from 'react-redux'
import { generateProfile } from '../actions/auth'

const mapDispatchToProps = { generateProfile }

const mapStateToProps = (state) => {
  return {
    ...state.auth
  }
}


const InitialiseScreen = (props) => {

  const [username, setUsername] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (props.userData) {
      props.navigation.navigate('Home')
    }
  }, [props])


  return (
    <Container>
      <Name>
        {props.spotifyProfile.display_name}
      </Name>


      {loading ?
        <Text>Loading</Text>
        :
        <>
          <ProfilePicture
            source={{
              uri: props.spotifyProfile.images.length > 0
                ? props.spotifyProfile.images[0].url
                : 'https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640'
            }}
          />
          <Title>Get Started</Title>
          <CustomTextbox
            placeholder="User Name"
            placeholderTextColor="#727272"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(value) => {
              setUsername(value)
            }}
          />
          <SecondaryButton
            onPress={() => {
              props.generateProfile(username, props.spotifyProfile)
              setLoading(true)
            }}
          >
            <SecondaryButtonText>Generate Profile</SecondaryButtonText>
          </SecondaryButton>
        </>
      }

      <Disclaimer>
        We will use your Spotify data to generate your profile
      </Disclaimer>
    </Container>
  )
}


const CustomTextbox = styled.TextInput`
    background: #101626;
    border-radius: 5px;
    width: 60%;
    padding: 15px;
    margin-bottom: 20px;
    color: rgba(255, 255, 255, 1)
`
const Container = styled.View`
    alignItems: center;
    justifyContent: center;
    flex: 1;
    background: #171E31
`;

const SecondaryButton = styled.TouchableOpacity`
    border-radius: 100px;
    border: 2px solid #F6527C;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    padding: 15px 20px;
    width: 40%;
    margin-top: 40px;
`

const SecondaryButtonText = styled.Text`
    color: #F6527C;
    text-align: center;
    font-family: TTCommons-Medium;
    margin-top:5px;
    font-size:15px;
`

const Title = styled.Text`
    font-size: 50px;
    font-family: TTCommons-Bold;
    text-align: center;
    margin: 20px 0;
    color: #1EB955
`

const ProfilePicture = styled.Image`
  width: 110px;
  height: 110px;
  border-radius: 100px;
  margin-bottom: 40px;
`

const Name = styled.Text`
    position: absolute;
    top: 50px;
    left: 15px;
    color: rgba(255, 255, 255, 0.3);
    font-family: TTCommons-Medium
    font-size: 15px;
`

const Disclaimer = styled.Text`
  position: absolute;
  bottom: 100px;
  width: 60%;
  color: rgba(255, 255, 255, 0.3);
  font-family: TTCommons-Light
  font-size: 15px;
  text-align: center
`

export default connect(mapStateToProps, mapDispatchToProps)(InitialiseScreen)

