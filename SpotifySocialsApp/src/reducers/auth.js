import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  GENERATE_PROFILE_REQUEST,
  GENERATE_PROFILE_SUCCESS,
  GENERATE_PROFILE_ERROR
} from '../actions/auth'

const initialState = {
  error: null,
  isLoading: false,
  spotifyProfile: null,
  userData: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isLoading: true }
    case LOGIN_SUCCESS:
      return { ...state, isLoading: false, userData: action.userData, spotifyProfile: action.spotifyProfile, redirect: action.redirect }
    case LOGIN_ERROR:
      return { ...state, isLoading: false, error: action.error }
    case GENERATE_PROFILE_REQUEST:
      return { ...state, isLoading: true }
    case GENERATE_PROFILE_SUCCESS:
      return { ...state, isLoading: false, userData: action.userData, redirect: action.redirect }
    case GENERATE_PROFILE_ERROR:
      return { ...state, isLoading: false, error: action.error }
    default:
      return state
  }
}