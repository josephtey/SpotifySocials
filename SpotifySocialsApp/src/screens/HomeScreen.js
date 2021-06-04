import React, { useState, useEffect, useRef } from 'react'
import { TouchableOpacity, Animated, useWindowDimensions, StyleSheet, SafeAreaView, ScrollView, View, Text } from 'react-native'
import styled from "styled-components";
import { connect } from 'react-redux'
import { Feather, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { getFriendList, getRequestedFriends, addNewFriend } from '../actions/friends'
import { getAllMatches } from '../actions/profile'
import HeaderCard from '../components/Home/HeaderCard'
import UserList from '../components/Home/UserList'
import SearchUsers from '../components/Home/SearchUsers'

const mapDispatchToProps = { getFriendList, getAllMatches, getRequestedFriends, addNewFriend }

const mapStateToProps = (state) => {
  return {
    spotifyProfile: state.auth.spotifyProfile,
    userData: state.auth.userData,
    ...state.friends,
    ...state.profile
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

  const [sortedCompatibilityUsers, setSortedCompatibilityUsers] = useState(null)
  const [sortedObscurityUsers, setSortedObscurityUsers] = useState(null)
  const [sortedHappinessUsers, setSortedHappinessUsers] = useState(null)

  // Page Scrolling
  const scrollX = useRef(new Animated.Value(0)).current;
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
    if (props.friendList && props.allMatches) {
      // Sort compatibility list
      setSortedCompatibilityUsers(sortUserList(props.friendList, props.userData, 'overallScore', props.allMatches))

      // Sort Happiness list
      setSortedHappinessUsers(sortUserList(props.friendList, props.userData, 'valence', null, true))

      // Sort obscurity list
      setSortedObscurityUsers(sortUserList(props.friendList, props.userData, 'recentObscurifyPercentile'))
    }
  }, [props.friendList, props.allMatches])

  if (!sortedCompatibilityUsers && !sortedObscurityUsers && !sortedHappinessUsers) return null
  return (
    <Container>
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
              <AntDesign name="bells" size={24} color="white" />
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
      </Header>

      <Navigation>
        <NavIcon>
          <Feather name="users" size={24} color="white" />
        </NavIcon>
        <NavIcon>
          <MaterialIcons name="library-music" size={24} color="white" />
        </NavIcon>
        <NavIcon>
          <Feather name="smile" size={24} color="white" />
        </NavIcon>
        <NavIcon>
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
            ])}
            scrollEventThrottle={1}
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

          {/* <View style={styles.indicatorContainer}>
            {[1, 2, 3].map((image, imageIndex) => {
              const width = scrollX.interpolate({
                inputRange: [
                  windowWidth * (imageIndex - 1),
                  windowWidth * imageIndex,
                  windowWidth * (imageIndex + 1)
                ],
                outputRange: [8, 16, 8],
                extrapolate: "clamp"
              });
              let opacity = 0
              if (parseFloat(JSON.stringify(width)) > 15) {
                opacity = 1
              }
              return (
                <Animated.View
                  key={imageIndex}
                  style={[styles.normalDot, { width, opacity }]}
                />
              );
            })}
          </View> */}
        </ScrollContainer>
      </Content>
    </Container>
  )
}

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
  padding: 0 20px;
`

const Container = styled.View`
  flex: 1;
  background: #171e31
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  scrollContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center"
  },
  textContainer: {
    backgroundColor: "rgba(0,0,0, 0.7)",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5
  },
  infoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "silver",
    marginHorizontal: 4,
    opacity: 1
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

