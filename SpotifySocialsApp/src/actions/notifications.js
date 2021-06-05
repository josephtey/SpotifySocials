export const openMenuAction = { type: "OPEN_MENU" };


export const openMenu = () => async dispatch => {
  dispatch(openMenuAction)
};


export const closeMenuAction = { type: "CLOSE_MENU" };

export const closeMenu = () => async dispatch => {
  dispatch(closeMenuAction)
};

