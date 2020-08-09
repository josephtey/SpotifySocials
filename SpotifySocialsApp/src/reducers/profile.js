import {
  GET_ALL_MATCHES_REQUEST,
  GET_ALL_MATCHES_SUCCESS,
  GET_ALL_MATCHES_ERROR
} from '../actions/profile'

const initialState = {
  isLoading: false,
  error: null,
  allMatches: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_MATCHES_REQUEST:
      return { ...state, isLoading: true }
    case GET_ALL_MATCHES_SUCCESS:
      return { ...state, isLoading: false, allMatches: action.allMatches }
    case GET_ALL_MATCHES_ERROR:
      return { ...state, isLoading: false, error: action.error }
    default:
      return state
  }
}