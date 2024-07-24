import React from "react";
import ErrorPage from "../../common/Error";
import AccessDeniedPage from "../../common/Access";
import MarketList from "../home/market/index";
import scheduleData from "./data.json";
import { useTranslation } from "react-i18next";
import { MARKET_WITH_PEOPLE } from "../../assets/images";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { API_PATH, ROUTE_PATH } from "../../constant/urlConstant";

const MarketComponent = (props) => {
  const { isPageLevelError, isLoading, marketList } = props;
  const { schedule } = scheduleData;
  const { t } = useTranslation();

  const navigate =useNavigate();
  const handleLocation = (payload) => {
    window.open(payload, "_blank");
  };
  const shouldRenderFullPageError = () => isPageLevelError;
  const shouldRenderMarketList = () => true;
  const shouldRenderNotFoundView = () =>
    !shouldRenderFullPageError && !shouldRenderMarketList;

  const containerStyle = {
    position: "relative",
    backgroundImage: `url(${MARKET_WITH_PEOPLE})`,
    backgroundSize: "cover",
    width: "100%",
    height: "100%",
  };

  const handleMarket = (market) => {
    navigate(`${ROUTE_PATH.BOOKING.STALL.replace(":id", market?.name)}`);
    console.log(market);
  };
  return (
    <div>
      {shouldRenderFullPageError() && (
        <div>
          <ErrorPage />
        </div>
      )}
      {shouldRenderNotFoundView() && (
        <div>
          <AccessDeniedPage />
        </div>
      )}
      {shouldRenderMarketList() && (
        <div className="text-center mt-3 px-5">
          <div className="">
            <Link to="/farmers" className="text-d-none">
              <Button
                className="p-button-rounded flex justify-content-start"
                icon="pi pi-angle-left mr-2"
              >
                {t("back")}
              </Button>
            </Link>
            <h2 className="main_header_places">{t("select_market_in_pune")}</h2>
          </div>
          <div className="grid px-5 py-3">
            {schedule.map((market, index) => (
              <div
                key={index}
                className="col-12 md:col-6 lg:col-3 cursor-pointer "
                onClick={() => handleMarket(market)}
              >
                <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round h-full hover:shadow-5">
                  <div className="flex justify-content-between mb-3">
                    <div>
                      <span className="block text-500 font-medium mb-3">
                        {t(market.day)}
                      </span>
                      <div className="text-900 font-medium text-xl">
                        {market.time}
                      </div>
                    </div>
                    <div
                      className="flex align-items-center justify-content-center bg-green-100 border-round"
                      style={{ width: "2.5rem", height: "2.5rem" }}
                      onClick={() => handleLocation(market.location)}
                    >
                      <i className="pi pi-map-marker text-green-500 text-xl"></i>
                    </div>
                  </div>
                  <div className="text-red-500 ">{t(market.name)}</div>
                  <span className="font-medium">{t(market.address)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketComponent;
