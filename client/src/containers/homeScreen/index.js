import React from "react";
import SliderComponent from "../../components/home/slider";
import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../constant/urlConstant";
import MarketComponent from "../../components/market";
import CustomerScreen from "../customerScreen";

const HomeScreen = () => {
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleBookStall = () => {
    // if (isLoggedIn) {
    // }
    navigate(ROUTE_PATH.BASE.HOME);
  };
  return (
    <>
      <div className="card mt-2 border-0 text-center">
        <h1 className="md:text-4xl p-2">{t("tagline1_home")}</h1>
        <h4 className="p-2 mb-3">{t("tagline2_home")}</h4>
        <div className="mb-3">
          <Button
            label={t("book_stall")}
            onClick={handleBookStall}
            className="rounded"
          />
          <Button label={t("book_stall")} className="rounded ml-2" />
        </div>

        <h1>Number of Booked Stalls : {2000}</h1>
        <SliderComponent  />
        <div className="mb-2">
          <h1 className="">{t("our_market_heading")}</h1>
          <p className="p-3">{t("our_market")}</p>
        </div>
        <div className=" p-4 mb-2">
          <MarketComponent />
        </div>
        <div className=" p-4 mb-2">
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
