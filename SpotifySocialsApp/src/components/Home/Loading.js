import React from 'react';
import styled from 'styled-components'
import { ProgressCircle } from 'react-native-material-indicators';

const Loading = ({
  color
}) => {
  return (
    <Container>
      <ProgressCircle
        color={color ? color : "#1EB955"}
      />
    </Container>
  )
}

const Container = styled.View`
  display: flex;
  alignItems: center;
  justifyContent: center;
`

export default Loading