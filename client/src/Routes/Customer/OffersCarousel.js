import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

class OffersCarousel extends Component {
    render() {
        return (
            <Carousel autoPlay>
                <div className='caro'>
                    <img src="https://www.thefruitshop.in/images/header3/slider3.jpg" />
                </div>
                <div className='caro'>
                    <img src="https://www.thefruitshop.in/images/header3/slider1.png" />
                </div>
                <div className='caro'>
                    <img src="https://www.thefruitshop.in/images/header3/slider2.jpg" />
                </div>
            </Carousel>
        );
    }
};

export default OffersCarousel;