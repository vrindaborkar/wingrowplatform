import React, { useState, useEffect } from 'react'
import '../styles/Home.css'
import Location from '../components/Location';
import AOS from 'aos'
import 'aos/dist/aos.css';
import Footer from '../components/Footer';
import useWindowDimensions from '../components/useWindowDimensions'
import { useNavigate, Link } from 'react-router-dom';
import Measures from '../components/Measures';
import { useTranslation } from "react-i18next";
import AuthService from '../services/auth.service';
import FarmerService from '../services/farmer.service';
// import NavMenu from '../components/NavMenu';

const About = ({ t, languages }) => {
  const[stallsBooked,setStallsBooked] = useState([])
  const[mobile, setmobile] = useState(false)
  useEffect(() => {
    AOS.init({
      duration: 600,
    });
  }, [])

  const { i18n } = useTranslation();

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  const { width } = useWindowDimensions()

  useEffect(() => {
    if (width < 800) {
      setmobile(true)
    } else {
      setmobile(false)
    }
  }, [width])

  useEffect(()=>{
    FarmerService.getBookedStalls().then(res => {
      const data = res?.data;
      setStallsBooked(data)
    
    })
  })

  const navigate = useNavigate()
  const user = AuthService.getCurrentUser()

  return (
    <div className='home_container'>
      <select onChange={changeLanguage} value={i18n.language} >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
      


      <div className='book-btn-section'>
        <h1>{t('tagline1_home')}</h1>
        <h2>{t('tagline2_home')}</h2>
        <button onClick={() => {
          console.log(user)
          if (user === null) {
            navigate('/home/temp');
          }

          else {
            navigate('/farmers/stallplaces')
          }
        }}
          className="bookstall_btn">
          {t('book_stall')}
        </button>
        <button style={{ marginLeft: '3px' }} onClick={() => { window.open('https://wingrowagritech.com ') }} className="bookstall_btn_about">
          {t('about_heading')}
        </button>
      </div>
      
      {/* <div  className='book-btn-section'>
        <h1>Number of Booked Stalls : {stallsBooked.length + 2000}</h1>
      </div> */}

      {/* <div className='first_section'>
        <div className='first_section_component'>
          <img src="./images/imgbook.png" alt='stall_logo' className='first_image_section' />
          <h1 data-aos="fade-right" className="first_section_header">
            <span>{t('tagline1_home')} </span>
            <span>BOOKING FOR DIRECT SELL</span>
          </h1>
          <div data-aos="fade-up" className="first_section_btn">
            <button onClick={() => { navigate('/farmers/stallplaces') }} className="bookstall_btn">
              Book Stall
            </button>
          </div>
          <div data-aos="fade-up" className="first_section_btn">
            <Link to="https://www.wingrowagritech.com/"><button className="knowmore_btn">
              Know More
            </button></Link>
          </div>
        </div>

        <div className="first_section_image">
          <img className="image_header" alt="hero" src="./images/centerimagenew.png" />
        </div>

      </div>  */}



      {/* corousal */}
      <div id="carouselExampleCaptions" className="carousel slide " data-bs-ride="carousel" data-bs-interval="3000" >
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={1} aria-label="Slide 2" />
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={2} aria-label="Slide 3" />
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active carousel22">
            <img src="./images/7.png" alt="..." />
            <div className="carousel-caption cc">
              {/* <h3 className="Label">First slide label</h3>
         <p className="caption">Some representative placeholder content for the first slide.</p>
         <button className="navigate">Book Stall</button>
         <button className="navigate">Know More</button> */}
            </div>
          </div>
          <div className="carousel-item carousel22">
            <img src="./images/1.png" alt="..." />
            <div className="carousel-caption cc">
              {/* <h3 className="Label">Second slide label</h3>
         <p className="caption">Some representative placeholder content for the second slide.</p>
         <button className="navigate">Navigate</button> */}
            </div>
          </div>
          <div className="carousel-item carousel22">
            <img src="./images/6.png" alt="..." />
            <div className="carousel-caption cc">
              {/* <h3 className="Label">Third slide label</h3>
         <p className="caption">Some representative placeholder content for the third slide.</p>
         <button className="navigate">Navigate</button> */}
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div data-aos="fade-right" className="transimg">
        <img src="./images/transpic.png" alt="Skytsunami" />
      </div>
      <div className='third_section'>
        <div className="third_section_details">
          <h1 className="third_section_header">{t('our_market_heading')}</h1>
          <p className="third_section_p">{t('our_market')}</p>
        </div>
        <div className='location_component'>
          <Location
            t={t}
          />
        </div>
        
        {/* {mobile?
        <NavMenu
       />:console.log("hi")} */}
      </div>
      
      <div data-aos="fade-left" className="transimgr">
        <img src="./images/raspberry.png" alt="Skytsunami" />
      </div>

      {!mobile ?
        <div className='second_section_wrapper'>
          <div className='second_section_aboutus'>
            <h2 className='h2_style'>{t('about_heading')}</h2>
            <p className='p_style'>{t('about')}</p>
          </div>
          <div className='second_section'>
            <div data-aos="zoom-in" data-aos-offset="300" data-aos-easing="ease-in-sine" className='second_section_component'>
              <img src='./images/FPO.webp' alt='img' className='second_section_img' />

            </div>

            <div data-aos="fade-down" className='second_section_component_arrow'>
              <img src='https://cdn-icons-png.flaticon.com/512/664/664866.png' alt='img' className='second_section_img' />
            </div>

            <div data-aos="zoom-in" data-aos-offset="300" data-aos-easing="ease-in-sine" className='second_section_component'>
              <img src='./images/WIN.webp' alt='img' className='second_section_img' />
            </div>

            <div data-aos="fade-down" className='second_section_component_arrow'>
              <img src='https://cdn-icons-png.flaticon.com/512/3183/3183354.png' alt='img' className='second_section_img' />
            </div>

            <div data-aos="zoom-in" data-aos-offset="300" data-aos-easing="ease-in-sine" className='second_section_component'>
              <img src='./images/CONS.webp' alt='img' className='second_section_img' />
            </div>
          </div>
        </div>
        :
        <div className='second_section_wrapper'>
          <div className='second_section_aboutus'>
            <h2 className='h2_style'>{t('about_heading')}</h2>
            <p className='p_style'>{t('about')}</p>
          </div>
          <div className='second_section'>
            <div data-aos="zoom-in" data-aos-offset="300" data-aos-easing="ease-in-sine" className='second_section_component'>
              <img src='./images/FPO.webp' alt='img' className='second_section_img' />
            </div>

            <div data-aos="fade-down" className='second_section_component_arrow'>
              <img src='https://cdn-icons-png.flaticon.com/512/545/545678.png ' alt='img' className='second_section_img' />
            </div>

            <div data-aos="zoom-in" data-aos-offset="300" data-aos-easing="ease-in-sine" className='second_section_component'>
              <img src='./images/WIN.webp' alt='img' className='second_section_img' />
            </div>

            <div data-aos="fade-down" className='second_section_component_arrow'>
              <img src='https://cdn-icons-png.flaticon.com/512/2989/2989972.png' alt='img' className='second_section_img' />
            </div>

            <div data-aos="zoom-in" data-aos-offset="300" data-aos-easing="ease-in-sine" className='second_section_component'>
              <img src='./images/CONS.webp' alt='img' className='second_section_img' />
            </div>
          </div>
        </div>
      }


      <div data-aos="fade-right" className="transimg">
        <img src="./images/cherryleft.png" alt="Skytsunami" />
      </div>

      <div className='keyfeature_section'>
        <h2>{t('key_features')}</h2>
        <div className='keys'>
          <div className='keyfeature_container'>
            <ol className="listed">
              <li class="" data-aos="fade-left" className="h a">{t('key_feature1')}</li>
              <li class="" data-aos="fade-left" className="h a">{t("key_feature2")}</li>
              <li class="" data-aos="fade-left" className="h a">{t("key_feature3")}</li>
              <li class="" data-aos="fade-left" className="h a">{t("key_feature4")}</li>
            </ol>
          </div>
          <img src='./images/centerimagenew.png' alt='img' />
          <div className='keyfeature_container'>
            <ol class="listed">
              <li class="" data-aos="fade-right" className="h a">{t("key_feature5")}</li>
              <li class="" data-aos="fade-right" className="h a">{t("key_feature6")}</li>
              <li class="" data-aos="fade-right" className="h a">{t("key_feature7")}</li>
              <li class="" data-aos="fade-right" className="h a">{t("key_feature8")}</li>
            </ol>
          </div>
        </div>
      </div>


      <div className='fourth_section'>
        <div className='fourthsec_content'>
          <h2>{t('farmer_to_customer')}</h2>
          <h3>{t('order_shipment')}</h3>
          <p>{t('farmer_to_customer_para')}</p>
        </div>
        <img className="fourthsec_pic" src="./images/home_vegetables_pic4.webp"></img>
      </div>
      <div data-aos="fade-left" className="transimgr">
        <img src="./images/cherryright.png" alt="Skytsunami" />
      </div>

      <div className='fifth_section'>
        <h2>{t('response_to_covid_heading')}</h2>
        <p>{t('response_to_covid_para')}</p>
        <div className="measure_container">
          <Measures
            t={t}
          />
        </div>
        <Footer />
      </div>
      

      

    </div>


  )
}

export default About