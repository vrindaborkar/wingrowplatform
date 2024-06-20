import React, { useEffect } from "react";
import { Image } from 'primereact/image';
import "aos/dist/aos.css";
import AOS from "aos";
import { useTranslation } from "react-i18next";
import { Col, Container, Row } from 'react-bootstrap';

export default function KeyFeatureCompnent() {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);
    const { t } = useTranslation();

    return (
        <>
            <Container>
                <Row className="p-4 mb-2 text-center">
                    <h2>{t ? t('key_features') : 'Key Features'}</h2>
                    <div className="xl:flex flex-row justify-content-center text-white">
                        <Col className="flex-column align-items-center">
                            {[...Array(4)].map((_, index) => (
                                <Col key={index} className="flex" data-aos="fade-left">
                                    <div className="bg-green-400 p-3 w-10 text-xs border-round-3xl flex-column">
                                        {t ? t(`key_feature${index + 1}`) : `Key Feature ${index + 1}`}
                                    </div>
                                    <div className="bg-red-400 border-round-3xl text-center p-3 ml-5">{index + 1}</div>
                                </Col>
                            ))}
                        </Col>
                        <Image src="https://www.wingrowmarket.com/images/centerimagenew.png" alt="Center" width="300" />
                        <Col className="flex-column align-items-center">
                            {[...Array(4)].map((_, index) => (
                                <Col key={index + 4} className="flex" data-aos="fade-left">
                                    <div className="bg-green-400 p-3 w-10 text-xs border-round-3xl flex-column">
                                        {t ? t(`key_feature${index + 5}`) : `Key Feature ${index + 5}`}
                                    </div>
                                    <div className="bg-red-400 border-round-3xl text-center p-3 ml-5">{index + 5}</div>
                                </Col>
                            ))}
                        </Col>
                    </div>
                </Row>
            </Container>
        </>
    )
}
