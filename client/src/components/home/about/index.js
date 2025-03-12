import React, { useEffect, useRef } from 'react'
import { Image } from 'primereact/image'
import 'aos/dist/aos.css'
import AOS from 'aos'
import { useTranslation } from 'react-i18next'
import { Col, Container, Row } from 'react-bootstrap'
import imageSrc1 from '../../../assets/images/FPO.webp'
import imageSrc2 from '../../../assets/images/WIN.webp'
import imageSrc3 from '../../../assets/images/CONS.webp'

export default function AboutUsComponent() {
  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  const secondSectionRef = useRef(null)
  const thirdSectionRef = useRef(null)

  const scrollToSection = ref => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth',
      })
    }
  }
  return (
    <>
      <div className='w-full'></div>
      <Container className='w-full'>
        <Row>
          <Col>
            <h3>About Us</h3>
            <p>
              We at Wingrow Agritech facilitate direct interaction between
              consumers and farmers. Consumers get access to produce direct from
              farms which is much fresher and lasts longer, at reasonable
              prices.
            </p>
          </Col>
        </Row>
        <Row md={12} className='flex-column text-center'>
          <Col>
            <Image
              src={imageSrc1}
              alt='Farm Produce Overview'
              data-aos='zoom-in'
              width='250'
            />
            <div
              data-aos='fade-down'
              onClick={() => scrollToSection(secondSectionRef)}>
              <Image
                src='https://cdn-icons-png.flaticon.com/512/545/545678.png'
                alt='Scroll Down'
                className='p-4 mb-2'
                width='80'
              />
            </div>
          </Col>
          <Col ref={secondSectionRef}>
            <Image
              src={imageSrc2}
              alt='Fresh Produce'
              data-aos='zoom-in'
              width='250'
            />
            <div
              data-aos='fade-down'
              onClick={() => scrollToSection(thirdSectionRef)}>
              <Image
                src='https://cdn-icons-png.flaticon.com/512/2989/2989972.png'
                alt='Scroll Down'
                className='p-4 mb-2'
                width='80'
              />
            </div>
          </Col>
          <Col ref={thirdSectionRef}>
            <Image
              src={imageSrc3}
              alt='Consumer Satisfaction'
              data-aos='zoom-in'
              width='250'
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}
