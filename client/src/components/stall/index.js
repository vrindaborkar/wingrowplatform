import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FORM_FIELDS_NAME } from './constant'
import { Tooltip } from 'primereact/tooltip'
import { Button } from 'primereact/button'
import { Checkbox } from 'primereact/checkbox'
import 'primeflex/primeflex.css'
import { baseUrl } from '../../services/PostAPI'
import { API_PATH, ROUTE_PATH } from '../../constant/urlConstant'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { marketImageMap } from './preview'
import './stall.css'
import axios from 'axios'
import { selectedStall } from '../../redux/action/stall'
import { Calendar } from 'primereact/calendar'
import { ProgressSpinner } from 'primereact/progressspinner'
import 'primereact/resources/themes/saga-green/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

import {
  ANTIQUE_STALL,
  DRY_FRUITS_STALL,
  FLOWER_STALL,
  FRUITS_STALL,
  GENERAL_STALL,
  KOBI_STALL,
  LEAFY_STALL,
  MUKHVAS_STALL,
  ONION_STALL,
  SANACK_STALL,
  SPICE_STALL,
  TARKARI_STALL,
} from '../../assets/images'
import { Dropdown } from 'primereact/dropdown'
import scheduleData from '../market/data.json'
import PaymentScreen from '../../containers/paymentScreen'
import { Toast } from 'primereact/toast'
import { Dialog } from 'primereact/dialog'
import { useDispatch, useSelector } from 'react-redux'

