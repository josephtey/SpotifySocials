import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { ScrollView, Animated, Easing } from "react-native"
import { connect } from 'react-redux'
import { getUserMatch, generateNewMatch, getProfile, resetUserMatch, getAllMatches } from '../actions/profile'
import { getFriendList } from '../actions/friends'
import { AntDesign } from '@expo/vector-icons'
import { openMatchHistoryScreen } from '../actions/ui'
import AudioFeaturesRadarChart from '../components/User/AudioFeaturesRadarChart'
import MusicCard from '../components/User/MusicCard'
import ProfileFeature from '../components/User/ProfileFeature'
import MusicList from '../components/User/MusicList'
import Loading from '../components/Home/Loading'
import MatchHistory from '../components/Profile/MatchHistory'
import { Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;

const mapDispatchToProps = { getUserMatch, generateNewMatch, getProfile, resetUserMatch, getFriendList, getAllMatches, openMatchHistoryScreen }

const mapStateToProps = (state) => {
  return {
    userData: state.auth.userData,
    isFetchingUserProfile: state.profile.isFetchingUserProfile,
    error: state.profile.error,
    userMatch: state.profile.userMatch,
    userProfile: state.profile.userProfile,
    ...state.ui
  }
}

const UserScreen = (props) => {
  // Animations
  const [scale, setScale] = useState(new Animated.Value(1))
  const [opacity, setOpacity] = useState(new Animated.Value(1))

  // Animated Elements
  const [userInfoScale, setUserInfoScale] = useState(new Animated.Value(0))
  const [userInfoRotate, setUserInfoRotate] = useState(new Animated.Value(0.5))
  const [subheaderScale, setSubheaderScale] = useState(new Animated.Value(0))
  const [audioFeaturesScale, setAudioFeaturesScale] = useState(new Animated.Value(0))
  const [headerHeight, setHeaderHeight] = useState(new Animated.Value(screenHeight))

  // Match History Screen
  useEffect(() => {
    if (props.uiAction == "OPEN_MATCH_HISTORY_SCREEN") {
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 0.9,
          duration: 300,
          easing: Easing.in(),
          useNativeDriver: true
        }),
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true
        })
      ]).start();
    }

    if (props.uiAction == "CLOSE_MATCH_HISTORY_SCREEN") {
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        })
      ]).start();
    }
  }, [props.uiAction])

  useEffect(() => {
    if (props.userProfile.username) {
      Animated.parallel([
        Animated.spring(headerHeight, {
          toValue: 350,
          duration: 1500,
          useNativeDriver: false
        }).start(),
        Animated.spring(userInfoScale, {
          toValue: 1,
          useNativeDriver: false
        }).start(),

        Animated.spring(userInfoRotate, {
          toValue: 0,
          useNativeDriver: false
        }).start(),


        Animated.spring(subheaderScale, {
          toValue: 1,
          useNativeDriver: false
        }).start(),

        Animated.spring(audioFeaturesScale, {
          toValue: 1,
          useNativeDriver: false
        }).start()
      ]).start()
    }
  }, [props.userProfile.username])


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
    <RootView>
      <MatchHistory />
      <AnimatedContainer
        style={{
          transform: [
            { scale }
          ],
          opacity
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <AnimatedHeader
            style={{ height: headerHeight }}
          >
            <BackButtonWrapper
              onPress={() => {
                props.navigation.goBack();
              }}
            >
              <AntDesign name="left" size={24} color="white" />
            </BackButtonWrapper>

            <MatchHistoryButton
              onPress={() => {
                props.openMatchHistoryScreen()
              }}
            >
              <AntDesign name="linechart" size={24} color="white" />
            </MatchHistoryButton>

            <AnimatedUserInfo
              style={{
                transform: [
                  {
                    scale: userInfoScale
                  },
                  {
                    rotate: userInfoRotate
                  }]
              }}
            >
              <UserProfile
                source={{
                  uri: "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640"
                }}
              />
              <UserName>
                {props.userProfile.username}
              </UserName>
            </AnimatedUserInfo>
          </AnimatedHeader>

          <AnimatedSubHeader
            style={{
              transform: [
                {
                  scale: subheaderScale
                }
              ]
            }}
          >
            <ProfileSummary
              fullWidth={props.navigation.getParam('currentUserProfile')}
            >
              <ProfileFeature
                type="Top Genre"
                icon={<AntDesign name="heart" size={20} color="#171E31" />}
                value={
                  props.userMatch.genreDetails
                    && props.userMatch.genreDetails.length > 0

                    ? props.userMatch.genreDetails[0].genre
                    : "None"}
              />

              <ProfileFeature
                type="Top Artist"
                icon={<AntDesign name="star" size={20} color="#171E31" />}
                value={props.userMatch.artistDetails
                  && props.userMatch.artistDetails.length > 0

                  ? props.userMatch.artistDetails[0].name
                  : "None"}
              />

            </ProfileSummary>

            <Comparison
              visible={!props.navigation.getParam('currentUserProfile')}
            >
              <ComparisonPercentage>
                {Math.round(props.userMatch.overallScore)}%
          </ComparisonPercentage>
              <ComparisonSubtitle>
                similar
          </ComparisonSubtitle>
            </Comparison>
          </AnimatedSubHeader>

          <AnimatedAudioFeaturesContent
            style={{
              transform: [
                {
                  scale: audioFeaturesScale
                }
              ]
            }}
          >
            <AudioFeaturesPanel>
              <AudioFeaturesTitle>
                Audio Features
            </AudioFeaturesTitle>

              {props.userProfile.currentAudioFeatures ?
                <AudioFeaturesRadarChart
                  graphData={[props.userData.currentAudioFeatures, props.userProfile.currentAudioFeatures]}
                />
                : null}

            </AudioFeaturesPanel>
          </AnimatedAudioFeaturesContent>

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
              Obscurity
          </PanelTitle>
            <ObscurityPercentage>
              {props.userData.recentObscurifyPercentile ?
                props.userData.recentObscurifyPercentile : null}%
          </ObscurityPercentage>
            <ObscurityDescription>
              more obscure music taste than 145,054 other users
          </ObscurityDescription>
          </WhiteCardPanel>

          <WhiteCardPanel>
            <PanelTitle>
              Artists
          </PanelTitle>
            <Artists
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              dataExists={props.userMatch.artistDetails && props.userMatch.artistDetails.length > 0}
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
      </AnimatedContainer >
    </RootView>
  )


}
const RootView = styled.View`
  flex: 1;
  background: black;
`
const BackButtonWrapper = styled.TouchableOpacity`
  position: absolute;
  top: 40;
  left: 0;
  padding: 20px;
`
const Artists = styled.ScrollView`
  paddingBottom: ${props => props.dataExists ? '30px' : '0'};
  paddingTop: ${props => props.dataExists ? '15px' : '0'};
  paddingLeft: ${props => props.dataExists ? '20px' : '0'};
`

