import React, { useState } from 'react';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import { Button } from "primereact/button";

export default function Index() {
    const imageList = [
        {
            id: 1,
            imageUrl: 'https://previews.123rf.com/images/ewastudio/ewastudio1702/ewastudio170200662/73044956-farmers-market-vegetable-market-fresh-vegetables.jpg',
            alt: 'Image 1',
            location: 'Hadapsar',
            day: "monday",
        },
        {
            id: 2,
            imageUrl: 'https://thumbs.dreamstime.com/b/vegetable-market-6333220.jpg',
            alt: 'Image 2',
            location: 'Magarpatta',
            day: "tuesday",
        },
        {
            id: 3,
            imageUrl: 'https://c1.wallpaperflare.com/preview/401/383/592/farmers-market-fresh-vegetable-ripe.jpg',
            alt: 'Image 3',
            location: 'Wakad',
            day: "wednesday",
        },
        {
            id: 4,
            imageUrl: 'https://5.imimg.com/data5/ME/GI/MY-65021751/all-type-of-farm-fresh-vegetables-500x500.jpg',
            alt: 'Image 4',
            location: 'Swargate',
            day: "saturday",
        },
        {
            id: 5,
            imageUrl: 'https://previews.123rf.com/images/ewastudio/ewastudio1702/ewastudio170200662/73044956-farmers-market-vegetable-market-fresh-vegetables.jpg',
            alt: 'Image 5',
            location: 'Dighi',
            day: "friday",
        },
        {
            id: 6,
            imageUrl: 'https://previews.123rf.com/images/ewastudio/ewastudio1702/ewastudio170200662/73044956-farmers-market-vegetable-market-fresh-vegetables.jpg',
            alt: 'Image 6',
            location: 'Charholi',
            day: "saturday",
        },
        {
            id: 7,
            imageUrl: 'https://previews.123rf.com/images/ewastudio/ewastudio1702/ewastudio170200662/73044956-farmers-market-vegetable-market-fresh-vegetables.jpg',
            alt: 'Image 7',
            location: 'KaleWadi',
            day: "saturday",
        },
        {
            id: 8,
            imageUrl: 'https://previews.123rf.com/images/ewastudio/ewastudio1702/ewastudio170200662/73044956-farmers-market-vegetable-market-fresh-vegetables.jpg',
            alt: 'Image 8',
            location: 'Aundh',
            day: "saturday",
        },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 1;

    const getCurrentDay = () => {
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'saturday', 'friday', 'saturday'];
        const currentDayIndex = new Date().getDay();
        return days[currentDayIndex];
    };

    const [currentDay] = useState(getCurrentDay());

    const handlePrevPage = () => {
        setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => (prev < Math.ceil(filteredItems.length / itemsPerPage) ? prev + 1 : prev));
    };

    const filteredItems = imageList.filter(item => item.day === currentDay);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

    return (
        <>
            <Container className='p-3'>
                <h1>Live Markets</h1>
                <hr />
                <Row>
                    {filteredItems.length === 0 ? (
                        <Col>
                            <div className='p-5 text-center'>
                                <h2>No market today</h2>
                            </div>
                        </Col>
                    ) : (
                        currentItems.map((item) => (
                            <Col key={item.id} md={4} className='p-5'>
                                <Card className="shadow-3 mb-3 p-5 border-round-3xl" >
                                    <div className='flex flex-column align-items-center justify-content-center'>
                                        <Image src={item.imageUrl} alt={item.alt} width="250" className='border-round-3xl' />
                                        <div className='m-2'>{item.location}</div>
                                    </div>
                                    <div className='flex align-items-center justify-content-center text-xs gap-2'>
                                        <Button className='border-round-3xl' label="View Offers" />
                                        <Button className='border-round-3xl' label="Get Direction" />
                                    </div>
                                </Card>
                                <div className="flex align-items-center justify-content-center text-xs gap-2">
                                    <Button className='border-round-3xl' label='Previous' onClick={handlePrevPage} disabled={currentPage === 1} />
                                    <Button className='border-round-3xl ' label='Next' onClick={handleNextPage} disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)} />
                                </div>
                            </Col>
                        ))
                    )}
                </Row>
            </Container>
        </>
    );
}
