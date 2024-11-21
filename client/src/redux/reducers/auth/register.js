import {
  INIT_REGISTRATION,
  REGISTER,
} from "../../../constant/actionTypes/auth";

const formFieldValueMap = {
  username: "",
  password: "",
};

const initialState = {
  isRegistered: false,
  isRegistrationVerify: false,
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
        isRegisterError:false
      };
    case REGISTER.START:
      return {
        ...state
      };
    case REGISTER.SUCCESS:
      return {
        ...state,
        isRegistered: true,
      };
    case REGISTER.ERROR:
      return {
        ...state,
        isRegisterError: true,
        error: action?.payload
      };

    default:
      return state;
  }
};

export default registerReducer;
