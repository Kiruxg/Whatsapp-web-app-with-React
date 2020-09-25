export const initialState = {
  // user: {
  //   token: JSON.parse(localStorage.getItem("whatsappToken")),
  //   username: localStorage.getItem("whatsappUsername"),
  //   avatar: localStorage.getItem("whatsappAvatar")
  // },
  user: JSON.parse(localStorage.getItem("whatsappToken")),
  isLoggedIn: Boolean(localStorage.getItem("whatsappToken")),
  roomInfo: {
    roomName: "",
    seed: null
  }
}
export const actionTypes = {
  SET_USER: "SET_USER",
  TOGGLE_CHAT: "TOGGLE_CHAT"
}

const reducer = (state, action) => {
  console.log("action says", action)
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn
      }
    case actionTypes.SET_ROOM:
      return {
        ...state,
        roomInfo: action.value
      }
    case actionTypes.TOGGLE_CHAT:
      return {
        ...state,
        toggleChat: !state.toggleChat
      }
    default:
      return state
  }
}
export default reducer
