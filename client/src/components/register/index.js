import React, { useMemo, useState, useEffect } from "react";
import { WINGROW_SLIDE_THREE, WINGROW_LOGO } from "../../assets/images";
import { useForm } from "react-hook-form";
import { FORM_FIELDS_NAME } from "./constant";
import { Button } from "primereact/button";
import { MSG91_AUTH_KEY, TEMPLATE_ID_LOGIN } from "../../constant/msg91";
import MzInput from "../../common/MzForm/MzInput";
import MzPhoneInput from "../../common/MzForm/MzPhoneInput";
import MzDropDown from "../../common/MzForm/MzDropDown/WithFloatLabel";
import { useTranslation } from "react-i18next";
import data from "./data.json";
import MzOtpInput from "../../common/MzForm/MzOptInput";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { init_verification } from "../../redux/action/auth/smg91";
import { useDispatch } from 'react-redux';

const RegisterComponent = (props) => {
  const {
    isLoading,
    register,
    sendVerificationCode,
    verifyCode,
    isRegistered,
    reSendVerificationCode,
    isVerify,
  } = props.registerProps;

  const {
    control,
    formState: { errors },
    handleSubmit,
    trigger,
    getValues,
    setError,
  } = useForm({
    defaultValues: useMemo(
      () => ({
        [FORM_FIELDS_NAME.FIRST_NAME.name]: "",
        [FORM_FIELDS_NAME.LAST_NAME.name]: "",
        [FORM_FIELDS_NAME.PHONE_NUMBER.name]: "",
        [FORM_FIELDS_NAME.OTP.name]: "",
        [FORM_FIELDS_NAME.TYPE.name]: "",
        [FORM_FIELDS_NAME.PRODUCER.name]: "",
        [FORM_FIELDS_NAME.ADDRESS.name]: "",
      }),
      []
    ),
  });

  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [selectedType, setSelectedType] = useState(null);
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isVerify && isRegistered) {
      dispatch(init_verification());
      localStorage.removeItem("isVerify");
      toast.success("User Created Successfully");
      Navigate("/login");
    }
  }, [isVerify, Navigate, isRegistered]);

  const onSubmit = async (data) => {
    if (isRegistered) {
      const payload = {
        otp: data.otp,
        mobile: `+${getValues(FORM_FIELDS_NAME.PHONE_NUMBER.name)}`,
        authkey: MSG91_AUTH_KEY,
      };
      try {
        await verifyCode(payload);
      } catch (error) {
        console.error("Verification failed:", error);
      }
    }
  };

  const handleResendOtp = () => {
    if (isRegistered) {
      const payload = {
        mobile: `+${getValues(FORM_FIELDS_NAME.PHONE_NUMBER.name)}`,
        authkey: MSG91_AUTH_KEY,
        retrytype: "text",
      };
      reSendVerificationCode(payload);
      setOtpSent(true);
      setCountdown(30);
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(countdownInterval);
            setOtpSent(false);
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleNextStepOrSendOTP = async () => {
    const isStepValid = await trigger();

    if (isStepValid) {
      const selectedType = getValues(FORM_FIELDS_NAME.TYPE.name);
      const phone = `+${getValues(FORM_FIELDS_NAME.PHONE_NUMBER.name)}`;
      const firstName = getValues(FORM_FIELDS_NAME.FIRST_NAME.name);
      const lastName = getValues(FORM_FIELDS_NAME.LAST_NAME.name);
      const farmertype = getValues(FORM_FIELDS_NAME.PRODUCER.name);
      const address = getValues(FORM_FIELDS_NAME.ADDRESS.name);

      if (!selectedType) {
        console.error("Type is not selected or is undefined.");
        return;
      }

      const payload = {
        phone: phone,
        role: selectedType,
        firstname: firstName,
        lastname: lastName,
        farmertype: farmertype,
        address: address,
      };
      try {
        await register(payload);
      } catch (error) {
        console.error("Error during registration:", error);
      }
    }
  };

  const handleFetchOtp = async () => {
    const isStepValid = await trigger([FORM_FIELDS_NAME.PHONE_NUMBER.name]);
    if (isStepValid) {
      const phoneNumber = `+${getValues(FORM_FIELDS_NAME.PHONE_NUMBER.name)}`;
      const payload = {
        mobile: phoneNumber,
        template_id: TEMPLATE_ID_LOGIN,
        authkey: MSG91_AUTH_KEY,
      };
      try {
        await sendVerificationCode(payload);
        console.log("OTP sent successfully");
      } catch (error) {
        console.error("Error sending OTP:", error);
      }
    }
  };

  useEffect(() => {
    if (isRegistered) {
      const fetchOtp = async () => {
        try {
          await handleFetchOtp();
          setStep(1);
        } catch (error) {
          console.error("Error during OTP fetch:", error);
        }
      };

      fetchOtp();
    }
  }, [isRegistered]);

  const handlePrevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  return (
    <div className="grid grid-nogutter surface-0 text-800">
      <div className="col-12 md:col-6 overflow-hidden hidden md:block lg:block">
        <img
          src={WINGROW_SLIDE_THREE}
          alt="WINGROW_SLIDE_THREE"
          className="md:ml-auto block h-full w-full"
          style={{ clipPath: "polygon(0 0%, 100% 0%, 90% 100%, 0% 100%)" }}
        />
      </div>
      <div className="col-12 md:col-6 md:p-6 text-center flex align-items-center justify-content-center">
        <section>
          <div className="flex flex-column align-items-center justify-content-center">
            <div
              style={{
                borderRadius: "56px",
                padding: "1rem",
                margin: "1rem",
                background:
                  "linear-gradient(90deg, rgba(224, 52, 54, 0.6) 30%, rgba(104, 214,118, 0.4) 70%)",
              }}
            >
              <div
                className="w-full text-center surface-card py-5 px-5 sm:px-8 flex flex-column align-items-center"
                style={{
                  borderRadius: "53px",
                  height: "600px",
                  overflowY: "auto",
                  padding: "20px",
                  border: "1px solid #ccc",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src={WINGROW_LOGO}
                  alt="Wingrow logo"
                  className="mb-2 w-6rem flex-shrink-0"
                />

                <h1 className="text-900 font-bold text-xl md:text-1xl mb-2">
                  {t("welcome_message")}
                </h1>
                <div className="text-600 mb-2">Signup with us</div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="p-fluid w-full"
                >
                  {step === 0 && (
                    <div className="grid grid-nogutter">
                      <div className="col-12 mt-5">
                        <MzInput
                          name={FORM_FIELDS_NAME.FIRST_NAME.name}
                          control={control}
                          label={FORM_FIELDS_NAME.FIRST_NAME.label}
                          rules={FORM_FIELDS_NAME.FIRST_NAME.rules}
                          isError={errors[FORM_FIELDS_NAME.FIRST_NAME.name]}
                          errorMsg={getFormErrorMessage(
                            FORM_FIELDS_NAME.FIRST_NAME.name
                          )}
                          wrapperClass={"p-float-label"}
                        />
                      </div>
                      <div className="col-12">
                        <MzInput
                          name={FORM_FIELDS_NAME.LAST_NAME.name}
                          control={control}
                          label={FORM_FIELDS_NAME.LAST_NAME.label}
                          rules={FORM_FIELDS_NAME.LAST_NAME.rules}
                          isError={errors[FORM_FIELDS_NAME.LAST_NAME.name]}
                          errorMsg={getFormErrorMessage(
                            FORM_FIELDS_NAME.LAST_NAME.name
                          )}
                          wrapperClass={"p-float-label"}
                        />
                      </div>
                      <div className="col-12">
                        <div className="p-inputgroup flex justify-content-center align-items-center">
                          <div className="w-full">
                            <MzPhoneInput
                              control={control}
                              name={FORM_FIELDS_NAME.PHONE_NUMBER.name}
                              label={FORM_FIELDS_NAME.PHONE_NUMBER.label}
                              rules={FORM_FIELDS_NAME.PHONE_NUMBER.rules}
                              isError={
                                errors[FORM_FIELDS_NAME.PHONE_NUMBER.name]
                              }
                              errorMsg={getFormErrorMessage(
                                FORM_FIELDS_NAME.PHONE_NUMBER.name
                              )}
                              country="in"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <MzDropDown
                          name={FORM_FIELDS_NAME.TYPE.name}
                          control={control}
                          optionLabel={"name"}
                          optionValue={"value"}
                          options={data.type}
                          label={FORM_FIELDS_NAME.TYPE.label}
                          rules={FORM_FIELDS_NAME.TYPE.rules}
                          isError={errors[FORM_FIELDS_NAME.TYPE.name]}
                          errorMsg={getFormErrorMessage(
                            FORM_FIELDS_NAME.TYPE.name
                          )}
                          wrapperClass={"p-float-label"}
                          labelClassName={"ml-2"}
                          onChange={(e) => setSelectedType(e.value)}
                        />
                      </div>
                      {selectedType === "producer" && (
                        <div className="col-12">
                          <MzDropDown
                            name={FORM_FIELDS_NAME.PRODUCER.name}
                            control={control}
                            optionLabel={"name"}
                            optionValue={"value"}
                            options={data.producer}
                            label={FORM_FIELDS_NAME.PRODUCER.label}
                            rules={FORM_FIELDS_NAME.PRODUCER.rules}
                            isError={errors[FORM_FIELDS_NAME.PRODUCER.name]}
                            errorMsg={getFormErrorMessage(
                              FORM_FIELDS_NAME.PRODUCER.name
                            )}
                            wrapperClass={"p-float-label"}
                          />
                        </div>
                      )}
                      <div className="col-12">
                        <MzInput
                          name={FORM_FIELDS_NAME.ADDRESS.name}
                          control={control}
                          label={FORM_FIELDS_NAME.ADDRESS.label}
                          rules={FORM_FIELDS_NAME.ADDRESS.rules}
                          isError={errors[FORM_FIELDS_NAME.ADDRESS.name]}
                          errorMsg={getFormErrorMessage(
                            FORM_FIELDS_NAME.ADDRESS.name
                          )}
                          wrapperClass={"p-float-label"}
                        />
                      </div>
                      <div className="col-12">
                        <Button
                          label="Next"
                          type="button"
                          onClick={handleNextStepOrSendOTP}
                          className="mt-3 border-round-sm"
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <>
                      <MzOtpInput
                        control={control}
                        name={FORM_FIELDS_NAME.OTP.name}
                        label={FORM_FIELDS_NAME.OTP.label}
                        placeholder={FORM_FIELDS_NAME.OTP.placeholder}
                        type={FORM_FIELDS_NAME.OTP.type}
                        isError={errors[FORM_FIELDS_NAME.OTP.name]}
                        errorMsg={getFormErrorMessage(
                          FORM_FIELDS_NAME.OTP.name
                        )}
                        length={4}
                        rules={FORM_FIELDS_NAME.OTP.rules}
                        integerOnly={true}
                        wrapperClass={"p-float-label"}
                      />
                      <Button
                        label={
                          otpSent ? `Resend OTP in ${countdown}s` : "Resend OTP"
                        }
                        className="border-none text-black bg-transparent outline-none hover:underline"
                        onClick={handleResendOtp}
                        disabled={otpSent}
                      />
                      <div className="flex justify-content-between gap-2 w-full">
                        <div className="mb-3 w-full">
                          <Button
                            label="Back"
                            className="mt-3 border-round-sm"
                            onClick={handlePrevStep}
                            severity="danger"
                          />
                        </div>
                        <div className="mb-3 w-full">
                          <Button
                            label="Submit"
                            type="submit"
                            className="mt-3 border-round-sm"
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
  );
};

export default RegisterComponent;
