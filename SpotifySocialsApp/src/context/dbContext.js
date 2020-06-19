import React, {useState} from 'react';
import SpotifyWebAPI from 'spotify-web-api-js';
import db from '../api/db'

const DBContext = React.createContext();

export const DBProvider = ({ children }) => {

  const [spotifyObject, setSpotifyObject] = useState(null)
  const [userAuthData, setUserAuthData] = useState(null)
  const [spotifyProfile, setSpotifyProfile] = useState(null)
  const [userData, setUserData] = useState(null)

  // Initialising / Setup
  const createSpotifyObject = async (accessToken) => {
    let sp = new SpotifyWebAPI();
    await sp.setAccessToken(accessToken);

    setSpotifyObject(sp)
  }

  const initialiseUser = async (displayName, username, spotifyId, topGenres, topArtists, topTracks) => {
    const response = await db.post('/inituser', {displayName, username, spotifyId, topGenres, topArtists, topTracks})

    return response.data.message
  };

  const checkIfUserExists = async (spotifyId) => {
    const response = await db.post('/userexists', {spotifyId})
  
    return response.data.result
  }

  // Spotify data about CURRENT USER
  const getProfileInfo = async () => {
    const profileInfo = await spotifyObject.getMe();
    setSpotifyProfile(profileInfo)
    
    return profileInfo    
  }

  const getTopArtists = async () => {
    const rawTopArtists = await spotifyObject.getMyTopArtists({limit: 50, 'time_range': 'medium_term'})
    const topArtists = rawTopArtists.items
    
    const artists = []
    const genres = []

    for (artist in topArtists) {
      artists.push({
        name: topArtists[artist].name,
        id: topArtists[artist].id
      })

      genres.push(topArtists[artist].genres)
    }

    return {
      artists,
      genres
    }
  } 
  
  const getTopGenres = (genres) => {
    genreCount = {}
    for (artist in genres) {
      for (genre in genres[artist]) {
        if (genreCount[genres[artist][genre]] ){
          genreCount[genres[artist][genre]] += 1
        } else {
          genreCount[genres[artist][genre]] = 1
        }
      }
    }

    return genreCount
  }

  const getTopTracks = async () => {
    let topTracks = await spotifyObject.getMyTopTracks({limit: 50})

    topTracks = topTracks.items.map((track) => {
      return {
        name: track.name,
        id: track.id
      }
    })

    return topTracks
  }


  // Mongo DB

  const getCurrentUserData = async (spotifyId) => {
    const userData = await getUser(spotifyId)
    setUserData(userData)

    return userData
  }

  const getUsers = async () => {
    const response = await db.get('/userlist')

    return response.data
  };

  const getUser = async (spotifyId) => {
    const response = await db.post('/user', {spotifyId})
    let user = response.data

    // Data Processing
    let topGenres = JSON.parse(response.data.topGenres)
    let arr = []
    for (let key in topGenres) {
      arr.push([key, topGenres[key]])
    }

    arr.sort(function compare(kv1, kv2) {
      return kv1[1] - kv2[1]
    })

    let sortedGenres = []
    for (let i in arr) {
      sortedGenres.push(arr[i][0])
    }

    // Set processed data
    user.topGenres = sortedGenres
    return user
  };


  // Searching Spotify Directory more info / images / etc
  const getArtist = async (artistId) => {
    const artistInfo = await spotifyObject.getArtist(artistId);

    return artistInfo
  }

  const getTrack = async (trackId) => {
    const trackInfo = await spotifyObject.getTrack(trackId);

    return trackInfo
  }


  // COMPARE
  const getMatches = async (currentUser) => {
    const response = await db.post('/getmatches', {
      currentUser
    })

    return response.data
  }

  const compareUsers = async (currentUser, comparedUser) => {

    let percentage = Math.floor(Math.random() * 101)
    let dateMatched = new Date().getTime()

    const response = await db.post('/newmatch', {
      currentUser: currentUser.username, 
      comparedUser: comparedUser.username,
      compatibilityPercentage: percentage,
      dateMatched
    })

    return percentage

  };

  return (
    <DBContext.Provider 
      value={{ getMatches, getTrack, getArtist, getCurrentUserData, userData, spotifyProfile, userAuthData, setUserAuthData, getUser, getTopGenres, getTopArtists, getTopTracks, checkIfUserExists, getProfileInfo, createSpotifyObject, initialiseUser, getUsers, compareUsers }}>
      {children}
    </DBContext.Provider>
  );
};

export default DBContext;
