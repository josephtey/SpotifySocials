export const OPEN_NOTIFICATIONS_SCREEN = 'OPEN_NOTIFICATIONS_SCREEN';
export const openNotificationsAction = { type: OPEN_NOTIFICATIONS_SCREEN };
export const openNotificationsScreen = () => async dispatch => {
  dispatch(openNotificationsAction)
};


export const CLOSE_NOTIFICATIONS_SCREEN = 'CLOSE_NOTIFICATIONS_SCREEN';
export const closeNotificationsAction = { type: CLOSE_NOTIFICATIONS_SCREEN };
export const closeNotificationsScreen = () => async dispatch => {
  dispatch(closeNotificationsAction)
};

export const OPEN_MATCH_HISTORY_SCREEN = 'OPEN_MATCH_HISTORY_SCREEN';
export const openMatchHistoryAction = { type: OPEN_MATCH_HISTORY_SCREEN };
export const openMatchHistoryScreen = () => async dispatch => {
  dispatch(openMatchHistoryAction)
};


export const CLOSE_MATCH_HISTORY_SCREEN = 'CLOSE_MATCH_HISTORY_SCREEN';
export const closeMatchHistoryAction = { type: CLOSE_MATCH_HISTORY_SCREEN };
export const closeMatchHistoryScreen = () => async dispatch => {
  dispatch(closeMatchHistoryAction)
};
