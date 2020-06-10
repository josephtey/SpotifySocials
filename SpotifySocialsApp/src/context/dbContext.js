import React, {useState} from 'react';
import SpotifyWebAPI from 'spotify-web-api-js';
import db from '../api/db'

const DBContext = React.createContext();

export const DBProvider = ({ children }) => {

  let spotifyObject = null

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
    const topArtists = await spotifyObject.getMyTopArtists()

    return topArtists
  }

  const getTopTracks = async () => {
    const topTracks = await spotifyObject.getMyTopTracks()

    return topTracks
  }

  const initialiseUser = async (username, spotifyId, topArtists, topTracks) => {
    const response = await db.post('/inituser', {username, spotifyId, topArtists, topTracks})

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

  const compareUsers = async (spotifyId) => {
    
    // Get current user info
    let profileInfo = await getProfileInfo()
    let currentUser = await getUser(profileInfo.id)

    // Get second user info
    let secondUser = await getUser(spotifyId)
    
    // Compare both users
    return [currentUser.username, secondUser.username]
  };

  return (
    <DBContext.Provider value={{ getUser, getTopArtists, getTopTracks, checkIfUserExists, getProfileInfo, createSpotifyObject, initialiseUser, getUsers, compareUsers }}>
      {children}
    </DBContext.Provider>
  );
};

export default DBContext;
