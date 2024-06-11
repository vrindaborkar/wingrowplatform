import React from "react";
import { Controller } from "react-hook-form";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";

const MzInput = ({
  control,
  name,
  disabled,
  type,
  rules,
  labelClassName,
  label,
  onChange,
  errorMsg,
  isError,
  wrapperClass,
  placeholder,
  inputStyle,
}) => {
  const getLabelClassName = () => {
    return classNames({
      "p-error": isError,
      labelClassName,
    });
  };


  

  return (
    <div className="field">
      <span className={wrapperClass}>
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field, fieldState }) => (
            <InputText
              type={type}
              id={field.name}
              name={field.name}
              onChange={onChange}
              disabled={disabled}
              
              placeholder={placeholder}
              {...field}
              className={classNames({
                "p-invalid": fieldState.invalid,
              })}
              style={inputStyle ? JSON.parse(inputStyle) : { width: "100%" }}
            />
          )}
        />
        <label htmlFor={name} className={getLabelClassName()}>
          {label}
          {rules?.required ? <span className="p-error">*</span> : null}
        </label>
      </span>
      {errorMsg}
    </div>
  );
};

MzInput.defaultProps = {
  labelClassName: "",
  wrapperClass: "",
  disabled: false,
  inputStyle: "",
  type: "text",
};

export default MzInput;
