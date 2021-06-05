const initialState = {
  action: ""
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "CLOSE_MENU":
      return { ...state, action: "closeMenu" }
    case "OPEN_MENU":
      return { ...state, action: "openMenu" }
    default:
      return state
  }
}