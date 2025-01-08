import React, { useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FORM_FIELDS_NAME } from './constant'
import { Button } from 'primereact/button'
import MzAutoComplete from '../../../common/MzForm/MzAutoComplete'
import './style.css'
import { Chart } from 'primereact/chart'
import { Link } from 'react-router-dom'
import { Calendar } from 'primereact/calendar'
import 'primereact/resources/themes/saga-green/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import axios from 'axios'
import { baseUrl } from '../../../services/PostAPI'
import { API_PATH } from '../../../constant/urlConstant'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

const InOutData = props => {
  const { outwardList, inwardList, isloading } = props.InOutwardProps

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  })
  const [filteredOutwardList, setFilteredOutwardList] = useState([])
  const [filteredInwardList, setFilteredInwardList] = useState([])
  const [marketData, setMarkets] = useState([])
  const [inoutData, setinoutData] = useState('')

  const { t } = useTranslation()
  const data = {
    labels: [
      t('monday'),
      t('tuesday'),
      t('wednesday'),
      t('thursday'),
      t('friday'),
      t('saturday'),
      t('sunday'),
    ],
    datasets: [
      {
        label: t('market_sales'),
        data: [500, 700, 800, 600, 900, 1200, 950],
        backgroundColor: '#66BB6A',
        borderColor: '#66BB6A',
        borderWidth: 1,
      },
    ],
  }
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}${API_PATH.MARKET.FETCH_LIST}`
        )
        setMarkets(response?.data?.markets)
      } catch (error) {
        console.error(error)
      }
    }

    fetchMarketData()
  }, [])
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
      item => item.name === selectedMarketName ?? ''
    )?.marketDay
    setMarketDay(getMarketDay)
    // eslint-disable-next-line
  }, [watch(FORM_FIELDS_NAME.MARKET.name)])

  const onSubmit = async data => {
    const token = localStorage.getItem('token')
    const userId = JSON.parse(localStorage.getItem('user'))?.id ?? null

    if (!userId || !data.market || !data.date) {
      console.error('Missing required fields: userId, market, or date')
      return
    }

    const params = {
      userId: userId,
      name: data.market,
      date: data?.date ? moment(data.date).format('YYYY/MM/DD') : null,
    }

    try {
      const response = await axios.get(`${baseUrl}/inward-outward`, {
        headers: {
          'x-access-token': token,
        },
        params,
      })
      setinoutData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    if (filteredOutwardList?.selectedMarket && filteredOutwardList?.dateValue) {
      const filtered = outwardList?.filter(
        item =>
          item.market === filteredOutwardList.selectedMarket &&
          item.time === filteredOutwardList.dateValue
      )
      setFilteredOutwardList(filtered)
    }
    // eslint-disable-next-line
  }, [filteredOutwardList])

  useEffect(() => {
    if (filteredInwardList?.selectedMarket && filteredInwardList?.dateValue) {
      const filteredInward = inwardList.filter(
        item =>
          item.market === filteredInwardList.selectedMarket &&
          item.time === filteredInwardList.dateValue
      )
      setFilteredInwardList(filteredInward)
    }
    // eslint-disable-next-line
  }, [filteredInwardList])
  const getFormErrorMessage = name => {
    return (
      errors[name] && <small className='p-error'>{errors[name].message}</small>
    )
  }

  return (
    <div className='w-full'>
      <div className='p-2 md:px-3 md:py-6 w-full  text-center md:flex align-items-center justify-content-center relative'>
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
      </div>
      <div className='data-container'>
        <form onSubmit={handleSubmit(onSubmit)} className='data-form'>
          <div className='flex row justify-content-between align-items-center'>
            <div className='market-dropdown-section col-6'>
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
            <div className='calendar-section col-6' id='calender'>
              <div className=''>
                <label htmlFor='date'>
                  {t('select_date')}
                  <span className='required'>*</span>
                </label>
                <Controller
                  disabled={!watch(FORM_FIELDS_NAME.MARKET.name)}
                  name={FORM_FIELDS_NAME.B_DATE.name}
                  control={control}
                  rules={FORM_FIELDS_NAME.B_DATE.rules}
                  render={({ field }) => (
                    <Calendar
                      {...field}
                      id='date'
                      name={FORM_FIELDS_NAME.B_DATE.name}
                      placeholder={t(FORM_FIELDS_NAME.B_DATE.placeholder)}
                      disabledDays={getDisabledDays(marketDay)}
                      maxDate={new Date()}
                      showIcon={true}
                      showButtonBar={false}
                      className='w-full'
                      dateFormat='dd/mm/yy'
                      isError={!!errors[FORM_FIELDS_NAME.B_DATE.name]}
                      errorMsg={getFormErrorMessage(
                        FORM_FIELDS_NAME.B_DATE.name
                      )}
                    />
                  )}
                />
              </div>
            </div>
            <div className='flex justify-content-end '>
              <Button
                type='submit'
                label={t('search')}
                className='common-btn border-2 border-round-md md:w-6rem mr-2'
                disabled={isloading}
              />
            </div>
          </div>
        </form>
        <h5>{t('inward_data')}</h5>
        <hr />
        <div className='grid mt-3 mb-3'>
          {inoutData?.inward?.length > 0 ? (
            inoutData?.inward.map((inward, index) => (
              <div key={index} className='col-12 md:col-6 lg:col-3'>
                <div className='h-full test'>
                  <div className='img-cover'></div>
                  <div className='overlay'></div>
                  <div className='content font-bold shadow-1 p-3 border-1 border-50 border-round h-full hover:shadow-8'>
                    <div className='flex justify-content-between mb-2'>
                      <div>
                        <span className='text-900 mb-3'>{inward.name}</span>
                        <div className='text-900 font-medium text-xl text-white'>
                          {inward.market}
                        </div>
                      </div>
                    </div>
                    <div className='text-red-900'>
                      {t('purchase_rate')}: {inward.purchase_rate}
                    </div>
                    <div className='text-red-900'>
                      {t('purchase_quantity')}: {inward.purchase_quantity}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='col-12 text-center'>
              <p>{t('no_inward_data_available')}</p>
            </div>
          )}
        </div>

        <h5>{t('outward_data')}</h5>
        <hr />
        <div className='grid mt-3 mb-3'>
          {inoutData?.outward?.length > 0 ? (
            inoutData?.outward.map((outward, index) => (
              <div key={index} className='col-12 md:col-6 lg:col-3'>
                <div className='h-full test'>
                  <div className='img-cover'></div>
                  <div className='overlay'></div>
                  <div className='content font-bold shadow-1 p-3 border-1 border-50 border-round h-full hover:shadow-8'>
                    <div className='text-red-900'>{outward.name}</div>
                    <span>{outward.market}</span>
                    <br />
                    <span className='text-black'>
                      Sales Rate: {outward.sales_rate}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='col-12 text-center'>
              <p>{t('no_inward_data_available')}</p>
            </div>
          )}
        </div>
        <h5>{t('cummulative_sales_data')}</h5>
        <hr />
        <div className='grid mt-3 mb-3'>
          <div className='col-12 md:col-6 lg:col-3'>
            <div className='h-full test'>
              <div className='img-cover'></div>
              <div className='overlay'></div>
              <div className='content font-bold shadow-1 p-3 border-1 border-50 border-round h-full hover:shadow-8'>
                <div className='text-white text-center'>
                  {t('Total Purchase Quantity')}:
                </div>
                <div className='text-red-900 text-center text-4xl'>0</div>
              </div>
            </div>
          </div>
          <div className='col-12 md:col-6 lg:col-3'>
            <div className='h-full test'>
              <div className='img-cover'></div>
              <div className='overlay'></div>
              <div className='content font-bold shadow-1 p-3 border-1 border-50 border-round h-full hover:shadow-8'>
                <div className='text-white text-center'>
                  {t('Total Remaining Sales')}:
                </div>
                <div className='text-red-900 text-center text-4xl'>0</div>
              </div>
            </div>
          </div>
          <div className='col-12 md:col-6 lg:col-3'>
            <div className='h-full test'>
              <div className='img-cover'></div>
              <div className='overlay'></div>
              <div className='content font-bold shadow-1 p-3 border-1 border-50 border-round h-full hover:shadow-8'>
                <div className='text-white text-center'>
                  {t('Total Sales')}:
                </div>
                <div className='text-red-900 text-center text-4xl'>0</div>
              </div>
            </div>
          </div>
        </div>
        <h5>{t('day_wise_market')}</h5>
        <hr />
        <div className='mb-4'>
          <Chart type='bar' data={data} />
        </div>
      </div>
    </div>
  )
}

export default InOutData
