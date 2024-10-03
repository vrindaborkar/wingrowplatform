import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchMarketList } from "../../redux/action/market";
import ErrorPage from "../../common/Error";
import AccessDeniedPage from "../../common/Access";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import {  ROUTE_PATH } from "../../constant/urlConstant";
import { Dropdown } from "primereact/dropdown";

const MarketComponent = (props) => {
  const {
    isPageLevelError,
    marketList,
    schedule,
    cities,
    states,
    fetchMarketList,
  } = props;

  useEffect(() => {
    fetchMarketList();
  }, [fetchMarketList]);

  useEffect(() => {
    if (marketList) {
    }
  }, [marketList]);
  
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
 // eslint-disable-next-line
 const [filteredMarkets, setFilteredMarkets] = useState(schedule);

  const handleStateChange = (e) => {
    setSelectedState(e.value);
    setSelectedCity(null);
    setFilteredMarkets([]);
  };
  const handleCityChange = (e) => {
    setSelectedCity(e.value);
    const filtered = schedule.filter(
      (market) => market.state === selectedState && market.city === e.value
    );
    setFilteredMarkets(filtered);
  };

  const handleLocation = (payload) => {
    window.open(payload, "_blank");
  };
  const shouldRenderFullPageError = () => isPageLevelError;
  const shouldRenderMarketList = () => true;
  const shouldRenderNotFoundView = () =>
    !shouldRenderFullPageError && !shouldRenderMarketList;

  const handleMarket = (market) => {
    navigate(`${ROUTE_PATH.BOOKING.STALL.replace(":id", market?.name)}`);
    const selectedMarket = market?.name;
    const newroadPosition = market?.roadPosition;
    localStorage.setItem("selectedMarket", selectedMarket);
    localStorage.setItem("roadPosition", newroadPosition);
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
            <Link to="/farmer" className="text-d-none">
              <Button
                className="p-button-rounded flex justify-content-start"
                icon="pi pi-angle-left mr-2"
              >
                {t("back")}
              </Button>
            </Link>
            <Dropdown
              value={selectedState}
              options={states}
              onChange={handleStateChange}
              placeholder="Select a State"
              className="m-3"
            />

            {selectedState && (
              <Dropdown
                value={selectedCity}
                options={cities[selectedState] || []}
                onChange={handleCityChange}
                placeholder="Select a City"
              />
            )}

            {selectedState && selectedCity ? (
              <>
                <h2 className="mt-3">
                  {t(`select_market_in_${selectedCity}`)}
                </h2>
                <div className="grid md:px-5 py-3">
                  {filteredMarkets.length > 0 ? (
                    filteredMarkets.map((market, index) => (
                      <div
                        key={index}
                        className="col-12 md:col-6 lg:col-3 cursor-pointer"
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
                          <span className="font-medium">
                            {t(market.address)}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>{t("no_markets_found")}</p>
                  )}
                </div>
              </>
            ) : (
              <h2>Please select state and city</h2>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  marketList: state.marketReducer.marketList || [],
  schedule: state.marketReducer.schedule || [],
  cities: state.marketReducer.cities || {},
  states: state.marketReducer.states || [],
});

const mapDispatchToProps = {
  fetchMarketList,
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketComponent);
