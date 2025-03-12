import { Button } from 'primereact/button'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import ErrorPage from '../../../common/Error'

const MyBookingComponent = props => {
  const { stallBookList, isPageLevelError, isLoading, handleOnDeleteRecord } =
    props.stallProps

  const [myStalls, setMyStalls] = useState([])
  const { t } = useTranslation()

  const formatDate = dateStr => {
    const date = new Date(dateStr)
    const options = { day: '2-digit', month: 'short', year: 'numeric' }
    return date
      .toLocaleDateString('en-GB', options)
      .replace(/ /g, '/')
      .toUpperCase()
  }

  const isBookingExpired = dateStr => {
    const today = new Date()
    const bookingDate = new Date(dateStr)
    return bookingDate < today
  }

  useEffect(() => {
    if (Array.isArray(stallBookList?.bookedStalls)) {
      const sortedData = [...stallBookList.bookedStalls].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      )
      setMyStalls(sortedData)
    }
  }, [stallBookList])
  const shouldRenderFullPageError = () => isPageLevelError
  const shouldRenderStallBookList = () => myStalls?.length > 0
  const shouldRenderNotFoundView = () =>
    !isPageLevelError && !isLoading && myStalls.length === 0

  return (
    <>
      {shouldRenderFullPageError() && (
        <div>
          <ErrorPage />
        </div>
      )}
      {shouldRenderNotFoundView() && (
        <div className='text-center w-full mt-3 md:px-5'>
          <h3>{t('no booking found')}</h3>
        </div>
      )}
      {shouldRenderStallBookList() && (
        <div className='text-center w-full mt-3 md:px-5'>
          <div className='px-3'>
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
            <h2 className='mt-3'>{t('my_bookings')}</h2>
          </div>
          <div className='grid grid-nogutter w-full md:px-5 '>
            {myStalls?.map((stall, index) => {
              const formattedDate = formatDate(stall.date)

              return (
                <div
                  key={index}
                  className='col-12 md:col-6 lg:col-4 xl:col-3 mb-4'>
                  <div className='p-3 h-full'>
                    <div
                      className='shadow-2 p-3 h-full flex flex-column'
                      style={{ borderRadius: '6px' }}>
                      <div className='text-900 font-medium text-xl mb-2'>
                        {stall.name}
                      </div>
                      <div className='text-600'>{stall?.stallName}</div>
                      <hr className='my-3 mx-0 border-top-1 border-bottom-none border-300' />
                      <div className='flex px-2 align-items-center justify-content-between'>
                        <span className='font-medium text-red-700'>
                          {stall.stallNo}
                        </span>
                        <span className='font-bold text-2xl text-900'>
                          {formattedDate}
                        </span>
                      </div>
                      <hr className='my-3 mx-0 border-top-1 border-bottom-none border-300' />
                      <ul className='list-none p-0 m-0 flex-grow-1'>
                        <li className='flex align-items-center mb-3'>
                          <i className='pi pi-check-circle text-green-500 mr-2'></i>
                          <span>
                            {stall.isBooked
                              ? 'Booking Confirm'
                              : 'Booking Cancelled'}
                          </span>
                        </li>
                      </ul>
                      <hr className='mb-3 mx-0 border-top-1 border-bottom-none border-300 mt-auto' />
                      <Button
                        label={
                          isBookingExpired(stall.date) ? 'Expired' : 'Cancel'
                        }
                        disabled={isBookingExpired(stall.date)}
                        onClick={() => {
                          handleOnDeleteRecord(stall)
                        }}
                        className='common-btn p-3 w-full mt-auto'
                      />
                    </div>
                  </div>
                </div>
              )
            })}
            <div />
          </div>
        </div>
      )}
    </>
  )
}

export default MyBookingComponent
