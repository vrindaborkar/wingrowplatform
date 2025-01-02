import React from 'react'
import { Controller } from 'react-hook-form'
import { Calendar } from 'primereact/calendar'
import { classNames } from 'primereact/utils'
import { Message } from 'primereact/message'

const DATE_TIME_MASK = '99/99/9999 99:99'
const DATE_MASK = '99/99/9999'

const MzCalendar = props => {
  const {
    name,
    control,
    rules,
    label,
    wrapperClass,
    isError,
    showTime,
    showSeconds,
    timeOnly,
    hideOnDateTimeSelect,
    hourFormat,
    onDateChange,
    dateFormat,
    errorMsg,
    minDate,
    disabledDays,
  } = props

  const getLabelClassName = () => {
    return classNames({
      'p-error': isError,
    })
  }

  return (
    <div className='field' style={{ textAlign: 'start' }}>
      <label htmlFor={name} className={getLabelClassName()}>
        {label}
        {rules?.required ? <span className='p-error'>*</span> : null}
      </label>
      <div className={wrapperClass}>
        <Controller
          name={name}
          rules={rules}
          control={control}
          render={({ field }) => {
            return (
              <Calendar
                {...field}
                minDate={minDate}
                disabledDays={disabledDays}
                timeOnly={timeOnly}
                hideOnDateTimeSelect={hideOnDateTimeSelect}
                showTime={showTime}
                showSeconds={showSeconds}
                id={field.name}
                value={field.value}
                onChange={e => {
                  if (onDateChange) {
                    onDateChange(e)
                  }
                  if (e.value !== null) {
                    field.onChange(e.value)
                  }
                }}
                dateFormat={dateFormat}
                mask={showTime ? DATE_TIME_MASK : DATE_MASK}
                showIcon={true}
                hourFormat={hourFormat}
              />
            )
          }}
        />
      </div>
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

export default MzCalendar