const StallComponent = props => {
  const location = useLocation()
  const currentPath = location.pathname
  const { fetchStallList, formFieldValueMap } = props.stallProps
  // const isLoggedIn = localStorage.getItem('isLoggedIn');
  const isVerify = useSelector(state => state.msg91Reducer.isVerify)
  const navigate = useNavigate()

  const { t } = useTranslation()

  const marketOptions = JSON.parse(localStorage.getItem('marketOptions')) || []
  const [isDisabled, setIsDisabled] = useState(false)

  let stallIndex = 0

  const savedMarket = marketOptions.length
    ? localStorage.getItem('selectedMarket') || marketOptions[0].value
    : ''

  useEffect(() => {
    if (savedMarket) {
      setSelectedMarket(savedMarket)
    }
  }, [savedMarket])
  const prevPath = localStorage.getItem('setprevpath')
  useEffect(() => {
    const prevPath = localStorage.getItem('setprevpath')

    if (prevPath === '/market') {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [])

  const [isChecked, setIsChecked] = useState(false)
  const [showTermsPopup, setShowTermsPopup] = useState(false)
  const [showPreviewPopup, setPreview] = useState(false)
  const [selectedStallsMap, setSelectedStallsMap] = useState({})
  const [stallDataMap, setStallDataMap] = useState(new Map())

  const [totalPrice, setTotalPrice] = useState(0)
  const [dates, setDates] = useState({})

  const [stallPositions, setStallPositions] = useState(
    scheduleData.marketStallPositions.Default
  )
  const [roadPosition, setRoadPosition] = useState(
    scheduleData.roadPositions.Default
  )

  const [selectedMarket, setSelectedMarket] = useState(savedMarket)
  const [stallList, setStallList] = useState([])

  const [marketDay, setMarketDay] = useState(
    marketOptions.marketDay || 'Saturday'
  )

  const [selectedStallsData, setSelectedStallsData] = useState({})

  const [showPaymentScreen, setShowPaymentScreen] = useState(false)
  const [bookStalls, setbookStalls] = useState([])
  const userString = localStorage.getItem('user')
  const user = userString ? JSON.parse(userString) : null
  const [showDetails, setShowDetails] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [modalStalls, setModalStalls] = useState([])

  const { marketStallPositions, roadPositions } = scheduleData || {}
  const sessionSelectedMarketDate = []

  const [loading, setLoading] = useState(false)

  const dat = new Date()
  const toast = useRef(null)
  const dispatch = useDispatch()
  localStorage.getItem('setprevpath', currentPath)

  const selectedStallItems = sessionStorage.getItem('selectedStalls')
  const sessionSelsctedStalls = selectedStallItems
    ? JSON.parse(selectedStallItems)
    : {}

  const selectedStallsRedux = useSelector(state => {
    return state.stallReducer.selectedStalls
  })

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: useMemo(() => formFieldValueMap, [formFieldValueMap]),
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  const getFormErrorMessage = name => {
    return (
      errors[name] && <small className='p-error'>{errors[name].message}</small>
    )
  }

  if (selectedStallsRedux && selectedStallsRedux[selectedMarket]) {
    const stalls = selectedStallsRedux[selectedMarket]
    const dateKey = Object.keys(stalls)[0]

    const dateValue = stalls[dateKey]

    if (Array.isArray(dateValue) && dateValue.length > 0) {
      const dates = dateValue.map(stall => stall.date)

      const firstDateString = dates[0]
      const formattedDateString = moment(firstDateString, 'YYYY/MM/DD').format(
        'YYYY/MM/DD'
      )

      const firstDate = moment(formattedDateString, 'YYYY/MM/DD').toDate()

      if (!isNaN(firstDate.getTime())) {
        sessionSelectedMarketDate.push(firstDate)
      } else {
        console.error('Invalid date:', formattedDateString)
      }
    } else {
      console.error('No valid stalls found for the date:', dateKey)
    }
  }
  useEffect(() => {
    if (selectedStallsRedux?.length === 0) {
      const savedStalls = JSON.parse(sessionStorage.getItem('selectedStalls'))
      if (savedStalls) {
        dispatch({ type: 'SELECT_STALL', payload: savedStalls })
      }
    }
  }, [selectedStallsRedux, dispatch])

  const onSubmit = data => {
    if (selectedStallsRedux?.length === 0) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Please select at least one stall before proceeding.',
        life: 3000,
      })
      return
    }
    navigate('/payment-success', {
      state: {
        totalPrice,
        selectedStallsMap,
        selectedMarket,
        date: dates[selectedMarket],
      },
    })
  }

  const handleStallClick = (row, col, data) => {
    if (!dates[selectedMarket]) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Please select a date first.',
        life: 3000,
      })
      return
    }

    const stallId = `${row}-${col}`
    const stall = stallDataMap.get(stallId)

    if (!stall) {
      return
    }

    if (!stall.available) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'This stall is not available.',
        life: 3000,
      })
      return
    }

    const currentDate = dates[selectedMarket].toLocaleDateString()

    const newSelectedStalls = { ...selectedStallsMap }

    if (!newSelectedStalls[selectedMarket]) {
      newSelectedStalls[selectedMarket] = {}
    }

    if (!newSelectedStalls[selectedMarket][currentDate]) {
      newSelectedStalls[selectedMarket][currentDate] = []
    }

    let dateStalls = newSelectedStalls[selectedMarket][currentDate]
    const isStallSelected = dateStalls.includes(stallId)

    if (isStallSelected) {
      dateStalls = dateStalls.filter(s => s !== stallId)
      setTotalPrice(prevPrice => prevPrice - stall.stallPrice)
    } else {
      if (dateStalls.length >= 3) {
        const removedStallId = dateStalls.shift()
        const removedStall = stallDataMap.get(removedStallId)
        setTotalPrice(
          prevPrice => prevPrice - (removedStall ? removedStall.stallPrice : 0)
        )
      }
      dateStalls.push(stallId)
      setTotalPrice(prevPrice => prevPrice + stall.stallPrice)
    }

    newSelectedStalls[selectedMarket][currentDate] = dateStalls

    if (dateStalls.length === 0) {
      delete newSelectedStalls[selectedMarket][currentDate]
      if (Object.keys(newSelectedStalls[selectedMarket]).length === 0) {
        delete newSelectedStalls[selectedMarket]
      }
    }

    setSelectedStallsMap(newSelectedStalls)

    const groupedStall = Object.keys(newSelectedStalls)
      .map(marketName => {
        const marketStalls = newSelectedStalls[marketName]

        return Object.keys(marketStalls)
          .map(date => {
            const dateStalls = marketStalls[date]?.map(stallId => {
              const stall = stallDataMap?.get(stallId)
              return {
                stallId: stallId,
                id: stall ? stall.id : '',
                stallNo: stall ? stall.stallNo : 'No Stall No',
                name: stall ? stall.stallName : 'No Stall',
                price: stall ? stall.stallPrice : 0,
                date: date || 'Not selected',
              }
            })

            return dateStalls.length > 0
              ? {
                  market_name: marketName,
                  date: date || 'Not selected',
                  stalls: dateStalls,
                  bookedBy: user ? user.id : null,
                }
              : null
          })
          .filter(Boolean)
      })
      .flat()

    const existingStalls = [...bookStalls]

    const updatedStalls = existingStalls.map(marketStall => {
      if (
        marketStall.market_name === selectedMarket &&
        marketStall.date === currentDate
      ) {
        return {
          ...marketStall,
          stalls:
            groupedStall.filter(
              stall =>
                stall.market_name === selectedMarket &&
                stall.date === currentDate
            )[0]?.stalls || [],
        }
      }
      return marketStall
    })

    const isExisting = updatedStalls.some(
      stall =>
        stall.market_name === selectedMarket && stall.date === currentDate
    )

    if (!isExisting) {
      updatedStalls.push({
        market_name: selectedMarket,
        date: currentDate,
        stalls:
          groupedStall.filter(
            stall =>
              stall.market_name === selectedMarket && stall.date === currentDate
          )[0]?.stalls || [],
        bookedBy: user ? user.id : null,
      })
    }

    const finalUpdatedStalls = updatedStalls.map(marketStall => {
      if (marketStall.stalls && marketStall.stalls.length > 0) {
        const totalPrice = marketStall.stalls.reduce(
          (total, stall) => total + (stall.price || 0),
          0
        )
        return { ...marketStall, totalPrice }
      } else {
        return { ...marketStall, totalPrice: 0 }
      }
    })

    setbookStalls(finalUpdatedStalls)
    dispatch(selectedStall(finalUpdatedStalls))

    setSelectedStallsData(prevData => ({
      ...prevData,
      [stallId]: stall,
    }))
  }

  function calculateTotalPrices(data) {
    let totalPrices = {}
    let overallTotal = 0

    ;(Array.isArray(data) ? data : []).forEach(marketData => {
      const marketName = marketData.market_name
      const stalls = marketData.stalls || []
      totalPrices[marketName] = 0
      const marketTotal = stalls.reduce(
        (sum, stall) => sum + (stall.price || 0),
        0
      )
      totalPrices[marketName] = marketTotal
      overallTotal += marketTotal
    })

    totalPrices['TotalAmount'] = overallTotal
    return totalPrices.TotalAmount
  }

  const totalAmount = calculateTotalPrices(bookStalls)

  const getStallClass = (row, col) => {
    const stallId = `${row}-${col}`
    const marketStalls =
      sessionSelsctedStalls[selectedMarket]?.[
        dates[selectedMarket]?.toLocaleDateString()
      ] || []
    const isSelectedInSession = marketStalls.some(stall => stall.id === stallId)

    if (isSelectedInSession) {
      return 'selected'
    }

    const marketStallsFromMap =
      selectedStallsMap[selectedMarket]?.[
        dates[selectedMarket]?.toLocaleDateString()
      ] || []

    if (marketStallsFromMap.includes(stallId)) {
      return 'selected'
    }

    return stallDataMap.has(stallId) ? 'available' : 'unknown'
  }

  useEffect(() => {
    const activePositions = []
    stallPositions.forEach((row, rowIndex) =>
      row.forEach((isStall, colIndex) => {
        if (isStall.value) {
          activePositions.push({ row: rowIndex, col: colIndex })
        }
      })
    )

    const newStallDataMap = new Map(
      activePositions.map((position, index) => [
        `${position.row}-${position.col}`,
        stallList[index],
      ])
    )

    setStallDataMap(newStallDataMap)
  }, [stallPositions, stallList])

  useEffect(() => {
    if (selectedMarket) {
      const positions =
        marketStallPositions[selectedMarket] || marketStallPositions.Default
      setStallPositions(positions)

      const roadPosition =
        roadPositions[selectedMarket] || roadPositions.Default
      setRoadPosition(roadPosition)

      fetchStallList(selectedMarket)

      localStorage.setItem('selectedMarket', selectedMarket)
      localStorage.setItem('roadPosition', roadPosition)
      const selectedMarketObj = marketOptions.find(
        m => m.value === selectedMarket
      )

      setMarketDay(selectedMarketObj ? selectedMarketObj.marketDay : 'Sunday')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMarket, marketStallPositions, roadPositions, fetchStallList])

  useEffect(() => {
    setDates(prevDates => ({
      ...prevDates,
      [selectedMarket]: prevDates[selectedMarket] || null,
    }))
  }, [selectedMarket])

  useEffect(() => {
    localStorage.setItem(
      'selectedStallsMap',
      JSON.stringify(selectedStallsRedux)
    )
  }, [selectedStallsRedux])

  useEffect(() => {
    const savedStalls = localStorage.getItem('selectedStallsMap')
    if (savedStalls) {
      setSelectedStallsMap(JSON.parse(savedStalls))
    }
  }, [])

  const stallImageMap = {
    Masale: SPICE_STALL,
    Antic: ANTIQUE_STALL,
    Fruits: FRUITS_STALL,
    'Flower-Kobi': KOBI_STALL,
    Tarkari: TARKARI_STALL,
    'Onion-Potato': ONION_STALL,
    Exotic: ANTIQUE_STALL,
    Leafy: LEAFY_STALL,
    Snacks: SANACK_STALL,
    Flowers: FLOWER_STALL,
    Dryfruits: DRY_FRUITS_STALL,
    Mukhvas: MUKHVAS_STALL,
    Default: GENERAL_STALL || null,
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
  const handleMarket = async e => {
    const marketName = e.value
    setSelectedMarket(marketName)
    setLoading(true)

    const selectedMarketObj = marketOptions.find(m => m.value === marketName)

    if (selectedMarketObj) {
      const disabled = getDisabledDays(selectedMarketObj.marketDay)
      setMarketDay(disabled)

      const positions =
        marketStallPositions[marketName] || marketStallPositions.Default
      setStallPositions(positions)

      const roadPosition = roadPositions[marketName] || roadPositions.Default

      setDates(prevDates => ({
        ...prevDates,
        [marketName]: prevDates[marketName] || null,
      }))

      setRoadPosition(roadPosition)

      setMarketDay(selectedMarketObj.marketDay || 'Sunday')

      setSelectedStallsMap(prevSelectedStallsMap => ({
        ...prevSelectedStallsMap,
        [marketName]: prevSelectedStallsMap[marketName] || {},
      }))

      navigate(`${ROUTE_PATH.BOOKING.STALL.replace(':id', marketName)}`)
    }
  }

  useEffect(() => {
    const fetchStalls = async () => {
      setLoading(true)

      try {
        const formattedDate = moment(dates[selectedMarket]).format('YYYY/MM/DD')
        if (formattedDate) {
          const response = await axios.get(
            `${baseUrl}${API_PATH.STALL.FETCH}?name=${selectedMarket}&date=${formattedDate}`
          )
          if (response.data && response.data.stalls) {
            const sortedStalls = [...response.data.stalls].sort(
              (a, b) => a.stallNo - b.stallNo
            )
            setStallList(sortedStalls)
          }
        } else {
          setStallList([])
        }
      } catch (error) {
        setStallList([])
      } finally {
        setLoading(false)
      }
    }

    fetchStalls()
    // eslint-disable-next-line
  }, [selectedMarket, dates[selectedMarket]])

  useEffect(() => {
    if (selectedMarket) {
      handleMarket({ value: selectedMarket })
    }
    // eslint-disable-next-line
  }, [selectedMarket])

  const handlePaymentClick = () => {
    if (isVerify) {
      setShowPaymentScreen(true)
    } else {
      navigate('/login')
      localStorage.setItem('redirectAfterLogin', currentPath)
    }
  }

  const handlePreview = event => {
    event.preventDefault()
    setPreview(true)
  }
  const handlePayClick = () => {
    setShowTermsPopup(true)
  }

  const handleConfirmBooking = () => {
    handlePaymentClick()
  }

  const handleShowClick = e => {
    e.preventDefault()

    const groupedStalls = Object.keys(selectedStallsMap)
      .map(marketName => {
        const marketStalls = selectedStallsMap[marketName]

        return Object.keys(marketStalls)
          .map(date => {
            const dateStalls = marketStalls[date].map(stallId => {
              const stall = selectedStallsData[stallId]
              return {
                id: stall._id,
                stallNo: stall ? stall.stallNo : 'No Stall No',
                name: stall ? stall.stallName : 'No Stall',
                price: stall ? stall.stallPrice : 0,
                date: date || 'Not selected',
              }
            })

            return dateStalls.length > 0
              ? {
                  market_name: marketName,
                  date: date || 'Not selected',
                  stalls: dateStalls,
                }
              : null
          })
          .filter(Boolean)
      })
      .flat()

    if (Object.keys(selectedStallsRedux).length === 0) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Please select at least one stall before showing details.',
        life: 3000,
      })
      return
    }

    setModalStalls(groupedStalls)
    setShowDetails(true)
  }
  const handleDateChange = ({ value }, field) => {
    setDates(prevDates => ({
      ...prevDates,
      [selectedMarket]: value,
    }))
    field?.onChange(moment(value).format('YYYY-MM-DD'))
  }
  // eslint-disable-next-line
  const handleStallRemove = (marketName, date, stall) => {
    const { stallId, id } = stall

    const newSelectedStalls = selectedStallsRedux.map(market => ({
      ...market,
      stalls: market.stalls ? [...market.stalls] : [],
    }))

    const marketIndex = newSelectedStalls.findIndex(
      market => market.market_name === marketName && market.date === date
    )

    if (marketIndex === -1) {
      return
    }

    const marketData = newSelectedStalls[marketIndex]
    const dateStalls = marketData.stalls
    const updatedStalls = dateStalls.filter(stall => stall.id !== id)
    if (updatedStalls.length === 0) {
      newSelectedStalls.splice(marketIndex, 1)
    } else {
      newSelectedStalls[marketIndex].stalls = updatedStalls
    }
    const removedStall = dateStalls.find(stall => stall.id === id)
    if (removedStall) {
      setTotalPrice(prevPrice => prevPrice - removedStall.price)
    }
    setbookStalls(newSelectedStalls)

    dispatch(selectedStall(newSelectedStalls))

    setSelectedStallsData(prevData => ({
      ...prevData,
      [stallId]: stallId,
    }))
  }

  return (
    <>
      <Toast ref={toast} />
      <div className='stall-container'>
        {loading ? (
          <ProgressSpinner />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className='stall-form'>
            <div className='mb-3'>
              <div className='d-inline-block'>
                <Link to={prevPath} className='text-d-none'>
                  <Button
                    className='common-btn p-button-rounded flex justify-content-start'
                    icon='pi pi-angle-left mr-2'>
                    {t('back')}
                  </Button>
                </Link>
              </div>
            </div>
            <div className='flex row justify-content-between align-items-center'>
              <div className='market-dropdown-section col-6'>
                <label htmlFor='market'>{t('select_market')}</label>
                <Dropdown
                  id='market'
                  value={selectedMarket}
                  options={marketOptions}
                  onChange={handleMarket}
                  disabled={isDisabled}
                  placeholder={t('select_market')}
                  className='w-full'
                />
              </div>
              <div className='calendar-section col-6'>
                <div className=''>
                  <label htmlFor='date'>
                    {t('please_select_date')}
                    <span className='required'>*</span>
                  </label>
                  <Controller
                    name={FORM_FIELDS_NAME.B_DATE.name}
                    control={control}
                    rules={FORM_FIELDS_NAME.B_DATE.rules}
                    render={({ field }) => (
                      <Calendar
                        {...field}
                        id='date'
                        value={dates[selectedMarket]}
                        onChange={e => handleDateChange(e, field)}
                        placeholder={t(FORM_FIELDS_NAME.B_DATE.placeholder)}
                        disabledDays={getDisabledDays(marketDay)}
                        minDate={dat}
                        showIcon={true}
                        showButtonBar={false}
                        className='w-full'
                        isError={errors[FORM_FIELDS_NAME.B_DATE.name]}
                        errorMsg={getFormErrorMessage(
                          FORM_FIELDS_NAME.B_DATE.name
                        )}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className='border-green-200 border-1 p-2'>
              <div className='summary'>
                <span>
                  {t('total_stalls')}: {stallList.length}
                </span>
                <span>
                  {t('available_stalls')}:{' '}
                  {stallPositions.flat().filter(isStall => isStall.value)
                    .length -
                    (selectedStallsMap[selectedMarket]?.[
                      dates[selectedMarket]?.toLocaleDateString()
                    ]?.length || 0) -
                    stallList.filter(stall => !stall.available).length}
                </span>
              </div>
              <hr />
              <div
                className={`market-container ${
                  roadPosition === 'top' ? 'row p-3' : 'column'
                }`}>
                <div className={`${roadPosition}-road`}>
                  {roadPosition === 'left' &&
                  selectedMarket === 'Kharadi IT Park' ? (
                    <svg
                      width='34'
                      height='185'
                      viewBox='0 0 34 185'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M13 184.572H4.54V183.288L10.072 180.288L4.54 177.3V176.04H13V177.432H7.3L11.716 179.856V180.756L7.324 183.18H13V184.572ZM13.12 172.39C13.12 172.814 13.04 173.194 12.88 173.53C12.712 173.858 12.488 174.118 12.208 174.31C11.928 174.494 11.612 174.586 11.26 174.586C10.828 174.586 10.488 174.474 10.24 174.25C9.984 174.026 9.8 173.662 9.688 173.158C9.576 172.654 9.52 171.978 9.52 171.13V170.71H9.268C8.868 170.71 8.58 170.798 8.404 170.974C8.228 171.15 8.14 171.446 8.14 171.862C8.14 172.19 8.192 172.526 8.296 172.87C8.392 173.214 8.544 173.562 8.752 173.914L7.732 174.346C7.588 174.138 7.464 173.894 7.36 173.614C7.248 173.326 7.164 173.026 7.108 172.714C7.044 172.394 7.012 172.094 7.012 171.814C7.012 170.958 7.212 170.322 7.612 169.906C8.004 169.49 8.616 169.282 9.448 169.282H13V170.686H12.064C12.392 170.822 12.652 171.038 12.844 171.334C13.028 171.63 13.12 171.982 13.12 172.39ZM12.088 172.078C12.088 171.686 11.952 171.362 11.68 171.106C11.408 170.842 11.064 170.71 10.648 170.71H10.384V171.118C10.384 171.87 10.444 172.394 10.564 172.69C10.676 172.978 10.884 173.122 11.188 173.122C11.452 173.122 11.668 173.03 11.836 172.846C12.004 172.662 12.088 172.406 12.088 172.078ZM5.872 167.855H4.408V166.175H5.872V167.855ZM13 167.759H7.132V166.259H13V167.759ZM13 164.7H7.132L7.132 163.236H8.044C7.708 163.036 7.452 162.768 7.276 162.432C7.1 162.088 7.012 161.704 7.012 161.28C7.012 159.896 7.816 159.204 9.424 159.204H13V160.704H9.496C9.04 160.704 8.708 160.792 8.5 160.968C8.292 161.136 8.188 161.4 8.188 161.76C8.188 162.2 8.328 162.552 8.608 162.816C8.88 163.072 9.244 163.2 9.7 163.2H13V164.7ZM13 154.303H4.54V150.631C4.54 149.703 4.764 148.987 5.212 148.483C5.652 147.979 6.272 147.727 7.072 147.727C7.704 147.727 8.228 147.891 8.644 148.219C9.052 148.547 9.328 149.019 9.472 149.635C9.6 149.227 9.908 148.891 10.396 148.627L13 147.211V148.903L10.3 150.367C10.036 150.511 9.856 150.683 9.76 150.883C9.664 151.075 9.616 151.323 9.616 151.627V152.767H13V154.303ZM8.476 152.767V150.895C8.476 149.775 8.02 149.215 7.108 149.215C6.204 149.215 5.752 149.775 5.752 150.895V152.767H8.476ZM13.12 143.696C13.12 144.304 12.996 144.832 12.748 145.28C12.5 145.728 12.148 146.076 11.692 146.324C11.228 146.572 10.684 146.696 10.06 146.696C9.436 146.696 8.896 146.572 8.44 146.324C7.984 146.076 7.632 145.728 7.384 145.28C7.136 144.832 7.012 144.304 7.012 143.696C7.012 143.088 7.136 142.56 7.384 142.112C7.632 141.664 7.984 141.316 8.44 141.068C8.896 140.82 9.436 140.696 10.06 140.696C10.684 140.696 11.228 140.82 11.692 141.068C12.148 141.316 12.5 141.664 12.748 142.112C12.996 142.56 13.12 143.088 13.12 143.696ZM11.98 143.696C11.98 143.248 11.82 142.888 11.5 142.616C11.172 142.344 10.692 142.208 10.06 142.208C9.42 142.208 8.944 142.344 8.632 142.616C8.312 142.888 8.152 143.248 8.152 143.696C8.152 144.144 8.312 144.504 8.632 144.776C8.944 145.048 9.42 145.184 10.06 145.184C10.692 145.184 11.172 145.048 11.5 144.776C11.82 144.504 11.98 144.144 11.98 143.696ZM13.12 137.526C13.12 137.95 13.04 138.33 12.88 138.666C12.712 138.994 12.488 139.254 12.208 139.446C11.928 139.63 11.612 139.722 11.26 139.722C10.828 139.722 10.488 139.61 10.24 139.386C9.984 139.162 9.8 138.798 9.688 138.294C9.576 137.79 9.52 137.114 9.52 136.266V135.846H9.268C8.868 135.846 8.58 135.934 8.404 136.11C8.228 136.286 8.14 136.582 8.14 136.998C8.14 137.326 8.192 137.662 8.296 138.006C8.392 138.35 8.544 138.698 8.752 139.05L7.732 139.482C7.588 139.274 7.464 139.03 7.36 138.75C7.248 138.462 7.164 138.162 7.108 137.85C7.044 137.53 7.012 137.23 7.012 136.95C7.012 136.094 7.212 135.458 7.612 135.042C8.004 134.626 8.616 134.418 9.448 134.418H13V135.822H12.064C12.392 135.958 12.652 136.174 12.844 136.47C13.028 136.766 13.12 137.118 13.12 137.526ZM12.088 137.214C12.088 136.822 11.952 136.498 11.68 136.242C11.408 135.978 11.064 135.846 10.648 135.846H10.384V136.254C10.384 137.006 10.444 137.53 10.564 137.826C10.676 138.114 10.884 138.258 11.188 138.258C11.452 138.258 11.668 138.166 11.836 137.982C12.004 137.798 12.088 137.542 12.088 137.214ZM13.12 130.64C13.12 131.152 12.996 131.604 12.748 131.996C12.5 132.38 12.148 132.68 11.692 132.896C11.228 133.112 10.684 133.22 10.06 133.22C9.428 133.22 8.888 133.112 8.44 132.896C7.984 132.68 7.632 132.38 7.384 131.996C7.136 131.604 7.012 131.152 7.012 130.64C7.012 130.224 7.104 129.848 7.288 129.512C7.472 129.176 7.716 128.924 8.02 128.756H4.54V127.256H13V128.72H12.028C12.364 128.88 12.632 129.132 12.832 129.476C13.024 129.82 13.12 130.208 13.12 130.64ZM11.98 130.22C11.98 129.772 11.82 129.412 11.5 129.14C11.172 128.868 10.692 128.732 10.06 128.732C9.42 128.732 8.944 128.868 8.632 129.14C8.312 129.412 8.152 129.772 8.152 130.22C8.152 130.668 8.312 131.028 8.632 131.3C8.944 131.572 9.42 131.708 10.06 131.708C10.692 131.708 11.172 131.572 11.5 131.3C11.82 131.028 11.98 130.668 11.98 130.22Z'
                        fill='#3AA54B'
                      />
                      <path
                        d='M9 30.076H0.539999L0.539999 24.448H1.764L1.764 28.6H4.092V24.712H5.316V28.6H7.776V24.448H9V30.076ZM9 23.0598H3.132V21.5958H4.044C3.708 21.3958 3.452 21.1278 3.276 20.7918C3.1 20.4478 3.012 20.0638 3.012 19.6398C3.012 18.2558 3.816 17.5638 5.424 17.5638H9V19.0638H5.496C5.04 19.0638 4.708 19.1518 4.5 19.3278C4.292 19.4958 4.188 19.7598 4.188 20.1198C4.188 20.5598 4.328 20.9118 4.608 21.1758C4.88 21.4318 5.244 21.5598 5.7 21.5598H9V23.0598ZM9.12 13.3523C9.12 14.9043 8.352 15.6803 6.816 15.6803H4.26V16.8083H3.132V15.6803H1.38V14.1803H3.132V12.4043H4.26V14.1803H6.732C7.116 14.1803 7.404 14.0963 7.596 13.9283C7.788 13.7603 7.884 13.4883 7.884 13.1123C7.884 13.0003 7.872 12.8843 7.848 12.7643C7.816 12.6443 7.784 12.5203 7.752 12.3923L8.856 12.1643C8.936 12.3083 9 12.4923 9.048 12.7163C9.096 12.9323 9.12 13.1443 9.12 13.3523ZM9 11.4348H3.132V9.97084H4.164C3.468 9.68284 3.084 9.06684 3.012 8.12284L2.976 7.66684L4.248 7.57084L4.332 8.43484C4.428 9.41884 4.932 9.91084 5.844 9.91084H9V11.4348ZM11.16 5.84434L8.76 4.76434L3.132 7.20034V5.60434L7.236 3.96034L3.132 2.28034V0.768344L11.16 4.29634V5.84434Z'
                        fill='#3AA54B'
                      />
                      <path
                        d='M33.0179 18L23.0179 12.2265V23.7735L33.0179 18ZM5 19H8.50223V17H5V19ZM15.5067 19L22.5112 19V17L15.5067 17V19ZM33.0179 18L23.0179 12.2265V23.7735L33.0179 18ZM5 19H8.50223V17H5V19ZM15.5067 19L22.5112 19V17L15.5067 17V19Z'
                        fill='#3AA54B'
                        fill-opacity='0.5'
                      />
                    </svg>
                  ) : (roadPosition === 'left' &&
                      selectedMarket === 'Ivy Estate') ||
                    selectedMarket === 'Grandeur Undri' ? (
                    <svg
                      width='34'
                      height='185'
                      viewBox='0 0 34 185'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M9 30.076H0.539999L0.539999 24.448H1.764L1.764 28.6H4.092V24.712H5.316V28.6H7.776V24.448H9V30.076ZM9 23.0598H3.132V21.5958H4.044C3.708 21.3958 3.452 21.1278 3.276 20.7918C3.1 20.4478 3.012 20.0638 3.012 19.6398C3.012 18.2558 3.816 17.5638 5.424 17.5638H9V19.0638H5.496C5.04 19.0638 4.708 19.1518 4.5 19.3278C4.292 19.4958 4.188 19.7598 4.188 20.1198C4.188 20.5598 4.328 20.9118 4.608 21.1758C4.88 21.4318 5.244 21.5598 5.7 21.5598H9V23.0598ZM9.12 13.3523C9.12 14.9043 8.352 15.6803 6.816 15.6803H4.26V16.8083H3.132V15.6803H1.38V14.1803H3.132V12.4043H4.26V14.1803H6.732C7.116 14.1803 7.404 14.0963 7.596 13.9283C7.788 13.7603 7.884 13.4883 7.884 13.1123C7.884 13.0003 7.872 12.8843 7.848 12.7643C7.816 12.6443 7.784 12.5203 7.752 12.3923L8.856 12.1643C8.936 12.3083 9 12.4923 9.048 12.7163C9.096 12.9323 9.12 13.1443 9.12 13.3523ZM9 11.4348H3.132V9.97084H4.164C3.468 9.68284 3.084 9.06684 3.012 8.12284L2.976 7.66684L4.248 7.57084L4.332 8.43484C4.428 9.41884 4.932 9.91084 5.844 9.91084H9V11.4348ZM11.16 5.84434L8.76 4.76434L3.132 7.20034V5.60434L7.236 3.96034L3.132 2.28034V0.768344L11.16 4.29634V5.84434Z'
                        fill='#3AA54B'
                      />
                      <path
                        d='M33.0179 18L23.0179 12.2265V23.7735L33.0179 18ZM5 19H8.50223V17H5V19ZM15.5067 19L22.5112 19V17L15.5067 17V19ZM33.0179 18L23.0179 12.2265V23.7735L33.0179 18ZM5 19H8.50223V17H5V19ZM15.5067 19L22.5112 19V17L15.5067 17V19Z'
                        fill='#3AA54B'
                        fill-opacity='0.5'
                      />
                    </svg>
                  ) : (roadPosition === 'top' &&
                      selectedMarket === 'Godrej Prana') ||
                    selectedMarket === 'Bramhasun City' ? (
                    <svg
                      width='31'
                      height='42'
                      viewBox='0 0 31 42'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      className='stall'>
                      <path
                        opacity='0.8'
                        d='M0.924 9L0.924 0.539999L6.552 0.539999L6.552 1.764L2.4 1.764L2.4 4.092L6.288 4.092V5.316L2.4 5.316L2.4 7.776H6.552L6.552 9H0.924ZM7.94016 9L7.94016 3.132H9.40416V4.308H9.27216C9.44816 3.884 9.72016 3.564 10.0882 3.348C10.4642 3.124 10.8882 3.012 11.3602 3.012C11.8322 3.012 12.2202 3.1 12.5242 3.276C12.8282 3.452 13.0562 3.72 13.2082 4.08C13.3602 4.432 13.4362 4.88 13.4362 5.424V9H11.9362V5.496C11.9362 5.192 11.8962 4.944 11.8162 4.752C11.7442 4.56 11.6282 4.42 11.4682 4.332C11.3162 4.236 11.1202 4.188 10.8802 4.188C10.5922 4.188 10.3402 4.252 10.1242 4.38C9.90816 4.5 9.74016 4.676 9.62016 4.908C9.50016 5.132 9.44016 5.396 9.44016 5.7V9H7.94016ZM17.6477 9.12C16.8637 9.12 16.2797 8.924 15.8957 8.532C15.5117 8.14 15.3197 7.568 15.3197 6.816L15.3197 4.26H14.1917V3.132H15.3197V1.38L16.8197 1.38V3.132L18.5957 3.132V4.26L16.8197 4.26V6.732C16.8197 7.116 16.9037 7.404 17.0717 7.596C17.2397 7.788 17.5117 7.884 17.8877 7.884C17.9997 7.884 18.1157 7.872 18.2357 7.848C18.3557 7.816 18.4797 7.784 18.6077 7.752L18.8357 8.856C18.6917 8.936 18.5077 9 18.2837 9.048C18.0677 9.096 17.8557 9.12 17.6477 9.12ZM19.5652 9V3.132H21.0292V4.548H20.9092C21.0212 4.068 21.2412 3.704 21.5692 3.456C21.8972 3.2 22.3332 3.052 22.8772 3.012L23.3332 2.976L23.4292 4.248L22.5652 4.332C22.0772 4.38 21.7092 4.532 21.4612 4.788C21.2132 5.036 21.0892 5.388 21.0892 5.844V9H19.5652ZM25.1557 11.16L26.3797 8.46V9.084L23.7997 3.132L25.3957 3.132L27.2197 7.68H26.8597L28.7197 3.132H30.2317L26.7037 11.16H25.1557Z'
                        fill='#3AA54B'
                      />
                      <path
                        d='M14.0088 41.0377L19.7823 31.0377H8.23529L14.0088 41.0377ZM13.0088 13.9624V17.3468H15.0088V13.9624H13.0088ZM13.0088 24.1156V30.8844H15.0088V24.1156H13.0088ZM14.0088 41.0377L19.7823 31.0377H8.23529L14.0088 41.0377ZM13.0088 13.9624V17.3468H15.0088V13.9624H13.0088ZM13.0088 24.1156V30.8844H15.0088V24.1156H13.0088Z'
                        fill='#3AA54B'
                        fill-opacity='0.5'
                      />
                    </svg>
                  ) : (
                    <svg
                      width='301'
                      height='67'
                      viewBox='0 0 301 67'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M157.5 67.0089L163.274 57.0089H151.726L157.5 67.0089ZM156.5 38.9911V42.4933H158.5V38.9911H156.5ZM156.5 49.4978V56.5022H158.5V49.4978H156.5ZM157.5 67.0089L163.274 57.0089H151.726L157.5 67.0089ZM156.5 38.9911V42.4933H158.5V38.9911H156.5ZM156.5 49.4978V56.5022H158.5V49.4978H156.5Z'
                        fill='#3AA54B'
                        fill-opacity='0.5'
                      />
                      <path
                        d='M142.924 35V26.54H148.552V27.764H144.4V30.092H148.288V31.316H144.4V33.776H148.552V35H142.924ZM149.94 35V29.132H151.404V30.044C151.604 29.708 151.872 29.452 152.208 29.276C152.552 29.1 152.936 29.012 153.36 29.012C154.744 29.012 155.436 29.816 155.436 31.424V35H153.936V31.496C153.936 31.04 153.848 30.708 153.672 30.5C153.504 30.292 153.24 30.188 152.88 30.188C152.44 30.188 152.088 30.328 151.824 30.608C151.568 30.88 151.44 31.244 151.44 31.7V35H149.94ZM159.648 35.12C158.096 35.12 157.32 34.352 157.32 32.816V30.26H156.192V29.132H157.32V27.38H158.82V29.132H160.596V30.26H158.82V32.732C158.82 33.116 158.904 33.404 159.072 33.596C159.24 33.788 159.512 33.884 159.888 33.884C160 33.884 160.116 33.872 160.236 33.848C160.356 33.816 160.48 33.784 160.608 33.752L160.836 34.856C160.692 34.936 160.508 35 160.284 35.048C160.068 35.096 159.856 35.12 159.648 35.12ZM161.565 35V29.132H163.029V30.164C163.317 29.468 163.933 29.084 164.877 29.012L165.333 28.976L165.429 30.248L164.565 30.332C163.581 30.428 163.089 30.932 163.089 31.844V35H161.565ZM167.156 37.16L168.236 34.76L165.8 29.132H167.396L169.04 33.236L170.72 29.132H172.232L168.704 37.16H167.156Z'
                        fill='#3AA54B'
                      />
                      <path
                        d='M120.428 13V4.54H121.712L124.712 10.072L127.7 4.54H128.96V13H127.568V7.3L125.144 11.716H124.244L121.82 7.324V13H120.428ZM132.61 13.12C132.186 13.12 131.806 13.04 131.47 12.88C131.142 12.712 130.882 12.488 130.69 12.208C130.506 11.928 130.414 11.612 130.414 11.26C130.414 10.828 130.526 10.488 130.75 10.24C130.974 9.984 131.338 9.8 131.842 9.688C132.346 9.576 133.022 9.52 133.87 9.52H134.29V9.268C134.29 8.868 134.202 8.58 134.026 8.404C133.85 8.228 133.554 8.14 133.138 8.14C132.81 8.14 132.474 8.192 132.13 8.296C131.786 8.392 131.438 8.544 131.086 8.752L130.654 7.732C130.862 7.588 131.106 7.464 131.386 7.36C131.674 7.248 131.974 7.164 132.286 7.108C132.606 7.044 132.906 7.012 133.186 7.012C134.042 7.012 134.678 7.212 135.094 7.612C135.51 8.004 135.718 8.616 135.718 9.448V13H134.314V12.064C134.178 12.392 133.962 12.652 133.666 12.844C133.37 13.028 133.018 13.12 132.61 13.12ZM132.922 12.088C133.314 12.088 133.638 11.952 133.894 11.68C134.158 11.408 134.29 11.064 134.29 10.648V10.384H133.882C133.13 10.384 132.606 10.444 132.31 10.564C132.022 10.676 131.878 10.884 131.878 11.188C131.878 11.452 131.97 11.668 132.154 11.836C132.338 12.004 132.594 12.088 132.922 12.088ZM137.145 5.872V4.408H138.825V5.872H137.145ZM137.241 13V7.132H138.741V13H137.241ZM140.3 13V7.132H141.764V8.044C141.964 7.708 142.232 7.452 142.568 7.276C142.912 7.1 143.296 7.012 143.72 7.012C145.104 7.012 145.796 7.816 145.796 9.424V13H144.296V9.496C144.296 9.04 144.208 8.708 144.032 8.5C143.864 8.292 143.6 8.188 143.24 8.188C142.8 8.188 142.448 8.328 142.184 8.608C141.928 8.88 141.8 9.244 141.8 9.7V13H140.3ZM150.697 13V4.54H154.369C155.297 4.54 156.013 4.764 156.517 5.212C157.021 5.652 157.273 6.272 157.273 7.072C157.273 7.704 157.109 8.228 156.781 8.644C156.453 9.052 155.981 9.328 155.365 9.472C155.773 9.6 156.109 9.908 156.373 10.396L157.789 13H156.097L154.633 10.3C154.489 10.036 154.317 9.856 154.117 9.76C153.925 9.664 153.677 9.616 153.373 9.616H152.233V13H150.697ZM152.233 8.476H154.105C155.225 8.476 155.785 8.02 155.785 7.108C155.785 6.204 155.225 5.752 154.105 5.752H152.233V8.476ZM161.304 13.12C160.696 13.12 160.168 12.996 159.72 12.748C159.272 12.5 158.924 12.148 158.676 11.692C158.428 11.228 158.304 10.684 158.304 10.06C158.304 9.436 158.428 8.896 158.676 8.44C158.924 7.984 159.272 7.632 159.72 7.384C160.168 7.136 160.696 7.012 161.304 7.012C161.912 7.012 162.44 7.136 162.888 7.384C163.336 7.632 163.684 7.984 163.932 8.44C164.18 8.896 164.304 9.436 164.304 10.06C164.304 10.684 164.18 11.228 163.932 11.692C163.684 12.148 163.336 12.5 162.888 12.748C162.44 12.996 161.912 13.12 161.304 13.12ZM161.304 11.98C161.752 11.98 162.112 11.82 162.384 11.5C162.656 11.172 162.792 10.692 162.792 10.06C162.792 9.42 162.656 8.944 162.384 8.632C162.112 8.312 161.752 8.152 161.304 8.152C160.856 8.152 160.496 8.312 160.224 8.632C159.952 8.944 159.816 9.42 159.816 10.06C159.816 10.692 159.952 11.172 160.224 11.5C160.496 11.82 160.856 11.98 161.304 11.98ZM167.474 13.12C167.05 13.12 166.67 13.04 166.334 12.88C166.006 12.712 165.746 12.488 165.554 12.208C165.37 11.928 165.278 11.612 165.278 11.26C165.278 10.828 165.39 10.488 165.614 10.24C165.838 9.984 166.202 9.8 166.706 9.688C167.21 9.576 167.886 9.52 168.734 9.52H169.154V9.268C169.154 8.868 169.066 8.58 168.89 8.404C168.714 8.228 168.418 8.14 168.002 8.14C167.674 8.14 167.338 8.192 166.994 8.296C166.65 8.392 166.302 8.544 165.95 8.752L165.518 7.732C165.726 7.588 165.97 7.464 166.25 7.36C166.538 7.248 166.838 7.164 167.15 7.108C167.47 7.044 167.77 7.012 168.05 7.012C168.906 7.012 169.542 7.212 169.958 7.612C170.374 8.004 170.582 8.616 170.582 9.448V13H169.178V12.064C169.042 12.392 168.826 12.652 168.53 12.844C168.234 13.028 167.882 13.12 167.474 13.12ZM167.786 12.088C168.178 12.088 168.502 11.952 168.758 11.68C169.022 11.408 169.154 11.064 169.154 10.648V10.384H168.746C167.994 10.384 167.47 10.444 167.174 10.564C166.886 10.676 166.742 10.884 166.742 11.188C166.742 11.452 166.834 11.668 167.018 11.836C167.202 12.004 167.458 12.088 167.786 12.088ZM174.36 13.12C173.848 13.12 173.396 12.996 173.004 12.748C172.62 12.5 172.32 12.148 172.104 11.692C171.888 11.228 171.78 10.684 171.78 10.06C171.78 9.428 171.888 8.888 172.104 8.44C172.32 7.984 172.62 7.632 173.004 7.384C173.396 7.136 173.848 7.012 174.36 7.012C174.776 7.012 175.152 7.104 175.488 7.288C175.824 7.472 176.076 7.716 176.244 8.02V4.54H177.744V13H176.28V12.028C176.12 12.364 175.868 12.632 175.524 12.832C175.18 13.024 174.792 13.12 174.36 13.12ZM174.78 11.98C175.228 11.98 175.588 11.82 175.86 11.5C176.132 11.172 176.268 10.692 176.268 10.06C176.268 9.42 176.132 8.944 175.86 8.632C175.588 8.312 175.228 8.152 174.78 8.152C174.332 8.152 173.972 8.312 173.7 8.632C173.428 8.944 173.292 9.42 173.292 10.06C173.292 10.692 173.428 11.172 173.7 11.5C173.972 11.82 174.332 11.98 174.78 11.98Z'
                        fill='#3AA54B'
                      />
                      <path
                        d='M56.2929 8.70711C55.9024 8.31658 55.9024 7.68342 56.2929 7.29289L62.6569 0.928932C63.0474 0.538408 63.6805 0.538408 64.0711 0.928932C64.4616 1.31946 64.4616 1.95262 64.0711 2.34315L58.4142 8L64.0711 13.6569C64.4616 14.0474 64.4616 14.6805 64.0711 15.0711C63.6805 15.4616 63.0474 15.4616 62.6569 15.0711L56.2929 8.70711ZM99 9H96.375V7H99V9ZM91.125 9H85.875V7H91.125V9ZM80.625 9H75.375V7H80.625V9ZM70.125 9H64.875V7H70.125V9ZM59.625 9H57V7H59.625V9ZM56.2929 8.70711C55.9024 8.31658 55.9024 7.68342 56.2929 7.29289L62.6569 0.928932C63.0474 0.538408 63.6805 0.538408 64.0711 0.928932C64.4616 1.31946 64.4616 1.95262 64.0711 2.34315L58.4142 8L64.0711 13.6569C64.4616 14.0474 64.4616 14.6805 64.0711 15.0711C63.6805 15.4616 63.0474 15.4616 62.6569 15.0711L56.2929 8.70711ZM99 9H96.375V7H99V9ZM91.125 9H85.875V7H91.125V9ZM80.625 9H75.375V7H80.625V9ZM70.125 9H64.875V7H70.125V9ZM59.625 9H57V7H59.625V9Z'
                        fill='#3AA54B'
                        fill-opacity='0.5'
                      />
                      <path
                        d='M253.707 8.70711C254.098 8.31658 254.098 7.68342 253.707 7.29289L247.343 0.928932C246.953 0.538408 246.319 0.538408 245.929 0.928932C245.538 1.31946 245.538 1.95262 245.929 2.34315L251.586 8L245.929 13.6569C245.538 14.0474 245.538 14.6805 245.929 15.0711C246.319 15.4616 246.953 15.4616 247.343 15.0711L253.707 8.70711ZM211 9H213.625V7H211V9ZM218.875 9H224.125V7H218.875V9ZM229.375 9H234.625V7H229.375V9ZM239.875 9H245.125V7H239.875V9ZM250.375 9H253V7H250.375V9ZM253.707 8.70711C254.098 8.31658 254.098 7.68342 253.707 7.29289L247.343 0.928932C246.953 0.538408 246.319 0.538408 245.929 0.928932C245.538 1.31946 245.538 1.95262 245.929 2.34315L251.586 8L245.929 13.6569C245.538 14.0474 245.538 14.6805 245.929 15.0711C246.319 15.4616 246.953 15.4616 247.343 15.0711L253.707 8.70711ZM211 9H213.625V7H211V9ZM218.875 9H224.125V7H218.875V9ZM229.375 9H234.625V7H229.375V9ZM239.875 9H245.125V7H239.875V9ZM250.375 9H253V7H250.375V9Z'
                        fill='#3AA54B'
                        fill-opacity='0.5'
                      />
                      <line
                        x1='-0.000854492'
                        y1='19.9966'
                        x2='301.001'
                        y2='19.9966'
                        stroke='#515C52'
                        stroke-opacity='0.5'
                        stroke-dasharray='6 6'
                      />
                    </svg>
                  )}
                </div>
                <div
                  className={`market-layout w-100 ${
                    roadPosition === 'left' ? 'pl-1' : ''
                  }`}
                  style={{
                    gridTemplateColumns: `repeat(${stallPositions[0].length}, 1fr)`,
                    borderLeft: roadPosition === 'left' ? 'none' : '',
                    borderTop: roadPosition === 'top' ? 'none' : '',
                  }}>
                  {stallPositions.map((row, rowIndex) =>
                    row.map((isStall, colIndex) => {
                      const stallId = `${rowIndex}-${colIndex}`

                      if (!isStall.value) {
                        return (
                          <div
                            key={stallId}
                            className='stall disabled-stall'
                            style={{
                              fontSize: '1rem',
                              cursor: 'not-allowed',
                              opacity: 0.5,
                            }}></div>
                        )
                      }

                      const stall = stallList[stallIndex] || null
                      stallIndex++

                      const isDisabled = stall && !stall.available

                      return (
                        <div
                          key={stallId}
                          className={`stall ${
                            isDisabled ? 'disabled-stall' : ''
                          } ${
                            isStall.value
                              ? getStallClass(rowIndex, colIndex)
                              : ''
                          }`}
                          onClick={() =>
                            isStall.value &&
                            handleStallClick(rowIndex, colIndex, stall)
                          }
                          data-pr-tooltip={stall ? stall.stallName : ''}
                          style={{
                            fontSize: '1rem',
                            cursor: isDisabled ? 'not-allowed' : 'pointer',
                            opacity: isDisabled ? 0.5 : 1,
                          }}>
                          <div className='justify-content-between align-items-center'>
                            {isStall.value && stall && (
                              <>
                                <div className='tooltip-wrapper'>
                                  <img
                                    src={
                                      stallImageMap[stall.stallName] ||
                                      GENERAL_STALL
                                    }
                                    alt={stall.stallName || 'General stall'}
                                    className={`${isStall.direction} stall-image w-8 md:w-5 lg:w-6`}
                                  />
                                  <div className='stall-name'>
                                    <p>{stall.stallName || 'General Stall'}</p>
                                    <p className='pi pi-indian-rupee'>
                                      {`${stall.stallPrice}` || '₹0'}
                                    </p>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>

              <hr />
              <div className='total-amount'>
                <span>{t('total_amount')}</span>
                <span>
                  {' '}
                  {totalAmount} <i className='pi pi-indian-rupee' />
                  /-{' '}
                </span>
              </div>
              <hr />
              <div className='flex justify-content-end '>
                <Button
                  label='Market Preview'
                  onClick={handlePreview}
                  disabled={!selectedMarket}
                  className='common-btn border-2 border-round-md md:w-12rem mr-2'
                  // disabled={selectedStallsRedux?.length === 0}
                />
                <Button
                  label='Book'
                  onClick={handleShowClick}
                  className='common-btn border-2 border-round-md md:w-10rem mr-2'
                  // disabled={selectedStallsRedux?.length === 0}
                />
              </div>
            </div>
          </form>
        )}
        <Tooltip target='.stall' mouse className='text-green-400' />

        {showPaymentScreen && (
          <PaymentScreen
            amount={totalAmount}
            bookStalls={bookStalls}
            setShowDetails={setShowDetails}
            setShowPaymentScreen={setShowPaymentScreen}
          />
        )}
        <Dialog
          header={selectedMarket}
          visible={showPreviewPopup}
          style={{ width: '30vw', height: '90vh', overflowY: 'auto' }}
          className='w-full md:w-3'
          onHide={() => setPreview(false)}>
          <div className='selected-stalls-details'>
            {selectedMarket ? (
              <div className='market-image-preview'>
                <img
                  src={marketImageMap[selectedMarket]}
                  alt={selectedMarket || 'Market Image'}
                  width='100%'
                  className='market-image'
                />
              </div>
            ) : (
              <p>No market selected.</p>
            )}
          </div>
        </Dialog>
        <Dialog
          header='Selected Stalls Details'
          visible={showDetails}
          style={{ width: '50vw', maxHeight: '80vh', overflowY: 'auto' }}
          className='w-full md:w-6'
          onHide={() => setShowDetails(false)}
          footer={
            <>
              <Button
                label='Cancel'
                onClick={() => setShowDetails(false)}
                className='common-btn border-2 te border-round-md md:w-10rem mr-2'
              />

              <Button
                type='button'
                label={t('Confirm_Booking')}
                className='common-btn border-2 te border-round-md md:w-10rem'
                onClick={handlePayClick}
              />
            </>
          }>
          <div className='selected-stalls-details'>
            {selectedStallsRedux &&
            Object.keys(selectedStallsRedux).length > 0 ? (
              Object.keys(selectedStallsRedux).map(key => {
                const marketData = selectedStallsRedux[key]
                return (
                  <div key={key}>
                    <h3>Market Name: {marketData.market_name}</h3>
                    <h4>Date: {marketData.date}</h4>

                    <ul style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                      <h5>Stalls:</h5>
                      {marketData.stalls.map(stall => (
                        <li key={stall.id}>
                          <div>
                            <strong>Stall No:</strong>{' '}
                            {stall.stallNo || 'No Stall No'}
                          </div>
                          <div>
                            <strong>Stall Name:</strong>{' '}
                            {stall.name || 'No Stall'}
                          </div>
                          <div>
                            <strong>Stall Price:</strong> {stall.price || 0}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })
            ) : (
              <p>No stalls selected.</p>
            )}
          </div>
        </Dialog>
        <Dialog
          header='Confirm Booking'
          visible={showTermsPopup}
          style={{ width: '40vw' }}
          className='w-full md:w-6'
          onHide={() => setShowTermsPopup(false)}>
          <div className='terms_and_conditions'>
            <h1>{t('Terms_of_service')}</h1>
            <br />
            <h2>{t('wingrow_farmers_market')}</h2>
            <h3 class='city'>{t('role_of_wingrow_agritech')}</h3>
            <p>
              <li>{t('role_para_1')}</li>
              <br />
              <li>{t('role_para_2')}</li>
              <br />
              <li>{t('role_para_3')}</li>
              <br />
              <li>{t('role_para_4')}</li>
              <br />
            </p>
            <br />
            <h3 class='city'>{t('personal_information')}</h3>
            <br />
            <p>{t('personal_info_para_1')}</p>
            <br />
            <h3 class='city'>{t('account_and_registration_obligations')}</h3>
            <br />
            <p>{t('acc_and_registration_obligations_para')}</p>
            <br />
            <h3 class='city'>{t('LICENSE_&_SITE_ACCESS')}</h3>
            <br />
            <p>{t('LICENSE_&_SITE_ACCESS_PARA')}</p>
            <br />
            <h3 class='city'>{t('pricing')} </h3>
            <br />
            <p>{t('pricing_para')}</p>
            <br />
            <h3 class='city'>{t('return_and_refunds')}</h3>
            <br />
            <p>{t('return_and_refunds_para')}</p>
            <br />
            <h3 class='city'>{t('cancellation_of_booking')}</h3>
            <br />
            <p>
              <li>{t('cancellation_booking_para_1')}</li>
              <br />
              <li>{t('cancellation_booking_para_2')}</li>
            </p>
            <br />
            <h3 class='city'>
              {t('PAYMENT_FOR_BOOKING_AND_ANY_ADDITIONAL_CHARGES')}
            </h3>
            <br />
            <h4>{t('FULL_PAYMENT')}</h4>
            <br />
            <p>{t('Full_payment_para')}</p>
            <br />
            <h4>{t('CANCELLATION_CHARGES')}</h4>
            <br />
            <p>{t('CANCELLATION_CHARGES_PARA')}</p>
            <br />
            <p>
              <table style={{ width: '100%' }}>
                <tr>
                  <th>{t('cancellation_charges_head_1')}</th>
                  <th>{t('cancellation_charges_head_2')}</th>
                </tr>
                <tr>
                  <td>{t('cancellation_data_1')}</td>
                  <td>{t('cancellation_data_2')}</td>
                </tr>
                <tr>
                  <td>{t('cancellation_data_3')}</td>
                  <td>{t('cancellation_data_4')}</td>
                </tr>
                <tr>
                  <td>{t('cancellation_data_5')}</td>
                  <td>{t('cancellation_data_6')}</td>
                </tr>
                <tr>
                  <td>{t('cancellation_data_7')}</td>
                  <td>{t('cancellation_data_8')}</td>
                </tr>
                <tr>
                  <td>{t('cancellation_data_9')}</td>
                  <td>{t('cancellation_data_10')}</td>
                </tr>
              </table>
            </p>
            <br />
            <h3 class='city'>{t('YOU_AGREE_AND_CONFIRM')}</h3>
            <br />
            <p>
              <li>{t('confirm_para_1')}</li>
              <br />
              <li>{t('confirm_para_2')}</li>
              <br />
              <li>{t('confirm_para_3')}</li>
              <br />
              <li>{t('confirm_para_4')}</li>
            </p>
            <br />
            <h3 class='city'>{t('not_use_for_these')}</h3>
            <br />
            <p>
              <li>{t('not_use_for_these_1')}</li>
              <li>{t('not_use_for_these_2')}</li>
              <li>{t('not_use_for_these_3')}</li>
              <li>{t('not_use_for_these_4')}</li>
              <li>{t('not_use_for_these_5')}</li>
              <li>{t('not_use_for_these_6')}</li>
              <li>{t('not_use_for_these_7')}</li>
            </p>
            <br />
            <h3 class='city'>{t('modification_of_t_and_c')}</h3>
            <br />
            <p>{t('modification_t_and_c_1')}</p>
            <br />
            <h3 class='city'>{t('COPYRIGHT_&_TRADEMARK')}</h3>
            <br />
            <p>{t('copyright_and_trademark_1')}</p>
            <br />
            <h3 class='city'>{t('OBJECTIONABLE_MATERIAL')}</h3>
            <br />
            <p>{t('objectionable_material_1')}</p>
            <br />
            <h3 class='city'>{t('INDEMNITY')} </h3>
            <br />
            <p>{t('indemnity_1')}</p>
            <br />
            <h3 class='city'>{t('TERMINATION')}</h3>
            <br />
            <p>{t('termination_1')}</p>
            <br />
            <h3 class='city'>{t('RESCHEDULING_OF_TICKET')}</h3>
            <br />
            <p>
              <li>{t('rescheduling_ticket_1')}</li>
              <li>{t('rescheduling_ticket_2')}</li>
              <li>{t('rescheduling_ticket_3')}</li>
              <li>{t('rescheduling_ticket_4')}</li>
              <li>{t('rescheduling_ticket_5')}</li>
            </p>
            <br />
            <h3 class='city'>{t('responsibilities')}</h3>
            <br />
            <p>
              <li>{t('responsibilities_1')}</li>
              <li>{t('responsibilities_2')}</li>
              <li>{t('responsibilities_3')}</li>
              <li>{t('responsibilities_4')}</li>
              <li>{t('responsibilities_5')}</li>
            </p>
            <br />
            <h3 class='city'>{t('MISCELLANEOUS')}</h3>
            <br />
            <p>
              <li>{t('MISCELLANEOUS_1')}</li>
              <li>{t('MISCELLANEOUS_2')}</li>
              <li>{t('MISCELLANEOUS_3')}</li>
              <li>{t('MISCELLANEOUS_4')}</li>
            </p>
            <br />
            <div className='p-field-checkbox'>
              <Checkbox
                inputId='acceptTerms'
                checked={isChecked}
                onChange={e => setIsChecked(e.checked)}
              />
              <label htmlFor='acceptTerms' className='p-checkbox-label'>
                I agree to the terms and conditions
              </label>
            </div>

            {!isChecked && (
              <div
                className='p-text-danger p-mb-3 p-text-danger'
                style={{ color: 'red', fontSize: '0.9rem' }}>
                Please accept the terms and conditions to proceed.
              </div>
            )}
            <div className='text-center pt-5'>
              <Button
                label='Accept & Pay'
                className='common-btn tnc_btn'
                onClick={handleConfirmBooking}
                disabled={!isChecked}
              />
            </div>
          </div>
        </Dialog>
      </div>
    </>
  )
}

export default StallComponent
