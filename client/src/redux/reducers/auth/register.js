import {
  INIT_REGISTRATION,
  REGISTER,
} from "../../../constant/actionTypes/auth";

const formFieldValueMap = {
  username: "",
  password: "",
};

const initialState = {
  formFieldValueMap,
  error: "",
  isLoading: false,
  isPageLevelError: false,
  isLoadingPage: false,
  isRegisterSuccess: false,
  isRegisterError: false,
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_REGISTRATION:
      return {
        ...state,
        initialState,
      };
    case REGISTER.START:
      return {
        ...state,
        isLoggedIn: true,
      };
    case REGISTER.SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
      };
    case REGISTER.ERROR:
      return {
        ...state,
        isRegisterError: true,
      };

    default:
      return state;
  }
};

export default registerReducer;
