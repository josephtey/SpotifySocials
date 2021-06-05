import { getAllUserMatches, getSpecificUserMatches, newMatch, getUser } from '../api/db'

export const GET_ALL_MATCHES_REQUEST = 'GET_ALL_MATCHES_REQUEST';
export const GET_ALL_MATCHES_SUCCESS = 'GET_ALL_MATCHES_SUCCESS';
export const GET_ALL_MATCHES_ERROR = 'GET_ALL_MATCHES_ERROR';

const getAllMatchesRequest = { type: GET_ALL_MATCHES_REQUEST };
const getAllMatchesSuccess = (allMatches) => ({ type: GET_ALL_MATCHES_SUCCESS, allMatches });
const getAllMatchesError = error => ({ type: GET_ALL_MATCHES_ERROR, error });

export const getAllMatches = (username) => async dispatch => {
  dispatch(getAllMatchesRequest);
  try {
    const friendList = await getAllUserMatches(username)
    dispatch(getAllMatchesSuccess(friendList))

  } catch (error) {
    dispatch(getAllMatchesError(error));
  }
};

export const GET_USER_MATCH_REQUEST = 'GET_USER_MATCH_REQUEST';
export const GET_USER_MATCH_SUCCESS = 'GET_USER_MATCH_SUCCESS';
export const GET_USER_MATCH_ERROR = 'GET_USER_MATCH_ERROR';

const getUserMatchRequest = { type: GET_USER_MATCH_REQUEST };
const getUserMatchSuccess = (userMatch) => ({ type: GET_USER_MATCH_SUCCESS, userMatch });
const getUserMatchError = error => ({ type: GET_USER_MATCH_ERROR, error });

export const getUserMatch = (currentUser, otherUser) => async dispatch => {
  dispatch(getUserMatchRequest);
  try {
    const userMatches = await getSpecificUserMatches(currentUser, otherUser)

    if (userMatches.length > 0) {
      dispatch(getUserMatchSuccess(userMatches[0]))
    } else {
      dispatch(generateNewMatch(currentUser, otherUser))
    }

  } catch (error) {
    dispatch(getUserMatchError(error));
  }
};

export const GET_ALL_USER_MATCHES_REQUEST = 'GET_ALL_USER_MATCHES_REQUEST';
export const GET_ALL_USER_MATCHES_SUCCESS = 'GET_ALL_USER_MATCHES_SUCCESS';
export const GET_ALL_USER_MATCHES_ERROR = 'GET_ALL_USER_MATCHES_ERROR';

const getAllUserMatchesRequest = { type: GET_ALL_USER_MATCHES_REQUEST };
const getAllUserMatchesSuccess = (allUserMatches) => ({ type: GET_ALL_USER_MATCHES_SUCCESS, allUserMatches });
const getAllUserMatchesError = error => ({ type: GET_ALL_USER_MATCHES_ERROR, error });

export const getAllSpecificUserMatches = (currentUser, otherUser) => async dispatch => {
  dispatch(getAllUserMatchesRequest);
  try {
    const userMatches = await getSpecificUserMatches(currentUser, otherUser)
    dispatch(getAllUserMatchesSuccess(userMatches))

  } catch (error) {
    dispatch(getAllUserMatchesError(error));
  }
};

export const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_ERROR = 'GET_PROFILE_ERROR';

const getProfileRequest = { type: GET_PROFILE_REQUEST };
const getProfileSuccess = (userProfile) => ({ type: GET_PROFILE_SUCCESS, userProfile });
const getProfileError = error => ({ type: GET_PROFILE_ERROR, error });

export const getProfile = (spotifyId) => async dispatch => {
  dispatch(getProfileRequest);
  try {
    const userProfile = await getUser(spotifyId)
    dispatch(getProfileSuccess(userProfile))

  } catch (error) {
    dispatch(getProfileError(error));
  }
};

export const NEW_MATCH_REQUEST = 'NEW_MATCH_REQUEST';
export const NEW_MATCH_SUCCESS = 'NEW_MATCH_SUCCESS';
export const NEW_MATCH_ERROR = 'NEW_MATCH_ERROR';

const newMatchRequest = { type: NEW_MATCH_REQUEST };
const newMatchSuccess = (userMatch) => ({ type: NEW_MATCH_SUCCESS, userMatch });
const newMatchError = error => ({ type: NEW_MATCH_ERROR, error });

export const generateNewMatch = (currentUser, otherUser) => async dispatch => {
  dispatch(newMatchRequest);
  try {
    const userMatch = await newMatch(currentUser, otherUser)
    dispatch(newMatchSuccess(userMatch))

  } catch (error) {
    console.log(error)
    dispatch(newMatchError(error));
  }
};

export const RESET_USER_MATCH = 'RESET_USER_MATCH'

export const resetUserMatch = () => {
  return {
    type: RESET_USER_MATCH
  }
}
