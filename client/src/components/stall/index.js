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

  const newroadPosition =
    localStorage.getItem("roadPosition") ||
    scheduleOptions[0].roadPosition ||
    "right";

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

  const [roadPosition, setRoadPosition] = useState(newroadPosition);

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
          <div className="flex row justify-content-between align-items-center">
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
              <div className="">
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
                      className="w-full"
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
                {stallPositions.flat().filter((isStall) => isStall.value)
                  .length -
                  (selectedStallsMap[selectedMarket]?.[
                    dates[selectedMarket]?.toLocaleDateString()
                  ]?.length || 0)}
              </span>
            </div>
            <hr />
            <div
              className={`market-container ${
                roadPosition === "right" ? "row p-3" : "column"
              }`}
            >
              <div className={`${roadPosition}-road`}>
                {roadPosition === "right" ? (
                  <svg
                    width="198"
                    height="16"
                    viewBox="0 0 198 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M64.4285 13V4.54H65.7125L68.7125 10.072L71.7005 4.54H72.9605V13H71.5685V7.3L69.1445 11.716H68.2445L65.8205 7.324V13H64.4285ZM76.6104 13.12C76.1864 13.12 75.8064 13.04 75.4704 12.88C75.1424 12.712 74.8824 12.488 74.6904 12.208C74.5064 11.928 74.4144 11.612 74.4144 11.26C74.4144 10.828 74.5264 10.488 74.7504 10.24C74.9744 9.984 75.3384 9.8 75.8424 9.688C76.3464 9.576 77.0224 9.52 77.8704 9.52H78.2904V9.268C78.2904 8.868 78.2024 8.58 78.0264 8.404C77.8504 8.228 77.5544 8.14 77.1384 8.14C76.8104 8.14 76.4744 8.192 76.1304 8.296C75.7864 8.392 75.4384 8.544 75.0864 8.752L74.6544 7.732C74.8624 7.588 75.1064 7.464 75.3864 7.36C75.6744 7.248 75.9744 7.164 76.2864 7.108C76.6064 7.044 76.9064 7.012 77.1864 7.012C78.0424 7.012 78.6784 7.212 79.0944 7.612C79.5104 8.004 79.7184 8.616 79.7184 9.448V13H78.3144V12.064C78.1784 12.392 77.9624 12.652 77.6664 12.844C77.3704 13.028 77.0184 13.12 76.6104 13.12ZM76.9224 12.088C77.3144 12.088 77.6384 11.952 77.8944 11.68C78.1584 11.408 78.2904 11.064 78.2904 10.648V10.384H77.8824C77.1304 10.384 76.6064 10.444 76.3104 10.564C76.0224 10.676 75.8784 10.884 75.8784 11.188C75.8784 11.452 75.9704 11.668 76.1544 11.836C76.3384 12.004 76.5944 12.088 76.9224 12.088ZM81.1449 5.872V4.408H82.8249V5.872H81.1449ZM81.2409 13V7.132H82.7409V13H81.2409ZM84.2995 13V7.132H85.7635V8.044C85.9635 7.708 86.2315 7.452 86.5675 7.276C86.9115 7.1 87.2955 7.012 87.7195 7.012C89.1035 7.012 89.7955 7.816 89.7955 9.424V13H88.2955V9.496C88.2955 9.04 88.2075 8.708 88.0315 8.5C87.8635 8.292 87.5995 8.188 87.2395 8.188C86.7995 8.188 86.4475 8.328 86.1835 8.608C85.9275 8.88 85.7995 9.244 85.7995 9.7V13H84.2995ZM94.6974 13V4.54H98.3694C99.2974 4.54 100.013 4.764 100.517 5.212C101.021 5.652 101.273 6.272 101.273 7.072C101.273 7.704 101.109 8.228 100.781 8.644C100.453 9.052 99.9814 9.328 99.3654 9.472C99.7734 9.6 100.109 9.908 100.373 10.396L101.789 13H100.097L98.6334 10.3C98.4894 10.036 98.3174 9.856 98.1174 9.76C97.9254 9.664 97.6774 9.616 97.3734 9.616H96.2334V13H94.6974ZM96.2334 8.476H98.1054C99.2254 8.476 99.7854 8.02 99.7854 7.108C99.7854 6.204 99.2254 5.752 98.1054 5.752H96.2334V8.476ZM105.304 13.12C104.696 13.12 104.168 12.996 103.72 12.748C103.272 12.5 102.924 12.148 102.676 11.692C102.428 11.228 102.304 10.684 102.304 10.06C102.304 9.436 102.428 8.896 102.676 8.44C102.924 7.984 103.272 7.632 103.72 7.384C104.168 7.136 104.696 7.012 105.304 7.012C105.912 7.012 106.44 7.136 106.888 7.384C107.336 7.632 107.684 7.984 107.932 8.44C108.18 8.896 108.304 9.436 108.304 10.06C108.304 10.684 108.18 11.228 107.932 11.692C107.684 12.148 107.336 12.5 106.888 12.748C106.44 12.996 105.912 13.12 105.304 13.12ZM105.304 11.98C105.752 11.98 106.112 11.82 106.384 11.5C106.656 11.172 106.792 10.692 106.792 10.06C106.792 9.42 106.656 8.944 106.384 8.632C106.112 8.312 105.752 8.152 105.304 8.152C104.856 8.152 104.496 8.312 104.224 8.632C103.952 8.944 103.816 9.42 103.816 10.06C103.816 10.692 103.952 11.172 104.224 11.5C104.496 11.82 104.856 11.98 105.304 11.98ZM111.474 13.12C111.05 13.12 110.67 13.04 110.334 12.88C110.006 12.712 109.746 12.488 109.554 12.208C109.37 11.928 109.278 11.612 109.278 11.26C109.278 10.828 109.39 10.488 109.614 10.24C109.838 9.984 110.202 9.8 110.706 9.688C111.21 9.576 111.886 9.52 112.734 9.52H113.154V9.268C113.154 8.868 113.066 8.58 112.89 8.404C112.714 8.228 112.418 8.14 112.002 8.14C111.674 8.14 111.338 8.192 110.994 8.296C110.65 8.392 110.302 8.544 109.95 8.752L109.518 7.732C109.726 7.588 109.97 7.464 110.25 7.36C110.538 7.248 110.838 7.164 111.15 7.108C111.47 7.044 111.77 7.012 112.05 7.012C112.906 7.012 113.542 7.212 113.958 7.612C114.374 8.004 114.582 8.616 114.582 9.448V13H113.178V12.064C113.042 12.392 112.826 12.652 112.53 12.844C112.234 13.028 111.882 13.12 111.474 13.12ZM111.786 12.088C112.178 12.088 112.502 11.952 112.758 11.68C113.022 11.408 113.154 11.064 113.154 10.648V10.384H112.746C111.994 10.384 111.47 10.444 111.174 10.564C110.886 10.676 110.742 10.884 110.742 11.188C110.742 11.452 110.834 11.668 111.018 11.836C111.202 12.004 111.458 12.088 111.786 12.088ZM118.36 13.12C117.848 13.12 117.396 12.996 117.004 12.748C116.62 12.5 116.32 12.148 116.104 11.692C115.888 11.228 115.78 10.684 115.78 10.06C115.78 9.428 115.888 8.888 116.104 8.44C116.32 7.984 116.62 7.632 117.004 7.384C117.396 7.136 117.848 7.012 118.36 7.012C118.776 7.012 119.152 7.104 119.488 7.288C119.824 7.472 120.076 7.716 120.244 8.02V4.54H121.744V13H120.28V12.028C120.12 12.364 119.868 12.632 119.524 12.832C119.18 13.024 118.792 13.12 118.36 13.12ZM118.78 11.98C119.228 11.98 119.588 11.82 119.86 11.5C120.132 11.172 120.268 10.692 120.268 10.06C120.268 9.42 120.132 8.944 119.86 8.632C119.588 8.312 119.228 8.152 118.78 8.152C118.332 8.152 117.972 8.312 117.7 8.632C117.428 8.944 117.292 9.42 117.292 10.06C117.292 10.692 117.428 11.172 117.7 11.5C117.972 11.82 118.332 11.98 118.78 11.98Z"
                      fill="#3AA54B"
                    />
                    <path
                      d="M0.292892 8.70711C-0.0976295 8.31658 -0.0976295 7.68342 0.292892 7.29289L6.65685 0.928932C7.04738 0.538408 7.68054 0.538408 8.07107 0.928932C8.46159 1.31946 8.46159 1.95262 8.07107 2.34315L2.41422 8L8.07107 13.6569C8.46159 14.0474 8.46159 14.6805 8.07107 15.0711C7.68054 15.4616 7.04738 15.4616 6.65685 15.0711L0.292892 8.70711ZM43 9H40.375V7H43V9ZM35.125 9H29.875V7H35.125V9ZM24.625 9H19.375V7H24.625V9ZM14.125 9H8.875V7H14.125V9ZM3.625 9H1V7H3.625V9ZM0.292892 8.70711C-0.0976295 8.31658 -0.0976295 7.68342 0.292892 7.29289L6.65685 0.928932C7.04738 0.538408 7.68054 0.538408 8.07107 0.928932C8.46159 1.31946 8.46159 1.95262 8.07107 2.34315L2.41422 8L8.07107 13.6569C8.46159 14.0474 8.46159 14.6805 8.07107 15.0711C7.68054 15.4616 7.04738 15.4616 6.65685 15.0711L0.292892 8.70711ZM43 9H40.375V7H43V9ZM35.125 9H29.875V7H35.125V9ZM24.625 9H19.375V7H24.625V9ZM14.125 9H8.875V7H14.125V9ZM3.625 9H1V7H3.625V9Z"
                      fill="#3AA54B"
                      fill-opacity="0.5"
                    />
                    <path
                      d="M197.707 8.70711C198.098 8.31658 198.098 7.68342 197.707 7.29289L191.343 0.928932C190.953 0.538408 190.319 0.538408 189.929 0.928932C189.538 1.31946 189.538 1.95262 189.929 2.34315L195.586 8L189.929 13.6569C189.538 14.0474 189.538 14.6805 189.929 15.0711C190.319 15.4616 190.953 15.4616 191.343 15.0711L197.707 8.70711ZM155 9H157.625V7H155V9ZM162.875 9H168.125V7H162.875V9ZM173.375 9H178.625V7H173.375V9ZM183.875 9H189.125V7H183.875V9ZM194.375 9H197V7H194.375V9ZM197.707 8.70711C198.098 8.31658 198.098 7.68342 197.707 7.29289L191.343 0.928932C190.953 0.538408 190.319 0.538408 189.929 0.928932C189.538 1.31946 189.538 1.95262 189.929 2.34315L195.586 8L189.929 13.6569C189.538 14.0474 189.538 14.6805 189.929 15.0711C190.319 15.4616 190.953 15.4616 191.343 15.0711L197.707 8.70711ZM155 9H157.625V7H155V9ZM162.875 9H168.125V7H162.875V9ZM173.375 9H178.625V7H173.375V9ZM183.875 9H189.125V7H183.875V9ZM194.375 9H197V7H194.375V9Z"
                      fill="#3AA54B"
                      fill-opacity="0.5"
                    />
                  </svg>
                ) : (
                  <svg
                    width="34"
                    height="185"
                    viewBox="0 0 34 185"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 184.572H4.54V183.288L10.072 180.288L4.54 177.3V176.04H13V177.432H7.3L11.716 179.856V180.756L7.324 183.18H13V184.572ZM13.12 172.39C13.12 172.814 13.04 173.194 12.88 173.53C12.712 173.858 12.488 174.118 12.208 174.31C11.928 174.494 11.612 174.586 11.26 174.586C10.828 174.586 10.488 174.474 10.24 174.25C9.984 174.026 9.8 173.662 9.688 173.158C9.576 172.654 9.52 171.978 9.52 171.13V170.71H9.268C8.868 170.71 8.58 170.798 8.404 170.974C8.228 171.15 8.14 171.446 8.14 171.862C8.14 172.19 8.192 172.526 8.296 172.87C8.392 173.214 8.544 173.562 8.752 173.914L7.732 174.346C7.588 174.138 7.464 173.894 7.36 173.614C7.248 173.326 7.164 173.026 7.108 172.714C7.044 172.394 7.012 172.094 7.012 171.814C7.012 170.958 7.212 170.322 7.612 169.906C8.004 169.49 8.616 169.282 9.448 169.282H13V170.686H12.064C12.392 170.822 12.652 171.038 12.844 171.334C13.028 171.63 13.12 171.982 13.12 172.39ZM12.088 172.078C12.088 171.686 11.952 171.362 11.68 171.106C11.408 170.842 11.064 170.71 10.648 170.71H10.384V171.118C10.384 171.87 10.444 172.394 10.564 172.69C10.676 172.978 10.884 173.122 11.188 173.122C11.452 173.122 11.668 173.03 11.836 172.846C12.004 172.662 12.088 172.406 12.088 172.078ZM5.872 167.855H4.408V166.175H5.872V167.855ZM13 167.759H7.132V166.259H13V167.759ZM13 164.7H7.132L7.132 163.236H8.044C7.708 163.036 7.452 162.768 7.276 162.432C7.1 162.088 7.012 161.704 7.012 161.28C7.012 159.896 7.816 159.204 9.424 159.204H13V160.704H9.496C9.04 160.704 8.708 160.792 8.5 160.968C8.292 161.136 8.188 161.4 8.188 161.76C8.188 162.2 8.328 162.552 8.608 162.816C8.88 163.072 9.244 163.2 9.7 163.2H13V164.7ZM13 154.303H4.54V150.631C4.54 149.703 4.764 148.987 5.212 148.483C5.652 147.979 6.272 147.727 7.072 147.727C7.704 147.727 8.228 147.891 8.644 148.219C9.052 148.547 9.328 149.019 9.472 149.635C9.6 149.227 9.908 148.891 10.396 148.627L13 147.211V148.903L10.3 150.367C10.036 150.511 9.856 150.683 9.76 150.883C9.664 151.075 9.616 151.323 9.616 151.627V152.767H13V154.303ZM8.476 152.767V150.895C8.476 149.775 8.02 149.215 7.108 149.215C6.204 149.215 5.752 149.775 5.752 150.895V152.767H8.476ZM13.12 143.696C13.12 144.304 12.996 144.832 12.748 145.28C12.5 145.728 12.148 146.076 11.692 146.324C11.228 146.572 10.684 146.696 10.06 146.696C9.436 146.696 8.896 146.572 8.44 146.324C7.984 146.076 7.632 145.728 7.384 145.28C7.136 144.832 7.012 144.304 7.012 143.696C7.012 143.088 7.136 142.56 7.384 142.112C7.632 141.664 7.984 141.316 8.44 141.068C8.896 140.82 9.436 140.696 10.06 140.696C10.684 140.696 11.228 140.82 11.692 141.068C12.148 141.316 12.5 141.664 12.748 142.112C12.996 142.56 13.12 143.088 13.12 143.696ZM11.98 143.696C11.98 143.248 11.82 142.888 11.5 142.616C11.172 142.344 10.692 142.208 10.06 142.208C9.42 142.208 8.944 142.344 8.632 142.616C8.312 142.888 8.152 143.248 8.152 143.696C8.152 144.144 8.312 144.504 8.632 144.776C8.944 145.048 9.42 145.184 10.06 145.184C10.692 145.184 11.172 145.048 11.5 144.776C11.82 144.504 11.98 144.144 11.98 143.696ZM13.12 137.526C13.12 137.95 13.04 138.33 12.88 138.666C12.712 138.994 12.488 139.254 12.208 139.446C11.928 139.63 11.612 139.722 11.26 139.722C10.828 139.722 10.488 139.61 10.24 139.386C9.984 139.162 9.8 138.798 9.688 138.294C9.576 137.79 9.52 137.114 9.52 136.266V135.846H9.268C8.868 135.846 8.58 135.934 8.404 136.11C8.228 136.286 8.14 136.582 8.14 136.998C8.14 137.326 8.192 137.662 8.296 138.006C8.392 138.35 8.544 138.698 8.752 139.05L7.732 139.482C7.588 139.274 7.464 139.03 7.36 138.75C7.248 138.462 7.164 138.162 7.108 137.85C7.044 137.53 7.012 137.23 7.012 136.95C7.012 136.094 7.212 135.458 7.612 135.042C8.004 134.626 8.616 134.418 9.448 134.418H13V135.822H12.064C12.392 135.958 12.652 136.174 12.844 136.47C13.028 136.766 13.12 137.118 13.12 137.526ZM12.088 137.214C12.088 136.822 11.952 136.498 11.68 136.242C11.408 135.978 11.064 135.846 10.648 135.846H10.384V136.254C10.384 137.006 10.444 137.53 10.564 137.826C10.676 138.114 10.884 138.258 11.188 138.258C11.452 138.258 11.668 138.166 11.836 137.982C12.004 137.798 12.088 137.542 12.088 137.214ZM13.12 130.64C13.12 131.152 12.996 131.604 12.748 131.996C12.5 132.38 12.148 132.68 11.692 132.896C11.228 133.112 10.684 133.22 10.06 133.22C9.428 133.22 8.888 133.112 8.44 132.896C7.984 132.68 7.632 132.38 7.384 131.996C7.136 131.604 7.012 131.152 7.012 130.64C7.012 130.224 7.104 129.848 7.288 129.512C7.472 129.176 7.716 128.924 8.02 128.756H4.54V127.256H13V128.72H12.028C12.364 128.88 12.632 129.132 12.832 129.476C13.024 129.82 13.12 130.208 13.12 130.64ZM11.98 130.22C11.98 129.772 11.82 129.412 11.5 129.14C11.172 128.868 10.692 128.732 10.06 128.732C9.42 128.732 8.944 128.868 8.632 129.14C8.312 129.412 8.152 129.772 8.152 130.22C8.152 130.668 8.312 131.028 8.632 131.3C8.944 131.572 9.42 131.708 10.06 131.708C10.692 131.708 11.172 131.572 11.5 131.3C11.82 131.028 11.98 130.668 11.98 130.22Z"
                      fill="#3AA54B"
                    />
                    <path
                      d="M9 30.076H0.539999L0.539999 24.448H1.764L1.764 28.6H4.092V24.712H5.316V28.6H7.776V24.448H9V30.076ZM9 23.0598H3.132V21.5958H4.044C3.708 21.3958 3.452 21.1278 3.276 20.7918C3.1 20.4478 3.012 20.0638 3.012 19.6398C3.012 18.2558 3.816 17.5638 5.424 17.5638H9V19.0638H5.496C5.04 19.0638 4.708 19.1518 4.5 19.3278C4.292 19.4958 4.188 19.7598 4.188 20.1198C4.188 20.5598 4.328 20.9118 4.608 21.1758C4.88 21.4318 5.244 21.5598 5.7 21.5598H9V23.0598ZM9.12 13.3523C9.12 14.9043 8.352 15.6803 6.816 15.6803H4.26V16.8083H3.132V15.6803H1.38V14.1803H3.132V12.4043H4.26V14.1803H6.732C7.116 14.1803 7.404 14.0963 7.596 13.9283C7.788 13.7603 7.884 13.4883 7.884 13.1123C7.884 13.0003 7.872 12.8843 7.848 12.7643C7.816 12.6443 7.784 12.5203 7.752 12.3923L8.856 12.1643C8.936 12.3083 9 12.4923 9.048 12.7163C9.096 12.9323 9.12 13.1443 9.12 13.3523ZM9 11.4348H3.132V9.97084H4.164C3.468 9.68284 3.084 9.06684 3.012 8.12284L2.976 7.66684L4.248 7.57084L4.332 8.43484C4.428 9.41884 4.932 9.91084 5.844 9.91084H9V11.4348ZM11.16 5.84434L8.76 4.76434L3.132 7.20034V5.60434L7.236 3.96034L3.132 2.28034V0.768344L11.16 4.29634V5.84434Z"
                      fill="#3AA54B"
                    />
                    <path
                      d="M33.0179 18L23.0179 12.2265V23.7735L33.0179 18ZM5 19H8.50223V17H5V19ZM15.5067 19L22.5112 19V17L15.5067 17V19ZM33.0179 18L23.0179 12.2265V23.7735L33.0179 18ZM5 19H8.50223V17H5V19ZM15.5067 19L22.5112 19V17L15.5067 17V19Z"
                      fill="#3AA54B"
                      fill-opacity="0.5"
                    />
                  </svg>
                )}
              </div>
              <div
                className={`market-layout ${
                  roadPosition === "left" ? "pl-3" : ""
                }`}
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
                        data-pr-tooltip={stall ? stall.stallName : ""}
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
                                className={`${isStall.direction} stall-image w-10 md:w-5 lg:w-7`}
                              />
                              <div>{/* {stall.stallName} */}</div>
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
