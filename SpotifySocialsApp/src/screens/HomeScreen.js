import React, { useState, useEffect, useRef } from 'react'
import { TouchableOpacity, Animated, useWindowDimensions, StyleSheet, Easing, View, Text } from 'react-native'
import styled from "styled-components";
import { connect } from 'react-redux'
import { Feather, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { getFriendList, getRequestedFriends, addNewFriend } from '../actions/friends'
import { openMenu, closeMenu } from '../actions/notifications'
import { getAllMatches } from '../actions/profile'
import HeaderCard from '../components/Home/HeaderCard'
import UserList from '../components/Home/UserList'
import SearchUsers from '../components/Home/SearchUsers'
import Notifications from '../components/Home/Notifications'


const mapDispatchToProps = { getFriendList, getAllMatches, getRequestedFriends, addNewFriend, openMenu }

const mapStateToProps = (state) => {
  return {
    spotifyProfile: state.auth.spotifyProfile,
    userData: state.auth.userData,
    ...state.friends,
    ...state.profile,
    ...state.notifications
  }
}

const sortUserList = (users, currentUser, metric, matches = null, audioFeatures = false) => {
  friends = []
  users.map((friend) => {

    // Step 1: Find the metric value FOR SPECIAL CASE SCENARIOS
    let metricValue = 0;
    if (metric === 'overallScore') {

      // Find latest user match (matches cant be null) -> for compatibility
      let latestUserMatch = null
      const userMatches = matches.filter(item => item.otherUser === friend.username)
      if (userMatches.length > 0) {
        latestUserMatch = userMatches.sort(function (a, b) {
          return b.dateMatched - a.dateMatched
        })[0]
      }
      if (latestUserMatch) {
        metricValue = latestUserMatch.overallScore
      }

    } else if (audioFeatures) {

      // For audio features
      metricValue = friend['currentAudioFeatures'][metric] * 100
    }

    // Current user can't be the friend
    if (friend.username !== currentUser.username) {

      // Append the metric value if it doesn't already exist
      if (!friend[metric]) {
        friend[metric] = metricValue
      }

      friends.push(friend)
    }
  })

  friends.sort((a, b) => (a[metric] < b[metric]) ? 1 : -1)

  return friends

}


const HomeScreen = (props) => {

  // Animations
  const [scale, setScale] = useState(new Animated.Value(1))
  const [opacity, setOpacity] = useState(new Animated.Value(1))

  // User Lists
  const [sortedCompatibilityUsers, setSortedCompatibilityUsers] = useState(null)
  const [sortedObscurityUsers, setSortedObscurityUsers] = useState(null)
  const [sortedHappinessUsers, setSortedHappinessUsers] = useState(null)

  // Page Scrolling
  const scrollX = useRef(new Animated.Value(0)).current;
  const scroll = useRef()
  const { width: windowWidth } = useWindowDimensions();
  const pages = [
    {
      title: 'Compatibility',
      users: sortedCompatibilityUsers,
      metric: 'overallScore'
    },
    {
      title: 'Happiness',
      users: sortedHappinessUsers,
      metric: 'valence'
    },
    {
      title: 'Obscurity',
      users: sortedObscurityUsers,
      metric: 'recentObscurifyPercentile'
    },
    {
      title: 'Search'
    }
  ]

  useEffect(() => {
    props.getAllMatches(props.userData.username)
    props.getFriendList(props.userData.username)
    props.getRequestedFriends(props.userData.username)
  }, [])

  useEffect(() => {
    if (props.action == "openMenu") {
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

    if (props.action == "closeMenu") {
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
  }, [props.action])

  useEffect(() => {
    if (props.friendList && props.allMatches) {
      // Sort compatibility list
      setSortedCompatibilityUsers(sortUserList(props.friendList, props.userData, 'overallScore', props.allMatches))

      // Sort Happiness list
      setSortedHappinessUsers(sortUserList(props.friendList, props.userData, 'valence', null, true))

      // Sort obscurity list
      setSortedObscurityUsers(sortUserList(props.friendList, props.userData, 'recentObscurifyPercentile'))
    }
  }, [props.friendList, props.allMatches])

  if (!sortedCompatibilityUsers || !sortedObscurityUsers || !sortedHappinessUsers) return (
    <Text>Loading</Text>
  )
  return (
    <RootView>
      <Notifications />
      <AnimatedContainer
        style={{
          transform: [{
            scale
          }],
          opacity
        }}
      >
        <Header>
          <TopBar>
            <CurrentUser>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('User', {
                    username: props.userData.username,
                    spotifyId: props.userData.spotifyId,
                    currentUserProfile: true
                  })
                }}>
                <UserInfo>
                  <UserName>
                    {props.spotifyProfile.display_name}
                  </UserName>
                  <UserCaption>
                    @{props.userData.username}
                  </UserCaption>
                </UserInfo>

              </TouchableOpacity>

              <UserRight>
                <TouchableOpacity
                  onPress={() => {
                    props.openMenu()
                  }}
                >
                  <AntDesign name="bells" size={24} color="white" />
                </TouchableOpacity>
                <UserIcon
                  source={{
                    uri: props.spotifyProfile.images.length > 0 ?
                      props.spotifyProfile.images[0].url :
                      "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640"
                  }}
                />
              </UserRight>
            </CurrentUser>


          </TopBar>
          <UserStats>
            <HeaderCards
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <HeaderCard
                title={Object.keys(props.userData.currentTopGenres).reduce(function (a, b) { return props.userData.currentTopGenres[a] > props.userData.currentTopGenres[b] ? a : b })}
                caption={"Top Genre"}
              />


              <HeaderCard
                title={Math.round(props.userData.currentAudioFeatures.valence * 100).toString() + "%"}
                caption={"Happiness"}
              />

              <HeaderCard
                title={props.userData.recentObscurifyPercentile.toString() + "%"}
                caption={"Obscurity Score"}
              />


            </HeaderCards>
          </UserStats>
        </Header>

        <Navigation>
          <IndicatorContainer>
            {pages.map((page, pageIndex) => {
              const width = scrollX.interpolate({
                inputRange: [
                  windowWidth * (pageIndex - 1),
                  windowWidth * pageIndex,
                  windowWidth * (pageIndex + 1)
                ],
                outputRange: [0, 52, 0],
                extrapolate: "clamp"
              });

              const opacity = scrollX.interpolate({
                inputRange: [
                  windowWidth * (pageIndex - 1),
                  windowWidth * pageIndex,
                  windowWidth * (pageIndex + 1)
                ],
                outputRange: [0, 0.1, 0],
                extrapolate: "clamp"
              });
              return (
                <Animated.View
                  key={pageIndex}
                  style={[styles.normalDot, { width, opacity }]}
                />
              );
            })}
          </IndicatorContainer>
          <NavIcon
            onPress={() => {
              scroll.current.scrollTo({ x: 0 })
            }}
          >
            <Feather name="users" size={24} color="white" />
          </NavIcon>
          <NavIcon
            onPress={() => {
              scroll.current.scrollTo({ x: windowWidth })
            }}
          >
            <Feather name="smile" size={24} color="white" />
          </NavIcon>
          <NavIcon
            onPress={() => {
              scroll.current.scrollTo({ x: windowWidth * 2 })
            }}
          >
            <MaterialIcons name="library-music" size={24} color="white" />
          </NavIcon>
          <NavIcon
            onPress={() => {
              scroll.current.scrollTo({ x: windowWidth * 3 })
            }}
          >
            <Feather name="search" size={24} color="white" />
          </NavIcon>
        </Navigation>

        <Content>
          <ScrollContainer>
            <MainScrollView
              horizontal={true}
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={Animated.event([
                {
                  nativeEvent: {
                    contentOffset: {
                      x: scrollX
                    }
                  }
                }
              ],
                {
                  useNativeDriver: false
                })}
              scrollEventThrottle={1}
              ref={scroll}
            >
              {pages.map((page, pageIndex) => {
                if (page.title !== "Search") {
                  return (
                    <View
                      style={{ width: windowWidth }}
                      key={pageIndex}
                    >
                      <UserList
                        type={page.title}
                        sortedUsers={page.users}
                        gotoUserPage={
                          (username, spotifyId) => {
                            props.navigation.navigate('User', { username, spotifyId, currentUserProfile: false })
                          }
                        }
                        metric={page.metric}
                      />
                    </View>
                  );
                } else {
                  return (
                    <View
                      style={{ width: windowWidth }}
                      key={pageIndex}
                    >

                      <SearchUsers
                        currentFriends={props.friendList}
                        sentFriendRequests={props.sentFriendRequests}
                        addFriend={async (userToAdd) => {
                          props.addNewFriend(props.userData.username, userToAdd)
                        }}
                        currentUser={props.userData}
                      />
                    </View>
                  )
                }

              })}
            </MainScrollView>
          </ScrollContainer>
        </Content>
      </AnimatedContainer>
    </RootView>
  )
}

const RootView = styled.View`
  flex: 1;
  background: black;
`

const UserRight = styled.View`
  display: flex;
  justify-content: center;
  alignItems: center;
  flex-direction: row;
`
const NavIcon = styled.TouchableOpacity`
  width: 25%;
  height: 90%;
  align-items: center;
  justify-content: center;
`


const Content = styled.View`
  background: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 -10px 20px rgba(0,0,0,0.15)
  margin-top: -15px;
  flex: 1;
`

const Navigation = styled.View`
  background: #222D4D;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  height: 100px;
  box-shadow: 0 -10px 20px rgba(0,0,0,0.15);
  justify-content: center;
  flex-direction: row;
`

const Header = styled.View`
  margin-top: 50px;
`

const HeaderCards = styled.ScrollView`
  margin-top: 10px;
  margin-bottom: 40px;
`

const UserStats = styled.View`
  marginLeft: 15px;
`

const Container = styled.View`
  flex: 1;
  background: #171e31;
  border-radius: 10px;
`;


const TopBar = styled.View`
  margin: 30px 20px;
`

const CurrentUser = styled.View`
  flex-direction: row;
  justifyContent: space-between;
  width: 100%
  alignItems: center;
`

const UserIcon = styled.Image`
width: 40px; 
height: 40px;
border-radius: 17px
marginLeft: 20px;
`

const UserInfo = styled.View`
flex-direction: column
`

const UserName = styled.Text`
font-size: 40px;
font-weight: bold;
color: white;
font-family: TTCommons-DemiBold;
`
const UserCaption = styled.Text`
font-size: 15px;
color: #848484;
font-family: TTCommons-Medium
`
const ScrollContainer = styled.View`
  alignItems: center;
  justifyContent: center;
`
const MainScrollView = styled.ScrollView`
`
const IndicatorContainer = styled.View`
  flexDirection: row;
  alignItems: center;
  justifyContent: center;
  position: absolute;
  height: 87%;
`

const AnimatedContainer = Animated.createAnimatedComponent(Container);




const styles = StyleSheet.create({
  normalDot: {
    height: 50,
    width: 50,
    borderRadius: 4,
    backgroundColor: 'white',
    marginHorizontal: 52
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

