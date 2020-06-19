import React, {useEffect, useState, useContext} from 'react'
import styled from "styled-components";
import DBContext from '../context/dbContext'
import { Text, View, ActivityIndicator } from 'react-native'

const UserAnalysis = ({userData}) => {

    const { getArtist, getTrack } = useContext(DBContext)

    // Setup hooks
    const [loading, setLoading] = useState(true)

    // Single
    const [topArtist, setTopArtist] = useState(null)
    const [topTrack, setTopTrack] = useState(null)
    
    // Multiple
    const topGenres = userData.topGenres.slice(Math.max(userData.topGenres.length - 12, 1)).reverse()
    const topArtists = JSON.parse(userData.topArtists).slice(1,5)
    const topTracks = JSON.parse(userData.topTracks).slice(1,5)

    useEffect(()=>{
        const getTopArtist = async () => {
            let artist = await getArtist(JSON.parse(userData.topArtists)[0].id)
            let artistinfo = {
                name: artist.name,
                genres: artist.genres,
                image: artist.images[0].url
            }
            setTopArtist(artistinfo)
        }

        const getTopTrack = async () => {
            let track = await getTrack(JSON.parse(userData.topTracks)[0].id)
            let trackInfo = {
                name: track.name,
                artist: track.album.artists[0].name,
                image: track.album.images[0].url
            }
            setTopTrack(trackInfo)
        }

        getTopArtist()
        getTopTrack().then(()=>{
            setLoading(false)
        })
        
    }, [])

    if (loading){
        return null
    }
    return (
        <View>
            <Section>
                <SectionTitle>
                    Top Genres
                </SectionTitle>
                
                <GenreList  
                    data={topGenres}
                    renderItem={({item})=>{
                        return (
                            <GenreCard style={(topGenres.indexOf(item) + 1) % 3 === 0 ? {marginRight: 0} : null}>
                                <GenreText>{item}</GenreText>
                            </GenreCard>
                        )
                    }}
                    numColumns={3}
                    keyExtractor={(genre) => genre}
                    scrollEnabled={false}
                />

            </Section>

            <Section>
                    <SectionTitle>
                        Top Artists
                    </SectionTitle>

                    <MusicCard>
                        <MusicPhoto 
                            source={{uri: topArtist.image}}
                        />
                        <MusicText>
                            <MusicName>
                                {topArtist.name}
                            </MusicName>
                            <MusicCaption>
                                {topArtist.genres.join(", ")}
                            </MusicCaption>
                        </MusicText>
                    </MusicCard>
                    <MusicList
                        data={topArtists}
                        renderItem={({item}) => {
                            return (
                                <GenreCard style={(topArtists.indexOf(item) + 1) % 2 === 0 ? {marginRight: 0} : null}>
                                    <GenreText>{item.name}</GenreText>
                                </GenreCard>
                            )
                        }}
                        numColumns={2}
                        scrollEnabled={false}
                    />
            </Section>

            <Section>
                    <SectionTitle>
                        Top Tracks
                    </SectionTitle>

                    <MusicCard>
                        <MusicPhoto 
                            source={{uri: topTrack.image}}
                        />
                        <MusicText>
                            <MusicName>
                                {topTrack.name}
                            </MusicName>
                            <MusicCaption>
                                {topTrack.artist}
                            </MusicCaption>
                        </MusicText>
                    </MusicCard>
                    <MusicList
                        data={topTracks}
                        renderItem={({item}) => {
                            return (
                                <GenreCard style={(topTracks.indexOf(item) + 1) % 2 === 0 ? {marginRight: 0} : null}>
                                    <GenreText>{item.name}</GenreText>
                                </GenreCard>
                            )
                        }}
                        numColumns={2}
                        scrollEnabled={false}
                    />
            </Section>
        </View>
    )
    
}


const Section = styled.View`
    margin: 10px 0;
`

const SectionTitle = styled.Text`
    color: #848484;
    padding: 15px 0 5px 0;
    text-transform: uppercase;
    font-weight: bold
`

const GenreCard = styled.View`
    background: #262626;
    padding: 10px;
    border-radius: 3px;
    margin: 5px 5px 0 0;
    flex: 1
`
const GenreText = styled.Text`
    color: white;
`

const GenreList = styled.FlatList`
    flex-direction: column
`

const MusicCard = styled.View`
    background: #262626;
    padding: 13px;
    border-radius: 5px;
    margin: 5px 0 0 0;
    flex-direction: row;
    alignItems: center;
`

const MusicPhoto = styled.Image`
    height: 70px;
    width: 70px;
    border-radius: 5px
`

const MusicText = styled.View`
    margin: 0 20px;
    flex-direction: column;
`

const MusicCaption = styled.Text`
    font-size: 15px;
    color: grey;
`

const MusicName = styled.Text`
    font-size: 25px;
    color: white;
    font-weight: bold;
`

const MusicList = styled.FlatList`
    
`




export default UserAnalysis