import React, { useMemo } from "react";
import { WINGROW_LOGO } from "../../assets/images";
import { t } from "i18next";
import { useForm } from "react-hook-form";
import MzInput from "../../common/MzForm/MzInput";
import { FORM_FIELDS_NAME } from "./constant";
import { getBasicValidationRule } from "../../utils/form/from-util";
import MzDropDown from "../../common/MzForm/MzDropDown/WithFloatLabel";
import data  from "./data.json";
const LoginScreen = () => {
  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm({
    defaultValues: useMemo(() => {
      return {
        name: "",
        email: "",
        address: "",
      };
    }, []),
  });

//   const role=[
//     {
//       id:1,
//       name:"id"
//     },
//     {
//       id:2,
//       name:"ids"
//     }
//   ]

  const onSubmit = (data) => {
    console.log(data);
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };
  return (
    <div className="surface-0 p-8  w-full flex justify-content-center md:align-items-center">
      <div className="grid  md:border-1 border-green-500 w-full text-center ">
        <div className="col-12 md:col-6 flex justify-content-center mb-3">
          <img src={WINGROW_LOGO} className="winagro-logo" alt="winagro-logo" />
        </div>
        <div className="col-12 md:col-6 flex justify-content-center mb-3">
          <div>
            <img
              src={WINGROW_LOGO}
              className="winagro-logo"
              alt="winagro-logo"
            />
            <div className="font-bold md:text-xl mb-3">
              <span>{t("welcome_message")}</span>
            </div>
            <div className="font-bold md:text-lg">
              <span>{t("login_here")}</span>
            </div>
            <div className="py-3 gap-3">
              <form onSubmit={handleSubmit(onSubmit)}>
                <MzInput
                  name={FORM_FIELDS_NAME.MOBILE}
                  control={control}
                  label={"Mobile"}
                  rules={getBasicValidationRule().DEFAULT.VALIDATION_RULE}
                  isError={errors[FORM_FIELDS_NAME.MOBILE]}
                  errorMsg={getFormErrorMessage(FORM_FIELDS_NAME.MOBILE)}
                  wrapperClass={"p-float-label"}
                />
                <MzDropDown
                  name={FORM_FIELDS_NAME.ROLE}
                  control={control}
                  optionLabel={"name"}
                  optionValue={"name"}
                  options={data.role}
                  label={"Role"}
                  rules={getBasicValidationRule().DEFAULT.VALIDATION_RULE}
                  isError={errors[FORM_FIELDS_NAME.ROLE]}
                  errorMsg={getFormErrorMessage(FORM_FIELDS_NAME.ROLE)}
                  wrapperClass={"p-float-label"}
                  labelClassName={"ml-2"}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
