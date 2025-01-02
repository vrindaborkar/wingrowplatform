import React from 'react'
import { Controller } from 'react-hook-form'
import { classNames } from 'primereact/utils'
import { InputTextarea } from 'primereact/inputtextarea'
import { Message } from 'primereact/message'

const MzTextarea = ({
  control,
  name,
  disabled,
  rules,
  labelClassName,
  label,
  onChange,
  errorMsg,
  isError,
  wrapperClass,
  placeholder,
  inputStyle,
  rows,
  cols,
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
            <InputTextarea
              id={field.name}
              name={field.name}
              onChange={e => {
                field.onChange(e)
                onChange && onChange(e.target.value)
              }}
              disabled={disabled}
              placeholder={placeholder}
              value={field.value}
              rows={rows}
              cols={cols}
              className={classNames('p-inputtext w-full', {
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

export default MzTextarea
