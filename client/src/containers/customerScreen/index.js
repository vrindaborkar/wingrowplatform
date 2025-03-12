import React from 'react'
import CustomerComponent from '../../components/customer'
import Footer from '../../common/Footer/index'
export default function CustomerScreen() {
  return (
    <>
      <div className=' w-full mt-2 border-0 text-center'>
        <CustomerComponent />
        <Footer/>
      </div>
    </>
  )
}
