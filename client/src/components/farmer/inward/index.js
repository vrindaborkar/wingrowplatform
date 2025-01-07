import React, { useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FORM_FIELDS_NAME } from './constant'
import MzInput from '../../../common/MzForm/MzInput'
import { Button } from 'primereact/button'
import { Link, useNavigate, useParams } from 'react-router-dom'
import MzAutoComplete from '../../../common/MzForm/MzAutoComplete'

import { WINGROW_LOGO } from '../../../assets/images'
import { useTranslation } from 'react-i18next'
import { ROUTE_PATH } from '../../../constant/urlConstant'
import axios from 'axios'
import { Calendar } from 'primereact/calendar'
import { baseUrl } from '../../../services/PostAPI'
import moment from 'moment'

const AddInwardComponent = props => {
  const {
    createInwardRecord,
    formFieldValueMap,
    isLoading,
    isCreateInwardSuccess,
    isEditInwardSuccess,
    isInwardDetailSuccess,
    isEdit,
    handleFetchInwardRecord,
    commodity,
    initInward,
  } = props.addInwardProps

  const {
    control,
    formState: { errors },
    watch,
    handleSubmit,
    reset,
    getValues,
  } = useForm({
    defaultValues: useMemo(() => {
      return formFieldValueMap
    }, [formFieldValueMap]),
    mode: 'onChange',
    reValidateMode: 'onChange',
  })
  const history = useNavigate()

  const { t } = useTranslation()
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [marketData, setMarkets] = useState([])
  const { id } = useParams()
  const handleClick = () => {
    setIsFormSubmitted(true)
  }

  const getDisabledDays = marketDay => {
    const allDays = [0, 1, 2, 3, 4, 5, 6]
    const marketDayIndex = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ].indexOf(marketDay)

    if (marketDayIndex === -1) {
      return allDays
    }
    const disabled = allDays.filter(day => day !== marketDayIndex)
    return disabled
  }
  const [marketDay, setMarketDay] = useState('')
  useEffect(() => {
    const selectedMarketName = watch(FORM_FIELDS_NAME.MARKET.name)
    const getMarketDay = marketData.find(
      item => item?.name === selectedMarketName ?? ''
    )?.marketDay
    setMarketDay(getMarketDay)
    // eslint-disable-next-line
  }, [watch(FORM_FIELDS_NAME.MARKET.name)])

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/markets`)
        setMarkets(response?.data?.markets)
      } catch (error) {
        console.error(error)
      }
    }

    fetchMarketData()
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    if (isCreateInwardSuccess || isEditInwardSuccess) {
      setTimeout(() => {
        const currentValues = getValues()
        const marketValue = currentValues.market
        const dateValue = currentValues.date
        reset({
          market: marketValue,
          date: dateValue,
        })
        initInward()
      }, 2000)
    }
    // eslint-disable-next-line
  }, [isCreateInwardSuccess, isEditInwardSuccess])
  useEffect(() => {
    if (isFormSubmitted && (isCreateInwardSuccess || isEditInwardSuccess)) {
      setTimeout(() => {
        reset()
        initInward()
        history(ROUTE_PATH.FARMER.HOME)
      }, 2000)
    }
    // eslint-disable-next-line
  }, [isCreateInwardSuccess, isEditInwardSuccess])

  useEffect(() => {
    if (isInwardDetailSuccess) {
      reset({
        ...formFieldValueMap,
      })
    }
    // eslint-disable-next-line
  }, [isInwardDetailSuccess])

  useEffect(() => {
    if (isEdit && id) {
      handleFetchInwardRecord(id)
      reset({
        ...formFieldValueMap,
      })
    } else {
      reset()
    }
    // eslint-disable-next-line
  }, [isEdit, id])

  const getFormErrorMessage = name => {
    return (
      errors[name] && <small className='p-error'>{errors[name].message}</small>
    )
  }

  const onSubmit = data => {
    const payload = {
      date: data?.date ? moment(data.date).format('DD/MM/YYYY') : null,
      market: data?.market,
      commodity: data?.commodity,
      purchase_quantity: data?.purchaseQuantity,
      purchase_rate: data?.purchaseRate,
    }
    createInwardRecord(payload)
  }

  return (
    <div className='w-full'>
      <div className='p-2 md:px-6 md:py-8 w-full  text-center md:flex align-items-cente justify-content-center relative'>
        <Link
          to='/farmer'
          className='text-d-none absolute'
          style={{ left: '5%' }}>
          <Button
            className='common-btn p-button-rounded flex justify-content-start'
            icon='pi pi-angle-left mr-2'>
            {t('back')}
          </Button>
        </Link>
        <div className='flex mt-7 md:mt-0 w-full flex-column align-items-center justify-content-center '>
          <div
            style={{
              borderRadius: '56px',
              padding: '1rem',
              background:
                'linear-gradient(90deg, rgba(224, 52, 54, 0.6) 30%, rgba(104, 214,118, 0.4) 70%)',
            }}>
            <div
              className='w-full text-center surface-card py-6 px-5 flex flex-column align-items-center'
              style={{ borderRadius: '53px' }}>
              <img
                src={WINGROW_LOGO}
                alt='Wingrow logo'
                className='mb-2 w-5rem flex-shrink-0'
              />
              <h1 className='text-900 font-bold text-xl md:text-3xl mb-2'>
                {/* {t("welcome_message")} */}
                {t('wingrow_farmers_market')}
              </h1>
              <div className='text-600 mb-2'>{t('inward_data')}</div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='mt-5 p-fluid w-full'>
                <div className=''>
                  <MzAutoComplete
                    control={control}
                    name={FORM_FIELDS_NAME.MARKET.name}
                    label={t(FORM_FIELDS_NAME.MARKET.label)}
                    optionLabel={FORM_FIELDS_NAME.MARKET.optionLabel}
                    optionValue={FORM_FIELDS_NAME.MARKET.optionValue}
                    placeholder={t(FORM_FIELDS_NAME.MARKET.placeholder)}
                    rules={FORM_FIELDS_NAME.MARKET.rules}
                    isError={!!errors[FORM_FIELDS_NAME.MARKET.name]}
                    errorMsg={getFormErrorMessage(FORM_FIELDS_NAME.MARKET.name)}
                    suggestions={marketData ?? []}
                    dropdown
                  />
                </div>
                <div className='mb-2'>
                  <div htmlFor='date' style={{ textAlign: 'start' }}>
                    {t('select_date')}
                    <span className='required'>*</span>
                  </div>
                  <Controller
                    disabled={!watch(FORM_FIELDS_NAME.MARKET.name)}
                    name={FORM_FIELDS_NAME.B_DATE.name}
                    control={control}
                    rules={FORM_FIELDS_NAME.B_DATE.rules}
                    render={({ field }) => (
                      <Calendar
                        {...field}
                        id='date'
                        placeholder={t(FORM_FIELDS_NAME.B_DATE.placeholder)}
                        disabledDays={getDisabledDays(marketDay)}
                        maxDate={new Date()}
                        showIcon={true}
                        showButtonBar={false}
                        className='w-full'
                        isError={errors[FORM_FIELDS_NAME.B_DATE.name]}
                      />
                    )}
                  />
                </div>
                <div className=''>
                  <MzAutoComplete
                    control={control}
                    name={FORM_FIELDS_NAME.COMMODITY.name}
                    label={t(FORM_FIELDS_NAME.COMMODITY.label)}
                    optionLabel={FORM_FIELDS_NAME.COMMODITY.optionLabel}
                    optionValue={FORM_FIELDS_NAME.COMMODITY.optionValue}
                    placeholder={t(FORM_FIELDS_NAME.COMMODITY.placeholder)}
                    rules={FORM_FIELDS_NAME.COMMODITY.rules}
                    isError={!!errors[FORM_FIELDS_NAME.COMMODITY.name]}
                    errorMsg={getFormErrorMessage(
                      FORM_FIELDS_NAME.COMMODITY.name
                    )}
                    suggestions={commodity ?? []}
                    dropdown
                  />
                </div>

                <div className=''>
                  <MzInput
                    control={control}
                    name={FORM_FIELDS_NAME.PURCHASE_QUANTITY.name}
                    label={t(FORM_FIELDS_NAME.PURCHASE_QUANTITY.label)}
                    type={FORM_FIELDS_NAME.PURCHASE_QUANTITY.type}
                    placeholder={t(
                      FORM_FIELDS_NAME.PURCHASE_QUANTITY.placeholder
                    )}
                    rules={FORM_FIELDS_NAME.PURCHASE_QUANTITY.rules}
                    isError={!!errors[FORM_FIELDS_NAME.PURCHASE_QUANTITY.name]}
                    errorMsg={getFormErrorMessage(
                      FORM_FIELDS_NAME.PURCHASE_QUANTITY.name
                    )}
                  />
                </div>

                <div className=''>
                  <MzInput
                    control={control}
                    name={t(FORM_FIELDS_NAME.PURCHASE_RATE.name)}
                    label={t(FORM_FIELDS_NAME.PURCHASE_RATE.label)}
                    type={FORM_FIELDS_NAME.PURCHASE_RATE.type}
                    placeholder={t(FORM_FIELDS_NAME.PURCHASE_RATE.placeholder)}
                    rules={FORM_FIELDS_NAME.PURCHASE_RATE.rules}
                    isError={!!errors[FORM_FIELDS_NAME.PURCHASE_RATE.name]}
                    errorMsg={getFormErrorMessage(
                      t(FORM_FIELDS_NAME.PURCHASE_RATE.name)
                    )}
                  />
                </div>

                <div className='flex justify-content-between gap-2 w-full'>
                  <div className='mb-3 w-full'>
                    <Button label={t('add')} className='common-btn mt-3 border-round-sm' />
                  </div>
                  <div className='mb-3 w-full'>
                    <Button
                      onClick={handleClick}
                      disabled={isLoading}
                      label={t('submit')}
                      type='submit'
                      className='common-btn mt-3 border-round-sm'
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddInwardComponent
