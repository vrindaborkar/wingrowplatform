import React, { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FORM_FIELDS_NAME } from "./constant";
import { Tooltip } from "primereact/tooltip";
import { Button } from "primereact/button";
import { ROUTE_PATH } from "../../constant/urlConstant";
import { useNavigate } from "react-router-dom";
import "./stall.css";

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
  RED_STALL,
  SANACK_STALL,
  SPICE_STALL,
  TARKARI_STALL,
} from "../../assets/images";
import { Dropdown } from "primereact/dropdown";
import scheduleData from "../market/data.json";
import PaymentPage from "../payment";
import { Toast } from "primereact/toast";

const scheduleOptions = (scheduleData.schedule || []).map((market) => ({
  label: market.name,
  value: market.name,
  disabledDays: market.disabledDays || [0, 2, 3, 4, 5, 6],
  roadPosition: market.roadPosition || "right",
}));

const StallComponent = (props) => {
  const {
    fetchStallList,
    isPageLevelError,
    isLoading,
    userRole,
    handleOnReadRecord,
    handleOnDeleteRecord,
    handleOnEditRecord,
    handleOnCreatedRecord,
    formFieldValueMap,
    stallList,
  } = props.stallProps;

  const savedMarket = scheduleOptions.length
    ? localStorage.getItem("selectedMarket") || scheduleOptions[0].value
    : "";

  const [selectedStallsMap, setSelectedStallsMap] = useState({});
  const [stallDataMap, setStallDataMap] = useState(new Map());
  const [totalPrice, setTotalPrice] = useState(0);
  const [dates, setDates] = useState({});
  const [selectedMarket, setSelectedMarket] = useState(savedMarket);
  const [stallPositions, setStallPositions] = useState(
    scheduleData.marketStallPositions.Default
  );
  const [disabledDays, setDisabledDays] = useState(
    scheduleOptions[0].disabledDays || []
  );

  const [roadPosition, setRoadPosition] = useState(
    scheduleOptions[0].roadPosition || "right"
  );

  const [showDetails, setShowDetails] = useState(false);
  const [modalStalls, setModalStalls] = useState([]);

  const [selectedStallsData, setSelectedStallsData] = useState({});

  const { marketStallPositions } = scheduleData || {};

  const toast = useRef(null);

  const {
    control,
    formState: { errors },
    watch,
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    defaultValues: useMemo(() => formFieldValueMap, [formFieldValueMap]),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const navigate = useNavigate();

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const dat = new Date();

  const onSubmit = (data) => {
    if (!validateStalls()) {
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

  const validateStalls = () => {
    const stallsSelected =
      selectedStallsMap[selectedMarket]?.[
        dates[selectedMarket]?.toLocaleDateString()
      ];
    const isValid = stallsSelected && stallsSelected.length > 0;

    return isValid;
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

    setSelectedStallsData((prevData) => ({
      ...prevData,
      [stallId]: stall,
    }));
  };

  const getStallClass = (row, col) => {
    const stallId = `${row}-${col}`;
    const marketStalls =
      selectedStallsMap[selectedMarket]?.[
        dates[selectedMarket]?.toLocaleDateString()
      ] || [];

    if (marketStalls.includes(stallId)) {
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
      localStorage.setItem("roadPosition", roadPosition);
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

    if (selectedMarketObj) {
      setRoadPosition(selectedMarketObj.roadPosition || "right");
    }

    setDisabledDays(selectedMarketObj ? selectedMarketObj.disabledDays : []);

    setSelectedStallsMap((prevSelectedStallsMap) => ({
      ...prevSelectedStallsMap,
      [marketName]: prevSelectedStallsMap[marketName] || {},
    }));

    navigate(`${ROUTE_PATH.BOOKING.STALL.replace(":id", marketName)}`);
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

    if (Object.keys(groupedStalls).length === 0) {
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
            <div
              className={`market-container p-3 ${
                roadPosition === "right" ? "row" : "col"
              }`}
            >
              <div className={`${roadPosition}-road`}>Main Road</div>
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
                        className={`stall ${
                          isStall.value ? getStallClass(rowIndex, colIndex) : ""
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
                                  stallImageMap[stall.stallName] ||
                                  GENERAL_STALL
                                }
                                alt={stall.stallName || "General stall"}
                                className={`${isStall.direction} stall-image w-7 md:w-5`}
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
            </div>
            <hr />
            <div className="total-amount">
              <span>Total Amount</span>
              <span>
                {" "}
                {totalPrice} <i className="pi pi-indian-rupee" />
                /-{" "}
              </span>
            </div>
            <hr />
            <div className="flex justify-content-end ">
              <Button
                label="Pay"
                onClick={handleShowClick}
                className="border-2 border-round-md md:w-10rem mr-2"
                disabled={!validateStalls()}
              />
            </div>
          </div>
        </form>
        <Tooltip target=".stall" mouse className="text-green-400" />

        <PaymentPage
          modalStalls={modalStalls}
          showDetails={showDetails}
          setShowDetails={setShowDetails}
          validateStalls={validateStalls}
          amount={totalPrice}
        />
      </div>
    </>
  );
};

export default StallComponent;
