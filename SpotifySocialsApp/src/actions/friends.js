import { getFriends, getSentFriendRequests, addFriend, getFriendRequests, acceptFriendRequest, rejectFriendRequest } from '../api/db';

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

    dispatch(addFriendSuccess(sentFriendRequests))

  } catch (error) {
    dispatch(addFriendError(error));
  }
};

export const GET_FRIEND_REQUESTS_REQUEST = 'GET_FRIEND_REQUESTS_REQUEST';
export const GET_FRIEND_REQUESTS_SUCCESS = 'GET_FRIEND_REQUESTS_SUCCESS';
export const GET_FRIEND_REQUESTS_ERROR = 'GET_FRIEND_REQUESTS_ERROR';

const getFriendRequestsRequest = { type: GET_FRIEND_REQUESTS_REQUEST };
const getFriendRequestsSuccess = (friendRequests) => ({ type: GET_FRIEND_REQUESTS_SUCCESS, friendRequests });
const getFriendRequestsError = error => ({ type: GET_FRIEND_REQUESTS_ERROR, error });

export const getAllFriendRequests = (currentUser) => async dispatch => {
  dispatch(getFriendRequestsRequest);
  try {
    const friendRequests = await getFriendRequests(currentUser)
    dispatch(getFriendRequestsSuccess(friendRequests))

  } catch (error) {
    dispatch(getFriendRequestsError(error));
  }
};

export const RESPOND_TO_REQUEST_REQUEST = 'RESPOND_TO_REQUEST_REQUEST';
export const RESPOND_TO_REQUEST_SUCCESS = 'RESPOND_TO_REQUEST_SUCCESS';
export const RESPOND_TO_REQUEST_ERROR = 'RESPOND_TO_REQUEST_ERROR';

const respondToRequestRequest = { type: RESPOND_TO_REQUEST_REQUEST };
const respondToRequestSuccess = (friendRequests) => ({ type: RESPOND_TO_REQUEST_SUCCESS, friendRequests });
const respondToRequestError = error => ({ type: RESPOND_TO_REQUEST_ERROR, error });

export const respondToRequest = (type, currentUser, userThatAddedMe) => async dispatch => {
  dispatch(respondToRequestRequest);
  try {

    let response;
    if (type === "accept") {
      response = await acceptFriendRequest(userThatAddedMe, currentUser)
    } else if (type === "reject") {
      response = await rejectFriendRequest(userThatAddedMe, currentUser)
    }

    const friendRequests = await getFriendRequests(currentUser)
    dispatch(respondToRequestSuccess(friendRequests))

  } catch (error) {
    dispatch(respondToRequestError(error));
  }
};