import { getFriends, getSentFriendRequests, addFriend } from '../api/db';

export const GET_FRIENDS_REQUEST = 'GET_FRIENDS_REQUEST';
export const GET_FRIENDS_SUCCESS = 'GET_FRIENDS_SUCCESS';
export const GET_FRIENDS_ERROR = 'GET_FRIENDS_ERROR';

const getFriendsRequest = { type: GET_FRIENDS_REQUEST };
const getFriendsSuccess = (friendList) => ({ type: GET_FRIENDS_SUCCESS, friendList });
const getFriendsError = error => ({ type: GET_FRIENDS_ERROR, error });

export const getFriendList = (username) => async dispatch => {
  dispatch(getFriendsRequest);
  try {
    const friendList = await getFriends(username)
    dispatch(getFriendsSuccess(friendList))

  } catch (error) {
    dispatch(getFriendsError(error));
  }
};

export const GET_SENT_FRIEND_REQUESTS_REQUEST = 'GET_SENT_FRIEND_REQUESTS_REQUEST';
export const GET_SENT_FRIEND_REQUESTS_SUCCESS = 'GET_SENT_FRIEND_REQUESTS_SUCCESS';
export const GET_SENT_FRIEND_REQUESTS_ERROR = 'GET_SENT_FRIEND_REQUESTS_ERROR';

const getSentFriendRequestsRequest = { type: GET_SENT_FRIEND_REQUESTS_REQUEST };
const getSentFriendRequestsSuccess = (sentFriendRequests) => ({ type: GET_SENT_FRIEND_REQUESTS_SUCCESS, sentFriendRequests });
const getSentFriendRequestsError = error => ({ type: GET_SENT_FRIEND_REQUESTS_ERROR, error });

export const getRequestedFriends = (username) => async dispatch => {
  dispatch(getSentFriendRequestsRequest);
  try {
    const sentFriendRequests = await getSentFriendRequests(username)
    dispatch(getSentFriendRequestsSuccess(sentFriendRequests))

  } catch (error) {
    dispatch(getSentFriendRequestsError(error));
  }
};

export const ADD_FRIEND_REQUEST = 'ADD_FRIEND_REQUEST';
export const ADD_FRIEND_SUCCESS = 'ADD_FRIEND_SUCCESS';
export const ADD_FRIEND_ERROR = 'ADD_FRIEND_ERROR';

const addFriendRequest = { type: ADD_FRIEND_REQUEST };
const addFriendSuccess = (sentFriendRequests) => ({ type: ADD_FRIEND_SUCCESS, sentFriendRequests });
const addFriendError = error => ({ type: ADD_FRIEND_ERROR, error });

export const addNewFriend = (currentUser, userToAdd) => async dispatch => {
  dispatch(addFriendRequest);
  try {
    const addFriendResponse = await addFriend(currentUser, userToAdd)
    const sentFriendRequests = await getSentFriendRequests(currentUser)

    console.log("added " + userToAdd, addFriendResponse)
    dispatch(addFriendSuccess(sentFriendRequests))

  } catch (error) {
    dispatch(addFriendError(error));
  }
};