const Genre = styled.View`
  margin: 10px 0;
`

const GenreTitle = styled.Text`
  font-family: TTCommons-Bold;
  color: #26304D;
  font-size: 20px;
  text-transform: capitalize;
  margin-bottom: 3px;
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
  margin: 0 25px 30px 25px;
  border-radius: 12px;
  box-shadow: 10px 10px 20px rgba(0,0,0, 0.1);
  padding: 25px;
`


const AudioFeaturesTitle = styled.Text`
  color: rgba(255, 255, 255, 0.2);
  align-self: flex-start;
  fontSize: 20px;
  paddingLeft: 20px;
  font-family: TTCommons-Bold;
`

const AudioFeaturesPanel = styled.View`
  background: #26304D;
  height: 370px;
  margin: 40px 25px 45px 25px;
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
  alignItems: center;
  display: ${props => props.visible ? 'flex' : 'none'};
`

const ComparisonPercentage = styled.Text`
  color: white;
  font-size: 40px;
  margin: 10px 0;
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
  width: ${props => props.fullWidth ? '87%' : '50%'};
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

const UserInfo = styled.View`
  display: flex;
  justifyContent: center;
  alignItems: center;
`
const AudioFeaturesContent = styled.View`
`
const ObscurityPercentage = styled.Text`
  fontSize: 50px;
  fontFamily: TTCommons-Bold;
  color: #26304D;
  marginTop: 7px;
`

const ObscurityDescription = styled.Text`
  fontSize: 15px;
  fontFamily: TTCommons-Medium;
  color: #26304D;
  opacity: 0.5;
`
const MatchHistoryButton = styled.TouchableOpacity`
  position: absolute;
  top: 40;
  right: 0;
  padding: 20px;
`

const AnimatedUserInfo = Animated.createAnimatedComponent(UserInfo)
const AnimatedSubHeader = Animated.createAnimatedComponent(SubHeader)
const AnimatedAudioFeaturesContent = Animated.createAnimatedComponent(AudioFeaturesContent)
const AnimatedHeader = Animated.createAnimatedComponent(Header)
const AnimatedContainer = Animated.createAnimatedComponent(Container);

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen)

