import React, { useState } from 'react'
import { AutoComplete } from 'primereact/autocomplete'
import { Controller } from 'react-hook-form'
import { Message } from 'primereact/message'
import { classNames } from 'primereact/utils'

const MzAutoComplete = ({
  control,
  name,
  disabled,
  rules,
  labelClassName,
  label,
  onChange,
  errorMsg,
  placeholder,
  suggestions,
  optionLabel,
  optionValue,
  isError,
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  // eslint-disable-next-line
  const [val, setVal] = useState('')

  const getLabelClassName = () => {
    return classNames({
      'p-error': isError,
      labelClassName,
    })
  }

  const search = event => {
    const query = event.query
    let _filteredSuggestions = []

    if (!query.trim().length) {
      _filteredSuggestions = [...suggestions]
    } else {
      _filteredSuggestions = suggestions.filter(item =>
        item[optionLabel].toLowerCase().includes(query.toLowerCase())
      )
    }

    setFilteredSuggestions(_filteredSuggestions)
  }

  const handleInputChange = e => {
    if (!e.target.value) {
      setVal('')
      onChange && onChange(null)
    } else {
      onChange && onChange(e.value[optionValue])
    }
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
            <AutoComplete
              id={field.name}
              name={field.name}
              value={
                field.value
                  ? suggestions.find(
                      option => option[optionValue] === field.value
                    )
                  : null
              }
              suggestions={filteredSuggestions}
              placeholder={placeholder}
              completeMethod={search}
              field={optionLabel}
              onChange={e => {
                field.onChange(e.value ? e.value[optionValue] : null)
                handleInputChange(e)
              }}
              disabled={disabled}
              className={`text-600 ${
                !field.value && fieldState?.invalid ? 'p-invalid' : ''
              }`}
              style={{
                textAlign: 'center',
                width: '100%',
              }}
              dropdown
            />
          )}
        />
      </span>
      {errorMsg && (
        <Message
          className='mt-1 flex'
          style={{
            borderWidth: '0 0 0 1px',
          }}
          severity='error'
          content={errorMsg}
        />
      )}
    </div>
  )
}

export default MzAutoComplete
