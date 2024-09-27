import React, { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FORM_FIELDS_NAME } from "./constant";
import { Tooltip } from "primereact/tooltip";
import { Button } from "primereact/button";
import { ROUTE_PATH } from "../../constant/urlConstant";
import { useNavigate } from "react-router-dom";
import "./stall.css";
import { useDispatch, useSelector } from "react-redux";
import { selectedStall } from "../../redux/action/stall";
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/saga-green/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import {
  ANTIQUE_STALL,
  DRY_FRUITS_STALL,
  FLOWER_STALL,
  FRUITS_STALL,
  GENERAL_STALL,
  KOBI_STALL,
  LEAFY_STALL,
  MUKHVAS_STALL,
  ONION_STALL,
  SANACK_STALL,
  SPICE_STALL,
  TARKARI_STALL,
} from "../../assets/images";
import { Dropdown } from "primereact/dropdown";
import scheduleData from "../market/data.json";
import PaymentScreen from "../../containers/paymentScreen";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";

const scheduleOptions = (scheduleData.schedule || []).map((market) => ({
  label: market.name,
  value: market.name,
  disabledDays: market.disabledDays || [0, 2, 3, 4, 5, 6],
}));

const StallComponent = (props) => {
  const { fetchStallList, formFieldValueMap, stallList } = props.stallProps;

  const savedMarket = scheduleOptions.length
    ? localStorage.getItem("selectedMarket") || scheduleOptions[0].value
    : "";

  const [selectedStallsMap, setSelectedStallsMap] = useState({});
  const [stallDataMap, setStallDataMap] = useState(new Map());
  const [totalPrice, setTotalPrice] = useState(0);
  const [dates, setDates] = useState({});
  const [selectedMarket, setSelectedMarket] = useState(savedMarket);
  const [showDetails, setShowDetails] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [modalStalls, setModalStalls] = useState([]);
  const [selectedStallsData, setSelectedStallsData] = useState({});
  const [showPaymentScreen, setShowPaymentScreen] = useState(false);
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null; 


  const { marketStallPositions } = scheduleData || {};
  const sessionSelectedMarketDate = [];

  const dat = new Date();
  const toast = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [disabledDays, setDisabledDays] = useState(
    scheduleOptions[0].disabledDays || []
  );
  const [stallPositions, setStallPositions] = useState(
    scheduleData.marketStallPositions.Default
  );
  const selectedStallItems = sessionStorage.getItem("selectedStalls");
  const sessionSelsctedStalls = selectedStallItems
    ? JSON.parse(selectedStallItems)
    : {};

  const selectedStallsRedux = useSelector((state) => {
    return state.stallReducer.selectedStalls;
  });

  const isLoggedIn = useSelector((state) => state.loginReducer.isLoggedIn);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: useMemo(() => formFieldValueMap, [formFieldValueMap]),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };


  if (selectedStallsRedux && selectedStallsRedux[selectedMarket]) {
    const stalls = selectedStallsRedux[selectedMarket];
    const dateKey = Object.keys(stalls)[0];

    const dateValue = stalls[dateKey];

    if (Array.isArray(dateValue) && dateValue.length > 0) {
      const dates = dateValue.map((stall) => stall.date);

      const firstDateString = dates[0];
      const [day, month, year] = firstDateString.split("/");
      const formattedDateString = `${year}-${month}-${day}`;

      const firstDate = new Date(formattedDateString);

      if (!isNaN(firstDate.getTime())) {
        sessionSelectedMarketDate.push(firstDate);
      } else {
        console.error("Invalid date:", formattedDateString);
      }
    } else {
      console.error("No valid stalls found for the date:", dateKey);
    }
  } else {
    console.error("selectedMarket does not exist.");
  }

  useEffect(() => {
    if (selectedStallsRedux.length === 0) {
      const savedStalls = JSON.parse(sessionStorage.getItem("selectedStalls"));      
      if (savedStalls) {
        dispatch({ type: 'SELECT_STALL', payload: savedStalls });
      }
    }
  }, [selectedStallsRedux, dispatch]);

  const onSubmit = (data) => {
    if (selectedStallsRedux.length === 0) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Please select at least one stall before proceeding.",
        life: 3000,
      });
      return;
    }
    navigate("/payment-success", {
      state: {
        totalPrice,
        selectedStallsMap,
        selectedMarket,
        date: dates[selectedMarket],
      },
    });
  };

  const handleStallClick = (row, col) => {
    if (!dates[selectedMarket]) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Please select a date first.",
        life: 3000,
      });
      return;
    }

    const stallId = `${row}-${col}`;
    const stall = stallDataMap.get(stallId);
    if (!stall) return;

    const currentDate = dates[selectedMarket].toLocaleDateString();
    const newSelectedStalls = { ...selectedStallsMap };

    if (!newSelectedStalls[selectedMarket]) {
      newSelectedStalls[selectedMarket] = {};
    }

    if (!newSelectedStalls[selectedMarket][currentDate]) {
      newSelectedStalls[selectedMarket][currentDate] = [];
    }

    let dateStalls = newSelectedStalls[selectedMarket][currentDate];

    if (dateStalls.includes(stallId)) {
      dateStalls = dateStalls.filter((s) => s !== stallId);
      setTotalPrice((prevPrice) => prevPrice - stall.stallPrice);
    } else {
      if (dateStalls.length >= 3) {
        const removedStallId = dateStalls.shift();
        const removedStall = stallDataMap.get(removedStallId);
        setTotalPrice((prevPrice) => prevPrice - removedStall.stallPrice);
      }
      dateStalls.push(stallId);
      setTotalPrice((prevPrice) => prevPrice + stall.stallPrice);
    }

    newSelectedStalls[selectedMarket][currentDate] = dateStalls;
    setSelectedStallsMap(newSelectedStalls);
    const groupedStalls = {};

    Object.keys(newSelectedStalls).forEach((marketName) => {
      const marketStalls = newSelectedStalls[marketName];

      Object.keys(marketStalls).forEach((date) => {
        const dateStalls = marketStalls[date].map((id) => {
          const stall = stallDataMap.get(id);
          return {
            stall_id: stall._id,
            stallNo: stall ? stall.stallNo : "No Stall No",
            name: stall ? stall.stallName : "No Stall",
            price: stall ? stall.stallPrice : 0,
            date: date || "Not selected",
            bookedBy:user.id
          };
        });

        if (dateStalls.length > 0) {
          groupedStalls[marketName] = groupedStalls[marketName] || {};
          groupedStalls[marketName][date] = dateStalls;
        }
      });
    });
    sessionStorage.setItem("selectedStalls", JSON.stringify(groupedStalls));
    dispatch(selectedStall(groupedStalls));

    setSelectedStallsData((prevData) => ({
      ...prevData,
      [stallId]: stall,
    }));
  };

  function calculateTotalPrices(data) {
    let totalPrices = {};
    let overallTotal = 0;

    for (const market in data) {
      const dates = data[market];
      totalPrices[market] = 0;
      for (const date in dates) {
        const stalls = dates[date];
        const marketTotal = stalls.reduce((sum, stall) => sum + stall.price, 0);

        overallTotal += marketTotal;
      }
    }
    totalPrices["TotalAmount"] = overallTotal;
    return totalPrices;
  }

  const totalAmount = calculateTotalPrices(selectedStallsRedux);

  const getStallClass = (row, col) => {
    const stallId = `${row}-${col}`;
    const marketStalls =
      sessionSelsctedStalls[selectedMarket]?.[
      dates[selectedMarket]?.toLocaleDateString()
      ] || [];
    const isSelectedInSession = marketStalls.some(
      (stall) => stall.id === stallId
    );

    if (isSelectedInSession) {
      return "selected";
    }

    const marketStallsFromMap =
      selectedStallsMap[selectedMarket]?.[
      dates[selectedMarket]?.toLocaleDateString()
      ] || [];

    if (marketStallsFromMap.includes(stallId)) {
      return "selected";
    }

    return stallDataMap.has(stallId) ? "available" : "unknown";
  };

  useEffect(() => {
    const activePositions = [];
    stallPositions.forEach((row, rowIndex) =>
      row.forEach((isStall, colIndex) => {
        if (isStall) {
          activePositions.push({ row: rowIndex, col: colIndex });
        }
      })
    );

    const newStallDataMap = new Map(
      activePositions.map((position, index) => [
        `${position.row}-${position.col}`,
        stallList[index],
      ])
    );

    setStallDataMap(newStallDataMap);
  }, [stallPositions, stallList]);

  useEffect(() => {
    if (selectedMarket) {
      const positions =
        marketStallPositions[selectedMarket] || marketStallPositions.Default;
      setStallPositions(positions);

      fetchStallList(selectedMarket);

      localStorage.setItem("selectedMarket", selectedMarket);
      const selectedMarketObj = scheduleOptions.find(
        (m) => m.value === selectedMarket
      );

      setDisabledDays(selectedMarketObj ? selectedMarketObj.disabledDays : []);
    }
  }, [selectedMarket, marketStallPositions, fetchStallList]);

  useEffect(() => {
    setDates((prevDates) => ({
      ...prevDates,
      [selectedMarket]: prevDates[selectedMarket] || null,
    }));
  }, [selectedMarket]);

  useEffect(() => {
    localStorage.setItem(
      "selectedStallsMap",
      JSON.stringify(selectedStallsMap)
    );
  }, [selectedStallsMap]);

  useEffect(() => {
    const savedStalls = localStorage.getItem("selectedStallsMap");
    if (savedStalls) {
      setSelectedStallsMap(JSON.parse(savedStalls));
    }
  }, []);

  const stallImageMap = {
    Masale: SPICE_STALL,
    Antic: ANTIQUE_STALL,
    Fruits: FRUITS_STALL,
    "Flower-Kobi": KOBI_STALL,
    Tarkari: TARKARI_STALL,
    "Onion-Potato": ONION_STALL,
    Exotic: ANTIQUE_STALL,
    Leafy: LEAFY_STALL,
    Snacks: SANACK_STALL,
    Flowers: FLOWER_STALL,
    Dryfruits: DRY_FRUITS_STALL,
    Mukhvas: MUKHVAS_STALL,
    Default: GENERAL_STALL || null,
  };

  const handleMarket = (e) => {
    const marketName = e.value;
    setSelectedMarket(marketName);

    fetchStallList(marketName);

    const positions =
      marketStallPositions[marketName] || marketStallPositions.Default;
    setStallPositions(positions);

    setDates((prevDates) => ({
      ...prevDates,
      [marketName]: prevDates[marketName] || null,
    }));

    const selectedMarketObj = scheduleOptions.find(
      (m) => m.value === marketName
    );

    setDisabledDays(selectedMarketObj ? selectedMarketObj.disabledDays : []);

    setSelectedStallsMap((prevSelectedStallsMap) => ({
      ...prevSelectedStallsMap,
      [marketName]: prevSelectedStallsMap[marketName] || {},
    }));

    navigate(`${ROUTE_PATH.BOOKING.STALL.replace(":id", marketName)}`);
  };

  const handlePaymentClick = () => {
    if (isLoggedIn) {
      setShowPaymentScreen(true);
    } else {
      navigate(ROUTE_PATH.BASE.LOGIN);
    }
  };

  const handleShowClick = (e) => {
    e.preventDefault();
    const groupedStalls = {};

    Object.keys(selectedStallsMap).forEach((marketName) => {
      const marketStalls = selectedStallsMap[marketName];

      Object.keys(marketStalls).forEach((date) => {
        const dateStalls = marketStalls[date].map((stallId) => {
          const stall = selectedStallsData[stallId];
          return {
            id: stallId,
            stallNo: stall ? stall.stallNo : "No Stall N0",
            name: stall ? stall.stallName : "No Stall",
            price: stall ? stall.stallPrice : 0,
            date: date || "Not selected",
          };
        });

        if (dateStalls.length > 0) {
          groupedStalls[marketName] = groupedStalls[marketName] || {};
          groupedStalls[marketName][date] = dateStalls;
        }
      });
    });

    if (Object.keys(selectedStallsRedux).length === 0) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Please select at least one stall before showing details.",
        life: 3000,
      });
      return;
    }

    setModalStalls(groupedStalls);
    setShowDetails(true);
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="stall-container">
        <form onSubmit={handleSubmit(onSubmit)} className="stall-form">
          <div className="flex row justify-content-between align-items-flex-start">
            <div className="market-dropdown-section col-6">
              <label htmlFor="market">Select Market</label>
              <Dropdown
                id="market"
                value={selectedMarket}
                options={scheduleOptions}
                onChange={handleMarket}
                placeholder="Choose a market"
                className="w-full"
              />
            </div>
            <div className="calendar-section col-6">
              <div className="field">
                <label htmlFor="date">
                  Select Date<span className="required">*</span>
                </label>
                <Controller
                  name={FORM_FIELDS_NAME.B_DATE.name}
                  control={control}
                  rules={FORM_FIELDS_NAME.B_DATE.rules}
                  render={({ field }) => (
                    <Calendar
                      {...field}
                      id="date"
                      value={dates[selectedMarket]}
                      onChange={(e) => {
                        setDates((prevDates) => ({
                          ...prevDates,
                          [selectedMarket]: e.value,
                        }));
                        field.onChange(e.value);
                      }}
                      placeholder={FORM_FIELDS_NAME.B_DATE.placeholder}
                      disabledDays={disabledDays}
                      minDate={dat}
                      showIcon={true}
                      showButtonBar={true}
                      className="w-full custom-calendar"
                      isError={errors[FORM_FIELDS_NAME.B_DATE.name]}
                      errorMsg={getFormErrorMessage(
                        FORM_FIELDS_NAME.B_DATE.name
                      )}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="border-green-200 border-1 p-2">
            <div className="summary">
              <span>Total stalls: {stallList.length}</span>
              <span>
                Available stalls:
                {stallPositions.flat().filter(Boolean).length -
                  (selectedStallsMap[selectedMarket]?.[
                    dates[selectedMarket]?.toLocaleDateString()
                  ]?.length || 0)}
              </span>
            </div>
            <hr />

            <div className="bg-black flex justify-content-between py-2 mb-3 text-white text-center ">
              <div className="p-2"></div>
              Main Road
              <div className="p-2"></div>
            </div>
            <div
              className="market-layout"
              style={{
                gridTemplateColumns: `repeat(${stallPositions[0].length}, 1fr)`,
              }}
            >
              {stallPositions.map((row, rowIndex) =>
                row.map((isStall, colIndex) => {
                  const stallId = `${rowIndex}-${colIndex}`;
                  const stall = stallDataMap.get(stallId);

                  return (
                    <div
                      key={stallId}
                      className={`stall w-full ${isStall.value ? getStallClass(rowIndex, colIndex) : ""
                        }`}
                      onClick={() =>
                        isStall.value && handleStallClick(rowIndex, colIndex)
                      }
                      data-pr-tooltip={stall ? stall.stallPrice : ""}
                      style={{ fontSize: "1rem", cursor: "pointer" }}
                    >
                      <div className="justify-content-between align-items-center">
                        {isStall.value && stall && (
                          <>
                            <img
                              src={
                                stallImageMap[stall.stallName] || GENERAL_STALL
                              }
                              alt={stall.stallName || "General stall"}
                              className={`${isStall.direction} stall-image w-6 md:w-6`}
                            />
                            <div
                              style={{
                                fontSize:
                                  window.innerWidth <= 768
                                    ? "0.4rem"
                                    : "0.7rem",
                              }}
                            >
                              {stall.stallName}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <hr />
            <div className="total-amount">
              <span>Total Amount</span>
              <span>
                {" "}
                {totalAmount.TotalAmount} <i className="pi pi-indian-rupee" />
                /-{" "}
              </span>
            </div>
            <hr />
            <div className="flex justify-content-end ">
              <Button
                label="Pay"
                onClick={handleShowClick}
                className="border-2 border-round-md md:w-10rem mr-2"
                disabled={selectedStallsRedux.length === 0}
              />
            </div>
          </div>
        </form>
        <Tooltip target=".stall" mouse className="text-green-400" />

        {showPaymentScreen && (
          <PaymentScreen
            amount={totalAmount.TotalAmount}
            selectedStalls={selectedStallsRedux}
          />
        )}
        <Dialog
          header="Selected Stalls Details"
          visible={showDetails}
          style={{ width: "50vw", maxHeight: "80vh", overflowY: "auto" }}
          className="w-full md:w-6"
          onHide={() => setShowDetails(false)}
          footer={
            <>
              <Button
                label="Cancel"
                icon="pi pi-times"
                onClick={() => setShowDetails(false)}
                className="border-2 te border-round-md md:w-10rem mr-2"
              />

              <Button
                type="button"
                label="Pay"
                className="border-2 te border-round-md md:w-10rem"
                onClick={
                  isLoggedIn
                    ? handlePaymentClick
                    : navigate(ROUTE_PATH.BASE.LOGIN)
                }
              />
            </>
          }
        >
          <div className="selected-stalls-details">
            {selectedStallsRedux &&
              Object.keys(selectedStallsRedux).length > 0 ? (
              Object.keys(selectedStallsRedux).map((marketName) => (
                <div key={marketName}>
                  {Object.keys(selectedStallsRedux[marketName]).map((date) => (
                    <div key={date}>
                      <h3>Market Name: {marketName}</h3>
                      <h4>Date: {date}</h4>
                      {selectedStallsRedux[marketName][date] && (
                        <ul style={{ maxHeight: "60vh", overflowY: "auto" }}>
                          <h5>Stalls:</h5>
                          {selectedStallsRedux[marketName][date].map(
                            (stall) => (
                              <li key={stall.id}>
                                <div>
                                  <strong>Stall No:</strong> {stall.stallNo}
                                </div>
                                <div>
                                  <strong>Stall Name:</strong> {stall.name}
                                </div>
                                <div>
                                  <strong>Stall Price:</strong> {stall.price}
                                </div>
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p>No stalls selected.</p>
            )}
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default StallComponent;
