import React, { useEffect } from 'react'
import RegisterComponent from '../../components/register'
import { connect } from 'react-redux'
import { ProgressBar } from 'primereact/progressbar'
import { init_register, register } from '../../redux/action/auth/register'
import {
  verifyCode,
  sendVerificationCode,
  reSendVerificationCode,
  init_verification,
} from '../../redux/action/auth/smg91'
import { toast } from 'react-toastify'

const RegisterScreen = props => {
  const {
    initRegisterScreen,
    formFieldValueMap,
    isPageLevelError,
    isLoading,
    isRegisterError,
    error,
    register,
    sendVerificationCode,
    verifyCode,
    isRegistered,
    logout,
    sendVerificationCodeSuccess,
    isResendVerificationCodeSuccess,
    isSendVerificationCodeError,
    reSendVerificationCode,
    init_verification,
    init_register,
    isResendVerificationCodeError,
    error1,
    isVerifyCodeError,
    isVerify,
  } = props

  useEffect(() => {
    initRegisterScreen()
    // eslint-disable-next-line
  }, [])

  if (isRegisterError) {
    init_register()
    const toastTitle = error
      ? error?.error?.message
      : 'Error occured while register user'
    toast.error(toastTitle)
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

  const registerProps = {
    formFieldValueMap,
    isPageLevelError,
    isLoading,
    register,
    sendVerificationCode,
    verifyCode,
    isRegistered,
    logout,
    isVerify,
    sendVerificationCodeSuccess,
    reSendVerificationCode,
  }

  return (
    <div>
      {isLoading && renderProgressBar()}
      <RegisterComponent registerProps={registerProps} />
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    initRegisterScreen: () => dispatch(init_register()),
    register: data => dispatch(register(data)),
    sendVerificationCode: data => dispatch(sendVerificationCode(data)),
    verifyCode: data => dispatch(verifyCode(data)),
    reSendVerificationCode: data => dispatch(reSendVerificationCode(data)),
    logout: () => console.log('Logout triggered'),
    init_register: () => dispatch(init_register()),
    init_verification: () => dispatch(init_verification()),
  }
}

const mapStateToProps = state => {
  return {
    formFieldValueMap: state.registerReducer.formFieldValueMap,
    isPageLevelError: state.registerReducer.isPageLevelError,
    isLoading: state.registerReducer.isLoading,
    isRegisterSuccess: state.registerReducer.isRegisterSuccess,
    isRegistered: state.registerReducer.isRegistered,
    isRegisterError: state.registerReducer.isRegisterError,
    error: state.registerReducer.error,
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
