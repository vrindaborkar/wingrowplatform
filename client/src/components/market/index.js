import React, { useEffect, useState } from "react";
import ErrorPage from "../../common/Error";
import AccessDeniedPage from "../../common/Access";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "primereact/button";
import { baseUrl } from "../../services/PostAPI";
import { API_PATH, ROUTE_PATH } from "../../constant/urlConstant";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import { ProgressSpinner } from "primereact/progressspinner";

const MarketComponent = (props) => {
  const { isPageLevelError, marketList, setCity } = props;

  const { t } = useTranslation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [filteredMarkets, setFilteredMarkets] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState({});

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get(`${baseUrl}${API_PATH.STATE.FETCH}`);
        const formattedStates = response.data.states
          .filter((state) => state.stateName)
          .map((state) => ({
            label: state.stateName,
            value: state._id,
          }));
        setStates(formattedStates);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchStates();
  }, []);
  const fetchCities = async (stateId) => {
    try {
      const response = await axios.get(
        `${baseUrl}${API_PATH.CITY.FETCH}?stateId=${stateId}`
      );
      const formattedCities = response.data.map((city) => ({
        label: city.name,
        value: city.name,
      }));
      setCities((prevCities) => ({
        ...prevCities,
        [stateId]: formattedCities,
      }));
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleStateChange = (e) => {
    const stateId = e.value;
    setSelectedState(stateId);
    setSelectedCity(null);
    setFilteredMarkets([]);
    fetchCities(stateId);
  };

  const handleCityChange = (e) => {
    const city = e.value;
    setSelectedCity(city);
    setLoading(true);

    const marketsInCity = marketList[city] || [];
    setFilteredMarkets(marketsInCity);
    setCity(city);
    setLoading(false);
  };

  useEffect(() => {
    if (selectedCity) {
      setLoading(true);
      const marketsInCity = marketList[selectedCity] || [];
      setFilteredMarkets(marketsInCity);
      setLoading(false);
    }
  }, [selectedCity, marketList]);

  const handleLocation = (payload) => {
    window.open(payload, "_blank");
  };
  const shouldRenderFullPageError = () => isPageLevelError;
  const shouldRenderMarketList = () => true;
  const shouldRenderNotFoundView = () =>
    !shouldRenderFullPageError && !shouldRenderMarketList;

  const marketOption = Object.keys(marketList).flatMap((marketKey) => {
    const markets = marketList[marketKey];
    if (markets.length > 0) {
      return markets.map((market) => {
        return {
          label: market.name,
          value: market.name,
          marketDay: market.marketDay,
        };
      });
    }
    return [];
  });

  const currentPath = location.pathname;
  localStorage.setItem("setprevpath", currentPath);
  const handleMarket = (market) => {
    const selectedMarket = market.name;
    const newroadPosition = market.roadPosition || "right";
    localStorage.setItem("selectedMarket", selectedMarket);
    localStorage.setItem("roadPosition", newroadPosition);
    localStorage.setItem("marketOptions", JSON.stringify(marketOption));
    const marketPath = `${ROUTE_PATH.BOOKING.STALL.replace(
      ":id",
      selectedMarket
    )}`;
    navigate(marketPath);
  };

  return (
    <div>
      {loading ? (
        <ProgressSpinner />
      ) : (
        <>
          {shouldRenderFullPageError() && <ErrorPage />}
          {shouldRenderNotFoundView() && <AccessDeniedPage />}
          {shouldRenderMarketList() && (
            <div className="text-center mt-3 px-5">
              <div className="">
                <div className="text-left">
                  <div className="d-inline-block">
                    <Link to="/" className="text-d-none">
                      <Button
                        className="p-button-rounded flex justify-content-start"
                        icon="pi pi-angle-left mr-2"
                      >
                        {t("back")}
                      </Button>
                    </Link>
                  </div>
                </div>
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
                      {t(
                        `select_market_in_${
                          cities[selectedState].find(
                            (city) => city.value === selectedCity
                          )?.label
                        }`
                      )}
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
                                    {t(market.marketDay)}
                                  </span>
                                  <div className="text-900 font-medium text-xl">
                                    {market.time}
                                  </div>
                                </div>
                                <div
                                  className="flex align-items-center justify-content-center bg-green-100 border-round"
                                  style={{ width: "2.5rem", height: "2.5rem" }}
                                  onClick={(event) => {
                                    event.stopPropagation(); 
                                    handleLocation(market.location); 
                                  }}
                                >
                                  <i className="pi pi-map-marker text-green-500 text-xl"></i>
                                </div>
                              </div>
                              <div className="text-red-500 ">
                                {t(market.name)}
                              </div>
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
        </>
      )}
    </div>
  );
};

export default MarketComponent;
