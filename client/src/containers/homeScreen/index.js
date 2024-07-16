import React, { useEffect, useState } from "react";
import SliderComponent from "../../components/home/slider";
import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../constant/urlConstant";
import MarketComponent from "../../components/home/market";
import {
  WINGROW_SLIDE_ONE,
  WINGROW_SLIDE_THREE,
  WINGROW_SLIDE_TWO,
  WINGROW_VIDEO,
} from "../../assets/images";

const HomeScreen = () => {
  // eslint-disable-next-line
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleBookStall = () => {
    // if (isLoggedIn) {
    // }
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
      url:WINGROW_SLIDE_ONE,
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

  const reviews = [
    { id: 1, name: 'John Doe', rating: 4, comment: 'Great service and fast delivery!', avatar: 'avatar1.png' },
    { id: 2, name: 'Jane Smith', rating: 5, comment: 'Excellent product quality. Will buy again!', avatar: 'avatar2.png' },
    { id: 3, name: 'Mike Johnson', rating: 3, comment: 'Product arrived slightly damaged, but customer service was helpful.', avatar: 'avatar3.png' },
    { id: 4, name: 'Emily Brown', rating: 5, comment: 'Superb experience. Highly recommended.', avatar: 'avatar4.png' },
    { id: 5, name: 'David Wilson', rating: 4, comment: 'Good value for money. Happy with my purchase.', avatar: 'avatar5.png' },
  ];
  

  return (
    <>
      <div className="card mt-2 border-0 text-center">
        <h1 className="text-2xl md:text-4xl p-2">{t("tagline1_home")}</h1>
        <h4 className="p-2 mb-3">{t("tagline2_home")}</h4>
        <div className="mb-3">
          <Button
            label={t("book_stall")}
            onClick={handleBookStall}
            className="rounded"
          />
          {/* <Button label={t("book_stall")} className="rounded ml-2"
           onClick={handleBookStall}
         /> */}
        </div>

        <h1>Number of Booked Stalls : {2000}</h1>
        <SliderComponent slides={slides} />
        <div className="mb-2">
          <h1 className="">{t("our_market_heading")}</h1>
          <p className="p-3">{t("our_market")}</p>
        </div>
        <div className=" p-4 mb-2">
          <MarketComponent />
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
