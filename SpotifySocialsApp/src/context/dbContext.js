import React, {useState} from 'react';
import SpotifyWebAPI from 'spotify-web-api-js';

const DBContext = React.createContext();

export const DBProvider = ({ children }) => {

  const [spotifyObject, setSpotifyObject] = useState(null)

  const createSpotifyObject = async (accessToken) => {
    let sp = new SpotifyWebAPI();
    await sp.setAccessToken(accessToken);

    setSpotifyObject(sp)
  }

  const getProfileInfo = async () => {
    const profileInfo = await spotifyObject.getMe();

    return profileInfo
  }

  const initialiseUser = () => {
    
  };

  const checkIfUserExists = () => {
    return false
  }

  const getUsers = () => {
    return ["Joe", "Em"]
  };

  const compareUsers = () => {

  };

  return (
    <DBContext.Provider value={{ checkIfUserExists, getProfileInfo, createSpotifyObject, initialiseUser, getUsers, compareUsers }}>
      {children}
    </DBContext.Provider>
  );
};

export default DBContext;
