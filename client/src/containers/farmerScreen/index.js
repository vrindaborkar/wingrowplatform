import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTE_PATH } from '../../constant/urlConstant'
import {
  CALENDER,
  COMMODITY,
  RED_STALL,
  SUBCRIPTION,
} from '../../assets/images'
import { Image } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
const FarmerScreen = () => {
  const { t, ready } = useTranslation()

  if (!ready) {
    return <div>Loading...</div>
  }
  return (
    <div className='farmerScreen'>
      <Link className='links_farmersdata red' to={ROUTE_PATH.FARMER.MARKET}>
        <div className='flex align-items-center text-left'>
          <div className='w-full'>
            <Image
              src={RED_STALL}
              className='bg-white p-3 h-3rem border-round-xl'
            />
          </div>
          <div className='w-full md:text-xl font-bold'>{t('book_stall')}</div>
        </div>
      </Link>
      <Link
        className='links_farmersdata green'
        to={ROUTE_PATH.FARMER.MY_BOOKING}>
        <div className='flex align-items-center text-left'>
          <div className='w-full'>
            <Image
              src={CALENDER}
              className='bg-white p-3 h-3rem border-round-xl'
            />
          </div>
          <div className='w-full md:text-xl font-bold '>{t('my_bookings')}</div>
        </div>
      </Link>
      <Link className='links_farmersdata red' to={ROUTE_PATH.FARMER.INWARD}>
        <div className='flex align-items-center text-left'>
          <div className='w-full'>
            <Image
              src={RED_STALL}
              className='bg-white p-3 h-3rem border-round-xl'
            />
          </div>
          <div className='w-full md:text-xl font-bold'>{t('fill_inward')}</div>
        </div>
      </Link>
      <Link className='links_farmersdata green' to={ROUTE_PATH.FARMER.OUTWARD}>
        <div className='flex align-items-center text-left'>
          <div className='w-full'>
            <Image
              src={RED_STALL}
              className='bg-white p-3 h-3rem border-round-xl'
            />
          </div>
          <div className='w-full md:text-xl font-bold'>{t('fill_outward')}</div>
        </div>
      </Link>
      <Link className='links_farmersdata red' to={ROUTE_PATH.FARMER.DATA}>
        <div className='flex align-items-center text-left'>
          <div className='w-full'>
            <Image
              src={COMMODITY}
              className='bg-white p-3 h-3rem border-round-xl'
            />
          </div>
          <div className='w-full md:text-xl font-bold'>{t('data')}</div>
        </div>
      </Link>
      <Link className='links_farmersdata green' to='/subscription'>
        <div className='flex align-items-center text-left'>
          <div className='w-full'>
            <Image
              src={SUBCRIPTION}
              className='bg-white p-3 h-3rem border-round-xl'
            />
          </div>
          <div className='w-full md:text-xl font-bold'>{t('subscription')}</div>
        </div>
      </Link>
    </div>
  )
}

export default FarmerScreen
