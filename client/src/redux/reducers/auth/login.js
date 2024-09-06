import { INIT_LOGIN, LOGIN, LOGOUT } from "../../../constant/actionTypes/auth";

const formFieldValueMap = {
  phoneNumber: "",
  otp: "",
  role: "",
};
const getInitialStateFromLocalStorage = () => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const userRole = sessionStorage.getItem("role");
  const user = sessionStorage.getItem("user");

  const parsedUser = user ? JSON.parse(user) : null;

  console.log("user---------------------------------------------", parsedUser?.id);

  return {
    isLoggedIn: isLoggedIn === "true",
    userRole: userRole || "",
    //user
    user: parsedUser || null,
    formFieldValueMap,
    error: "",
    isLoading: false,
    isPageLevelError: false,
    isLoadingPage: false,
    isLoginSuccess: false,
    isLoginError: false,
    isLogoutSuccess: false,
    isLogoutError: false,
  };
};

const initialState = getInitialStateFromLocalStorage();

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_LOGIN:
      return {
        ...state,
        ...initialState,
      };
    case LOGIN.START:
    case LOGOUT.START:
      return {
        ...state,
        isLoading: true,
        isPageLevelError: false,
        isLoadingPage: false,
        isLoginSuccess: false,
        isLoginError: false,
        isLogoutSuccess: false,
        isLogoutError: false,
      };
    case LOGIN.SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user: action.payload.user,
        userRole: action.payload.userRole,
      };
    case LOGIN.ERROR:
    case LOGOUT.ERROR:
      return {
        ...state,
        isLoading: false,
        isLoginError: action.type === LOGIN.ERROR,
        isLogoutError: action.type === LOGOUT.ERROR,
      };

    case LOGOUT.SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        user: null,
        userRole: "",
        isLogoutSuccess: true,
        isLogoutError: false,
      };

    default:
      return state;
  }
};

export default loginReducer;
