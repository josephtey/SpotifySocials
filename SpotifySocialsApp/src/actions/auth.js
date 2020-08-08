import { initialiseUser, checkIfUserExists, getUser } from '../api/db';
import { initSpotify, getProfileInfo, getTopArtists, getTopGenres, getTopTracks, getAudioFeatures } from '../api/spotify'
import { getTokens } from '../api/spotifyAuth'

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

const loginRequest = { type: LOGIN_REQUEST };
const loginSuccess = (userData, spotifyProfile, redirect) => ({ type: LOGIN_SUCCESS, userData, spotifyProfile, redirect });
const loginError = error => ({ type: LOGIN_ERROR, error });

export const attemptLogin = () => async dispatch => {
  dispatch(loginRequest);
  try {
    const response = await getTokens();
    initSpotify(response.accessToken)

    const spotifyProfile = await getProfileInfo()
    const exist = await checkIfUserExists(spotifyProfile.id)

    if (exist) {
      const userData = await getUser(spotifyProfile.id)

      dispatch(loginSuccess(userData, spotifyProfile, 'Home'))
    } else {

      dispatch(loginSuccess(null, spotifyProfile, 'Initialise'))
    }

  } catch (error) {
    dispatch(loginError(error));
  }
};

export const GENERATE_PROFILE_REQUEST = 'GENERATE_PROFILE_REQUEST';
export const GENERATE_PROFILE_SUCCESS = 'GENERATE_PROFILE_SUCCESS';
export const GENERATE_PROFILE_ERROR = 'GENERATE_PROFILE_ERROR';

const generateProfileRequest = { type: GENERATE_PROFILE_REQUEST };
const generateProfileSuccess = (userData, redirect) => ({ type: GENERATE_PROFILE_SUCCESS, userData, redirect });
const generateProfileError = error => ({ type: GENERATE_PROFILE_ERROR, error });

export const generateProfile = (username, spotifyProfile) => async dispatch => {
  dispatch(generateProfileRequest);
  try {
    // Generate Spotify Data to Initialise User
    const currentTopArtists = await getTopArtists('short_term')
    const currentTopTracks = await getTopTracks('short_term')
    const currentTopGenres = getTopGenres(currentTopArtists)
    const currentAudioFeatures = await getAudioFeatures(currentTopTracks)

    const allTimeTopArtists = await getTopArtists('long_term')
    const allTimeTopTracks = await getTopTracks('long_term')
    const allTimeTopGenres = getTopGenres(allTimeTopArtists)
    const allTimeAudioFeatures = await getAudioFeatures(allTimeTopTracks)

    const userData = {
      displayName: spotifyProfile.display_name,
      username,
      spotifyId: spotifyProfile.id,
      currentTopArtists,
      currentTopTracks,
      currentTopGenres,
      currentAudioFeatures,
      allTimeTopArtists,
      allTimeTopTracks,
      allTimeTopGenres,
      allTimeAudioFeatures
    }


    const response = await initialiseUser(userData)

    if (response.message === "Success") {
      dispatch(generateProfileSuccess(userData, 'Home'))
    }
  } catch (error) {
    console.log(error)
    dispatch(generateProfileError(error));
  }
};