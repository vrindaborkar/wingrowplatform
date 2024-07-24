import React from 'react';
import { t } from 'i18next';
import { Image } from 'primereact/image';
import { Col, Container, Row } from 'react-bootstrap';

export default function ProductCategory() {
    const images = [
        {
            id: 0,
            itemImageSrc: 'https://post.healthline.com/wp-content/uploads/2020/08/fruits-and-vegetables-thumb.jpg',
            alt: 'Image 1',
            firstHalfTitle: "Fruits And",
            secHalfTitle: "Vegetables"
        },
        {
            id: 1,
            itemImageSrc: 'https://cdn.shopify.com/s/files/1/0405/5164/5352/files/banner_300x.jpg?v=1647631081',
            alt: 'Image 2',
            firstHalfTitle: "Snacks"
        },
        {
            id: 2,
            itemImageSrc: "https://pibindia.files.wordpress.com/2016/12/istock_000020447381_medium.jpg?w=1400",
            firstHalfTitle: "Pulses &",
            secHalfTitle: "Grains",
            alt: 'Image 3',
        },

        {
            id: 3,
            itemImageSrc: 'https://static.vecteezy.com/system/resources/thumbnails/007/558/975/small/nature-organic-product-logo-with-hand-and-leaf-design-template-free-vector.jpg',
            alt: 'Image 4',
            firstHalfTitle: "Organic",
            secHalfTitle: "Products"
        },

        {
            id: 4,
            itemImageSrc: 'https://domf5oio6qrcr.cloudfront.net/medialibrary/9685/iStock-544807136.jpg',
            alt: 'Image 5',
            secHalfTitle: "Products"
        },
        {
            id: 5,
            itemImageSrc: 'https://shilpaahuja.com/wp-content/uploads/2018/03/latest-saree-designs-trends-style-fashion-indian-designer-summer-2018.jpg',
            alt: 'Image 6',
            firstHalfTitle: "Fashion"
        },
        {
            id: 6,
            itemImageSrc: 'https://m.media-amazon.com/images/I/91gbfULvW0L._AC_SL1500_.jpg',
            alt: 'Image 7',
            firstHalfTitle: "Toys & ",
            secHalfTitle: "Baby Products"
        },
        {
            id: 7,
            itemImageSrc: 'https://imgmedia.lbb.in/media/2019/08/5d596136e2f8fb4ec61e9405_1566138678272.jpg',
            alt: 'Image 8',
            firstHalfTitle: "Furniture"
        },
        {
            id: 8,
            itemImageSrc: 'https://www.popoptiq.com/wp-content/uploads/2019/01/13-26-1.jpg.webp',
            alt: 'Image 9',
            firstHalfTitle: "Fun & ",
            secHalfTitle: "Entertaiment"
        }
    ];

    return (
        <>
        {/* // eslint-disable-next-line  */}
            <Container className='min-w-screen p-3 '>
            <h1>Product Categories</h1>
            <hr/>
                <Row className=' gap-5 border-round-md pl-3'>
                    {images.map(image => (
                        <Col key={image.id} md={3} xs={3}>
                            <div className="flex flex-col justify-content-center text-center"
                                style={{ height: '150px' }}>
                                <div className='p-3 border border-round-md text-xs shadow-3'>
                                    <Image
                                        src={image.itemImageSrc}
                                        alt={image.alt}
                                        height='70'
                                        width="70"
                                        className=''
                                    />
                                    <div>
                                        <div className='mt-2'>{t(image.firstHalfTitle)}<p>{t(image.secHalfTitle)}</p></div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}
