import React, { useEffect, useState, useContext } from 'react'
import styled from "styled-components";

const HeaderCard = (props) => {
  return (
    <Card>
      <Title>
        {props.title}
      </Title>
      <Caption>
        {props.caption}
      </Caption>
    </Card>
  )
}

export default HeaderCard

const Title = styled.Text`
  position: absolute;
  top: 15px;
  left: 15px;
  font-family: TTCommons-Bold;
  font-size: 23px;
  color: white;
`

const Caption = styled.Text`
  position: absolute;
  bottom: 5px;
  right: 10px;
  font-family: TTCommons-Medium;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.33)
`

const Card = styled.View`
  width: 175px;
  height: 80px;
  border-radius: 10px;
  background: rgba(0,0,0,0.27);
  margin-right: 12px;
`