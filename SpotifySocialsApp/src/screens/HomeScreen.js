import React, { useState, useEffect } from 'react'
import { TouchableOpacity, ScrollView } from 'react-native'
import styled from "styled-components";
import { connect } from 'react-redux'
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { getFriendList } from '../actions/friends'
import HeaderCard from '../components/Home/HeaderCard'
import UserList from '../components/Home/UserList'

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
        <NavIcon>
          <Feather name="users" size={24} color="white" />
        </NavIcon>
        <NavIcon>
          <Feather name="smile" size={24} color="white" />
        </NavIcon>
        <NavIcon>
          <MaterialIcons name="library-music" size={24} color="white" />
        </NavIcon>
        <NavIcon>
          <Feather name="search" size={24} color="white" />
        </NavIcon>
      </Navigation>

      <Content>
        <UserList
          type="Compatibility"
          users={props.friendList}
        />
      </Content>
    </Container>
  )
}


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
  padding: 20px;
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

