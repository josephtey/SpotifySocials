import React from 'react'
import styled from 'styled-components'
import { Text } from 'react-native'

const Typography = styled.Text`
  font-family: TTCommons-Medium;
  color: grey;
`

const MusicList = ({
  data,
  item,
  type,
  maxNum
}) => {

  return (
    <React.Fragment>
      {data ?

        data.length > 0 ?
          data.slice(0, maxNum).map((dataItem, index) => {
            return item(dataItem, index)
          })
          : <Typography>You have no {type} in common with this user.</Typography>

        : null}
    </React.Fragment>
  )
}

export default MusicList

