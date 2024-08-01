import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const RegisterComponent = (props) => {
  const {
    formFieldValueMap,
    isPageLevelError,
    isRegisterSuccess,
    isLoading,
    register,
    sendVerificationCode,
    verifyCode,
    isLoggedIn,
    logout,
    sendVerificationCodeSuccess,
  } = props.registerProps;

  const { control, formState: { errors, }, handleSubmit, getValues, trigger, setError } = useForm({
    defaultValues: useMemo(() => ({
      type: "",
      mobile: "",
      otp: "",
    }), []),
  });

  const { t } = useTranslation();
  const [step, setStep] = useState(0);

  return <div>RegisterComponent</div>;
};

export default RegisterComponent;
