import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { connect } from 'react-redux'
import { getUserMatch, generateNewMatch, getProfile } from '../actions/profile'
import { Ionicons } from '@expo/vector-icons';

const mapDispatchToProps = { getUserMatch, generateNewMatch, getProfile }

const mapStateToProps = (state) => {
  return {
    userData: state.auth.userData,
    isFetchingUserProfile: state.profile.isFetchingUserProfile,
    error: state.profile.error,
    userMatch: state.profile.userMatch,
    userProfile: state.profile.userProfile,
    error: state.profile.error
  }
}


const UserScreen = (props) => {

  useEffect(() => {
    const getUserMatch = async () => {

      // Check if the user match exists
      const matchExists = await props.getUserMatch(props.userData.username, props.navigation.getParam('username'))

      // If match does not exist, generate new match
      if (matchExists === false) {
        props.generateNewMatch(props.userData.username, props.navigation.getParam('username'))
      }
    }

    // Get profile
    props.getProfile(props.navigation.getParam('spotifyId'))

    // Get user match, if it does not exist, generate one
    getUserMatch()

  }, [])

  return (
    <Container>
      <Header>
        <UserProfile
          source={{
            uri: "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640"
          }}
        />
        <UserName>
          {props.userProfile.username}
        </UserName>
      </Header>
      <SubHeader>
        <ProfileSummary>
        </ProfileSummary>

        <Comparison>
          <ComparisonPercentage>
            {Math.round(props.userMatch.overallScore)}%
          </ComparisonPercentage>
          <ComparisonSubtitle>
            similar
          </ComparisonSubtitle>
        </Comparison>
      </SubHeader>

      <AudioFeaturesPanel>
        <AudioFeaturesIconBG />
        <AudioFeaturesIconWrapper>
          <Ionicons name="ios-musical-notes" size={30} color="#43568C" />
        </AudioFeaturesIconWrapper>

      </AudioFeaturesPanel>
    </Container>
  )


}
const AudioFeaturesIconWrapper = styled.View`
  position: absolute;
  left: 50px;
  top: -17px;
`
const AudioFeaturesIconBG = styled.View`
  padding: 35px;
  border-radius:50px;
  background: white;
  position: absolute;
  left: 25px;
  top: -35px;
`
const AudioFeaturesPanel = styled.View`
  background: #26304D;
  height: 300px;
  margin: 55px 15px;
  border-radius: 12px;
  box-shadow: 10px 10px 30px rgba(67, 86, 140, 0.93)
`

const SubHeader = styled.View`
  flexDirection: row;
  margin: 0 auto;
  marginTop: -65px;
`

const Comparison = styled.View`
  height: 130px;
  background: #2AC940;
  border-radius: 12px;
  box-shadow: 0 4px 40px rgba(42,201,64,0.4);
  width: 35%;
  justifyContent: center;
  alignItems: center
`

const ComparisonPercentage = styled.Text`
  color: white;
  font-size: 40px;
  margin-top: 10px;
  font-family: TTCommons-DemiBold;
`

const ComparisonSubtitle = styled.Text`
  color: white;
  font-family: TTCommons-Medium;
  margin-top: -15px;
`

const ProfileSummary = styled.View`
  box-shadow: 0 4px 40px rgba(0,0,0,0.2)
  border-radius: 12px;
  background: white;
  height: 130px;
  width: 55%;
  margin-right:10px;
  z-index: 10
`

const UserProfile = styled.Image`
  height: 90px;
  width: 90px;
  border-radius: 30px;
`

const UserName = styled.Text`
  color: white;
  font-weight: bold;
  font-family: TTCommons-Bold;
  font-size: 20px;
  padding-top: 20px;
`

const Header = styled.View`
  height: 350px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  background: #171e31;
  justifyContent: center;
  alignItems: center;
`



const Container = styled.View`
  flex: 1;
  background: white;
`;
export default connect(mapStateToProps, mapDispatchToProps)(UserScreen)

