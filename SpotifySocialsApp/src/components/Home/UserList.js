import React, { useEffect, useState, useContext } from 'react'
import { Animated } from 'react-native'
import styled from "styled-components";

const UserList = ({
  sortedUsers,
  type,
  gotoUserPage,
  metric,
  search = false
}) => {
  const [scale, setScale] = useState(new Animated.Value(0))

  useEffect(() => {
    setTimeout(() => {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: false
      }).start()
    }, 500)

  }, [])

  return (
    <Container
      padding={!search}
    >
      {
        type ?
          <ContentTitle>
            {type}
          </ContentTitle>
          : null
      }

      <FriendList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100
        }}
      >

        {sortedUsers.map((friend, i) => {
          return (
            <User
              key={i}
              onPress={() => {
                gotoUserPage(friend.username, friend.spotifyId)
              }}
            >
              <AnimatedFriendCard
                style={{
                  transform: [
                    { scale }
                  ]
                }}
              >
                <FriendCard>
                  {i < 3 && !search ?
                    <FriendBadge
                      place={i + 1}
                    >
                      <FriendStats>
                        {i + 1}
                      </FriendStats>
                    </FriendBadge>
                    : null
                  }
                  <FriendLeft>
                    <FriendMain>
                      {friend.displayName}
                    </FriendMain>
                    <FriendCaption>
                      @{friend.username}
                    </FriendCaption>
                  </FriendLeft>
                  {friend[metric] ?
                    <FriendRight
                      place={i}
                    >
                      <FriendStats>
                        {Math.round(friend[metric])}%
                  </FriendStats>
                    </FriendRight>
                    : null}

                  {search ?
                    <>
                      {
                        friend.status === 'friends' ?
                          null
                          : friend.status === 'not friends' ?
                            <FriendRight>
                              <FriendStats>
                                Add
                          </FriendStats>
                            </FriendRight>
                            : friend.status === 'pending' ?
                              <FriendRight
                                disabled={true}
                              >
                                <FriendStats>
                                  Sent
                           </FriendStats>
                              </FriendRight>
                              : null
                      }

                    </>
                    : null}
                </FriendCard>

                <ProgressLine
                  progress={friend[metric]}
                />
              </AnimatedFriendCard>

            </User>
          )
        })}
      </FriendList>
    </Container>
  )
}

export default UserList

const Container = styled.View`
  padding: ${props => props.padding ? '10px 20px' : 0};
  height: 100%;
`

const User = styled.TouchableOpacity`
  margin-bottom: 15px;
`
const FriendCard = styled.View`
border-radius: 5px;
background: rgba(0,0,0,0.03);
flex-direction: row;
alignItems: center;
justifyContent: space-between;
height: 70px;
`
const FriendLeft = styled.View`
padding: 15px 20px;
flex: 4;
position: relative;
`

const FriendBadge = styled.View`
  flex: 0.5;
  background: ${props => props.place === 1 ? '#fad001' : props.place === 2 ? '#cecece' : '#a34c20'};
  height: 100%;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  justify-content: center;
  align-items: center;
`

const FriendRight = styled.View`
flex: ${props => props.place < 3 ? '1.12' : '1'};
background: ${props => props.disabled ? '#b7b7b7' : '#2ac940'};
height: 100%;
border-top-right-radius: 5px;
border-bottom-right-radius: 5px;
justify-content: center;
align-items: center;
`
const FriendStats = styled.Text`
color: white;
font-size: 20px;
margin-top: 7px;
font-family: TTCommons-Bold;
text-align: right;
`
const FriendMain = styled.Text`
color: white;
font-family: TTCommons-Bold;
color: #171e31;
font-size: 20px;
margin-bottom: -4px;
`

const FriendCaption = styled.Text`
color: rgba(0,0,0,0.32);
font-size: 15px;
font-family: TTCommons-Medium;
`


const ContentTitle = styled.Text`
  font-family: TTCommons-Bold;
  font-size: 20px;
  padding: 15px;
  text-align: center;
`


const ProgressLine = styled.View`
  height: 3px;
  background: #2ac940;
  width: ${props => (props.progress / 100) * 82.5}%;
  margin-top: -3px;
  border-bottom-left-radius: 5px;

`
const FriendList = styled.ScrollView`
`

const FriendCardWrapper = styled.View`
  
`
const AnimatedFriendCard = Animated.createAnimatedComponent(FriendCardWrapper);