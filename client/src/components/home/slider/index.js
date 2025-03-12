import React from 'react'
import { Carousel } from 'primereact/carousel'

export default function SliderComponent({ slides }) {
  const responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1,
    },
  ]

  const slideTemplate = slide => {
    return (
      <div className='  text-center '>
        <div className='mb-3'>
          {slide.isImage && (
            <>
              <img
                src={slide.url}
                alt={slide.name}
                className='bg-contain h-20rem md:h-30rem w-full border-round-xl'
              />
            </>
          )}
          {!slide.isImage && (
            <>
              <video
                width='100%'
                height=''
                autoPlay
                loop
                muted
                className='bg-cover h-20rem md:h-30rem w-full border-round-xl'>
                <source src={slide.url} type='video/mp4' />
                Your browser does not support the video tag.
              </video>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      <Carousel
        value={slides}
        numVisible={1}
        numScroll={1}
        responsiveOptions={responsiveOptions}
        itemTemplate={slideTemplate}
        circular
        autoplayInterval={2000}
      />
    </div>
  )
}
