import React, { useState, useEffect } from 'react'
import { TouchableOpacity, ScrollView } from 'react-native'
import styled from "styled-components";
import { connect } from 'react-redux'
import { AntDesign } from '@expo/vector-icons';
import { getFriendList } from '../actions/friends'
import HeaderCard from '../components/HeaderCard'

const mapDispatchToProps = { getFriendList }

const mapStateToProps = (state) => {
  return {
    spotifyProfile: state.auth.spotifyProfile,
    userData: state.auth.userData,
    ...state.friends
  }
}


const HomeScreen = (props) => {

  useEffect(() => {
    props.getFriendList(props.userData.username)

  }, [])

  return (
    <Container>
      <Header>
        <TopBar>
          <TouchableOpacity
            onPress={() => {
            }}>

            <CurrentUser>
              <UserInfo>
                <UserName>
                  {props.spotifyProfile.display_name}
                </UserName>
                <UserCaption>
                  "Without music, life would be a mistake"
              </UserCaption>
              </UserInfo>

              <UserIcon
                source={{
                  uri: props.spotifyProfile.images.length > 0 ?
                    props.spotifyProfile.images[0].url :
                    "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640"
                }}
              />
            </CurrentUser>
          </TouchableOpacity>


        </TopBar>
        <HeaderCards
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <HeaderCard
            title={"Indie Pop"}
            caption={"Top Genre"}
          />

          <HeaderCard
            title={"Indie Pop"}
            caption={"Top Genre"}
          />

          <HeaderCard
            title={"Indie Pop"}
            caption={"Top Genre"}
          />

          <HeaderCard
            title={"Indie Pop"}
            caption={"Top Genre"}
          />

        </HeaderCards>
      </Header>

      <Navigation>

      </Navigation>

      <Content>
        <ContentTitle>
          Compatibility
        </ContentTitle>

        <FriendList>
          {props.friendList.map((friend, i) => {
            return (
              <TouchableOpacity
                key={i}
              >
                <FriendCard>
                  <FriendLeft>
                    <FriendMain>
                      {friend.displayName}
                    </FriendMain>
                    <FriendCaption>
                      @{friend.username}
                    </FriendCaption>
                  </FriendLeft>
                  <FriendRight>
                    <FriendStats>
                      20%
                    </FriendStats>
                  </FriendRight>
                </FriendCard>
              </TouchableOpacity>
            )
          })}
        </FriendList>
      </Content>
    </Container>
  )
}

const ContentTitle = styled.Text`
  font-family: TTCommons-Bold;
  font-size: 20px;
  padding: 30px;
  text-align: center;
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
  box-shadow: 0 -10px 20px rgba(0,0,0,0.15)
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

const FriendCard = styled.View`
padding: 15px 20px;
margin: 3px 0;
border-radius: 5px;
background: #303030;
flex-direction: row;
alignItems: center;
justifyContent: space-between
`
const FriendLeft = styled.View`
flex: 4
`
const FriendRight = styled.View`
flex: 1
`

const FriendStats = styled.Text`
color: #1DB954;
font-size: 15px;
font-weight: bold;
text-align: right
`
const FriendMain = styled.Text`
color: white;
font-weight: bold;
font-size: 18px
`

const FriendCaption = styled.Text`
color: grey;
font-size: 13px
`

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

const Section = styled.View`
flex: 1
`

const SectionTitle = styled.Text`
color: #848484;
padding: 15px 0;
text-transform: uppercase;
font-weight: bold;
`

const SectionHeader = styled.View`
flex-direction: row;
alignItems: center;
justifyContent: space-between
`

const FriendList = styled.ScrollView`

`

const NotificationIcon = styled.TouchableOpacity`
`


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

