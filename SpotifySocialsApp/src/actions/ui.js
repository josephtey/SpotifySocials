export const OPEN_NOTIFICATIONS_SCREEN = 'OPEN_NOTIFICATIONS_SCREEN';
const openNotificationsAction = { type: OPEN_NOTIFICATIONS_SCREEN };
export const openNotificationsScreen = () => async dispatch => {
  dispatch(openNotificationsAction)
};


export const CLOSE_NOTIFICATIONS_SCREEN = 'CLOSE_NOTIFICATIONS_SCREEN';
const closeNotificationsAction = { type: CLOSE_NOTIFICATIONS_SCREEN };
export const closeNotificationsScreen = () => async dispatch => {
  dispatch(closeNotificationsAction)
};

export const OPEN_MATCH_HISTORY_SCREEN = 'OPEN_MATCH_HISTORY_SCREEN';
const openMatchHistoryAction = { type: OPEN_MATCH_HISTORY_SCREEN };
export const openMatchHistoryScreen = () => async dispatch => {
  dispatch(openMatchHistoryAction)
};


export const CLOSE_MATCH_HISTORY_SCREEN = 'CLOSE_MATCH_HISTORY_SCREEN';
const closeMatchHistoryAction = { type: CLOSE_MATCH_HISTORY_SCREEN };
export const closeMatchHistoryScreen = () => async dispatch => {
  dispatch(closeMatchHistoryAction)
};


export const OPEN_GENRE_SCREEN = 'OPEN_GENRE_SCREEN';
const openGenreScreenAction = (passedData) => ({ type: OPEN_GENRE_SCREEN, passedData });
export const openGenreScreen = (passedData) => async dispatch => {
  dispatch(openGenreScreenAction(passedData))
};


export const CLOSE_GENRE_SCREEN = 'CLOSE_GENRE_SCREEN';
const closeGenreScreenAction = { type: CLOSE_GENRE_SCREEN };
export const closeGenreScreen = () => async dispatch => {
  dispatch(closeGenreScreenAction)
};
