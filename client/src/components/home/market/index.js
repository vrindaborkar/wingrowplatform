import React from 'react'
import scheduleData from './data.json'
import { useTranslation } from 'react-i18next'

const MarketComponent = () => {
  const { schedule } = scheduleData
  const { t } = useTranslation()

  const handleLocation = payload => {
    window.open(payload, '_blank')
  }

  return (
    <div className='grid'>
      {schedule.map((market, index) => (
        <div key={index} className='col-12 md:col-6 lg:col-3'>
          <div className='h-full test'>
            <div className='img-cover'></div>
            <div className='overlay'></div>
            <div className='content font-bold shadow-1 p-3 border-1 border-50 border-round h-full hover:shadow-8'>
              <div className='flex justify-content-between mb-3'>
                <div>
                  <span className=' text-900  mb-3'>{t(market.day)}</span>
                  <div className='text-900 font-medium text-xl'>
                    {market.time}
                  </div>
                </div>
                <div
                  className='flex align-items-center bg-white justify-content-center cursor-pointer text-white border-round'
                  style={{ width: '2.5rem', height: '2.5rem' }}
                  onClick={() => handleLocation(market.location)}>
                  <i className='pi pi-map-marker text-green-900 text-xl'></i>
                </div>
              </div>
              <div className='text-red-900'>{t(market.name)}</div>
              <span className=''>{t(market.address)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MarketComponent
