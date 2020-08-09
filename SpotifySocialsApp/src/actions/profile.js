import { getAllUserMatches, newMatch } from '../api/db'

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

// export const NEW_MATCH_REQUEST = 'NEW_MATCH_REQUEST';
// export const NEW_MATCH_SUCCESS = 'NEW_MATCH_SUCCESS';
// export const NEW_MATCH_ERROR = 'NEW_MATCH_ERROR';

// const newMatchRequest = { type: NEW_MATCH_REQUEST };
// const newMatchSuccess = (allMatches) => ({ type: NEW_MATCH_SUCCESS, allMatches });
// const newMatchError = error => ({ type: NEW_MATCH_ERROR, error });

// export const newMatch = (currentUser, otherUser) => async dispatch => {
//   dispatch(newMatchRequest);
//   try {
//     const friendList = await newMatch(currentUser, otherUser)
//     dispatch(newMatchSuccess(friendList))

//   } catch (error) {
//     dispatch(newMatchError(error));
//   }
// };


