import { INIT_LOGIN, LOGIN, LOGOUT } from "../../../constant/actionTypes/auth";
import { authService } from "../../../services";

export const init_login = () => {
  return {
    type: INIT_LOGIN,
  };
};
export const loginStart = (payload) => {
  return {
    type: LOGIN.START,
    payload,
  };
};
export const loginSuccess = (payload) => {
  return {
    type: LOGIN.SUCCESS,
    payload,
  };
};
export const loginError = (payload) => {
  return {
    type: LOGIN.ERROR,
    payload,
  };
};

export const login = (payload) => {
  return (dispatch) => {
    dispatch(loginStart());
    authService.login(payload).then((logindata) => {
      console.log("logindata------------------------------------------", logindata);
      
      if (!logindata.isError) {
       
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("token", logindata.accessToken);
          localStorage.setItem("user", JSON.stringify(logindata));
          
          const userRole = logindata.role || "farmer";
          localStorage.setItem("role", userRole);
          
          dispatch(loginSuccess(logindata));
      } else {
        dispatch(loginError(logindata));
      }
    }).catch((error) => {
      dispatch(loginError({ message: error.message || "Login failed due to unexpected error" }));
    });
  };
};


export const logoutStart = () => {
  return {
    type: LOGOUT.START,
  };
};

export const logoutSuccess = () => {
  return {
    type: LOGOUT.SUCCESS,
  };
};

export const logoutError = (payload) => {
  return {
    type: LOGOUT.ERROR,
    payload,
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(logoutStart());
    authService
      .postLogout()
      .then((response) => {
        if (!response.isError) {
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("role");

          dispatch(logoutSuccess());
        } else {
          dispatch(logoutError(response));
        }
      })
      .catch((error) => {
        dispatch(logoutError({ message: error.message || "Logout failed due to unexpected error" }));
      });
  };
};
