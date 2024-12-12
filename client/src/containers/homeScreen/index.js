import React, { useEffect, useState } from "react";
import SliderComponent from "../../components/home/slider";
import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Carousel } from "primereact/carousel";
import { Rating } from "primereact/rating";
import { baseUrl } from "../../services/PostAPI";
import axios from "axios";
import { API_PATH, ROUTE_PATH } from "../../constant/urlConstant";
import MarketComponent from "../../components/home/market";
import {
  CONS,
  FAST_DELIVERY,
  FPO,
  GRAPHS,
  HAND,
  LEFT_ARROW,
  LIGHT_BULB,
  PLANE,
  PODCAST,
  RIGHT_ARROW,
  RIGHT_CHERRY,
  TRASH_BIN,
  USER,
  UUSERS,
  VEGETABLES_BOX,
  WIN,
  WINGROW_SLIDE_ONE,
  WINGROW_SLIDE_THREE,
  WINGROW_SLIDE_TWO,
  WINGROW_VIDEO,
} from "../../assets/images";
import KeyFeatureCompnent from "../../components/home/keyFeature";
import { Image } from "primereact/image";
import FeedbackComponent from "../../components/customer/feedback";

const HomeScreen = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const feedbacksPerPage = 3;
  const handleNext = () => {
    if (currentIndex + feedbacksPerPage < feedbacks?.length) {
      setCurrentIndex(currentIndex + feedbacksPerPage);
    }
  };
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const isVerify = localStorage.getItem("isVerify");

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - feedbacksPerPage);
    }
  };
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        // const response = await axios.get(`${baseUrl}/api/feedback`);
        const response = await axios.get(`${baseUrl}${API_PATH.FEEDBACK.FETCH}`);
        setFeedbacks(response?.data?.feedback);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFeedback();
  }, []);
  const filteredFeedbacks = feedbacks?.filter(feedback => feedback?.stars > 2);
  // eslint-disable-next-line
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleBookStall = () => {
    navigate(ROUTE_PATH.FARMER.MARKET);
  };
  const smallSlides = [
    {
      id: 1,
      name: "video",
      url: WINGROW_VIDEO,
      isImage: false,
    },
    {
      id: 2,
      name: "Small Slide 2",
      url: WINGROW_SLIDE_ONE,
      isImage: true,
    },
    {
      id: 2,
      name: "Small Slide 3",
      url: WINGROW_SLIDE_ONE,
      isImage: true,
    },
  ];

  const largeSlides = [
    {
      id: 1,
      name: "slide1",
      url: WINGROW_SLIDE_ONE,
      isImage: true,
    },
    {
      id: 2,
      name: "slide2",
      url: WINGROW_SLIDE_TWO,
      isImage: true,
    },
    {
      id: 3,
      name: "slide3",
      url: WINGROW_SLIDE_THREE,
      isImage: true,
    },
  ];
  const [slides, setSlides] = useState(largeSlides);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlides(smallSlides);
      } else {
        setSlides(largeSlides);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const aboutSection = [
    {
      id: 1,
      src: FPO,
      alt: "fpo",
      dataAos: "zoom-in",
      dataAosOffset: 300,
      dataAosEasing: "ease-in-sine",
      width: 300,
    },
    {
      id: 2,
      src: RIGHT_ARROW,
      alt: "Scroll Down",
      dataAos: "fade-down",
      width: 100,
    },
    {
      id: 3,
      src: WIN,
      alt: "win",
      dataAos: "zoom-in",
      dataAosOffset: 300,
      dataAosEasing: "ease-in-sine",
      width: 300,
    },
    {
      id: 4,
      src: LEFT_ARROW,
      alt: "Scroll Down",
      dataAos: "fade-down",
      width: 100,
    },
    {
      id: 5,
      src: CONS,
      alt: "cons",
      dataAos: "zoom-in",
      dataAosOffset: 300,
      dataAosEasing: "ease-in-sine",
      width: 300,
    },
  ];

  const covidSection = [
    {
      icon: FAST_DELIVERY,
      measure: t("covid_response1"),
      data: t("covid_response1_value"),
    },
    {
      icon: PLANE,
      measure: t("covid_response2"),
      data: t("covid_response2_value"),
    },
    {
      icon: UUSERS,
      measure: t("covid_response3"),
      data: t("covid_response3_value"),
    },
    {
      icon: PODCAST,
      measure: t("covid_response7"),
      data: t("covid_response7_value"),
    },
    {
      icon: HAND,
      measure: t("covid_response4"),
      data: t("covid_response4_value"),
    },
    {
      icon: TRASH_BIN,
      measure: t("covid_response5"),
      data: t("covid_response5_value"),
    },
    {
      icon: USER,
      measure: t("covid_response6"),
      data: t("covid_response6_value"),
    },
    {
      icon: LIGHT_BULB,
      measure: t("covid_response8"),
      data: t("covid_response8_value"),
    },
  ];

  return (
    <>
      <div className=" w-full mt-2 border-0 text-center">
        <h1 className="text-2xl md:text-4xl p-2">{t("tagline1_home")}</h1>
        <h4 className="p-2 mb-3">{t("tagline2_home")}</h4>
        <div className="mb-3">
          <Button
            label={t("book_stall")}
            onClick={handleBookStall}
            className="rounded"
          />
        </div>
        <h1 className="px-2 text-2xl md:text-3xl">
          Number of Booked Stalls : {2000}
        </h1>
        <SliderComponent slides={slides} />
        <div className="md:px-8 px-2">
          <div className="mb-2">
            <h1 className="font-semibold">{t("our_market_heading")}</h1>
            <p className="text-xl px-2 md:p-3">{t("our_market")}</p>
          </div>
          <div className=" md:p-4 px-2 mb-2">
            <MarketComponent />
          </div>

          <div className="md:p-4 p-2 mb-2 relative">
            <div
              data-aos="fade-right"
              className="absolute flex justify-content-end opacity-20 right-0"
            >
              <img src={GRAPHS} alt="rightCherry" className="h-6 w-5 " />
            </div>
            <h2 className="font-semibold">{t("about_heading")}</h2>
            <p className="text-xl md:p-">{t("about")}</p>
            <div className="w-full  mt-3 md:mt-8 md:flex md:flex-wrap md:flex-nowrap justify-content-between align-items-center">
              {aboutSection.map((item, index) => (
                <div
                  key={item.id}
                  data-aos={item.dataAos}
                  data-aos-offset={item.dataAosOffset || 0}
                  data-aos-easing={item.dataAosEasing || "ease-in-sine"}
                  className="flex-1 gap-1 flex align-items-center justify-content-center"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    className={`max-w-full h-auto ${
                      index % 2 !== 0 ? "arrow" : ""
                    }`}
                    width={item.width}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="px-2 md:p-4 p-2  w-full overflow-scroll">
            <KeyFeatureCompnent />
          </div>
          <div className="md:p-4 p-2 mb-2">
            <div className="md:flex justify-content-center align-items-cneter mb-2">
              <div className="">
                <h2 className="md:text-left font-bold">
                  {t("farmer_to_customer")}
                </h2>
                <h3 className="md:text-left text-green-600">
                  {t("order_shipment")}
                </h3>
                <p className="mt-2">{t("farmer_to_customer_para")}</p>
              </div>
              <div className="">
                <Image src={VEGETABLES_BOX} width={340} className="h-6 w-5 " />
              </div>
            </div>
          </div>
          <div className="md:p-4 p-2 mb-2 relative">
            <div
              data-aos="fade-right"
              className="absolute  flex justify-content-end opacity-20 right-0"
            >
              <img src={RIGHT_CHERRY} alt="RIGHT_CHERRY" className="h-6 w-5 " />
            </div>
            <h2>{t("response_to_covid_heading")}</h2>
            <p>{t("response_to_covid_para")}</p>
            <div className="grid md:mt-8 ">
              {covidSection.map((item, index) => {
                return (
                  <div key={index} className="col-12 md:col-4">
                    <div className="flex align-items-center surface-0 shadow-1 p-4 border-1 border-50 border-round h-full hover:shadow-5">
                      <img alt="team" className="h-6 w-2" src={item.icon} />
                      <div className="ml-3">
                        <h2 className=" text-xl md:text-2xl">{item.measure}</h2>
                        <p className="">{item.data}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {isLoggedIn && isVerify && (
        <div className="md:px-8 px-2">
          <FeedbackComponent />
        </div>
      )}
      <div className="p-3">
        <h3 className="text-center">Customer Feedback</h3>

        <div>
          {filteredFeedbacks?.length === 0 ? (
            <span>
              No feedback available
            </span>
          ) : (
            <Carousel
              showIndicators={false}
              autoplayInterval={6000}
              value={filteredFeedbacks}
              itemTemplate={(feedback) => (
                <div
                  className="p-4 h-full"
                  style={{ height: "200px", overflowY: "auto" }}
                >
                  <div
                    className="text-center d-flex flex-column justify-content-between surface-0 shadow-1 p-4 border-1 border-50 border-round h-full hover:shadow-5 "
                    style={{ height: "100%" }}
                  >
                    <div className="mb-3">
                      <h4>{`${feedback?.user?.firstname} ${feedback?.user?.lastname}`}</h4>
                    </div>
                    <div className="mb-3">
                      <p>{feedback?.message}</p>
                    </div>
                    <div className="d-flex justify-content-center">
                      <Rating
                        value={feedback?.stars}
                        readonly
                        stars={5}
                        cancel={false}
                      />
                    </div>
                  </div>
                </div>
              )}
              numScroll={3}
              numVisible={3}
              responsiveOptions={[
                {
                  breakpoint: '640px',
                  numVisible: 1,
                  numScroll:1
                },
              ]}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
