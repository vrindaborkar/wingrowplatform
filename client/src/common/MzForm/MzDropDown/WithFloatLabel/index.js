import React from 'react'
import DropDown from '../index'
import { classNames } from 'primereact/utils'
import { PropTypes } from 'prop-types'

const MzDropDown = props => {
  const {
    control,
    name,
    shouldFilter,
    filter,
    options,
    optionLabel,
    optionValue,
    rules,
    onChange,
    disabled,
    placeholder,
    inputStyle,
    labelClassName,
    label,
    errorMsg,
    isError,
    id,
    wrapperClass,
  } = props

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
        <DropDown
          id={id}
          name={name}
          control={control}
          shouldFilter={shouldFilter}
          disabled={disabled}
          filter={filter}
          optionLabel={optionLabel}
          optionValue={optionValue}
          options={options}
          onChange={onChange}
          rules={rules}
          inputStyle={inputStyle}
          placeholder={placeholder}
        />
      </span>
      {errorMsg}
    </div>
  )
}

MzDropDown.defaultProps = {
  labelClassName: '',
  wrapperClass: '',
  inputStyle: '',
  filter: false,
  optionLabel: 'label',
  optionValue: 'value',
}

MzDropDown.protoTypes = {
  labelClassName: PropTypes.string,
  filter: PropTypes.bool,
  optionLabel: PropTypes.string,
}

export default MzDropDown
