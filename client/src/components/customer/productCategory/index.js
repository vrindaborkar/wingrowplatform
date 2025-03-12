import React from 'react'
import { t } from 'i18next'
import { categoryImageMap } from './product'

export default function ProductCategory() {
  const images = [
    {
      id: 0,
      itemImageSrc: categoryImageMap['Fruits & Vegetables'],
      alt: 'Image 1',
      firstHalfTitle: 'Fruits &',
      secHalfTitle: 'Vegetables',
    },
    {
      id: 1,
      itemImageSrc: categoryImageMap['Snacks'],
      alt: 'Image 2',
      firstHalfTitle: 'Snacks',
    },
    {
      id: 2,
      itemImageSrc: categoryImageMap['Pulse & Grains'],
      firstHalfTitle: 'Pulses &',
      secHalfTitle: 'Grains',
      alt: 'Image 3',
    },
    {
      id: 3,
      itemImageSrc: categoryImageMap['Organic Products'],
      alt: 'Image 4',
      firstHalfTitle: 'Organic',
      secHalfTitle: 'Products',
    },
    {
      id: 4,
      itemImageSrc: categoryImageMap['Dairy Products'],
      alt: 'Image 5',
      firstHalfTitle: 'Dairy',
      secHalfTitle: 'Products',
    },
    {
      id: 5,
      itemImageSrc: categoryImageMap['Fashion'],
      alt: 'Image 6',
      firstHalfTitle: 'Fashion',
    },
    {
      id: 6,
      itemImageSrc: categoryImageMap['Toys & Baby Products'],
      alt: 'Image 7',
      firstHalfTitle: 'Toys &',
      secHalfTitle: 'Baby Products',
    },
    {
      id: 7,
      itemImageSrc: categoryImageMap['Furniture'],
      alt: 'Image 8',
      firstHalfTitle: 'Furniture',
    },
    {
      id: 8,
      itemImageSrc: categoryImageMap['Fun & Entertainment'],
      alt: 'Image 9',
      firstHalfTitle: 'Fun &',
      secHalfTitle: 'Entertainment',
    },
  ]

  return (
    <>
      <div className='md:p-4 px-2 mb-2'>
        <div className='flex align-items-center'>
          <h2 className='mr-2 text-xl md:text-3xl'>
            {t('product_categories')}
          </h2>
          <hr className='flex-1 p-2' />
        </div>
        <div className='grid w-full grid-nogutter justify-content-between mb-3'>
          {images.map((image, index) => (
            <div key={index} className='col-4 p-1'>
              <div className='h-full py-3 border-round-2xl flex flex-column justify-content-between'>
                <div className='flex flex-column align-items-center justify-content-center'>
                  <div className='overflow-hidden'>
                    <div
                      className='bg-contain bg-center bg-no-repeat h-4rem w-4rem sm:h-10rem sm:w-10rem md:h-10rem md:w-10rem lg:h-10rem lg:w-10rem border-round-2xl'
                      style={{
                        backgroundImage: `url(${image.itemImageSrc})`,
                      }}></div>
                  </div>
                </div>
                <div className='text-center'>
                  <div>{t(image.firstHalfTitle)}</div>
                  <p>{t(image.secHalfTitle)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
