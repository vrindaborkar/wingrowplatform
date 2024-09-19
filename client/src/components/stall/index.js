import React, { useEffect, useMemo, useState } from "react";
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
import PaymentPage from "../payment";
import { Dropdown } from "primereact/dropdown";
import scheduleData from "../market/data.json";
import StallDetailsDialog from "./stallDetailsDialog";

const scheduleOptions = (scheduleData.schedule || []).map((market) => ({
  label: market.name,
  value: market.name,
  disabledDays: market.disabledDays || [0, 2, 3, 4, 5, 6],
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
    ? sessionStorage.getItem("selectedMarket") || scheduleOptions[0].value
    : "";

  const [selectedStalls, setSelectedStalls] = useState([]);
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

  const [showDetails, setShowDetails] = useState(false);
  const [modalStalls, setModalStalls] = useState([]);

  const [selectedStall, setSelectedStall] = React.useState(null);

  const [mergedStallDetails, setMergedStallDetails] = useState(null);

  const [selectedStallsData, setSelectedStallsData] = useState({});

  const { schedule, marketStallPositions } = scheduleData || {};

  console.log("stallList----------------------------", stallList);

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
      alert("Please select at least one stall before proceeding.");
      return;
    }
    console.log("Total price before redirect:", totalPrice);
    navigate("/payment-success", {
      state: {
        totalPrice,
        selectedStallsMap,
        selectedMarket,
        date: dates[selectedMarket],
      },
    });
  };

  const getStallDetails = (selectedStalls) => {
    const fullStallDetails = stallList.find(
      (stall) => stall.id === selectedStalls.id
    );
    if (fullStallDetails) {
      return {
        ...fullStallDetails,
        ...selectedStalls,
      };
    }
    return selectedStalls;
  };

  useEffect(() => {
    if (selectedStalls) {
      const details = getStallDetails(selectedStalls);
      setMergedStallDetails(details);
    }
  }, [selectedStalls, stallList]);

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
      alert("Please select a date first.");
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

    // Store selected stall details independently of the current market
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
    return stallDataMap.has(stallId) ? "available" : "unknown"; // Return based on availability
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
      setSelectedStalls([]);

      fetchStallList(selectedMarket);

      sessionStorage.setItem("selectedMarket", selectedMarket);
      const selectedMarketObj = scheduleOptions.find(
        (m) => m.value === selectedMarket
      );

      setDisabledDays(selectedMarketObj ? selectedMarketObj.disabledDays : []);
    }
  }, [selectedMarket, marketStallPositions, fetchStallList, scheduleOptions]);

  useEffect(() => {
    if (stallDataMap.size) {
      console.log("Updated stallDataMap:", stallDataMap);
    }
  }, [stallDataMap]);

  useEffect(() => {
    setDates((prevDates) => ({
      ...prevDates,
      [selectedMarket]: prevDates[selectedMarket] || null,
    }));
  }, [selectedMarket]);

  useEffect(() => {
    sessionStorage.setItem(
      "selectedStallsMap",
      JSON.stringify(selectedStallsMap)
    );
  }, [selectedStallsMap]);

  useEffect(() => {
    const savedStalls = sessionStorage.getItem("selectedStallsMap");
    if (savedStalls) {
      setSelectedStallsMap(JSON.parse(savedStalls));
    }
  }, []);

  useEffect(() => {
    console.log("Stall Data Map:", stallDataMap);
    console.log("Selected Stalls Map:", selectedStallsMap);
  }, [stallDataMap, selectedStallsMap]);

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

    // setSelectedStalls([]);

    setDates((prevDates) => ({
      ...prevDates,
      [marketName]: prevDates[marketName] || null,
    }));

    const selectedMarketObj = scheduleOptions.find(
      (m) => m.value === marketName
    );

    setDisabledDays(selectedMarketObj ? selectedMarketObj.disabledDays : []);

    setDates((prevDates) => ({
      ...prevDates,
      [marketName]: prevDates[marketName] || null,
    }));

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
          const stall = selectedStallsData[stallId]; // Use the stored stall data
          return {
            id: stallId,
            name: stall ? stall.stallName : "Unknown Stall",
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
      alert("Please select at least one stall before showing details.");
      return;
    }

    setModalStalls(groupedStalls);
    setShowDetails(true);
  };

  useEffect(() => {
    if (modalStalls && Object.keys(modalStalls).length) {
      console.log("Modal Stalls:", modalStalls);
    }
  }, [modalStalls]);

  return (
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
                    errorMsg={getFormErrorMessage(FORM_FIELDS_NAME.B_DATE.name)}
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
              Available stalls:{" "}
              {stallPositions.flat().filter((isStall) => isStall).length -
                selectedStalls.length}
            </span>
          </div>
          <hr />

          <div className="bg-black flex justify-content-between py-2 mb-3 text-white text-center ">
            <div className="p-2"></div>
            Main Road
            <div className="p-2"></div>
          </div>
          <div className="market-layout">
            {stallPositions.map((row, rowIndex) =>
              row.map((isStall, colIndex) => {
                const stallId = `${rowIndex}-${colIndex}`;
                const stall = stallDataMap.get(stallId);

                return (
                  <div
                    key={stallId}
                    className={`stall ${
                      isStall ? getStallClass(rowIndex, colIndex) : ""
                    }`}
                    onClick={() =>
                      isStall && handleStallClick(rowIndex, colIndex)
                    }
                    data-pr-tooltip={stall ? stall.stallName : ""}
                    style={{ fontSize: "1rem", cursor: "pointer" }}
                  >
                    <div className="md:flex justify-content-between align-items-center">
                      {isStall && stall && (
                        <>
                          <img
                            src={
                              stallImageMap[stall.stallName] || GENERAL_STALL
                            }
                            alt={stall.stallName || "General stall"}
                            className="stall-image w-8 md:w-4"
                          />
                          <div className="text-xs md:text-base">
                            {stall.stallPrice}
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
            />
            {/* <PaymentPage
              amount={totalPrice}
              selectedStallsMap={selectedStallsMap}
              validateStalls={validateStalls}
            /> */}
            <Button
              type="submit"
              severity="danger"
              label="Pay in market"
              className="border-2 te border-round-md md:w-10rem ml-2"
              disabled={!validateStalls()}
            />
          </div>
        </div>
      </form>
      <Tooltip target=".stall" mouse className="text-green-400" />

      <StallDetailsDialog
        modalStalls={modalStalls}
        showDetails={showDetails}
        setShowDetails={setShowDetails}
        validateStalls={validateStalls}
        amount={totalPrice}
      />
    </div>
  );
};

export default StallComponent;
