import React from 'react';
import styled from 'styled-components'
import Loader from 'react-loader-spinner'


const Loading = ({
  color
}) => {
  return (
    <Container>
      <Loader
        type="TailSpin"
        color={color}
        height={100}
        width={100}
      />
    </Container>
  )
}

const Container = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
`

export default Loading