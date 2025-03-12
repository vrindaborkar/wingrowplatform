import React, { useEffect, useState } from 'react'
import AccessDeniedPage from '../../../../common/Access'
import ErrorPage from '../../../../common/Error'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Button } from 'primereact/button'
import { baseUrl } from '../../../../services/PostAPI'
import { API_PATH, ROUTE_PATH } from '../../../../constant/urlConstant'
import { Dropdown } from 'primereact/dropdown'
import axios from 'axios'
import { ProgressSpinner } from 'primereact/progressspinner'

const MarketComponent = props => {
  const { isPageLevelError, marketList, setCity } = props

  const { t } = useTranslation()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const [selectedState, setSelectedState] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)
  // eslint-disable-next-line
  const [filteredMarkets, setFilteredMarkets] = useState([])
  const [states, setStates] = useState([])
  const [cities, setCities] = useState({})

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get(`${baseUrl}${API_PATH.STATE.FETCH}`)
        const formattedStates = response.data.states
          .filter(state => state.stateName)
          .map(state => ({
            label: state.stateName,
            value: state._id,
          }))
        setStates(formattedStates)
      } catch (error) {
        console.error('Error fetching states:', error)
      }
    }

    fetchStates()
  }, [])
  const fetchCities = async stateId => {
    try {
      const response = await axios.get(
        `${baseUrl}${API_PATH.CITY.FETCH}?stateId=${stateId}`
      )
      const formattedCities = response.data.map(city => ({
        label: city.name,
        value: city.name,
      }))
      setCities(prevCities => ({
        ...prevCities,
        [stateId]: formattedCities,
      }))
    } catch (error) {
      console.error('Error fetching cities:', error)
    }
  }

  const handleStateChange = e => {
    const stateId = e.value
    setSelectedState(stateId)
    setSelectedCity(null)
    setFilteredMarkets([])
    fetchCities(stateId)
  }

  const handleCityChange = e => {
    const city = e.value
    setSelectedCity(city)
    setLoading(true)

    const marketsInCity = marketList[city] || []
    setFilteredMarkets(marketsInCity)
    setCity(city)
    setLoading(false)
  }

  useEffect(() => {
    if (selectedCity) {
      setLoading(true)
      const marketsInCity = marketList[selectedCity] || []
      setFilteredMarkets(marketsInCity)
      setLoading(false)
    }
  }, [selectedCity, marketList])

  const shouldRenderFullPageError = () => isPageLevelError
  const shouldRenderMarketList = () => true
  const shouldRenderNotFoundView = () =>
    !shouldRenderFullPageError && !shouldRenderMarketList
  // eslint-disable-next-line
  const marketOption = Object.keys(marketList).flatMap(marketKey => {
    const markets = marketList[marketKey]
    if (markets.length > 0) {
      return markets.map(market => {
        return {
          label: market.name,
          value: market.name,
          marketDay: market.marketDay,
        }
      })
    }
    return []
  })

  const currentPath = location.pathname
  localStorage.setItem('setprevpath', currentPath)
  localStorage.setItem('marketOptions', JSON.stringify(marketOption))
  const handleMarket = () => {
    const marketPath = `${ROUTE_PATH.BOOKING.STALL}`
    navigate(marketPath)
  }

  return (
    <div>
      {loading ? (
        <ProgressSpinner />
      ) : (
        <>
          {shouldRenderFullPageError() && <ErrorPage />}
          {shouldRenderNotFoundView() && <AccessDeniedPage />}
          {shouldRenderMarketList() && (
            <div className='text-center mt-3 px-5'>
              <div className=''>
                <div className='text-left'>
                  <div className='d-inline-block'>
                    <Link to='/farmer' className='text-d-none'>
                      <Button
                        className='common-btn p-button-rounded flex justify-content-start'
                        icon='pi pi-angle-left mr-2'>
                        {t('back')}
                      </Button>
                    </Link>
                  </div>
                </div>
                <h2>{t('please_select_state_and_city')}</h2>
                <Dropdown
                  value={selectedState}
                  options={states}
                  onChange={handleStateChange}
                  placeholder={t('select_state')}
                  className='m-3'
                />

                {selectedState && (
                  <Dropdown
                    value={selectedCity}
                    options={cities[selectedState] || []}
                    onChange={handleCityChange}
                    placeholder={t('select_city')}
                  />
                )}

                <div className='mt-3'>
                  <iframe
                    width='80%'
                    height='315'
                    src='https://www.youtube.com/embed/t-fevz9t6iU?si=q9VkMl7NKlAkZIQ_'
                    title='YouTube video player'
                    frameborder='0'
                    allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share'
                    referrerpolicy='strict-origin-when-cross-origin'></iframe>
                </div>
              </div>
              <div className='d-inline-block m-3'>
                <Button
                  onClick={() => handleMarket()}
                  disabled={selectedCity ? false : true}
                  className='common-btn p-button-rounded flex justify-content-start'
                  icon='pi pi-angle-right mr-2'>
                  {t('Proceed')}
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default MarketComponent
