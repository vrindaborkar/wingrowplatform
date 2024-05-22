import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./Customer.css";
import Navbar from '../../components/Navbar';

// Added
// import { Divider } from "@mui/material";
import ProductCategory from "./ProductCategory";
import OffersCarousel from "./OffersCarousel";
import BannerCarousel from "./BannerCarousel";
import Feedback from "./Feedback";
import ViewOffers from "../../components/ViewOffers"
import $ from 'jquery';
import Flickity from 'flickity';
import 'flickity/dist/flickity.min.css'; // import Flickity CSS
import axios from "axios";
import UserService from "../../services/user.service";
import { WithContext as ReactTags } from "react-tag-input";
import { Modal, Backdrop, Fade } from "@mui/material";
import NavMenu from '../../components/NavMenu';
import useWindowDimensions from '../../components/useWindowDimensions';
import { marketData } from '../../constants/Data';

// const cards = [
//   { img: 'https://media.timeout.com/images/105263065/750/422/image.jpg', title: 'Card title 1', time: '00:00 am - 00:00 pm' },
//   { img: 'https://media.timeout.com/images/105263065/750/422/image.jpg', title: 'Card title 2', time: '00:00 am - 00:00 pm' },
//   { img: 'https://media.timeout.com/images/105263065/750/422/image.jpg', title: 'Card title 3', time: '00:00 am - 00:00 pm' },
//   { img: 'https://media.timeout.com/images/105263065/750/422/image.jpg', title: 'Card title 4', time: '00:00 am - 00:00 pm' },
//   { img: 'https://media.timeout.com/images/105263065/750/422/image.jpg', title: 'Card title 5', time: '00:00 am - 00:00 pm' },
//   { img: 'https://media.timeout.com/images/105263065/750/422/image.jpg', title: 'Card title 6', time: '00:00 am - 00:00 pm' },
//   { img: 'https://media.timeout.com/images/105263065/750/422/image.jpg', title: 'Card title 7', time: '00:00 am - 00:00 pm' },
//   { img: 'https://media.timeout.com/images/105263065/750/422/image.jpg', title: 'Card title 8', time: '00:00 am - 00:00 pm' },
//   { img: 'https://media.timeout.com/images/105263065/750/422/image.jpg', title: 'Card title 9', time: '00:00 am - 00:00 pm' },
// ];
var cards = [];

const CustomersLandingpage = ({t}) => {


  const [open, setOpen] = useState()

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    setIsMobile(mediaQuery.matches);
    const listener = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addListener(listener);

    return () => {
      mediaQuery.removeListener(listener)
    }

  }, []);


  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(0);

  useEffect(() => {

    if (isMobile) {
      setItemsPerPage(1)
    }
    else {
      setItemsPerPage(3)
    }
  }, [isMobile]);
  const maxPages = Math.ceil(marketData.length / itemsPerPage);



  const handleClick = (type) => {
    if (type === "prev") {
      setPage((prev) => prev - 1);
    } else if (type === "next") {
      setPage((prev) => prev + 1);
    }
  };


  const { REACT_APP_API_URL } = process.env;

  const [marketName, setMarketName] = useState("");
  const [direction, setDirection] = useState("");
  const [tags, setTags] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [data, setData] = useState([]);
  var showData = [];

  useEffect(() => {
    function getData() {
      UserService.getMarkets().then((res) => {
        if (res) {
          const { data } = res
          setData(data)
          console.log(data)
          cards = data;

        }
      })
        .catch((err) => {
          console.log(err.message)
        })
    }


    getData();
  }, []);

  const [mobile, setmobile] = useState(false)

  const { width } = useWindowDimensions()

  useEffect(() => {
    if (width < 850) {
      setmobile(true)
    } else {
      setmobile(false)
    }
  }, [width])


  return (
    <div className="customers_landing_page">

      <div className="offerCarousel-container">
        <OffersCarousel />
      </div>

      {/* <div>
        {Array.isArray(data) && data.map((market) => (
          <div key={market._id}>
            <h2>{market.marketName}</h2>
            <p>{market.direction}</p>
            <ReactTags tags={market.tags} readOnly={true} />
            <p>{market.date}</p>
          </div>
        ))}
      </div> */}

      {/* <div data-aos="fade-left" className="transimgrC">
        <img src="./images/apples.png" alt="Skytsunami" />
      </div>
      <div className="first_header">
        <h1 className="divider" textAlign="left" data-aos="fade-right">
          {t("live_markets")}
        </h1>
      
        <i data-aos="fade-right" class="fa-sharp fa-solid fa-location-dot fa-4x"></i>
      </div> */}
      

      <div className='liveMarket'>
        <h1>Live Markets</h1>
        <hr/>
      </div>

      <>

      <div className='markets'>
      {
        marketData
            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map((data, index) => (
         
        <div className='marketData' key={index}>
          <div className='marketImages'><img src={'https://media.timeout.com/images/105263065/750/422/image.jpg'} alt="markets"/></div>
          <h2>{data.location}</h2>
          <div className='downButton'>
          <a className="btn btn-primary" onClick={() => setOpen(true)}>
                    {t("View_Offers")}
          </a>
          <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{ timeout: 500 }}
                  >
                    <Fade in={open}>
                      <div className="offer-box">
                        <div className='column'>
                        <h2>Commodity</h2>
                        <h6>Comm 1</h6>
                        <h6>Comm 2</h6>
                        <h6>Comm 3</h6>
                      
                        </div>
                        <div className='column'>
                        <h2>Quantity</h2>
                        <h6>Quantity 1</h6>
                        <h6>Quantity 2</h6>
                        <h6>Quantity 3</h6>
                        
                        </div>
                        <div className='column'>
                        <h2>Offer rate</h2>
                        <h6>Offer rate 1</h6>
                        <h6>Offer rate 2</h6>
                        <h6>offer rate 3</h6>
                        
                        </div>
                        
                        {/* <ul>
                          {card.offers.map((offer) => (
                            <li key={offer.id}>{offer.text}</li>
                          ))}
                        </ul> */}
                      </div>
                    </Fade>
            </Modal>
            <a href="#" className="btn btn-primary">
                    {t("get_direction")}
            </a>
            </div>
            {/* <hr style={{margin: '0px 20px 15px 20px'}}></hr> */}
        </div>
      ))}
      </div>
      <div className="d-flex justify-content-center mt-3">
          <button
            className="btn btn-primary me-3"
            onClick={() => handleClick("prev")}
            disabled={page === 1}
          >
            {t("Previous")}
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleClick("next")}
            disabled={page === maxPages}
          >
            {t("Next")}
          </button>
        </div>
      
        {/* <div className="cards-wrapper">
          {cards
            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map((card, index) => (
              <div className="card" key={index}>
                <img
                  src='https://media.timeout.com/images/105263065/750/422/image.jpg'
                  className="card-img-top"
                  alt="card image"
                />
                <div className="card-body">
                  <h5 className="card-title">{t(card.marketName)}</h5>
                  <p className="card-text">{card.bookedAt}</p>
                  <a className="btn btn-primary" onClick={() => setOpen(true)}>
                    {t("View_Offers")}
                  </a>

                  <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{ timeout: 500 }}
                  >
                    <Fade in={open}>
                      <div className="offer-box">
                        <h5>{t("Offers")}:</h5>
                        <ul>
                          {card.offers.map((offer) => (
                            <li key={offer.id}>{offer.text}</li>
                          ))}
                        </ul>
                      </div>
                    </Fade>
                  </Modal>



                  <a href="#" className="btn btn-primary">
                    {t("get_direction")}
                  </a>
                </div>
              </div>
            ))}
        </div> */}
        {/* <div className="d-flex justify-content-center mt-3">
          <button
            className="btn btn-primary me-3"
            onClick={() => handleClick("prev")}
            disabled={page === 1}
          >
            {t("Previous")}
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleClick("next")}
            disabled={page === maxPages}
          >
            {t("Next")}
          </button>
        </div> */}
      </>


      {/* <div className='line1'>
        <h1>
          {t("We got the perfect products for your needs")}
        </h1>
      </div> */}

      <div className='liveMarket'>
        <h1>Product Categories</h1>
        <hr id='productID'/>
      </div>
      <div className="product-categories" >
        <div className="categories-holder" data-aos="zoom-in">
          {/* <div class="containerCustomer">
            <div class="cardCustomer">
              <ProductCategory
                link="./customerhome"
                imgsrc="https://post.healthline.com/wp-content/uploads/2020/08/fruits-and-vegetables-thumb.jpg"
                firstHalfTitle="Fruits And"
                secHalfTitle="Vegetables"
              />
            </div>
            <div class="cardCustomer">
              <h1>Vallal</h1>
              <div>Good at: Front-end web development</div>
              <div>Experience(in yrs): 4</div>
            </div>
            <div class="cardCustomer">
              <h1>John</h1>
              <div>Good at: Full-stack development</div>
              <div>Experience(in yrs): 6</div>
            </div>
          </div> */}
          <ProductCategory
            link="./customerhome"
            imgsrc="https://post.healthline.com/wp-content/uploads/2020/08/fruits-and-vegetables-thumb.jpg"
            firstHalfTitle="Fruits And"
            secHalfTitle="Vegetables"
            t={t}
          />

          <ProductCategory
            link="./customersnacks"
            imgsrc="https://cdn.shopify.com/s/files/1/0405/5164/5352/files/banner_300x.jpg?v=1647631081"
            firstHalfTitle="Snacks"
            t={t}
          />

          <ProductCategory
            imgsrc="https://pibindia.files.wordpress.com/2016/12/istock_000020447381_medium.jpg?w=1400"
            firstHalfTitle="Pulses &"
            secHalfTitle="Grains"
            t={t}
          />

          <ProductCategory
            imgsrc="https://static.vecteezy.com/system/resources/thumbnails/007/558/975/small/nature-organic-product-logo-with-hand-and-leaf-design-template-free-vector.jpg"
            firstHalfTitle="Organic"
            secHalfTitle="Products"
            t={t}
          />

          <ProductCategory
            imgsrc="https://domf5oio6qrcr.cloudfront.net/medialibrary/9685/iStock-544807136.jpg"
            firstHalfTitle="Dairy"
            secHalfTitle="Products"
            t={t}

          />

          <ProductCategory
            imgsrc="https://shilpaahuja.com/wp-content/uploads/2018/03/latest-saree-designs-trends-style-fashion-indian-designer-summer-2018.jpg"
            firstHalfTitle="Fashion"
            t={t}

          />

          <ProductCategory
            imgsrc="https://m.media-amazon.com/images/I/91gbfULvW0L._AC_SL1500_.jpg"
            firstHalfTitle="Toys & "
            secHalfTitle="Baby Products"
            t={t}

          />

          <ProductCategory
            imgsrc="https://imgmedia.lbb.in/media/2019/08/5d596136e2f8fb4ec61e9405_1566138678272.jpg"
            firstHalfTitle="Furniture"
            t={t}

          />
          <ProductCategory
            imgsrc="https://www.popoptiq.com/wp-content/uploads/2019/01/13-26-1.jpg.webp"
            firstHalfTitle="Fun & "
            secHalfTitle="Entertaiment"
            t={t}
          />
        </div>
      </div>
      <div data-aos="fade-left" className="transimgrC">
        <img src="./images/cherryright.png" alt="Skytsunami" />
      </div>


      <div className='liveMarket'>
        <h1>Top Sellers</h1>
        <hr id='liveHR' />
      </div>
      {/* <div className="top-product">
        <div className="product">
          <img src="https://images.immediate.co.uk/production/volatile/sites/30/2021/11/carrots-953655d.jpg" />
          <h5>Carrots</h5>
        </div>
        <div className="product">
          <img src="https://images.immediate.co.uk/production/volatile/sites/30/2021/11/carrots-953655d.jpg" />
          <h5>Carrots</h5>
        </div>
        <div className="product">
          <img src="https://images.immediate.co.uk/production/volatile/sites/30/2021/11/carrots-953655d.jpg" />
          <h5>Carrots</h5>
        </div>
        <div className="product">
          <img src="https://images.immediate.co.uk/production/volatile/sites/30/2021/11/carrots-953655d.jpg" />
          <h5>Carrots</h5>
        </div>
      </div> */}

      <>
      
      <div className='topSellers'>
      {
      marketData.map(data=>(
        <div className='marketData' >
          <div className='marketImages' ><img src={data.url} alt="markets"/></div>
          <h2 style={{textAlign: 'center'}}>{data.location}</h2>
        </div>
      ))
      
    }
      </div>
      
      
       <div className="offerCarousel-container">
        <OffersCarousel />
      </div>

      </>


      {/* <div className="banner-carousel-container">
        <BannerCarousel />
      </div> */}
      {/* <Divider className="divider" textAlign="left">
        Feedback
      </Divider>
      <div className="feedback-container">
        <Feedback />
      </div> */}
      {/* <div className='line1'>
        <h1>
          {t("Help us improve your experience")}
        </h1>
      </div>
      <div data-aos="fade-left" className="transimgrC">
        <img src="./images/apples.png" alt="Skytsunami" />
      </div> */}
      <div className='liveMarket'>
        <h1>Feedback</h1>
        <hr id='feedbackHR'/>
      </div>
      <div className='feedback'>
        <div className="feedback-container">
          <Feedback 
            t={t}
          />
        </div>
      </div>
      <div className='pageBottom' ></div>
      {/* {mobile ? <NavMenu
      /> : console.log("desktop")} */}
    </div>
  );
};

export default CustomersLandingpage;
