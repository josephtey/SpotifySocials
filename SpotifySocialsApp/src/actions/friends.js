import { getFriends, searchUsers } from '../api/db';

export const GET_FRIENDS_REQUEST = 'GET_FRIENDS_REQUEST';
export const GET_FRIENDS_SUCCESS = 'GET_FRIENDS_SUCCESS';
export const GET_FRIENDS_ERROR = 'GET_FRIENDS_ERROR';

const getFriendsRequest = { type: GET_FRIENDS_REQUEST };
const getFriendsSuccess = (friendList) => ({ type: GET_FRIENDS_SUCCESS, friendList });
const getFriendsError = error => ({ type: GET_FRIENDS_ERROR, error });

export const getFriendList = (username) => async dispatch => {
  dispatch(getFriendsRequest);
  try {
    const friendList = await searchUsers("")
    dispatch(getFriendsSuccess(friendList))

  } catch (error) {
    dispatch(getFriendsError(error));
  }
};