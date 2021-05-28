import React, { useEffect, useState } from 'react'
import { Animated, Easing } from 'react-native'
import styled from "styled-components";
import { Feather } from '@expo/vector-icons';
import { connect } from 'react-redux'
import { attemptLogin } from '../actions/auth'


const mapDispatchToProps = { attemptLogin }

const mapStateToProps = (state) => {
    return {
        ...state.auth
    }
}

const LoginScreen = (props) => {
    const [top, setTop] = useState(new Animated.Value(500))
    const [opacity, setOpacity] = useState(new Animated.Value(0))

    // Animation
    useEffect(() => {
        setTimeout(() => {
            Animated.spring(top, {
                toValue: 275,
                speed: 2,
                useNativeDriver: false
            }).start()

            Animated.timing(opacity, {
                toValue: 1,
                duration: 1000,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: false
            }).start()
        }, 500)
    }, [])

    useEffect(() => {
        if (props.spotifyProfile) {
            props.navigation.navigate(props.redirect)
        }
    }, [props])

    return (
        <Container>
            <BlueBackdrop />
            <AnimatedTitle
                style={{ top, opacity }}
            >
                Hello
            </AnimatedTitle>
            <LoginTextWrapper
                onPress={() => {
                    props.attemptLogin()
                }}
            >

                <AnimatedIconWrapper style={{ opacity }}>
                    <Feather name="key" size={24} color="grey" />
                </AnimatedIconWrapper>

                <AnimatedLoginText
                    style={{ opacity }}
                >
                    Login with Spotify
                </AnimatedLoginText>

            </LoginTextWrapper>
        </Container>
    )

}

const IconWrapper = styled.View`
    align-items: center
    padding-bottom: 20px;
`

const Container = styled.View`
    alignItems: center;
    justifyContent: center;
    flex: 1;
    background: white;
`;

const LoginText = styled.Text`
    font-family: TTCommons-Regular;    
    color: grey;
    font-size: 20px;
`

const Title = styled.Text`
    font-family: TTCommons-DemiBold;
    color: #1EB955;
    font-size: 75px;
    position: absolute;
`

const LoginTextWrapper = styled.TouchableOpacity`
    position: absolute;
    bottom: 8%;
`

const BlueBackdrop = styled.View`
    background: #171E31;
    width: 100%;
    height: 80%;
    position: absolute;
    top: 0;
    border-bottom-right-radius: 150px;
    border-bottom-left-radius: 150px;
`

const AnimatedLoginText = Animated.createAnimatedComponent(LoginText)
const AnimatedTitle = Animated.createAnimatedComponent(Title)
const AnimatedIconWrapper = Animated.createAnimatedComponent(IconWrapper)

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)

