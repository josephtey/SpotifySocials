import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux'
import { attemptLogin } from '../actions/auth'

const mapDispatchToProps = { attemptLogin }

const mapStateToProps = (state) => {
    return state
}

const LoginScreen = (props) => {
    useEffect(() => {
        if (props.auth.redirect) {
            props.navigation.navigate('Initialise')
        }
        console.log(props)
    }, [props])

    return (
        <Container>
            <CustomButton
                onPress={() => {
                    props.attemptLogin()
                }}
            >
                <ButtonText>
                    Spotify
                    <AntDesign name="login" size={15} color="white" />
                </ButtonText>
            </CustomButton>
        </Container>
    )

}

const Container = styled.View`
    margin: 25px;
    alignItems: center;
    justifyContent: center;
    flex: 1
`;

const CustomButton = styled.TouchableOpacity`
    background: #1DB954;
    padding: 20px 30px;
    border-radius: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5)
`

const ButtonText = styled.Text`
    color: white;
    font-weight: bold
`
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)

