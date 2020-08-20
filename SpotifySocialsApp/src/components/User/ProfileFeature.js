import React from 'react'
import styled from 'styled-components'

const Container = styled.View`
  flex-direction: row;
  paddingLeft: 10px;
  paddingTop: 10px;
`

const IconWrapper = styled.View`
  background: rgba(0,0,0,0.03);
  border-radius: 10px;
  height:50px;
  width: 50px;
  justifyContent: center;
  alignItems: center;
`

const TextWrapper = styled.View`
  justifyContent: center;
  flex-direction: column;
  marginLeft: 10px;
  paddingTop: 7px;
`

const FeatureType = styled.Text`
  font-size: 12px;
  color: rgba(0,0,0,0.3)
  font-family: TTCommons-Medium;
`

const FeatureValue = styled.Text`
  font-size: 20px;
  color: #171E31;
  font-family: TTCommons-Bold;  
  text-transform: capitalize;
`

const ProfileFeature = ({
  icon,
  value,
  type
}) => {

  return (
    <Container>
      <IconWrapper>
        {icon}
      </IconWrapper>

      <TextWrapper>
        <FeatureType>
          {type}
        </FeatureType>
        <FeatureValue>
          {value}
        </FeatureValue>
      </TextWrapper>
    </Container>
  )
}

export default ProfileFeature

