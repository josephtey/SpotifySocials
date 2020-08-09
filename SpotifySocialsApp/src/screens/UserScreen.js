import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { connect } from 'react-redux'
import { getFriendList } from '../actions/friends'

const mapDispatchToProps = { getFriendList }

const mapStateToProps = (state) => {
  return {
    spotifyProfile: state.auth.spotifyProfile,
    userData: state.auth.userData,
    ...state.friends
  }
}


const UserScreen = (props) => {

  useEffect(() => {
    props.getFriendList(props.userData.username)
  }, [])

  return (
    <Container>

    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  background: #171e31
`;
export default connect(mapStateToProps, mapDispatchToProps)(UserScreen)

