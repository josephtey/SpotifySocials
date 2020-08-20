import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getArtistInfo } from '../../api/spotify'
import { Text } from 'react-native'

const Container = styled.View`
    background: white;
    width: 200px;
    height: 200px;
    border-radius: 14px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.15);
    margin-right: 20px;
    margin-top: 15px;
`

const Cover = styled.View`
    width: 100%;
    height: 150px;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    overflow:hidden;
`

const Image = styled.Image`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
`

const Content = styled.View`
    flex-direction: row;
    height: 50px;
    align-items: center;
    justifyContent: center;
`

const Title = styled.Text`
    color: #3c4560;
    font-size: 20px;
    font-weight: 600;
    font-family: TTCommons-Bold;
    margin-top: 5px;
`

const MusicCard = ({
  id,
  title,
  caption,
  subtitle
}) => {
  const [imageURL, setImageURL] = useState(null)

  useEffect(() => {
    const fetchSpotifyData = async () => {
      const artistInfo = await getArtistInfo(id)
      setImageURL(artistInfo.images[0].url)
    }
    fetchSpotifyData()
  }, [])

  if (!imageURL) {
    return (
      <Text>Loading...</Text>
    )
  }
  return (
    <Container>
      <Cover>
        <Image source={{
          uri: imageURL
        }} />
      </Cover>

      <Content>
        <Title>{title}</Title>
      </Content>
    </Container>
  )
}

export default MusicCard

