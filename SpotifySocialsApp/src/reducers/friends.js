import {
  GET_FRIENDS_REQUEST,
  GET_FRIENDS_SUCCESS,
  GET_FRIENDS_ERROR,
} from '../actions/friends'

const initialState = {
  isLoading: false,
  error: null,
  friendList: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FRIENDS_REQUEST:
      return { ...state, isLoading: true }
    case GET_FRIENDS_SUCCESS:
      return { ...state, isLoading: false, friendList: action.friendList }
    case GET_FRIENDS_ERROR:
      return { ...state, isLoading: false, error: action.error }
    default:
      return state
  }
}