import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { ProgressBar } from 'primereact/progressbar'
import LoginComponent from '../../components/login'
import { init_login, login, logout } from '../../redux/action/auth/login'
import { init_verification } from '../../redux/action/auth/smg91'

import {
  sendVerificationCode,
  verifyCode,
  reSendVerificationCode,
} from '../../redux/action/auth/smg91'
import { toast } from 'react-toastify'
const LoginScreen = props => {
  const {
    initLoginScreen,
    formFieldValueMap,
    isPageLevelError,
    isLoading,
    isLoginSuccess,
    isLoginError,
    error,
    error1,
    login,
    isLoggedIn,
    logout,
    verifyCode,
    sendVerificationCode,
    reSendVerificationCode,
    isVerify,
    isVerifyCodeError,
    isSendVerificationCodeError,
    isResendVerificationCodeSuccess,
    isResendVerificationCodeError,
    init_login,
    init_verification,
    sendVerificationCodeSuccess,
  } = props

  useEffect(() => {
    initLoginScreen()
    // eslint-disable-next-line
  }, [])

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
    reSendVerificationCode,
    sendVerificationCodeSuccess,
    isResendVerificationCodeSuccess,
  }

  if (isLoginError) {
    const toastTitle = error ? error?.error : 'Error while login'
    toast.error(toastTitle)
    init_login()
  }
  if (isSendVerificationCodeError) {
    const toastTitle = error ? error?.error : 'Send OTP Error'
    toast.error(toastTitle)
    init_verification()
  }
  if (isResendVerificationCodeSuccess) {
    toast.success('OTP Resend Successfully')
    init_verification()
  }
  if (isResendVerificationCodeError) {
    const toastTitle = error1 ? error?.error : 'Resend OTP Error'
    toast.error(toastTitle)
    init_verification()
  }
  if (isVerifyCodeError) {
    const toastTitle = error1
      ? error1?.message?.message
      : 'OTP Validating Error'
    toast.error(toastTitle)
    init_verification()
  }

  const renderProgressBar = () => {
    return <ProgressBar mode='indeterminate' style={{ height: '6px' }} />
  }

  return (
    <div>
      {isLoading && renderProgressBar()}
      <LoginComponent loginProps={loginProps} />
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    initLoginScreen: () => dispatch(init_login()),
    login: loginData => dispatch(login(loginData)),
    sendVerificationCode: payload => dispatch(sendVerificationCode(payload)),
    verifyCode: payload => dispatch(verifyCode(payload)),
    logout: () => dispatch(logout()),
    reSendVerificationCode: payload =>
      dispatch(reSendVerificationCode(payload)),
    init_login: () => dispatch(init_login()),
    init_verification: () => dispatch(init_verification()),
  }
}

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
    sendVerificationCodeSuccess:
      state.msg91Reducer?.sendVerificationCodeSuccess,
    isResendVerificationCodeSuccess:
      state.msg91Reducer?.isResendVerificationCodeSuccess,
    isSendVerificationCodeError:
      state.msg91Reducer?.isSendVerificationCodeError,
    isVerify: state.msg91Reducer.isVerify,
    isResendVerificationCodeError:
      state.msg91Reducer?.isResendVerificationCodeError,
    isVerifyCodeError: state.msg91Reducer?.isVerifyCodeError,
    error1: state.msg91Reducer?.error,
  }
}

const selectFormFieldValueMap = loginReducer => {
  return loginReducer.formFieldValueMap
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
