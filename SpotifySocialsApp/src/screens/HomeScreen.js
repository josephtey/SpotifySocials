import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { connect } from 'react-redux'

const mapDispatchToProps = {}

const mapStateToProps = (state) => {
  return state
}


const HomeScreen = (props) => {

  useEffect(() => {
    if (props.auth.userData) {
      props.navigation.navigate('Home')
    }
  }, [props])

  return (
    <Container>
      <Title>Home</Title>
    </Container>
  )
}


const Container = styled.View`
    margin: 25px;
    alignItems: center;
    justifyContent: center;
    flex: 1
`;
const Title = styled.Text`
    font-size: 15px;
    font-weight: bold;
    margin: 10px 0;
    color: white
`



export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

