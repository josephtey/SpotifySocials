import {
  OPEN_NOTIFICATIONS_SCREEN,
  CLOSE_NOTIFICATIONS_SCREEN,
  OPEN_MATCH_HISTORY_SCREEN,
  CLOSE_MATCH_HISTORY_SCREEN,
  OPEN_GENRE_SCREEN,
  CLOSE_GENRE_SCREEN
} from '../actions/ui'


const initialState = {
  uiAction: "",
  passedData: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_NOTIFICATIONS_SCREEN:
      return { ...state, uiAction: action.type }
    case CLOSE_NOTIFICATIONS_SCREEN:
      return { ...state, uiAction: action.type }
    case OPEN_MATCH_HISTORY_SCREEN:
      return { ...state, uiAction: action.type }
    case CLOSE_MATCH_HISTORY_SCREEN:
      return { ...state, uiAction: action.type }
    case OPEN_GENRE_SCREEN:
      return { ...state, uiAction: action.type, passedData: action.passedData }
    case CLOSE_GENRE_SCREEN:
      return { ...state, uiAction: action.type }
    default:
      return state
  }
}