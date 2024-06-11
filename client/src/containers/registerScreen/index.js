import React, { useMemo } from "react";
import { WINGROW_LOGO } from "../../assets/images";
import { t } from "i18next";
import { useForm } from "react-hook-form";
import MzInput from "../../common/MzForm/MzInput";
import { FORM_FIELDS_NAME } from "./constant";
import { getBasicValidationRule } from "../../utils/form/from-util";
import MzDropDown from "../../common/MzForm/MzDropDown/WithFloatLabel";
import data from "./data.json";
import { Button } from "primereact/button";

const RegisterScreen = () => {
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
              <span>{t("register_here")}</span>
            </div>
            <div className="py-3 gap-3">
              <form onSubmit={handleSubmit(onSubmit)}>
                <MzInput
                  name={FORM_FIELDS_NAME.MOBILE}
                  control={control}
                  label={"First Name"}
                  rules={getBasicValidationRule().DEFAULT.VALIDATION_RULE}
                  isError={errors[FORM_FIELDS_NAME.MOBILE]}
                  errorMsg={getFormErrorMessage(FORM_FIELDS_NAME.MOBILE)}
                  wrapperClass={"p-float-label"}
                />
                <MzInput
                  name={FORM_FIELDS_NAME.MOBILE}
                  control={control}
                  label={"Last Name"}
                  rules={getBasicValidationRule().DEFAULT.VALIDATION_RULE}
                  isError={errors[FORM_FIELDS_NAME.MOBILE]}
                  errorMsg={getFormErrorMessage(FORM_FIELDS_NAME.MOBILE)}
                  wrapperClass={"p-float-label"}
                />
                <div className="flex justify-content-end gap-2">
                <div className="w-full"> 
                <MzInput
                    name={FORM_FIELDS_NAME.MOBILE}
                    control={control}
                    label={"Mobile Number"}
                    rules={getBasicValidationRule().DEFAULT.VALIDATION_RULE}
                    isError={errors[FORM_FIELDS_NAME.MOBILE]}
                    errorMsg={getFormErrorMessage(FORM_FIELDS_NAME.MOBILE)}
                    wrapperClass={"p-float-label"}
                   
                  />
                </div>
                  <div>
                  <Button label="Success" severity="success" rounded  className="p-button-rounded"/>
                  
                  </div>
                </div>

                <div className="flex justify-content-end gap-2">
                <div className="w-full"> 
                  <MzInput
                    name={FORM_FIELDS_NAME.MOBILE}
                    control={control}
                    label={"Enter Otp"}
                    rules={getBasicValidationRule().DEFAULT.VALIDATION_RULE}
                    isError={errors[FORM_FIELDS_NAME.MOBILE]}
                    errorMsg={getFormErrorMessage(FORM_FIELDS_NAME.MOBILE)}
                    wrapperClass={"p-float-label"}
                  />
                  </div>
                  <div>
                  <Button label="Success" severity="success" rounded />
                  </div>
                </div>
                <MzDropDown
                  name={FORM_FIELDS_NAME.ROLE}
                  control={control}
                  optionLabel={"name"}
                  optionValue={"name"}
                  options={data.type}
                  label={"Type"}
                  rules={getBasicValidationRule().DEFAULT.VALIDATION_RULE}
                  isError={errors[FORM_FIELDS_NAME.ROLE]}
                  errorMsg={getFormErrorMessage(FORM_FIELDS_NAME.ROLE)}
                  wrapperClass={"p-float-label"}
                  labelClassName={"ml-2"}
                />
                <MzInput
                  name={FORM_FIELDS_NAME.MOBILE}
                  control={control}
                  label={"Address"}
                  rules={getBasicValidationRule().DEFAULT.VALIDATION_RULE}
                  isError={errors[FORM_FIELDS_NAME.MOBILE]}
                  errorMsg={getFormErrorMessage(FORM_FIELDS_NAME.MOBILE)}
                  wrapperClass={"p-float-label"}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
