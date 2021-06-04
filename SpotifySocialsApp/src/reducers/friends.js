import {
  GET_FRIENDS_REQUEST,
  GET_FRIENDS_SUCCESS,
  GET_FRIENDS_ERROR,

  GET_SENT_FRIEND_REQUESTS_REQUEST,
  GET_SENT_FRIEND_REQUESTS_SUCCESS,
  GET_SENT_FRIEND_REQUESTS_ERROR,

  ADD_FRIEND_REQUEST,
  ADD_FRIEND_SUCCESS,
  ADD_FRIEND_ERROR,

  GET_FRIEND_REQUESTS_REQUEST,
  GET_FRIEND_REQUESTS_SUCCESS,
  GET_FRIEND_REQUESTS_ERROR,

  RESPOND_TO_REQUEST_REQUEST,
  RESPOND_TO_REQUEST_SUCCESS,
  RESPOND_TO_REQUEST_ERROR
} from '../actions/friends'

const initialState = {
  isFetchingFriendList: false,
  isFetchingSentFriendRequests: false,
  isAddingNewFriend: false,
  isFetchingFriendRequests: false,
  isRespondingToRequest: false,
  error: null,
  friendList: [],
  sentFriendRequests: [],
  friendRequests: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FRIENDS_REQUEST:
      return { ...state, isFetchingFriendList: true }
    case GET_FRIENDS_SUCCESS:
      return { ...state, isFetchingFriendList: false, friendList: action.friendList }
    case GET_FRIENDS_ERROR:
      return { ...state, isFetchingFriendList: false, error: action.error }
    case GET_SENT_FRIEND_REQUESTS_REQUEST:
      return { ...state, isFetchingSentFriendRequests: true }
    case GET_SENT_FRIEND_REQUESTS_SUCCESS:
      return { ...state, isFetchingSentFriendRequests: false, sentFriendRequests: action.sentFriendRequests }
    case GET_SENT_FRIEND_REQUESTS_ERROR:
      return { ...state, isFetchingSentFriendRequests: false, error: action.error }
    case ADD_FRIEND_REQUEST:
      return { ...state, isAddingNewFriend: true }
    case ADD_FRIEND_SUCCESS:
      return { ...state, isAddingNewFriend: false, sentFriendRequests: action.sentFriendRequests }
    case ADD_FRIEND_ERROR:
      return { ...state, isAddingNewFriend: false, error: action.error }
    case GET_FRIEND_REQUESTS_REQUEST:
      return { ...state, isFetchingFriendRequests: true }
    case GET_FRIEND_REQUESTS_SUCCESS:
      return { ...state, isFetchingFriendRequests: false, friendRequests: action.friendRequests }
    case GET_FRIEND_REQUESTS_ERROR:
      return { ...state, isFetchingFriendRequests: false, error: action.error }
    case RESPOND_TO_REQUEST_REQUEST:
      return { ...state, isRespondingToRequest: true }
    case RESPOND_TO_REQUEST_SUCCESS:
      return { ...state, isRespondingToRequest: false, friendRequests: action.friendRequests, friendList: action.friendList }
    case RESPOND_TO_REQUEST_ERROR:
      return { ...state, isRespondingToRequest: false, error: action.error }
    default:
      return state
  }
}