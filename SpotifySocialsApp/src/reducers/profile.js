import {
  GET_ALL_MATCHES_REQUEST,
  GET_ALL_MATCHES_SUCCESS,
  GET_ALL_MATCHES_ERROR,
  GET_USER_MATCH_REQUEST,
  GET_USER_MATCH_SUCCESS,
  GET_USER_MATCH_ERROR,
  NEW_MATCH_REQUEST,
  NEW_MATCH_SUCCESS,
  NEW_MATCH_ERROR,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR
} from '../actions/profile'

const initialState = {
  isFetchingAllMatches: false,
  isFetchingUserProfile: false,
  isFetchingSpecificMatch: false,
  isGeneratingNewMatch: false,
  error: null,
  allMatches: [],
  userMatch: {},
  userProfile: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_MATCHES_REQUEST:
      return { ...state, isFetchingAllMatches: true }
    case GET_ALL_MATCHES_SUCCESS:
      return { ...state, isFetchingAllMatches: false, allMatches: action.allMatches }
    case GET_ALL_MATCHES_ERROR:
      return { ...state, isFetchingAllMatches: false, error: action.error }
    case GET_USER_MATCH_REQUEST:
      return { ...state, isFetchingSpecificMatch: true }
    case GET_USER_MATCH_SUCCESS:
      return { ...state, isFetchingSpecificMatch: false, userMatch: action.userMatch }
    case GET_USER_MATCH_ERROR:
      return { ...state, isFetchingSpecificMatch: false, error: action.error }
    case NEW_MATCH_REQUEST:
      return { ...state, isGeneratingNewMatch: true }
    case NEW_MATCH_SUCCESS:
      return { ...state, isGeneratingNewMatch: false, userMatch: action.userMatch }
    case NEW_MATCH_ERROR:
      return { ...state, isGeneratingNewMatch: false, error: action.error }
    case GET_PROFILE_REQUEST:
      return { ...state, isFetchingUserProfile: true }
    case GET_PROFILE_SUCCESS:
      return { ...state, isFetchingUserProfile: false, userProfile: action.userProfile }
    case GET_PROFILE_ERROR:
      return { ...state, isFetchingUserProfile: false, error: action.error }
    default:
      return state
  }
}