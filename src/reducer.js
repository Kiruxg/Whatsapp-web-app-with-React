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
    seed: null,
    latestMessage: ""
  }
}
export const actionTypes = {
  SET_USER: "SET_USER",
  TOGGLE_CHAT: "TOGGLE_CHAT",
  SET_MESSAGE: "SET_MESSAGE"
}

const reducer = (state, action) => {
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
    case actionTypes.SET_MESSAGE:
      return {
        ...state,
        roomInfo: {
          ...state.roomInfo,
          latestMessage: action.message
        }
      }
    default:
      return state
  }
}
export default reducer
