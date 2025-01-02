import React from 'react'
import { t } from 'i18next'

export default function ProductCategory() {
  const images = [
    {
      id: 0,
      itemImageSrc:
        'https://post.healthline.com/wp-content/uploads/2020/08/fruits-and-vegetables-thumb.jpg',
      alt: 'Image 1',
      firstHalfTitle: 'Fruits And',
      secHalfTitle: 'Vegetables',
    },
    {
      id: 1,
      itemImageSrc:
        'https://cdn.shopify.com/s/files/1/0405/5164/5352/files/banner_300x.jpg?v=1647631081',
      alt: 'Image 2',
      firstHalfTitle: 'Snacks',
    },
    {
      id: 2,
      itemImageSrc:
        'https://pibindia.files.wordpress.com/2016/12/istock_000020447381_medium.jpg?w=1400',
      firstHalfTitle: 'Pulses &',
      secHalfTitle: 'Grains',
      alt: 'Image 3',
    },

    {
      id: 3,
      itemImageSrc:
        'https://static.vecteezy.com/system/resources/thumbnails/007/558/975/small/nature-organic-product-logo-with-hand-and-leaf-design-template-free-vector.jpg',
      alt: 'Image 4',
      firstHalfTitle: 'Organic',
      secHalfTitle: 'Products',
    },

    {
      id: 4,
      itemImageSrc:
        'https://domf5oio6qrcr.cloudfront.net/medialibrary/9685/iStock-544807136.jpg',
      alt: 'Image 5',
      secHalfTitle: 'Products',
    },
    {
      id: 5,
      itemImageSrc:
        'https://shilpaahuja.com/wp-content/uploads/2018/03/latest-saree-designs-trends-style-fashion-indian-designer-summer-2018.jpg',
      alt: 'Image 6',
      firstHalfTitle: 'Fashion',
    },
    {
      id: 6,
      itemImageSrc:
        'https://m.media-amazon.com/images/I/91gbfULvW0L._AC_SL1500_.jpg',
      alt: 'Image 7',
      firstHalfTitle: 'Toys & ',
      secHalfTitle: 'Baby Products',
    },
    {
      id: 7,
      itemImageSrc:
        'https://imgmedia.lbb.in/media/2019/08/5d596136e2f8fb4ec61e9405_1566138678272.jpg',
      alt: 'Image 8',
      firstHalfTitle: 'Furniture',
    },
    {
      id: 8,
      itemImageSrc:
        'https://www.popoptiq.com/wp-content/uploads/2019/01/13-26-1.jpg.webp',
      alt: 'Image 9',
      firstHalfTitle: 'Fun & ',
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
            <div key={index} className='col-12 sm:col-6 md:col-4 lg:col-3 p-1'>
              <div className='h-full py-3 shadow-3 border-round-2xl flex flex-column justify-content-between  '>
                <div className='flex flex-column align-items-center justify-content-center'>
                  <div className='overflow-hidden'>
                    <div
                      className='bg-contain bg-center bg-no-repeat h-10rem w-20rem'
                      style={{
                        backgroundImage: `url(${image.itemImageSrc})`,
                      }}></div>
                  </div>
                </div>
                <div className=' text-center'>
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
