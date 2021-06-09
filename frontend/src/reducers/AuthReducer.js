//
const authReducer = (state, action) => {
  switch (action.type) {
    case "REFRESH":
      return {
        ...state,
        isLoading:false,
        isAuthenticated:true,
        user:action.user,
      };
    case "LOGIN":
      return {
        ...state,
        isLoading:false,
        isAuthenticated:true,
        user:action.user,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated:false,
        user:action.user,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
