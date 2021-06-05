import {
  OPEN_NOTIFICATIONS_SCREEN,
  CLOSE_NOTIFICATIONS_SCREEN,
  OPEN_MATCH_HISTORY_SCREEN,
  CLOSE_MATCH_HISTORY_SCREEN

} from '../actions/ui'


const initialState = {
  uiAction: ""
}

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_NOTIFICATIONS_SCREEN:
      return { ...state, uiAction: OPEN_NOTIFICATIONS_SCREEN }
    case CLOSE_NOTIFICATIONS_SCREEN:
      return { ...state, uiAction: CLOSE_NOTIFICATIONS_SCREEN }
    case OPEN_MATCH_HISTORY_SCREEN:
      return { ...state, uiAction: OPEN_MATCH_HISTORY_SCREEN }
    case CLOSE_MATCH_HISTORY_SCREEN:
      return { ...state, uiAction: CLOSE_MATCH_HISTORY_SCREEN }
    default:
      return state
  }
}