import React, {useState} from 'react';
import SpotifyWebAPI from 'spotify-web-api-js';
import db from '../api/db'

const DBContext = React.createContext();

export const DBProvider = ({ children }) => {

  let spotifyObject = null
  const [userAuthData, setUserAuthData] = useState(null)

  const createSpotifyObject = async (accessToken) => {
    let sp = new SpotifyWebAPI();
    await sp.setAccessToken(accessToken);

    spotifyObject = sp
  }

  const getProfileInfo = async () => {
    const profileInfo = await spotifyObject.getMe();
    
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

  const initialiseUser = async (username, spotifyId, topGenres, topArtists, topTracks) => {
    const response = await db.post('/inituser', {username, spotifyId, topGenres, topArtists, topTracks})

    return response.data.message
  };

  const checkIfUserExists = async (spotifyId) => {
    const response = await db.post('/userexists', {spotifyId})
  
    return response.data.result
  }

  const getUsers = async () => {
    const response = await db.get('/userlist')

    return response.data
  };

  const getUser = async (spotifyId) => {
    const response = await db.post('/user', {spotifyId})

    return response.data
  };

  const getCompatibilityPercentage = (user1, user2) => {

  }

  const compareUsers = async (spotifyId) => {
    
    // Get current user info
    let profileInfo = await getProfileInfo()
    let currentUser = await getUser(profileInfo.id)

    // Get second user info
    let secondUser = await getUser(spotifyId)
  
    // Compare both users
    return secondUser
  };

  return (
    <DBContext.Provider value={{ userAuthData, setUserAuthData, getUser, getTopGenres, getTopArtists, getTopTracks, checkIfUserExists, getProfileInfo, createSpotifyObject, initialiseUser, getUsers, compareUsers }}>
      {children}
    </DBContext.Provider>
  );
};

export default DBContext;
