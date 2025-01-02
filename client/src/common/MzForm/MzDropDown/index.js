import React from 'react'
import { Controller } from 'react-hook-form'
import { Dropdown } from 'primereact/dropdown'
import { classNames } from 'primereact/utils'

const DropDown = props => {
  const {
    control,
    name,
    shouldFilter,
    filterBy,
    options,
    optionLabel,
    optionValue,
    rules,
    onChange,
    disabled,
    placeholder,
    inputStyle,
  } = props

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <Dropdown
          disabled={disabled}
          style={inputStyle ? JSON.parse(inputStyle) : { width: '100%' }}
          placeholder={placeholder}
          filter={shouldFilter}
          filterBy={filterBy || optionLabel}
          id={field.name}
          value={field.value}
          options={options}
          optionLabel={optionLabel}
          editable={true}
          optionValue={optionValue}
          onChange={e => {
            if (onChange) {
              onChange(e)
            }
            field.onChange(e)
          }}
          className={classNames({
            'p-invalid': fieldState.invalid,
          })}
        />
      )}
    />
  )
}
DropDown.defaultProps = {
  optionLabel: 'label',
  optionValue: 'value',
  shouldFilter: false,
  inputStyle: '',
}

export default DropDown
