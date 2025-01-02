import React from 'react'
import ProductCategory from './productCategory'
import LiveMarket from './liveMarket'
import SliderComponent from '../home/slider'
import {
  WINGROW_SLIDE_ONE,
  WINGROW_SLIDE_THREE,
  WINGROW_SLIDE_TWO,
} from '../../assets/images'

export default function CustomerComponent() {
  const slides = [
    {
      id: 1,
      name: 'Slide 1',
      url: WINGROW_SLIDE_ONE,
      isImage: true,
    },
    {
      id: 2,
      name: 'Slide 2',
      url: WINGROW_SLIDE_TWO,
      isImage: true,
    },
    {
      id: 3,
      name: 'Slide 3',
      url: WINGROW_SLIDE_THREE,
      isImage: true,
    },
  ]
  return (
    <>
      <div className='mt-2'>
        <SliderComponent slides={slides} />
      </div>
      <div className='md:px-8 px-2'>
        <LiveMarket />
      </div>
      <div className='md:px-8 px-2'>
        <ProductCategory />
      </div>
    </>
  )
}
