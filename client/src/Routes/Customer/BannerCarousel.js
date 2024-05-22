import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

class BannerCarousel extends Component {
    render() {
        return (
            <Carousel 
            // responsive={responsive}
            containerClass="carousel-container"
            itemClass="carousel-item-padding-40-px"
            dotListClass="custom-dot-list-style"
            draggable={false}
            showDots={false}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={4000}
            keyBoardControl={true}>
                <div>
                    <img src="https://www.thefruitshop.in/images/header3/slider3.jpg" />
                </div>
                <div>
                    <img src="https://www.thefruitshop.in/images/header3/slider1.png" />
                </div>
                <div>
                    <img src="https://www.thefruitshop.in/images/header3/slider2.jpg" />
                </div>
            </Carousel>
        );
    }
};

export default BannerCarousel;