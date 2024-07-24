import React, { useEffect, useRef } from "react";
import StallBookingComponent from "../../components/stallBooking/index.js";
import "aos/dist/aos.css";
import AOS from "aos";
import { Image } from 'primereact/image';
import { useTranslation } from "react-i18next";
import imageSrc1 from "../../assets/images/FPO.webp";
import imageSrc2 from "../../assets/images/WIN.webp";
import imageSrc3 from "../../assets/images/CONS.webp";
import { Col, Container, Row } from "react-bootstrap";

const AboutUsScreen = () => {

  return ( (
    <>
      <h1>
    <StallBookingComponent />
  </h1>
    </>
  ));
};
export default AboutUsScreen;
