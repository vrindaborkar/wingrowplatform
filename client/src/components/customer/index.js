import React from 'react'
import ProductCategory from './productCategory'
import LiveMarket from './liveMarket'
import { Container } from 'react-bootstrap'
import SliderComponent from '../home/slider'
import FeedbackComponent from './feedback'

export default function CustomerComponent() {

    const slides = [
        {
            id: 1,
            name: "Slide 1",
            url: "https://www.thefruitshop.in/images/header3/slider3.jpg",
            isImage: true,
        },
        {
            id: 2,
            name: "Slide 2",
            url: "https://www.thefruitshop.in/images/header3/slider1.png",
            isImage: true,
        },
        {
            id: 3,
            name: "Slide 3",
            url: "https://www.thefruitshop.in/images/header3/slider2.jpg",
            isImage: true,
        },
    ];
    return (
        <><Container>
            <div>
                <SliderComponent slides={slides} />
            </div>
            <div>
                <LiveMarket />
            </div>
            <div>
                <ProductCategory />
            </div>
            <div>
                <FeedbackComponent />
            </div>
        </Container>
        </>

    )
}
