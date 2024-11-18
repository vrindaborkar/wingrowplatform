import React, { useEffect } from 'react'
import { connect, useDispatch } from "react-redux";
import { ProgressBar } from "primereact/progressbar";
import LoginComponent from '../../components/login';
import { init_login, login, logout } from '../../redux/action/auth/login';
import { MzToast, TOAST_SEVERITY } from '../../common/MzToast';
import { toastFailed, toastSuccess } from '../../redux/action/toast';
import { sendVerificationCode, verifyCode } from '../../redux/action/auth/smg91';
const LoginScreen = (props) => {
const {
  initLoginScreen,
  formFieldValueMap,
  isPageLevelError,
  isLoading,
  isLoginSuccess,
  isLoginError,
  error,
  login,
  sendVerificationCode,
  verifyCode,
  isLoggedIn,
  logout,
  sendVerificationCodeSuccess,
  isVerify
} = props;

useEffect(() => {
  initLoginScreen();
  // eslint-disable-next-line
}, []);

const loginProps = {
  formFieldValueMap,
  isPageLevelError,
  isLoginSuccess,
  isLoading,
  login,
  sendVerificationCode,
  verifyCode,
  isLoggedIn,
  logout,
  isVerify,
  sendVerificationCodeSuccess
};
const dispatch =useDispatch();
const getToastProps = () => {
  if (isLoginSuccess) {

    const toastTitle = "Login Successfully";
    dispatch(toastSuccess(toastTitle))
    return {
      severity: TOAST_SEVERITY.SUCCESS,
      toastTitle,
      shouldShowToast: true,
    };
  }
  if (isLoginError) {
    const toastTitle = error ? error?.error : "Error while login";
    toastFailed(toastTitle)
    return {
      severity: TOAST_SEVERITY.ERROR,
      toastTitle,
      shouldShowToast: true,
    };
  }
};

const renderProgressBar = () => {
  return <ProgressBar mode="indeterminate" style={{ height: "6px" }} />;
};

return (
  <div>
    {isLoading && renderProgressBar()}
    <MzToast {...getToastProps()} />
    <LoginComponent loginProps={loginProps} />
  </div>
);
}

const mapDispatchToProps = (dispatch) => {
  return {
    initLoginScreen: () => dispatch(init_login()),
    login: (loginData) => dispatch(login(loginData)),
    sendVerificationCode:(payload)=>  dispatch(sendVerificationCode(payload)),
    verifyCode:(payload)=>  dispatch(verifyCode(payload)),
    logout:()=>dispatch(logout()),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    formFieldValueMap: selectFormFieldValueMap(state.loginReducer),
    isPageLevelError: state.loginReducer.isPageLevelError,
    isLoading: state.loginReducer.isLoading,
    isLoginSuccess: state.loginReducer.isLoginSuccess,
    isLoginError: state.loginReducer.isLoginError,
    error: state.loginReducer.error,
    isLoggedIn: state.loginReducer?.isLoggedIn,
    sendVerificationCodeSuccess:state.msg91Reducer?.sendVerificationCodeSuccess,
    isVerify: state.msg91Reducer.isVerify
  };
};

const selectFormFieldValueMap = (loginReducer) => {
  return loginReducer.formFieldValueMap;
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);