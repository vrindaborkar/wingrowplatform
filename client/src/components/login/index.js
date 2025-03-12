import React, { useEffect, useMemo, useState } from 'react'
import { WINGROW_LOGO, WINGROW_SLIDE_THREE } from '../../assets/images'
import { useForm } from 'react-hook-form'
import { FORM_FIELDS_NAME } from './constant'
import { Button } from 'primereact/button'
import MzAutoComplete from '../../common/MzForm/MzAutoComplete'
import MzPhoneInput from '../../common/MzForm/MzPhoneInput'
import { useTranslation } from 'react-i18next'
import MzOptInput from '../../common/MzForm/MzOptInput'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
// require('dotenv/config')
const LoginComponent = props => {
  const {
    login,
    sendVerificationCode,
    verifyCode,
    isLoggedIn,
    logout,
    isVerify,
    reSendVerificationCode,
    isLoading,
  } = props.loginProps

  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    trigger,
  } = useForm({
    defaultValues: useMemo(
      () => ({
        type: '',
        phone: '',
        otp: '',
      }),
      []
    ),
  })
  const TEMPLATE_ID_LOGIN = process.env.REACT_APP_TEMPLATE_ID_LOGIN;
  const MSG91_AUTH_KEY = process.env.REACT_APP_MSG91_AUTH_KEY;
  const { t } = useTranslation()
  const [step, setStep] = useState(0)
  const Navigate = useNavigate()
  const [, setOTPSent] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    if (!isLoggedIn) {
      setStep(0)
    }
  }, [isLoggedIn])

  // useEffect(() => {
  //   if (isVerify && isLoggedIn) {
  //     const redirectPath = localStorage.getItem('redirectAfterLogin')
  //     if (redirectPath) {
  //       Navigate(redirectPath)
  //       localStorage.removeItem('redirectAfterLogin')
  //     } else {
  //       Navigate('/')
  //     }
  //     toast.success('Login Successfully')
  //     window.location.reload()
  //   }
  // }, [isVerify, Navigate, isLoggedIn])


  useEffect(() => {
    console.log("🔹 Checking Login & Verification Status:", { isVerify, isLoggedIn }) // Debug Log
  
    if (isVerify && isLoggedIn) {
      const redirectPath = localStorage.getItem('redirectAfterLogin')
      
      if (redirectPath) {
        console.log("✅ Redirecting to:", redirectPath) // Debug Log
        Navigate(redirectPath)
        localStorage.removeItem('redirectAfterLogin')
      } else {
        console.log("✅ Redirecting to home page.") // Debug Log
        Navigate('/')
      }
  
      toast.success('Login Successfully')
      window.location.reload()
    }
  }, [isVerify, isLoggedIn, Navigate])  // ✅ Add 'Navigate' here
  
  

  // const onSubmit = async data => {
  //   if (isLoggedIn) {
  //     const payload = {
  //       otp: data.otp,
  //       phone: `+${getValues(FORM_FIELDS_NAME.PHONE_NUMBER.name)}`,
  //       authkey: MSG91_AUTH_KEY,
  //     }
  //     try {
  //       await verifyCode(payload)
  //     } catch (error) {
  //       console.error('Verification failed:', error)
  //     }
  //   }
  // }
  const onSubmit = async (data) => {
    if (isLoggedIn) {
      // ✅ Ensure phone number is formatted correctly
      let phoneNumber = String(getValues(FORM_FIELDS_NAME.PHONE_NUMBER.name)).trim();
      phoneNumber = phoneNumber.startsWith("+91") ? phoneNumber : `+91${phoneNumber.replace(/\D/g, "")}`;
  
      const payload = {
        otp: String(data.otp).trim(), // ✅ Ensure OTP is string and trimmed
        phone: phoneNumber, // ✅ Corrected phone number formatting
        authkey: MSG91_AUTH_KEY,
      };
  
      console.log("📩 Sending OTP verification payload:", payload); // Debugging log
  
      try {
        const response = await verifyCode(payload);
        console.log("✅ OTP Verification Response:", response);
  
        if (response?.type?.toLowerCase() === "success") {
          toast.success("✅ OTP Verified Successfully!");
        } else {
          toast.error("❌ Invalid OTP. Please try again.");
        }
      } catch (error) {
        console.error("❌ Verification failed:", error);
  
        // ✅ Handle API error safely
        const errorMessage = error?.response?.data?.message || "Verification failed. Please check OTP.";
        toast.error(`❌ ${errorMessage}`);
      }
    }
  };
  
  
  
  

  const handleResendOtp = () => {
    if (isLoggedIn) {
      const payload = {
        phone: `+${getValues(FORM_FIELDS_NAME.PHONE_NUMBER.name)}`,
        authkey: MSG91_AUTH_KEY,
        retrytype: 'text',
      }
      reSendVerificationCode(payload)
      setOTPSent(true)
      setCountdown(30)
      const countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev === 1) {
            clearInterval(countdownInterval)
            setOtpSent(false)
          }
          return prev - 1
        })
      }, 1000)
    }
  }

  // const handleNextStep = async () => {
  //   const isStepValid = await trigger()
  //   if (isStepValid) {
  //     const payload = {
  //       phone: `+${getValues(FORM_FIELDS_NAME.PHONE_NUMBER.name)}`,
  //       role: getValues(FORM_FIELDS_NAME.ROLE.name),
  //     }
  //     try {
  //       await login(payload)
  //     } catch (error) {
  //       console.error('Login failed:', error)
  //     }
  //   }
  // }

  const handleNextStep = async () => {
    const isStepValid = await trigger();
  
    if (isStepValid) {
      let phoneNumber = getValues(FORM_FIELDS_NAME.PHONE_NUMBER.name);
      phoneNumber = phoneNumber.startsWith("+91") ? phoneNumber : `+91${phoneNumber.replace(/\D/g, "")}`;
  
      console.log("Phone number being sent to backend:", phoneNumber);
  
      const payload = {
        phone: phoneNumber,
        role: getValues(FORM_FIELDS_NAME.ROLE.name),
      };
  
      try {
        await login(payload);
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
  };
  

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     const otpPayload = {
  //       phone: `+${getValues(FORM_FIELDS_NAME.PHONE_NUMBER.name)}`,
  //       template_id: TEMPLATE_ID_LOGIN,
  //       authkey: MSG91_AUTH_KEY,
  //     }
  //     sendVerificationCode(otpPayload)
  //     setOTPSent(true)
  //     setStep(1)
  //   }
  //   // eslint-disable-next-line
  // }, [isLoggedIn, step, sendVerificationCode, setOTPSent])

  // useEffect(() => {
  //   if (isLoggedIn && !otpSent) {  // ✅ Add !otpSent to prevent duplicate requests
  //     const otpPayload = {
  //       phone: `+${getValues(FORM_FIELDS_NAME.PHONE_NUMBER.name)}`,
  //       template_id: TEMPLATE_ID_LOGIN,
  //       authkey: MSG91_AUTH_KEY,
  //     };
  //     sendVerificationCode(otpPayload);
  //     setOtpSent(true); // ✅ Ensure OTP is only sent once
  //     setStep(1);
  //   }
  // }, [isLoggedIn, otpSent, getValues, TEMPLATE_ID_LOGIN, MSG91_AUTH_KEY, sendVerificationCode]) ;  // ✅ Removed 'step' from dependencies
  
  useEffect(() => {
    let otpRequestTimeout;
    
    if (isLoggedIn && !otpSent) {
      otpRequestTimeout = setTimeout(() => {
        const otpPayload = {
          phone: `+${getValues(FORM_FIELDS_NAME.PHONE_NUMBER.name)}`,
          template_id: TEMPLATE_ID_LOGIN,
          authkey: MSG91_AUTH_KEY,
        };
        sendVerificationCode(otpPayload);
        setOtpSent(true);
        setStep(1);
      }, 500);  // Adding a delay to prevent multiple OTP requests
    }
  
    return () => clearTimeout(otpRequestTimeout);
  }, [isLoggedIn, otpSent, getValues, TEMPLATE_ID_LOGIN, MSG91_AUTH_KEY, sendVerificationCode]);
  

  const handlePrevStep = () => {
    logout()
    setStep(0)
  }

  const getFormErrorMessage = name => {
    return (
      errors[name] && <small className='p-error'>{t(errors[name].message)}</small>
    )
  }
  return (
    <div className='grid grid-nogutter surface-0 text-800'>
      <div className='col-12 md:col-6 overflow-hidden hidden md:block lg:block'>
        <img
          src={WINGROW_SLIDE_THREE}
          alt='WINGROW_SLIDE_THREE'
          className='md:ml-auto block h-full w-full'
          style={{
            clipPath: 'polygon(0 0%, 100% 0%, 90% 100%, 0% 100%)',
          }}
        />
      </div>
      <div className='col-12 md:col-6 md:p-2 text-center flex align-items-center justify-content-center'>
        <section>
          <div className='flex flex-column align-items-center justify-content-center p-2'>
            <div
              style={{
                borderRadius: '56px',
                padding: '1rem',
                background:
                  'linear-gradient(90deg, rgba(224, 52, 54, 0.6) 30%, rgba(104, 214,118, 0.4) 70%)',
              }}>
              <div
                className='w-full text-center surface-card py-4 px-5 sm:px-8 flex flex-column align-items-center'
                style={{ borderRadius: '53px' }}>
                <img
                  src={WINGROW_LOGO}
                  alt='Wingrow logo'
                  className='mb-2 w-6rem flex-shrink-0'
                />
                <h1 className='text-900 font-bold text-xl md:text-1xl mb-2'>
                  {t('welcome_message')}
                </h1>
                <div className='text-600 mb-2'>{t('login_here')}</div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className='mt-5 p-fluid w-full'>
                  {step === 0 && (
                    <div>
                      <div>
                        <MzAutoComplete
                          control={control}
                          name={FORM_FIELDS_NAME.ROLE.name}
                          // label={FORM_FIELDS_NAME.ROLE.label}
                          label={t(FORM_FIELDS_NAME.ROLE.label)}
                          optionLabel={FORM_FIELDS_NAME.ROLE.optionLabel}
                          optionValue={FORM_FIELDS_NAME.ROLE.optionValue}
                          placeholder={t(FORM_FIELDS_NAME.ROLE.placeholder)}
                          rules={FORM_FIELDS_NAME.ROLE.rules}
                          isError={!!errors[FORM_FIELDS_NAME.ROLE.name]}
                          errorMsg={getFormErrorMessage(
                            FORM_FIELDS_NAME.ROLE.name
                          )}
                          suggestions={FORM_FIELDS_NAME.ROLE.options}
                          dropdown
                          className='common-btn'
                        />
                      </div>
                      <MzPhoneInput
                        control={control}
                        name={FORM_FIELDS_NAME.PHONE_NUMBER.name}
                        label={t(FORM_FIELDS_NAME.PHONE_NUMBER.label)}
                        placeholder={t(FORM_FIELDS_NAME.PHONE_NUMBER.placeholder)}
                        rules={FORM_FIELDS_NAME.PHONE_NUMBER.rules}
                        isError={errors[FORM_FIELDS_NAME.PHONE_NUMBER.name]}
                        errorMsg={getFormErrorMessage(
                          FORM_FIELDS_NAME.PHONE_NUMBER.name
                        )}
                        country='in'
                      />
                      <Button

                        label={t('signin.Fetch')}
                        disabled={isLoading}
                        onClick={e => {
                          e.preventDefault()
                          handleNextStep()
                        }}
                        className='common-btn mt-3 border-round-sm'
                      />
                      <div className='mt-3'>
                        <p>{t('newToWingrow')} <Link to="/register" className="text-decoration-underline text-red-500">
                          {t('signupWithUs')}
                        </Link></p>
                      </div>
                    </div>
                  )}
                  {step === 1 && (
                    <>
                      <MzOptInput
                        control={control}
                        name={FORM_FIELDS_NAME.OTP.name}
                        label={t(FORM_FIELDS_NAME.OTP.label)}
                        placeholder={FORM_FIELDS_NAME.OTP.placeholder}
                        type={FORM_FIELDS_NAME.OTP.type}
                        isError={errors[FORM_FIELDS_NAME.OTP.name]}
                        errorMsg={getFormErrorMessage(
                          FORM_FIELDS_NAME.OTP.name
                        )}
                        length={4}
                        rules={FORM_FIELDS_NAME.OTP.rules}
                        integerOnly={true}
                        wrapperClass={'p-float-label'}
                      />
                      <Button
                        label={
                          otpSent ? `Resend OTP in ${countdown}s` : t('OTPFORM.resendOtp')
                        }

                        className='border-none text-black bg-transparent outline-none hover:underline'
                        onClick={handleResendOtp}
                        disabled={otpSent}
                      />
                      <div className='flex justify-content-between gap-2 w-full'>
                        <div className='mb-3 w-full'>
                          <Button
                            label={t('OTPFORM.back')}
                            className='mt-3 border-round-sm'
                            onClick={handlePrevStep}
                            severity='danger'
                          />
                        </div>
                        <div className='mb-3 w-full'>
                          <Button
                            disabled={isLoading}
                            label={t('OTPFORM.submit')}
                            type='submit'
                            className='common-btn mt-3 border-round-sm'
                          />
                        </div>
                      </div>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default LoginComponent
