import React, { useState, useEffect } from 'react';

import { Carousel } from 'primereact/carousel';

export default function SliderComponent() {
    const [slides, setSlides] = useState([]);
    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ];



    useEffect(() => {
        const fetchSlides = async () => {
            const data = [
                { id: 1, name: 'Slide 1', image: 'slide-placeholder.png' },
                { id: 2, name: 'Slide 2', image: 'slide-placeholder.png' },
                { id: 3, name: 'Slide 3', image: 'slide-placeholder.png' },
            ];
            setSlides(data.slice(0, 3));
        };
        fetchSlides();
    }, []);

    const slideTemplate = (slide) => {
        return (
            <div className="  text-center ">
                <div className="mb-3">
                    <img src='https://wingrowmarket.com/images/7.png' alt={slide.name} className="w-100 h-30rem border border-round-xl border-green-400" />
                </div>
            </div>
        );
    };

    return (
        <div>
            <Carousel value={slides} numVisible={1} numScroll={1} responsiveOptions={responsiveOptions} itemTemplate={slideTemplate} circular
            autoplayInterval={3000}  />
        </div>
    );
}
