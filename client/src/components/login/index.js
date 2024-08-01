import React, { useEffect, useMemo, useState } from "react";
import { WINGROW_LOGO, WINGROW_SLIDE_THREE } from "../../assets/images";
import { useForm } from "react-hook-form";
import { FORM_FIELDS_NAME } from "./constant";
import { Button } from "primereact/button";
import { MSG91_AUTH_KEY, TEMPLATE_ID_LOGIN } from "../../constant/msg91";
import MzAutoComplete from "../../common/MzForm/MzAutoComplete";
import MzPhoneInput from "../../common/MzForm/MzPhoneInput";
import { useTranslation } from "react-i18next";
import MzOptInput from "../../common/MzForm/MzOptInput";

const LoginComponent = (props) => {
  const {
    login,
    sendVerificationCode,
    verifyCode,
    isLoggedIn,
    sendVerificationCodeSuccess,
    logout,
  } = props.loginProps;

  const { control, formState: { errors, }, handleSubmit, getValues, trigger, setError } = useForm({
    defaultValues: useMemo(() => ({
      type: "",
      mobile: "",
      otp: "",
    }), []),
  });

  const { t } = useTranslation();
  const [step, setStep] = useState(0);



  const onSubmit = (data) => {
    console.log(data);
    if (isLoggedIn && sendVerificationCodeSuccess) {
      const payload = {
        otp: data.otp,
        mobile: `+${getValues(FORM_FIELDS_NAME.PHONE_NUMBER.name)}`,
        authkey: MSG91_AUTH_KEY,
      };
      verifyCode(payload);
    }
  };

  const handleNextStep = async () => {
    const isStepValid = await trigger();
    if (isStepValid) {
      const payload = {
        phone: `+${getValues(FORM_FIELDS_NAME.PHONE_NUMBER.name)}`,
        role: getValues(FORM_FIELDS_NAME.ROLE.name),
      };
      login(payload);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      const payload = {
        mobile: `+${getValues(FORM_FIELDS_NAME.PHONE_NUMBER.name)}`,
        template_id: TEMPLATE_ID_LOGIN,
        authkey: MSG91_AUTH_KEY,
      };
      sendVerificationCode(payload);
      setStep((prevStep) => Math.min(prevStep + 1, 1));
    }
  }, [isLoggedIn]);

  const handlePrevStep = () => {
    logout()
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  return (
    <div className="grid grid-nogutter surface-0  text-800" style={{height:"90Vh"}}>
      <div className="col-12 md:col-6 overflow-hidden hidden lg:block">
        <img
          src={WINGROW_SLIDE_THREE}
          alt="WINGROW_SLIDE_THREE"
          className="md:ml-auto block h-full w-full"
          style={{ clipPath: "polygon(0 0%, 100% 0%, 90% 100%, 0% 100%)" }}
        />
      </div>
      <div className="col-12 md:col-6 md:p-6 text-center flex align-items-center justify-content-center">
        <section>
          <div className="flex flex-column align-items-center justify-content-center p-2">
            <div
              style={{
                borderRadius: "56px",
                padding: "1rem",
                background:
                  "linear-gradient(90deg, rgba(224, 52, 54, 0.6) 30%, rgba(104, 214,118, 0.4) 70%)",
              }}
            >
              <div
                className="w-full text-center surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center"
                style={{ borderRadius: "53px" }}
              >
                <img
                  src={WINGROW_LOGO}
                  alt="Wingrow logo"
                  className="mb-2 w-6rem flex-shrink-0"
                />
                <h1 className="text-900 font-bold text-xl md:text-3xl mb-2">
                  {t("welcome_message")}
                </h1>
                <div className="text-600 mb-2">Login here</div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-5 p-fluid w-full"
                >
                  {step === 0 && (
                    <div>
                      <div>
                        <MzAutoComplete
                          control={control}
                          name={FORM_FIELDS_NAME.ROLE.name}
                          label={FORM_FIELDS_NAME.ROLE.label}
                          optionLabel={FORM_FIELDS_NAME.ROLE.optionLabel}
                          optionValue={FORM_FIELDS_NAME.ROLE.optionValue}
                          placeholder={FORM_FIELDS_NAME.ROLE.placeholder}
                          rules={FORM_FIELDS_NAME.ROLE.rules}
                          isError={!!errors[FORM_FIELDS_NAME.ROLE.name]}
                          errorMsg={getFormErrorMessage(
                            FORM_FIELDS_NAME.ROLE.name
                          )}
                          suggestions={FORM_FIELDS_NAME.ROLE.options}
                          dropdown
                        />
                      </div>
                      <MzPhoneInput
                        control={control}
                        name={FORM_FIELDS_NAME.PHONE_NUMBER.name}
                        label={FORM_FIELDS_NAME.PHONE_NUMBER.label}
                        placeholder={FORM_FIELDS_NAME.PHONE_NUMBER.placeholder}
                        rules={FORM_FIELDS_NAME.PHONE_NUMBER.rules}
                        isError={errors[FORM_FIELDS_NAME.PHONE_NUMBER.name]}
                        errorMsg={getFormErrorMessage(
                          FORM_FIELDS_NAME.PHONE_NUMBER.name
                        )}
                        country="in"
                      />
                      <Button
                        label="fetch"
                        onClick={handleNextStep}
                        className="mt-3 border-round-sm"
                      />
                    </div>
                  )}
                  {step === 1 && (
                    <>
                      <MzOptInput
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
                            label="submit"
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

export default LoginComponent;
