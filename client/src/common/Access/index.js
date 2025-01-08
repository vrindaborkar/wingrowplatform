import React from 'react'
import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom'
import { ACCESS_IMG, WINGROW_LOGO } from '../../assets/images'

const AccessDeniedPage = () => {
  const navigate = useNavigate()
  const handleNavigation = () => {
    navigate('/')
  }

  return (
    <div className='surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden'>
      <div className='flex flex-column align-items-center justify-content-center p-2'>
        <img
          src={WINGROW_LOGO}
          alt='Wingrow logo'
          className='mb-5 w-6rem flex-shrink-0'
        />
        <div
          style={{
            borderRadius: '56px',
            padding: '0.3rem',
            background:
              'linear-gradient(180deg, rgba(224, 52, 54, 0.4) 10%, rgba(33, 150, 243, 0) 30%)',
          }}>
          <div
            className='w-full text-center surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center'
            style={{ borderRadius: '53px' }}>
            <div
              className='flex justify-content-center align-items-center bg-red-500 border-circle'
              style={{ height: '3.2rem', width: '3.2rem' }}>
              <i className='pi pi-fw pi-exclamation-circle text-2xl text-white'></i>
            </div>
            <h1 className='text-900 font-bold text-3xl md:text-5xl mb-2'>
              Access Denied
            </h1>
            <div className='text-600 mb-5'>
              You do not have the necessary permisions.
            </div>
            <img src={ACCESS_IMG} alt='Error' className='mb-5' width='80%' />
            <Button
              className='common-btn'
              icon='pi pi-arrow-left'
              label='Go to Home'
              text
              onClick={() => handleNavigation()}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccessDeniedPage
