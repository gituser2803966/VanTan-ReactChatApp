//
const authReducer = (state, action) => {
  switch (action.type) {
    case "REFRESH":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.user,
        conversations: action.conversations,
      };
    case "LOGIN":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.user,
        conversations: action.conversations,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: action.user,
        isLoading: false,
        conversations: action.conversations,
      };
    default:
      return state;
  }
};

export default authReducer;
