import React, { useState, useEffect } from 'react';
import { Galleria } from 'primereact/galleria';
import Customer from '../../components/customer';
import SliderComponent from '../../components/home/slider';

const PhotoService = {
    getImages: () => {
        return new Promise((resolve) => {
            const images = [
                {
                    itemImageSrc: 'https://cff2.earth.com/uploads/2022/08/05131522/Nature-960x640.jpg',
                    alt: 'Image 1'
                },
                {
                    itemImageSrc: 'https://sb.ecobnb.net/app/uploads/sites/3/2020/01/nature.jpg',
                    alt: 'Image 2'
                },

                {
                    itemImageSrc: 'https://cff2.earth.com/uploads/2022/08/05131522/Nature-960x640.jpg',
                    alt: 'Image 1'
                },
                {
                    itemImageSrc: 'https://sb.ecobnb.net/app/uploads/sites/3/2020/01/nature.jpg',
                    alt: 'Image 2'
                },

            ];
            resolve(images);
        });
    }
};

export default function CustomerScreen() {
    const [images, setImages] = useState(null);
    const [inside, setInside] = useState(true);

    useEffect(() => {
        PhotoService.getImages().then((data) => setImages(data));
    }, []);

    const itemTemplate = (item) => {
        return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
    };


    return (

        <>
        <SliderComponent itemTemplate={itemTemplate} />
        <Customer />
            {/* <div className="card">
                {images && (
                    <div className="card">
                        <Galleria value={images} style={{ maxWidth: '640px' }} showThumbnails={false} showIndicators
                            showIndicatorsOnItem={inside} item={itemTemplate} />
                    </div>
                )}

            </div> */}
        </>
    );
}
