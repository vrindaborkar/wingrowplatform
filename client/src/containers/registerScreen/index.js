import React, { useEffect } from "react";
import RegisterComponent from "../../components/register";
import { connect, useDispatch } from "react-redux";
import { ProgressBar } from "primereact/progressbar";
import { MzToast, TOAST_SEVERITY } from "../../common/MzToast";
import { toastFailed, toastSuccess } from '../../redux/action/toast';
import { init_register, register } from "../../redux/action/auth/register";
import {
  verifyCode,
  sendVerificationCode,
  reSendVerificationCode
} from "../../redux/action/auth/smg91";

const RegisterScreen = (props) => {
  const {
    initRegisterScreen,
    formFieldValueMap,
    isPageLevelError,
    isLoading,
    isRegisterSuccess,
    isRegisterError,
    error,
    register,
    sendVerificationCode,
    verifyCode,
    isRegistered,
    logout,
    sendVerificationCodeSuccess,
    isRegister,
    reSendVerificationCode
  } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    initRegisterScreen();
    // eslint-disable-next-line
  }, []);

  const getToastProps = () => {
    if (isRegisterSuccess) {
      const toastTitle = "Registration Successful";
      toastSuccess(toastTitle);
      return {
        severity: TOAST_SEVERITY.SUCCESS,
        toastTitle,
        shouldShowToast: true,
      };
    }
    if (isRegisterError) {
      const toastTitle = error ? error?.error?.message : "Error occured while register user";
      toastFailed(toastTitle)
      return {
        severity: TOAST_SEVERITY.ERROR,
        toastTitle,
        shouldShowToast: true,
      };
    }
    return {
      shouldShowToast: false,
    };
  };

  const renderProgressBar = () => {
    return <ProgressBar mode="indeterminate" style={{ height: "6px" }} />;
  };

  const registerProps = {
    formFieldValueMap,
    isPageLevelError,
    isLoading,
    register,
    sendVerificationCode,
    verifyCode,
    isRegistered,
    logout,
    sendVerificationCodeSuccess,
    isRegister,
    reSendVerificationCode
  };

  return (
    <div>
      {isLoading && renderProgressBar()}
      <MzToast {...getToastProps()} />
      <RegisterComponent registerProps={registerProps} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    initRegisterScreen: () => dispatch(init_register()),
    register: (data) => dispatch(register(data)),
    sendVerificationCode: (data) => dispatch(sendVerificationCode(data)),
    verifyCode: (data) => dispatch(verifyCode(data)),
    reSendVerificationCode: (data) => dispatch(reSendVerificationCode(data)),
    logout: () => console.log("Logout triggered"),
  };
};

const mapStateToProps = (state) => {
  return {
    formFieldValueMap: state.registerReducer.formFieldValueMap,
    isPageLevelError: state.registerReducer.isPageLevelError,
    isLoading: state.registerReducer.isLoading,
    isRegisterSuccess: state.registerReducer.isRegisterSuccess,
    isRegisterError: state.registerReducer.isRegisterError,
    error: state.registerReducer.error,
    sendVerificationCodeSuccess:
      state.registerReducer.sendVerificationCodeSuccess,
      isRegister: state.registerReducer.isRegister
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
