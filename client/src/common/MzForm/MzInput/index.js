import React from 'react'
import { Controller } from 'react-hook-form'
import { classNames } from 'primereact/utils'
import { InputText } from 'primereact/inputtext'
import { Message } from 'primereact/message'

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
      'p-error': isError,
      labelClassName,
    })
  }

  return (
    <div className='field' style={{ textAlign: 'start' }}>
      <label htmlFor={name} className={getLabelClassName()}>
        {label}
        {rules?.required ? <span className='p-error'>*</span> : null}
      </label>
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
                'p-invalid': fieldState.invalid,
              })}
              style={inputStyle ? JSON.parse(inputStyle) : { width: '100%' }}
            />
          )}
        />
      </span>
      {errorMsg && (
        <Message
          className='mt-1 flex'
          style={{
            borderWidth: '0 0 0 2px',
          }}
          severity='error'
          content={errorMsg}
        />
      )}
    </div>
  )
}

export default MzInput
