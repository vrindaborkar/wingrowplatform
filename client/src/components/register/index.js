import React, { useMemo, useState, useEffect } from "react";
import { WINGROW_SLIDE_THREE, WINGROW_LOGO } from "../../assets/images";
import { useForm } from "react-hook-form";
import { FORM_FIELDS_NAME } from "./constant";
import { Button } from "primereact/button";
import { MSG91_AUTH_KEY, TEMPLATE_ID_VERIFICATION } from "../../constant/msg91";
import MzInput from "../../common/MzForm/MzInput";
import MzPhoneInput from "../../common/MzForm/MzPhoneInput";
import MzDropDown from "../../common/MzForm/MzDropDown/WithFloatLabel";
import { useTranslation } from "react-i18next";
import data from "./data.json";
import MzOtpInput from "../../common/MzForm/MzOptInput";
import {useNavigate } from "react-router-dom";

const DUMMY_OTP = "1234"; 

const RegisterComponent = (props) => {
  const {
    formFieldValueMap,
    isPageLevelError,
    isRegisterSuccess,
    isLoading,
    register,
    sendVerificationCode,
    verifyCode,
    logout,
    sendVerificationCodeSuccess,
  } = props.registerProps;

  const {
    control,
    formState: { errors },
    handleSubmit,
    trigger,
    getValues,
    setError,
    watch,
  } = useForm({
    defaultValues: useMemo(
      () => ({
        [FORM_FIELDS_NAME.FIRST_NAME.name]: "",
        [FORM_FIELDS_NAME.LAST_NAME.name]: "",
        [FORM_FIELDS_NAME.PHONE_NUMBER.name]: "",
        [FORM_FIELDS_NAME.OTP.name]: "",
        [FORM_FIELDS_NAME.TYPE.name]: "",
        [FORM_FIELDS_NAME.PRODUCT.name]: "",
        [FORM_FIELDS_NAME.ADDRESS.name]: "",
      }),
      []
    ),
  });

  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const Navigate=useNavigate();

  const onSubmit = async (data) => {
    const userData = {
      firstName: getValues(FORM_FIELDS_NAME.FIRST_NAME.name),
      lastName: getValues(FORM_FIELDS_NAME.LAST_NAME.name),
      phone: getValues(FORM_FIELDS_NAME.PHONE_NUMBER.name),
      role: getValues(FORM_FIELDS_NAME.TYPE.name),
      farmertype: getValues(FORM_FIELDS_NAME.PRODUCT.name),
      address: getValues(FORM_FIELDS_NAME.ADDRESS.name),
    };

    const isOtpValid = await verifyCode(data.otp);

    if (isOtpValid) {
      setOtpSent(true);
      register(userData); 
      sessionStorage.setItem("userData", JSON.stringify(userData));
      
      setStep((prevStep) => Math.min(prevStep + 1, 1)); 
      Navigate("/login");
    } else {
      setError(FORM_FIELDS_NAME.OTP.name, {
        type: "manual",
        message: "Invalid OTP",
      });
    }
  };

  const handleNextStepOrSendOTP = async () => {
    const isStepValid = await trigger();
    if (isStepValid) {
      if (!otpSent) {
        const selectedType = getValues(FORM_FIELDS_NAME.TYPE.name);
        if (!selectedType) {
          console.error("Type is not selected or is undefined.");
          return;
        }

        const payload = {
          phone: `+${getValues(FORM_FIELDS_NAME.PHONE_NUMBER.name)}`,
          role: selectedType,
          firstName: getValues(FORM_FIELDS_NAME.FIRST_NAME.name),
          lastName: getValues(FORM_FIELDS_NAME.LAST_NAME.name),
        };
        register(payload);
        setOtpSent(true);
      } else {
        setStep((prevStep) => Math.min(prevStep + 1, 1));
      }
      handleFetchOtp();
    }
  };

  const handleFetchOtp = async () => {
    const isStepValid = await trigger([FORM_FIELDS_NAME.PHONE_NUMBER.name]);
    if (isStepValid) {
      const payload = {
        mobile: `+${getValues(FORM_FIELDS_NAME.PHONE_NUMBER.name)}`,
        template_id: TEMPLATE_ID_VERIFICATION,
        authkey: MSG91_AUTH_KEY,
      };
      sendVerificationCode(payload);
      setOtpSent(true);
    }
  };

  useEffect(() => {
    if (isRegisterSuccess && sendVerificationCodeSuccess) {
      setStep((prevStep) => Math.min(prevStep + 1, 1));
    }
  }, [isRegisterSuccess, sendVerificationCodeSuccess]);

  const handlePrevStep = () => {
    logout();
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  return (
    <div className="w-screen">
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
          <div className="flex flex-column align-items-center justify-content-center">
            <div
              style={{
                borderRadius: "56px",
                padding: "1rem",
                background:
                  "linear-gradient(90deg, rgba(224, 52, 54, 0.6) 30%, rgba(104, 214,118, 0.4) 70%)",
              }}
            >
              <div
                className="w-100 text-center surface-card py-5 px-5 sm:px-8 flex flex-column align-items-center"
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
                          optionValue={"name"}
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
                      {selectedType === "Farmer" && (
                        <div className="col-12">
                          <MzDropDown
                            name={FORM_FIELDS_NAME.PRODUCT.name}
                            control={control}
                            optionLabel={"name"}
                            optionValue={"value"}
                            options={data.product}
                            label={FORM_FIELDS_NAME.PRODUCT.label}
                            rules={FORM_FIELDS_NAME.PRODUCT.rules}
                            isError={errors[FORM_FIELDS_NAME.PRODUCT.name]}
                            errorMsg={getFormErrorMessage(
                              FORM_FIELDS_NAME.PRODUCT.name
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
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
