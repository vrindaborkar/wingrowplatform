import React from "react";
import { Carousel } from "primereact/carousel";


export default function SliderComponent({ slides }) {
  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];


  const slideTemplate = (slide) => {
    return (
      <div className="  text-center ">
        <div className="mb-3">
          {slide.isImage && (
            <>
              <img
                src={slide.url}
                alt={slide.name}
                className="w-full h-30rem border border-round-xl border-green-400"
              />
            </>
          )}
          {!slide.isImage && (
            <>
              <video
                width="100%"
                height=""
                autoPlay
                loop
                muted
                className="w-full h-30rem  border-round-xl "
              >
                <source src={slide.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <Carousel
        value={slides}
        numVisible={1}
        numScroll={1}
        responsiveOptions={responsiveOptions}
        itemTemplate={slideTemplate}
        circular
        autoplayInterval={120000}
      />
    </div>
  );
}
