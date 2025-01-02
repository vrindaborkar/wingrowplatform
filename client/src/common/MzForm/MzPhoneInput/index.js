import React from 'react'
import { Controller } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'
import { classNames } from 'primereact/utils'
import { Message } from 'primereact/message'
import 'react-phone-input-2/lib/style.css'

const MzPhoneInput = ({
  control,
  name,
  rules,
  labelClassName,
  isError,
  errorMsg,
  country,
  label,
}) => {
  const getLabelClassName = () => {
    return classNames({
      'p-error': isError,
      labelClassName,
    })
  }

  return (
    <div className='field' style={{ textAlign: 'left' }}>
      <label htmlFor={name} className={getLabelClassName()}>
        {label}
        {rules?.required ? <span className='p-error'>*</span> : null}
      </label>
      <span className=''>
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field, fieldState }) => (
            <>
              <PhoneInput
                country={country}
                value={field.value}
                onChange={value => field.onChange(value)}
                inputProps={{
                  name: field.name,
                  required: rules?.required ? true : false,
                }}
                inputStyle={{
                  width: '100%',
                  height: '42px',
                  borderRadius: '0px',
                }}
                countryCodeEditable={false}
                className={classNames('w-full', {
                  'p-invalid': fieldState.invalid,
                })}
              />
            </>
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

MzPhoneInput.defaultProps = {
  labelClassName: '',
  wrapperClass: '',
  country: 'us',
  containerStyle: {},
  inputStyle: {},
}

export default MzPhoneInput
