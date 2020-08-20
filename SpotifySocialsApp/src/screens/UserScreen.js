import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { ScrollView, Text } from "react-native"
import { connect } from 'react-redux'
import { getUserMatch, generateNewMatch, getProfile, resetUserMatch, getAllMatches } from '../actions/profile'
import { getFriendList } from '../actions/friends'
import { FontAwesome, AntDesign } from '@expo/vector-icons'

import AudioFeaturesRadarChart from '../components/User/AudioFeaturesRadarChart'
import MusicCard from '../components/User/MusicCard'
import ProfileFeature from '../components/User/ProfileFeature'
import MusicList from '../components/User/MusicList'


const mapDispatchToProps = { getUserMatch, generateNewMatch, getProfile, resetUserMatch, getFriendList, getAllMatches }

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
    props.getUserMatch(props.userData.username, props.navigation.getParam('username'))
    props.getProfile(props.navigation.getParam('spotifyId'))

    return () => {
      props.resetUserMatch()
      props.getFriendList(props.userData.username)
      props.getAllMatches(props.userData.username)
    }
  }, [])

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
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
            <ProfileFeature
              type="Genre"
              icon={<AntDesign name="heart" size={20} color="#171E31" />}
              value={
                props.userMatch.genreDetails
                  && props.userMatch.genreDetails.length > 0

                  ? props.userMatch.genreDetails[0].genre
                  : "None"}
            />

            <ProfileFeature
              type="Artist"
              icon={<AntDesign name="star" size={20} color="#171E31" />}
              value={props.userMatch.artistDetails
                && props.userMatch.artistDetails.length > 0

                ? props.userMatch.artistDetails[0].name
                : "None"}
            />

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
            <FontAwesome name="microphone" size={27} color="#43568C" />
          </AudioFeaturesIconWrapper>

          {props.userProfile.currentAudioFeatures ?
            <AudioFeaturesRadarChart
              graphData={[props.userData.currentAudioFeatures, props.userProfile.currentAudioFeatures]}
            />
            : null}

        </AudioFeaturesPanel>

        <WhiteCardPanel>
          <PanelTitle>Genres</PanelTitle>
          <MusicList
            data={props.userMatch.genreDetails}
            type="genres"
            maxNum={3}
            item={(dataItem, index) => (
              <Genre
                key={index}
              >
                <GenreTitle>{dataItem.genre}</GenreTitle>
                <GenreBar>
                  <GenreBarInner
                    progress={(dataItem.score / 80) >= 1 ? 1 : (dataItem.score / 80)}
                  />
                </GenreBar>
              </Genre>
            )}
          />
        </WhiteCardPanel>

        <WhiteCardPanel>
          <PanelTitle>
            Artists
          </PanelTitle>
          <Artists
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <MusicList
              data={props.userMatch.artistDetails}
              type="artists"
              item={(dataItem, index) => (
                <MusicCard
                  id={dataItem.id}
                  title={dataItem.name}
                  key={index}
                />
              )}
            />
          </Artists>
        </WhiteCardPanel>

      </ScrollView>
    </Container>
  )


}

const Typography = styled.Text`
  font-family: TTCommons-Medium;
  color: grey;
`
const Artists = styled.ScrollView`
  paddingBottom: 30px;
  paddingTop: 15px;
  paddingLeft: 20px;
`

const Genre = styled.View`
  margin: 10px 0;
`

const GenreTitle = styled.Text`
  font-family: TTCommons-Bold;
  color: #26304D;
  font-size: 20px;
`

const GenreBar = styled.View`
  height: 18px;
  width: 100%;
  background: rgba(0,0,0, 0.03);
  border-radius:3px;
`

const GenreBarInner = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 3px;
  background: #2AC940;
  height:18px;
  width: ${props => props.progress * 100}%
`

const PanelTitle = styled.Text`
  font-size: 20px;
  font-family: TTCommons-Bold;
  color: #D9D9D9;
  text-align: left;
`

const WhiteCardPanel = styled.View`
  background: #ffffff;
  margin: 0 25px 55px 25px;
  border-radius: 12px;
  box-shadow: 10px 10px 20px rgba(0,0,0, 0.1);
  padding: 25px;
`

const AudioFeaturesIconWrapper = styled.View`
  position: absolute;
  left: 52px;
  top: -14px;
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
  height: 350px;
  margin: 65px 25px 55px 25px;
  border-radius: 12px;
  box-shadow: 10px 10px 30px rgba(67, 86, 140, 0.93);
  justifyContent: center;
  alignItems: center;
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
  width: 50%;
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

