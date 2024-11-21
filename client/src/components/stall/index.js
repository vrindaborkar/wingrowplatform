import React, { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FORM_FIELDS_NAME } from "./constant";
import { Tooltip } from "primereact/tooltip";
import { Button } from "primereact/button";
import { baseUrl } from "../../services/PostAPI";
import { API_PATH, ROUTE_PATH } from "../../constant/urlConstant";
import { useNavigate,useLocation } from "react-router-dom";
import moment from "moment";
import "./stall.css";

import axios from "axios";
import { selectedStall } from "../../redux/action/stall";

import { Calendar } from "primereact/calendar";
import { ProgressSpinner } from "primereact/progressspinner";
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
import { useDispatch, useSelector } from "react-redux";

const StallComponent = (props) => {
  const [setRedirectStall] = useState(true);
  const location = useLocation();
  const currentPath = location.pathname;
  const {
    fetchStallList,
    formFieldValueMap,
    isPageLevelError,
    isLoginSuccess,
    isLoading,
    login,
    sendVerificationCode,
    verifyCode,
    isLoggedIn,
    logout,
    sendVerificationCodeSuccess,
    marketList,
  } = props.stallProps;
  const navigate = useNavigate();
  const marketOptions = Object.keys(marketList).flatMap((marketKey) => {
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

  let stallIndex = 0;

  const savedMarket = marketOptions.length
    ? localStorage.getItem("selectedMarket") || marketOptions[0].value
    : "";

  const newroadPosition = localStorage.getItem("roadPosition") || "top";

  const [selectedStallsMap, setSelectedStallsMap] = useState({});
  const [stallDataMap, setStallDataMap] = useState(new Map());
  const [totalPrice, setTotalPrice] = useState(0);
  const [dates, setDates] = useState({});

  const [stallPositions, setStallPositions] = useState(
    scheduleData.marketStallPositions.Default
  );
  const [roadPosition, setRoadPosition] = useState(
    scheduleData.roadPositions.Default
  );

  const [selectedMarket, setSelectedMarket] = useState(savedMarket);
  const [stallList, setStallList] = useState([]);
  const [marketDay, setMarketDay] = useState(
    marketOptions.marketDay || "Saturday"
  );

  const [selectedStallsData, setSelectedStallsData] = useState({});
  const [showPaymentScreen, setShowPaymentScreen] = useState(false);
  const [bookStalls, setbookStalls] = useState([]);
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const [showDetails, setShowDetails] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [modalStalls, setModalStalls] = useState([]);

  const { marketStallPositions, roadPositions } = scheduleData || {};
  const sessionSelectedMarketDate = [];

  const [loading, setLoading] = useState(false);

  const dat = new Date();
  const toast = useRef(null);
  const dispatch = useDispatch();

  const selectedStallItems = sessionStorage.getItem("selectedStalls");
  const sessionSelsctedStalls = selectedStallItems
    ? JSON.parse(selectedStallItems)
    : {};

  const selectedStallsRedux = useSelector((state) => {
    return state.stallReducer.selectedStalls;
  });

  const isLoggedInPayment = useSelector((state) => state.msg91Reducer.isVerify);

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
      const formattedDateString = moment(firstDateString, "YYYY/MM/DD").format(
        "YYYY/MM/DD"
      );

      const firstDate = moment(formattedDateString, "YYYY/MM/DD").toDate();

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
    if (selectedStallsRedux?.length === 0) {
      const savedStalls = JSON.parse(sessionStorage.getItem("selectedStalls"));
      if (savedStalls) {
        dispatch({ type: "SELECT_STALL", payload: savedStalls });
      }
    }
  }, [selectedStallsRedux, dispatch]);

  useEffect(() => {
    navigate("/market");
  }, []);
  const onSubmit = (data) => {
    if (selectedStallsRedux?.length === 0) {
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

    if (!stall) {
      return;
    }

    if (!stall.available) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "This stall is not available.",
        life: 3000,
      });
      return;
    }

    const currentDate = dates[selectedMarket].toLocaleDateString();
    const newSelectedStalls = { ...selectedStallsMap };

    if (!newSelectedStalls[selectedMarket]) {
      newSelectedStalls[selectedMarket] = {};
    }

    if (!newSelectedStalls[selectedMarket][currentDate]) {
      newSelectedStalls[selectedMarket][currentDate] = [];
    }

    let dateStalls = newSelectedStalls[selectedMarket][currentDate];
    const isStallSelected = dateStalls.includes(stallId);

    if (isStallSelected) {
      dateStalls = dateStalls.filter((s) => s !== stallId);
      setTotalPrice((prevPrice) => prevPrice - stall.stallPrice);

      newSelectedStalls[selectedMarket][currentDate] = dateStalls;

      if (dateStalls.length === 0) {
        delete newSelectedStalls[selectedMarket][currentDate];

        if (Object.keys(newSelectedStalls[selectedMarket]).length === 0) {
          delete newSelectedStalls[selectedMarket];
        }
      }
    } else {
      if (dateStalls.length >= 3) {
        const removedStallId = dateStalls.shift();
        const removedStall = stallDataMap.get(removedStallId);
        setTotalPrice(
          (prevPrice) =>
            prevPrice - (removedStall ? removedStall.stallPrice : 0)
        );
      }
      dateStalls.push(stallId);
      setTotalPrice((prevPrice) => prevPrice + stall.stallPrice);
    }

    setSelectedStallsMap(newSelectedStalls);

    const groupedStall = Object.keys(newSelectedStalls).flatMap(
      (marketName) => {
        const marketStalls = newSelectedStalls[marketName];
        return Object.keys(marketStalls)
          .map((date) => {
            const dateStalls = marketStalls[date].map((stallId) => {
              const stall = stallDataMap.get(stallId);
              return {
                id: stall ? stall._id : "",
                stallNo: stall ? stall.stallNo : "No Stall No",
                name: stall ? stall.stallName : "No Stall",
                price: stall ? stall.stallPrice : 0,
                date: date || "Not selected",
              };
            });

            return dateStalls.length > 0
              ? {
                  market_name: marketName,
                  date: date || "Not selected",
                  stalls: dateStalls,
                  bookedBy: user ? user.id : null,
                }
              : null;
          })
          .filter(Boolean);
      }
    );

    if (JSON.stringify(groupedStall) !== JSON.stringify(bookStalls)) {
      setbookStalls(groupedStall);
      dispatch(selectedStall(groupedStall));
    }

    setSelectedStallsData((prevData) => ({
      ...prevData,
      [stallId]: stall,
    }));
  };
  const loginProps = {
    formFieldValueMap,
    isPageLevelError,
    isLoginSuccess,
    setRedirectStall,
    isLoading,
    login,
    sendVerificationCode,
    verifyCode,
    isLoggedIn,
    logout,
    sendVerificationCodeSuccess,
  };
  function calculateTotalPrices(data) {
    let totalPrices = {};
    let overallTotal = 0;

    (Array.isArray(data) ? data : []).forEach((marketData) => {
      const marketName = marketData.market_name;
      const stalls = marketData.stalls || [];
      totalPrices[marketName] = 0;
      const marketTotal = stalls.reduce(
        (sum, stall) => sum + (stall.price || 0),
        0
      );
      totalPrices[marketName] = marketTotal;
      overallTotal += marketTotal;
    });

    totalPrices["TotalAmount"] = overallTotal;
    return totalPrices.TotalAmount;
  }

  const totalAmount = calculateTotalPrices(bookStalls);

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
        if (isStall.value) {
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

      const roadPosition =
        roadPositions[selectedMarket] || roadPositions.Default;
      setRoadPosition(roadPosition);

      fetchStallList(selectedMarket);

      localStorage.setItem("selectedMarket", selectedMarket);
      localStorage.setItem("roadPosition", roadPosition);
      const selectedMarketObj = marketOptions.find(
        (m) => m.value === selectedMarket
      );

      setMarketDay(selectedMarketObj ? selectedMarketObj.marketDay : "Sunday");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMarket, marketStallPositions, roadPositions, fetchStallList]);

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

  const getDisabledDays = (marketDay) => {
    const allDays = [0, 1, 2, 3, 4, 5, 6];
    const marketDayIndex = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ].indexOf(marketDay);

    if (marketDayIndex === -1) {
      return allDays;
    }
    const disabled = allDays.filter((day) => day !== marketDayIndex);
    return disabled;
  };
  const handleMarket = async (e) => {
    const marketName = e.value;
    setSelectedMarket(marketName);
    setLoading(true);

    const selectedMarketObj = marketOptions.find((m) => m.value === marketName);

    if (selectedMarketObj) {
      const disabled = getDisabledDays(selectedMarketObj.marketDay);
      setMarketDay(disabled);

      const positions =
        marketStallPositions[marketName] || marketStallPositions.Default;
      setStallPositions(positions);

      const roadPosition = roadPositions[marketName] || roadPositions.Default;

      setDates((prevDates) => ({
        ...prevDates,
        [marketName]: prevDates[marketName] || null,
      }));

      setRoadPosition(roadPosition);

      setMarketDay(selectedMarketObj.marketDay || "Sunday");

      setSelectedStallsMap((prevSelectedStallsMap) => ({
        ...prevSelectedStallsMap,
        [marketName]: prevSelectedStallsMap[marketName] || {},
      }));

      navigate(`${ROUTE_PATH.BOOKING.STALL.replace(":id", marketName)}`);
    }
  };
  useEffect(() => {
    const fetchStalls = async () => {
      setLoading(true);

      try {
        const formattedDate = moment(dates[selectedMarket]).format(
          "YYYY/MM/DD"
        );
        const response = await axios.get(
          `${baseUrl}${API_PATH.STALL.FETCH}?location=${selectedMarket}&date=${formattedDate}`
        );

        if (response.data && response.data.stalls) {
          const sortedStalls = [...response.data.stalls].sort(
            (a, b) => a.stallNo - b.stallNo
          );
          setStallList(sortedStalls);
        } else {
          setStallList([]);
        }
      } catch (error) {
        setStallList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStalls();
  }, [selectedMarket, dates[selectedMarket]]);

  useEffect(() => {
    if (selectedMarket) {
      handleMarket({ value: selectedMarket });
    }
  }, [selectedMarket]);

  const handlePaymentClick = () => {
    if (isLoggedInPayment && isLoggedIn) {
      setShowPaymentScreen(true);
    } else {
      navigate("/login")
      localStorage.setItem("redirectAfterLogin", currentPath);
    }
  };
  const handleShowClick = (e) => {
    e.preventDefault();

    const groupedStalls = Object.keys(selectedStallsMap)
      .map((marketName) => {
        const marketStalls = selectedStallsMap[marketName];

        return Object.keys(marketStalls)
          .map((date) => {
            const dateStalls = marketStalls[date].map((stallId) => {
              const stall = selectedStallsData[stallId];
              return {
                id: stall._id,
                stallNo: stall ? stall.stallNo : "No Stall No",
                name: stall ? stall.stallName : "No Stall",
                price: stall ? stall.stallPrice : 0,
                date: date || "Not selected",
              };
            });

            return dateStalls.length > 0
              ? {
                  market_name: marketName,
                  date: date || "Not selected",
                  stalls: dateStalls,
                }
              : null;
          })
          .filter(Boolean);
      })
      .flat();

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
  const handleDateChange = ({ value }, field) => {
    setDates((prevDates) => ({
      ...prevDates,
      [selectedMarket]: value,
    }));
    field?.onChange(moment(value).format("YYYY-MM-DD"));
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="stall-container">
        {loading ? (
          <ProgressSpinner />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="stall-form">
            <div className="flex row justify-content-between align-items-center">
              <div className="market-dropdown-section col-6">
                <label htmlFor="market">Select Market</label>
                <Dropdown
                  id="market"
                  value={selectedMarket}
                  options={marketOptions}
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
                        onChange={(e) => handleDateChange(e, field)}
                        placeholder={FORM_FIELDS_NAME.B_DATE.placeholder}
                        disabledDays={getDisabledDays(marketDay)}
                        minDate={dat}
                        showIcon={true}
                        showButtonBar={false}
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
                  Available stalls:{" "}
                  {stallPositions.flat().filter((isStall) => isStall.value)
                    .length -
                    (selectedStallsMap[selectedMarket]?.[
                      dates[selectedMarket]?.toLocaleDateString()
                    ]?.length || 0) -
                    stallList.filter((stall) => !stall.available).length}
                </span>
              </div>
              <hr />
              <div
                className={`market-container ${
                  roadPosition === "top" ? "row p-3" : "column"
                }`}
              >
                <div className={`${roadPosition}-road`}>
                  {roadPosition === "left" &&
                  selectedMarket === "Kharadi IT Park" ? (
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
                  ) : roadPosition === "left" &&
                    selectedMarket === "Ivy Estate" ? (
                    <svg
                      width="34"
                      height="185"
                      viewBox="0 0 34 185"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
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
                  ) : (roadPosition === "top" &&
                      selectedMarket === "Godrej Prana") ||
                    selectedMarket === "Bramhasun City" ||
                    selectedMarket === "undri" ? (
                    <svg
                      width="31"
                      height="42"
                      viewBox="0 0 31 42"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="stall"
                    >
                      <path
                        opacity="0.8"
                        d="M0.924 9L0.924 0.539999L6.552 0.539999L6.552 1.764L2.4 1.764L2.4 4.092L6.288 4.092V5.316L2.4 5.316L2.4 7.776H6.552L6.552 9H0.924ZM7.94016 9L7.94016 3.132H9.40416V4.308H9.27216C9.44816 3.884 9.72016 3.564 10.0882 3.348C10.4642 3.124 10.8882 3.012 11.3602 3.012C11.8322 3.012 12.2202 3.1 12.5242 3.276C12.8282 3.452 13.0562 3.72 13.2082 4.08C13.3602 4.432 13.4362 4.88 13.4362 5.424V9H11.9362V5.496C11.9362 5.192 11.8962 4.944 11.8162 4.752C11.7442 4.56 11.6282 4.42 11.4682 4.332C11.3162 4.236 11.1202 4.188 10.8802 4.188C10.5922 4.188 10.3402 4.252 10.1242 4.38C9.90816 4.5 9.74016 4.676 9.62016 4.908C9.50016 5.132 9.44016 5.396 9.44016 5.7V9H7.94016ZM17.6477 9.12C16.8637 9.12 16.2797 8.924 15.8957 8.532C15.5117 8.14 15.3197 7.568 15.3197 6.816L15.3197 4.26H14.1917V3.132H15.3197V1.38L16.8197 1.38V3.132L18.5957 3.132V4.26L16.8197 4.26V6.732C16.8197 7.116 16.9037 7.404 17.0717 7.596C17.2397 7.788 17.5117 7.884 17.8877 7.884C17.9997 7.884 18.1157 7.872 18.2357 7.848C18.3557 7.816 18.4797 7.784 18.6077 7.752L18.8357 8.856C18.6917 8.936 18.5077 9 18.2837 9.048C18.0677 9.096 17.8557 9.12 17.6477 9.12ZM19.5652 9V3.132H21.0292V4.548H20.9092C21.0212 4.068 21.2412 3.704 21.5692 3.456C21.8972 3.2 22.3332 3.052 22.8772 3.012L23.3332 2.976L23.4292 4.248L22.5652 4.332C22.0772 4.38 21.7092 4.532 21.4612 4.788C21.2132 5.036 21.0892 5.388 21.0892 5.844V9H19.5652ZM25.1557 11.16L26.3797 8.46V9.084L23.7997 3.132L25.3957 3.132L27.2197 7.68H26.8597L28.7197 3.132H30.2317L26.7037 11.16H25.1557Z"
                        fill="#3AA54B"
                      />
                      <path
                        d="M14.0088 41.0377L19.7823 31.0377H8.23529L14.0088 41.0377ZM13.0088 13.9624V17.3468H15.0088V13.9624H13.0088ZM13.0088 24.1156V30.8844H15.0088V24.1156H13.0088ZM14.0088 41.0377L19.7823 31.0377H8.23529L14.0088 41.0377ZM13.0088 13.9624V17.3468H15.0088V13.9624H13.0088ZM13.0088 24.1156V30.8844H15.0088V24.1156H13.0088Z"
                        fill="#3AA54B"
                        fill-opacity="0.5"
                      />
                    </svg>
                  ) : (roadPosition === "right" &&
                      selectedMarket === "Tingre Nagar") ||
                    selectedMarket === "F-Plaza" ||
                    selectedMarket === "Ambegaon" ? (
                    <svg
                      width="41"
                      height="514"
                      viewBox="0 0 41 514"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.46 268.484C10.46 268.252 10.4235 268.047 10.3506 267.869C10.2822 267.687 10.1592 267.523 9.98145 267.377C9.80827 267.231 9.56673 267.092 9.25684 266.96C8.9515 266.828 8.56413 266.693 8.09473 266.557C7.60254 266.411 7.1582 266.249 6.76172 266.071C6.36523 265.889 6.02572 265.682 5.74316 265.449C5.46061 265.217 5.24414 264.95 5.09375 264.649C4.94336 264.349 4.86816 264.005 4.86816 263.617C4.86816 263.23 4.94792 262.872 5.10742 262.544C5.26693 262.216 5.49479 261.931 5.79102 261.689C6.0918 261.443 6.44954 261.252 6.86426 261.115C7.27897 260.979 7.74154 260.91 8.25195 260.91C8.99935 260.91 9.63281 261.054 10.1523 261.341C10.6764 261.623 11.0752 261.995 11.3486 262.455C11.6221 262.911 11.7588 263.398 11.7588 263.918H10.4463C10.4463 263.544 10.3665 263.214 10.207 262.927C10.0475 262.635 9.80599 262.407 9.48242 262.243C9.15885 262.075 8.7487 261.99 8.25195 261.99C7.78255 261.99 7.39518 262.061 7.08984 262.202C6.78451 262.343 6.55664 262.535 6.40625 262.776C6.26042 263.018 6.1875 263.294 6.1875 263.604C6.1875 263.813 6.23079 264.005 6.31738 264.178C6.40853 264.346 6.54753 264.504 6.73438 264.649C6.92578 264.795 7.16732 264.93 7.45898 265.053C7.75521 265.176 8.1084 265.294 8.51855 265.408C9.08366 265.568 9.57129 265.745 9.98145 265.941C10.3916 266.137 10.7288 266.358 10.9932 266.604C11.262 266.846 11.4603 267.122 11.5879 267.432C11.7201 267.737 11.7861 268.083 11.7861 268.471C11.7861 268.876 11.7041 269.243 11.54 269.571C11.376 269.899 11.1413 270.18 10.8359 270.412C10.5306 270.645 10.1637 270.825 9.73535 270.952C9.31152 271.075 8.83757 271.137 8.31348 271.137C7.85319 271.137 7.39974 271.073 6.95312 270.945C6.51107 270.818 6.10775 270.626 5.74316 270.371C5.38314 270.116 5.09375 269.801 4.875 269.428C4.66081 269.049 4.55371 268.612 4.55371 268.115H5.86621C5.86621 268.457 5.93229 268.751 6.06445 268.997C6.19661 269.239 6.37663 269.439 6.60449 269.599C6.83691 269.758 7.09896 269.877 7.39062 269.954C7.68685 270.027 7.99447 270.063 8.31348 270.063C8.77376 270.063 9.16341 270 9.48242 269.872C9.80143 269.744 10.043 269.562 10.207 269.325C10.3757 269.088 10.46 268.808 10.46 268.484ZM16.373 263.604V264.574H12.374V263.604H16.373ZM13.7275 261.806H14.9922V269.168C14.9922 269.419 15.0309 269.608 15.1084 269.735C15.1859 269.863 15.2861 269.947 15.4092 269.988C15.5322 270.029 15.6644 270.05 15.8057 270.05C15.9105 270.05 16.0199 270.041 16.1338 270.022C16.2523 270 16.3411 269.981 16.4004 269.968L16.4072 271C16.307 271.032 16.1748 271.062 16.0107 271.089C15.8512 271.121 15.6576 271.137 15.4297 271.137C15.1198 271.137 14.835 271.075 14.5752 270.952C14.3154 270.829 14.1081 270.624 13.9531 270.337C13.8027 270.045 13.7275 269.653 13.7275 269.161V261.806ZM22.2178 269.735V265.928C22.2178 265.636 22.1585 265.383 22.04 265.169C21.9261 264.95 21.7529 264.782 21.5205 264.663C21.2881 264.545 21.001 264.485 20.6592 264.485C20.3402 264.485 20.0599 264.54 19.8184 264.649C19.5814 264.759 19.3945 264.902 19.2578 265.08C19.1257 265.258 19.0596 265.449 19.0596 265.654H17.7949C17.7949 265.39 17.8633 265.128 18 264.868C18.1367 264.608 18.3327 264.374 18.5879 264.164C18.8477 263.95 19.1576 263.781 19.5176 263.658C19.8822 263.531 20.2878 263.467 20.7344 263.467C21.2721 263.467 21.7461 263.558 22.1562 263.74C22.571 263.923 22.8945 264.198 23.127 264.567C23.3639 264.932 23.4824 265.39 23.4824 265.941V269.387C23.4824 269.633 23.5029 269.895 23.5439 270.173C23.5895 270.451 23.6556 270.69 23.7422 270.891V271H22.4229C22.359 270.854 22.3089 270.66 22.2725 270.419C22.236 270.173 22.2178 269.945 22.2178 269.735ZM22.4365 266.516L22.4502 267.404H21.1719C20.8118 267.404 20.4906 267.434 20.208 267.493C19.9255 267.548 19.6885 267.632 19.4971 267.746C19.3057 267.86 19.1598 268.004 19.0596 268.177C18.9593 268.345 18.9092 268.544 18.9092 268.771C18.9092 269.004 18.9616 269.216 19.0664 269.407C19.1712 269.599 19.3285 269.751 19.5381 269.865C19.7523 269.975 20.0143 270.029 20.3242 270.029C20.7116 270.029 21.0534 269.947 21.3496 269.783C21.6458 269.619 21.8805 269.419 22.0537 269.182C22.2314 268.945 22.3271 268.715 22.3408 268.491L22.8809 269.1C22.849 269.291 22.7624 269.503 22.6211 269.735C22.4798 269.968 22.2907 270.191 22.0537 270.405C21.8213 270.615 21.5433 270.79 21.2197 270.932C20.9007 271.068 20.5407 271.137 20.1396 271.137C19.6383 271.137 19.1986 271.039 18.8203 270.843C18.4466 270.647 18.1549 270.385 17.9453 270.057C17.7402 269.724 17.6377 269.353 17.6377 268.942C17.6377 268.546 17.7152 268.197 17.8701 267.896C18.0251 267.591 18.2484 267.338 18.54 267.138C18.8317 266.933 19.1826 266.778 19.5928 266.673C20.0029 266.568 20.4609 266.516 20.9668 266.516H22.4365ZM26.8457 263.604V271H25.5742V263.604H26.8457ZM25.4785 261.642C25.4785 261.437 25.54 261.263 25.6631 261.122C25.7907 260.981 25.9775 260.91 26.2236 260.91C26.4652 260.91 26.6497 260.981 26.7773 261.122C26.9095 261.263 26.9756 261.437 26.9756 261.642C26.9756 261.838 26.9095 262.006 26.7773 262.147C26.6497 262.284 26.4652 262.353 26.2236 262.353C25.9775 262.353 25.7907 262.284 25.6631 262.147C25.54 262.006 25.4785 261.838 25.4785 261.642ZM30.1406 264.766V271H28.876V263.604H30.1064L30.1406 264.766ZM32.4512 263.562L32.4443 264.738C32.3395 264.715 32.2393 264.702 32.1436 264.697C32.0524 264.688 31.9476 264.684 31.8291 264.684C31.5374 264.684 31.2799 264.729 31.0566 264.82C30.8333 264.911 30.6442 265.039 30.4893 265.203C30.3343 265.367 30.2113 265.563 30.1201 265.791C30.0335 266.014 29.9766 266.26 29.9492 266.529L29.5938 266.734C29.5938 266.288 29.637 265.868 29.7236 265.477C29.8148 265.085 29.9538 264.738 30.1406 264.438C30.3275 264.132 30.5645 263.895 30.8516 263.727C31.1432 263.553 31.4896 263.467 31.8906 263.467C31.9818 263.467 32.0866 263.478 32.2051 263.501C32.3236 263.519 32.4056 263.54 32.4512 263.562ZM37.9268 269.038C37.9268 268.856 37.8857 268.687 37.8037 268.532C37.7262 268.373 37.5645 268.229 37.3184 268.102C37.0768 267.969 36.7122 267.855 36.2246 267.76C35.8145 267.673 35.443 267.571 35.1104 267.452C34.7822 267.334 34.502 267.19 34.2695 267.021C34.0417 266.853 33.8662 266.655 33.7432 266.427C33.6201 266.199 33.5586 265.932 33.5586 265.627C33.5586 265.335 33.6224 265.06 33.75 264.8C33.8822 264.54 34.0667 264.31 34.3037 264.109C34.5452 263.909 34.8346 263.752 35.1719 263.638C35.5091 263.524 35.8851 263.467 36.2998 263.467C36.8923 263.467 37.3981 263.572 37.8174 263.781C38.2367 263.991 38.5579 264.271 38.7812 264.622C39.0046 264.968 39.1162 265.354 39.1162 265.777H37.8516C37.8516 265.572 37.79 265.374 37.667 265.183C37.5485 264.987 37.373 264.825 37.1406 264.697C36.9128 264.57 36.6325 264.506 36.2998 264.506C35.9489 264.506 35.6641 264.561 35.4453 264.67C35.2311 264.775 35.0739 264.909 34.9736 265.073C34.8779 265.237 34.8301 265.41 34.8301 265.593C34.8301 265.729 34.8529 265.853 34.8984 265.962C34.9486 266.067 35.0352 266.165 35.1582 266.256C35.2812 266.342 35.4544 266.424 35.6777 266.502C35.901 266.579 36.1859 266.657 36.5322 266.734C37.1383 266.871 37.6374 267.035 38.0293 267.227C38.4212 267.418 38.7129 267.653 38.9043 267.931C39.0957 268.209 39.1914 268.546 39.1914 268.942C39.1914 269.266 39.123 269.562 38.9863 269.831C38.8542 270.1 38.6605 270.332 38.4053 270.528C38.1546 270.72 37.8538 270.87 37.5029 270.979C37.1566 271.084 36.7669 271.137 36.334 271.137C35.6823 271.137 35.1309 271.021 34.6797 270.788C34.2285 270.556 33.8867 270.255 33.6543 269.886C33.4219 269.517 33.3057 269.127 33.3057 268.717H34.5771C34.5954 269.063 34.6956 269.339 34.8779 269.544C35.0602 269.744 35.2835 269.888 35.5479 269.975C35.8122 270.057 36.0742 270.098 36.334 270.098C36.6803 270.098 36.9697 270.052 37.2021 269.961C37.4391 269.87 37.6191 269.744 37.7422 269.585C37.8652 269.425 37.9268 269.243 37.9268 269.038Z"
                        fill="#3B9C36"
                        fill-opacity="0.46"
                      />
                      <path
                        d="M8.45996 199.484C8.45996 199.252 8.4235 199.047 8.35059 198.869C8.28223 198.687 8.15918 198.523 7.98145 198.377C7.80827 198.231 7.56673 198.092 7.25684 197.96C6.9515 197.828 6.56413 197.693 6.09473 197.557C5.60254 197.411 5.1582 197.249 4.76172 197.071C4.36523 196.889 4.02572 196.682 3.74316 196.449C3.46061 196.217 3.24414 195.95 3.09375 195.649C2.94336 195.349 2.86816 195.005 2.86816 194.617C2.86816 194.23 2.94792 193.872 3.10742 193.544C3.26693 193.216 3.49479 192.931 3.79102 192.689C4.0918 192.443 4.44954 192.252 4.86426 192.115C5.27897 191.979 5.74154 191.91 6.25195 191.91C6.99935 191.91 7.63281 192.054 8.15234 192.341C8.67643 192.623 9.0752 192.995 9.34863 193.455C9.62207 193.911 9.75879 194.398 9.75879 194.918H8.44629C8.44629 194.544 8.36654 194.214 8.20703 193.927C8.04753 193.635 7.80599 193.407 7.48242 193.243C7.15885 193.075 6.7487 192.99 6.25195 192.99C5.78255 192.99 5.39518 193.061 5.08984 193.202C4.78451 193.343 4.55664 193.535 4.40625 193.776C4.26042 194.018 4.1875 194.294 4.1875 194.604C4.1875 194.813 4.23079 195.005 4.31738 195.178C4.40853 195.346 4.54753 195.504 4.73438 195.649C4.92578 195.795 5.16732 195.93 5.45898 196.053C5.75521 196.176 6.1084 196.294 6.51855 196.408C7.08366 196.568 7.57129 196.745 7.98145 196.941C8.3916 197.137 8.72884 197.358 8.99316 197.604C9.26204 197.846 9.46029 198.122 9.58789 198.432C9.72005 198.737 9.78613 199.083 9.78613 199.471C9.78613 199.876 9.7041 200.243 9.54004 200.571C9.37598 200.899 9.14128 201.18 8.83594 201.412C8.5306 201.645 8.16374 201.825 7.73535 201.952C7.31152 202.075 6.83757 202.137 6.31348 202.137C5.85319 202.137 5.39974 202.073 4.95312 201.945C4.51107 201.818 4.10775 201.626 3.74316 201.371C3.38314 201.116 3.09375 200.801 2.875 200.428C2.66081 200.049 2.55371 199.612 2.55371 199.115H3.86621C3.86621 199.457 3.93229 199.751 4.06445 199.997C4.19661 200.239 4.37663 200.439 4.60449 200.599C4.83691 200.758 5.09896 200.877 5.39062 200.954C5.68685 201.027 5.99447 201.063 6.31348 201.063C6.77376 201.063 7.16341 201 7.48242 200.872C7.80143 200.744 8.04297 200.562 8.20703 200.325C8.37565 200.088 8.45996 199.808 8.45996 199.484ZM14.373 194.604V195.574H10.374V194.604H14.373ZM11.7275 192.806H12.9922V200.168C12.9922 200.419 13.0309 200.608 13.1084 200.735C13.1859 200.863 13.2861 200.947 13.4092 200.988C13.5322 201.029 13.6644 201.05 13.8057 201.05C13.9105 201.05 14.0199 201.041 14.1338 201.022C14.2523 201 14.3411 200.981 14.4004 200.968L14.4072 202C14.307 202.032 14.1748 202.062 14.0107 202.089C13.8512 202.121 13.6576 202.137 13.4297 202.137C13.1198 202.137 12.835 202.075 12.5752 201.952C12.3154 201.829 12.1081 201.624 11.9531 201.337C11.8027 201.045 11.7275 200.653 11.7275 200.161V192.806ZM20.2178 200.735V196.928C20.2178 196.636 20.1585 196.383 20.04 196.169C19.9261 195.95 19.7529 195.782 19.5205 195.663C19.2881 195.545 19.001 195.485 18.6592 195.485C18.3402 195.485 18.0599 195.54 17.8184 195.649C17.5814 195.759 17.3945 195.902 17.2578 196.08C17.1257 196.258 17.0596 196.449 17.0596 196.654H15.7949C15.7949 196.39 15.8633 196.128 16 195.868C16.1367 195.608 16.3327 195.374 16.5879 195.164C16.8477 194.95 17.1576 194.781 17.5176 194.658C17.8822 194.531 18.2878 194.467 18.7344 194.467C19.2721 194.467 19.7461 194.558 20.1562 194.74C20.571 194.923 20.8945 195.198 21.127 195.567C21.3639 195.932 21.4824 196.39 21.4824 196.941V200.387C21.4824 200.633 21.5029 200.895 21.5439 201.173C21.5895 201.451 21.6556 201.69 21.7422 201.891V202H20.4229C20.359 201.854 20.3089 201.66 20.2725 201.419C20.236 201.173 20.2178 200.945 20.2178 200.735ZM20.4365 197.516L20.4502 198.404H19.1719C18.8118 198.404 18.4906 198.434 18.208 198.493C17.9255 198.548 17.6885 198.632 17.4971 198.746C17.3057 198.86 17.1598 199.004 17.0596 199.177C16.9593 199.345 16.9092 199.544 16.9092 199.771C16.9092 200.004 16.9616 200.216 17.0664 200.407C17.1712 200.599 17.3285 200.751 17.5381 200.865C17.7523 200.975 18.0143 201.029 18.3242 201.029C18.7116 201.029 19.0534 200.947 19.3496 200.783C19.6458 200.619 19.8805 200.419 20.0537 200.182C20.2314 199.945 20.3271 199.715 20.3408 199.491L20.8809 200.1C20.849 200.291 20.7624 200.503 20.6211 200.735C20.4798 200.968 20.2907 201.191 20.0537 201.405C19.8213 201.615 19.5433 201.79 19.2197 201.932C18.9007 202.068 18.5407 202.137 18.1396 202.137C17.6383 202.137 17.1986 202.039 16.8203 201.843C16.4466 201.647 16.1549 201.385 15.9453 201.057C15.7402 200.724 15.6377 200.353 15.6377 199.942C15.6377 199.546 15.7152 199.197 15.8701 198.896C16.0251 198.591 16.2484 198.338 16.54 198.138C16.8317 197.933 17.1826 197.778 17.5928 197.673C18.0029 197.568 18.4609 197.516 18.9668 197.516H20.4365ZM24.8457 194.604V202H23.5742V194.604H24.8457ZM23.4785 192.642C23.4785 192.437 23.54 192.263 23.6631 192.122C23.7907 191.981 23.9775 191.91 24.2236 191.91C24.4652 191.91 24.6497 191.981 24.7773 192.122C24.9095 192.263 24.9756 192.437 24.9756 192.642C24.9756 192.838 24.9095 193.006 24.7773 193.147C24.6497 193.284 24.4652 193.353 24.2236 193.353C23.9775 193.353 23.7907 193.284 23.6631 193.147C23.54 193.006 23.4785 192.838 23.4785 192.642ZM28.1406 195.766V202H26.876V194.604H28.1064L28.1406 195.766ZM30.4512 194.562L30.4443 195.738C30.3395 195.715 30.2393 195.702 30.1436 195.697C30.0524 195.688 29.9476 195.684 29.8291 195.684C29.5374 195.684 29.2799 195.729 29.0566 195.82C28.8333 195.911 28.6442 196.039 28.4893 196.203C28.3343 196.367 28.2113 196.563 28.1201 196.791C28.0335 197.014 27.9766 197.26 27.9492 197.529L27.5938 197.734C27.5938 197.288 27.637 196.868 27.7236 196.477C27.8148 196.085 27.9538 195.738 28.1406 195.438C28.3275 195.132 28.5645 194.895 28.8516 194.727C29.1432 194.553 29.4896 194.467 29.8906 194.467C29.9818 194.467 30.0866 194.478 30.2051 194.501C30.3236 194.519 30.4056 194.54 30.4512 194.562ZM35.9268 200.038C35.9268 199.856 35.8857 199.687 35.8037 199.532C35.7262 199.373 35.5645 199.229 35.3184 199.102C35.0768 198.969 34.7122 198.855 34.2246 198.76C33.8145 198.673 33.443 198.571 33.1104 198.452C32.7822 198.334 32.502 198.19 32.2695 198.021C32.0417 197.853 31.8662 197.655 31.7432 197.427C31.6201 197.199 31.5586 196.932 31.5586 196.627C31.5586 196.335 31.6224 196.06 31.75 195.8C31.8822 195.54 32.0667 195.31 32.3037 195.109C32.5452 194.909 32.8346 194.752 33.1719 194.638C33.5091 194.524 33.8851 194.467 34.2998 194.467C34.8923 194.467 35.3981 194.572 35.8174 194.781C36.2367 194.991 36.5579 195.271 36.7812 195.622C37.0046 195.968 37.1162 196.354 37.1162 196.777H35.8516C35.8516 196.572 35.79 196.374 35.667 196.183C35.5485 195.987 35.373 195.825 35.1406 195.697C34.9128 195.57 34.6325 195.506 34.2998 195.506C33.9489 195.506 33.6641 195.561 33.4453 195.67C33.2311 195.775 33.0739 195.909 32.9736 196.073C32.8779 196.237 32.8301 196.41 32.8301 196.593C32.8301 196.729 32.8529 196.853 32.8984 196.962C32.9486 197.067 33.0352 197.165 33.1582 197.256C33.2812 197.342 33.4544 197.424 33.6777 197.502C33.901 197.579 34.1859 197.657 34.5322 197.734C35.1383 197.871 35.6374 198.035 36.0293 198.227C36.4212 198.418 36.7129 198.653 36.9043 198.931C37.0957 199.209 37.1914 199.546 37.1914 199.942C37.1914 200.266 37.123 200.562 36.9863 200.831C36.8542 201.1 36.6605 201.332 36.4053 201.528C36.1546 201.72 35.8538 201.87 35.5029 201.979C35.1566 202.084 34.7669 202.137 34.334 202.137C33.6823 202.137 33.1309 202.021 32.6797 201.788C32.2285 201.556 31.8867 201.255 31.6543 200.886C31.4219 200.517 31.3057 200.127 31.3057 199.717H32.5771C32.5954 200.063 32.6956 200.339 32.8779 200.544C33.0602 200.744 33.2835 200.888 33.5479 200.975C33.8122 201.057 34.0742 201.098 34.334 201.098C34.6803 201.098 34.9697 201.052 35.2021 200.961C35.4391 200.87 35.6191 200.744 35.7422 200.585C35.8652 200.425 35.9268 200.243 35.9268 200.038Z"
                        fill="#3B9C36"
                        fill-opacity="0.46"
                      />
                      <path
                        d="M6.45996 8.48438C6.45996 8.25195 6.4235 8.04688 6.35059 7.86914C6.28223 7.68685 6.15918 7.52279 5.98145 7.37695C5.80827 7.23112 5.56673 7.09212 5.25684 6.95996C4.9515 6.8278 4.56413 6.69336 4.09473 6.55664C3.60254 6.41081 3.1582 6.24902 2.76172 6.07129C2.36523 5.889 2.02572 5.68164 1.74316 5.44922C1.46061 5.2168 1.24414 4.9502 1.09375 4.64941C0.943359 4.34863 0.868164 4.00456 0.868164 3.61719C0.868164 3.22982 0.947917 2.87207 1.10742 2.54395C1.26693 2.21582 1.49479 1.93099 1.79102 1.68945C2.0918 1.44336 2.44954 1.25195 2.86426 1.11523C3.27897 0.978516 3.74154 0.910156 4.25195 0.910156C4.99935 0.910156 5.63281 1.05371 6.15234 1.34082C6.67643 1.62337 7.0752 1.99479 7.34863 2.45508C7.62207 2.91081 7.75879 3.39844 7.75879 3.91797H6.44629C6.44629 3.54427 6.36654 3.21387 6.20703 2.92676C6.04753 2.63509 5.80599 2.40723 5.48242 2.24316C5.15885 2.07454 4.7487 1.99023 4.25195 1.99023C3.78255 1.99023 3.39518 2.06087 3.08984 2.20215C2.78451 2.34342 2.55664 2.53483 2.40625 2.77637C2.26042 3.0179 2.1875 3.29362 2.1875 3.60352C2.1875 3.81315 2.23079 4.00456 2.31738 4.17773C2.40853 4.34635 2.54753 4.50358 2.73438 4.64941C2.92578 4.79525 3.16732 4.92969 3.45898 5.05273C3.75521 5.17578 4.1084 5.29427 4.51855 5.4082C5.08366 5.56771 5.57129 5.74544 5.98145 5.94141C6.3916 6.13737 6.72884 6.3584 6.99316 6.60449C7.26204 6.84603 7.46029 7.12174 7.58789 7.43164C7.72005 7.73698 7.78613 8.08333 7.78613 8.4707C7.78613 8.8763 7.7041 9.24316 7.54004 9.57129C7.37598 9.89941 7.14128 10.1797 6.83594 10.4121C6.5306 10.6445 6.16374 10.8245 5.73535 10.9521C5.31152 11.0752 4.83757 11.1367 4.31348 11.1367C3.85319 11.1367 3.39974 11.0729 2.95312 10.9453C2.51107 10.8177 2.10775 10.6263 1.74316 10.3711C1.38314 10.1159 1.09375 9.80143 0.875 9.42773C0.660807 9.04948 0.553711 8.61198 0.553711 8.11523H1.86621C1.86621 8.45703 1.93229 8.75098 2.06445 8.99707C2.19661 9.23861 2.37663 9.43913 2.60449 9.59863C2.83691 9.75814 3.09896 9.87663 3.39062 9.9541C3.68685 10.027 3.99447 10.0635 4.31348 10.0635C4.77376 10.0635 5.16341 9.99967 5.48242 9.87207C5.80143 9.74447 6.04297 9.56217 6.20703 9.3252C6.37565 9.08822 6.45996 8.80794 6.45996 8.48438ZM12.373 3.60352V4.57422H8.37402V3.60352H12.373ZM9.72754 1.80566H10.9922V9.16797C10.9922 9.41862 11.0309 9.60775 11.1084 9.73535C11.1859 9.86296 11.2861 9.94727 11.4092 9.98828C11.5322 10.0293 11.6644 10.0498 11.8057 10.0498C11.9105 10.0498 12.0199 10.0407 12.1338 10.0225C12.2523 9.99967 12.3411 9.98145 12.4004 9.96777L12.4072 11C12.307 11.0319 12.1748 11.0615 12.0107 11.0889C11.8512 11.1208 11.6576 11.1367 11.4297 11.1367C11.1198 11.1367 10.835 11.0752 10.5752 10.9521C10.3154 10.8291 10.1081 10.624 9.95312 10.3369C9.80273 10.0452 9.72754 9.65332 9.72754 9.16113V1.80566ZM18.2178 9.73535V5.92773C18.2178 5.63607 18.1585 5.38314 18.04 5.16895C17.9261 4.9502 17.7529 4.78158 17.5205 4.66309C17.2881 4.5446 17.001 4.48535 16.6592 4.48535C16.3402 4.48535 16.0599 4.54004 15.8184 4.64941C15.5814 4.75879 15.3945 4.90234 15.2578 5.08008C15.1257 5.25781 15.0596 5.44922 15.0596 5.6543H13.7949C13.7949 5.38997 13.8633 5.12793 14 4.86816C14.1367 4.6084 14.3327 4.3737 14.5879 4.16406C14.8477 3.94987 15.1576 3.78125 15.5176 3.6582C15.8822 3.5306 16.2878 3.4668 16.7344 3.4668C17.2721 3.4668 17.7461 3.55794 18.1562 3.74023C18.571 3.92253 18.8945 4.19824 19.127 4.56738C19.3639 4.93197 19.4824 5.38997 19.4824 5.94141V9.38672C19.4824 9.63281 19.5029 9.89486 19.5439 10.1729C19.5895 10.4508 19.6556 10.6901 19.7422 10.8906V11H18.4229C18.359 10.8542 18.3089 10.6605 18.2725 10.4189C18.236 10.1729 18.2178 9.94499 18.2178 9.73535ZM18.4365 6.51562L18.4502 7.4043H17.1719C16.8118 7.4043 16.4906 7.43392 16.208 7.49316C15.9255 7.54785 15.6885 7.63216 15.4971 7.74609C15.3057 7.86003 15.1598 8.00358 15.0596 8.17676C14.9593 8.34538 14.9092 8.54362 14.9092 8.77148C14.9092 9.00391 14.9616 9.21582 15.0664 9.40723C15.1712 9.59863 15.3285 9.7513 15.5381 9.86523C15.7523 9.97461 16.0143 10.0293 16.3242 10.0293C16.7116 10.0293 17.0534 9.94727 17.3496 9.7832C17.6458 9.61914 17.8805 9.41862 18.0537 9.18164C18.2314 8.94466 18.3271 8.71452 18.3408 8.49121L18.8809 9.09961C18.849 9.29102 18.7624 9.50293 18.6211 9.73535C18.4798 9.96777 18.2907 10.1911 18.0537 10.4053C17.8213 10.6149 17.5433 10.7904 17.2197 10.9316C16.9007 11.0684 16.5407 11.1367 16.1396 11.1367C15.6383 11.1367 15.1986 11.0387 14.8203 10.8428C14.4466 10.6468 14.1549 10.3848 13.9453 10.0566C13.7402 9.72396 13.6377 9.35254 13.6377 8.94238C13.6377 8.5459 13.7152 8.19727 13.8701 7.89648C14.0251 7.59115 14.2484 7.33822 14.54 7.1377C14.8317 6.93262 15.1826 6.77767 15.5928 6.67285C16.0029 6.56803 16.4609 6.51562 16.9668 6.51562H18.4365ZM22.8457 3.60352V11H21.5742V3.60352H22.8457ZM21.4785 1.6416C21.4785 1.43652 21.54 1.26335 21.6631 1.12207C21.7907 0.980794 21.9775 0.910156 22.2236 0.910156C22.4652 0.910156 22.6497 0.980794 22.7773 1.12207C22.9095 1.26335 22.9756 1.43652 22.9756 1.6416C22.9756 1.83757 22.9095 2.00618 22.7773 2.14746C22.6497 2.28418 22.4652 2.35254 22.2236 2.35254C21.9775 2.35254 21.7907 2.28418 21.6631 2.14746C21.54 2.00618 21.4785 1.83757 21.4785 1.6416ZM26.1406 4.76562V11H24.876V3.60352H26.1064L26.1406 4.76562ZM28.4512 3.5625L28.4443 4.73828C28.3395 4.71549 28.2393 4.70182 28.1436 4.69727C28.0524 4.68815 27.9476 4.68359 27.8291 4.68359C27.5374 4.68359 27.2799 4.72917 27.0566 4.82031C26.8333 4.91146 26.6442 5.03906 26.4893 5.20312C26.3343 5.36719 26.2113 5.56315 26.1201 5.79102C26.0335 6.01432 25.9766 6.26042 25.9492 6.5293L25.5938 6.73438C25.5938 6.28776 25.637 5.86849 25.7236 5.47656C25.8148 5.08464 25.9538 4.73828 26.1406 4.4375C26.3275 4.13216 26.5645 3.89518 26.8516 3.72656C27.1432 3.55339 27.4896 3.4668 27.8906 3.4668C27.9818 3.4668 28.0866 3.47819 28.2051 3.50098C28.3236 3.51921 28.4056 3.53971 28.4512 3.5625ZM33.9268 9.03809C33.9268 8.85579 33.8857 8.68717 33.8037 8.53223C33.7262 8.37272 33.5645 8.22917 33.3184 8.10156C33.0768 7.9694 32.7122 7.85547 32.2246 7.75977C31.8145 7.67318 31.443 7.57064 31.1104 7.45215C30.7822 7.33366 30.502 7.1901 30.2695 7.02148C30.0417 6.85286 29.8662 6.65462 29.7432 6.42676C29.6201 6.19889 29.5586 5.93229 29.5586 5.62695C29.5586 5.33529 29.6224 5.05957 29.75 4.7998C29.8822 4.54004 30.0667 4.3099 30.3037 4.10938C30.5452 3.90885 30.8346 3.75163 31.1719 3.6377C31.5091 3.52376 31.8851 3.4668 32.2998 3.4668C32.8923 3.4668 33.3981 3.57161 33.8174 3.78125C34.2367 3.99089 34.5579 4.27116 34.7812 4.62207C35.0046 4.96842 35.1162 5.35352 35.1162 5.77734H33.8516C33.8516 5.57227 33.79 5.37402 33.667 5.18262C33.5485 4.98665 33.373 4.82487 33.1406 4.69727C32.9128 4.56966 32.6325 4.50586 32.2998 4.50586C31.9489 4.50586 31.6641 4.56055 31.4453 4.66992C31.2311 4.77474 31.0739 4.90918 30.9736 5.07324C30.8779 5.2373 30.8301 5.41048 30.8301 5.59277C30.8301 5.72949 30.8529 5.85254 30.8984 5.96191C30.9486 6.06673 31.0352 6.16471 31.1582 6.25586C31.2812 6.34245 31.4544 6.42448 31.6777 6.50195C31.901 6.57943 32.1859 6.6569 32.5322 6.73438C33.1383 6.87109 33.6374 7.03516 34.0293 7.22656C34.4212 7.41797 34.7129 7.65267 34.9043 7.93066C35.0957 8.20866 35.1914 8.5459 35.1914 8.94238C35.1914 9.26595 35.123 9.56217 34.9863 9.83105C34.8542 10.0999 34.6605 10.3324 34.4053 10.5283C34.1546 10.7197 33.8538 10.8701 33.5029 10.9795C33.1566 11.0843 32.7669 11.1367 32.334 11.1367C31.6823 11.1367 31.1309 11.0205 30.6797 10.7881C30.2285 10.5557 29.8867 10.2549 29.6543 9.88574C29.4219 9.5166 29.3057 9.12695 29.3057 8.7168H30.5771C30.5954 9.06315 30.6956 9.33887 30.8779 9.54395C31.0602 9.74447 31.2835 9.88802 31.5479 9.97461C31.8122 10.0566 32.0742 10.0977 32.334 10.0977C32.6803 10.0977 32.9697 10.0521 33.2021 9.96094C33.4391 9.86979 33.6191 9.74447 33.7422 9.58496C33.8652 9.42546 33.9268 9.24316 33.9268 9.03809Z"
                        fill="#3B9C36"
                        fill-opacity="0.46"
                      />
                      <path
                        d="M6.45996 367.484C6.45996 367.252 6.4235 367.047 6.35059 366.869C6.28223 366.687 6.15918 366.523 5.98145 366.377C5.80827 366.231 5.56673 366.092 5.25684 365.96C4.9515 365.828 4.56413 365.693 4.09473 365.557C3.60254 365.411 3.1582 365.249 2.76172 365.071C2.36523 364.889 2.02572 364.682 1.74316 364.449C1.46061 364.217 1.24414 363.95 1.09375 363.649C0.943359 363.349 0.868164 363.005 0.868164 362.617C0.868164 362.23 0.947917 361.872 1.10742 361.544C1.26693 361.216 1.49479 360.931 1.79102 360.689C2.0918 360.443 2.44954 360.252 2.86426 360.115C3.27897 359.979 3.74154 359.91 4.25195 359.91C4.99935 359.91 5.63281 360.054 6.15234 360.341C6.67643 360.623 7.0752 360.995 7.34863 361.455C7.62207 361.911 7.75879 362.398 7.75879 362.918H6.44629C6.44629 362.544 6.36654 362.214 6.20703 361.927C6.04753 361.635 5.80599 361.407 5.48242 361.243C5.15885 361.075 4.7487 360.99 4.25195 360.99C3.78255 360.99 3.39518 361.061 3.08984 361.202C2.78451 361.343 2.55664 361.535 2.40625 361.776C2.26042 362.018 2.1875 362.294 2.1875 362.604C2.1875 362.813 2.23079 363.005 2.31738 363.178C2.40853 363.346 2.54753 363.504 2.73438 363.649C2.92578 363.795 3.16732 363.93 3.45898 364.053C3.75521 364.176 4.1084 364.294 4.51855 364.408C5.08366 364.568 5.57129 364.745 5.98145 364.941C6.3916 365.137 6.72884 365.358 6.99316 365.604C7.26204 365.846 7.46029 366.122 7.58789 366.432C7.72005 366.737 7.78613 367.083 7.78613 367.471C7.78613 367.876 7.7041 368.243 7.54004 368.571C7.37598 368.899 7.14128 369.18 6.83594 369.412C6.5306 369.645 6.16374 369.825 5.73535 369.952C5.31152 370.075 4.83757 370.137 4.31348 370.137C3.85319 370.137 3.39974 370.073 2.95312 369.945C2.51107 369.818 2.10775 369.626 1.74316 369.371C1.38314 369.116 1.09375 368.801 0.875 368.428C0.660807 368.049 0.553711 367.612 0.553711 367.115H1.86621C1.86621 367.457 1.93229 367.751 2.06445 367.997C2.19661 368.239 2.37663 368.439 2.60449 368.599C2.83691 368.758 3.09896 368.877 3.39062 368.954C3.68685 369.027 3.99447 369.063 4.31348 369.063C4.77376 369.063 5.16341 369 5.48242 368.872C5.80143 368.744 6.04297 368.562 6.20703 368.325C6.37565 368.088 6.45996 367.808 6.45996 367.484ZM12.373 362.604V363.574H8.37402V362.604H12.373ZM9.72754 360.806H10.9922V368.168C10.9922 368.419 11.0309 368.608 11.1084 368.735C11.1859 368.863 11.2861 368.947 11.4092 368.988C11.5322 369.029 11.6644 369.05 11.8057 369.05C11.9105 369.05 12.0199 369.041 12.1338 369.022C12.2523 369 12.3411 368.981 12.4004 368.968L12.4072 370C12.307 370.032 12.1748 370.062 12.0107 370.089C11.8512 370.121 11.6576 370.137 11.4297 370.137C11.1198 370.137 10.835 370.075 10.5752 369.952C10.3154 369.829 10.1081 369.624 9.95312 369.337C9.80273 369.045 9.72754 368.653 9.72754 368.161V360.806ZM18.2178 368.735V364.928C18.2178 364.636 18.1585 364.383 18.04 364.169C17.9261 363.95 17.7529 363.782 17.5205 363.663C17.2881 363.545 17.001 363.485 16.6592 363.485C16.3402 363.485 16.0599 363.54 15.8184 363.649C15.5814 363.759 15.3945 363.902 15.2578 364.08C15.1257 364.258 15.0596 364.449 15.0596 364.654H13.7949C13.7949 364.39 13.8633 364.128 14 363.868C14.1367 363.608 14.3327 363.374 14.5879 363.164C14.8477 362.95 15.1576 362.781 15.5176 362.658C15.8822 362.531 16.2878 362.467 16.7344 362.467C17.2721 362.467 17.7461 362.558 18.1562 362.74C18.571 362.923 18.8945 363.198 19.127 363.567C19.3639 363.932 19.4824 364.39 19.4824 364.941V368.387C19.4824 368.633 19.5029 368.895 19.5439 369.173C19.5895 369.451 19.6556 369.69 19.7422 369.891V370H18.4229C18.359 369.854 18.3089 369.66 18.2725 369.419C18.236 369.173 18.2178 368.945 18.2178 368.735ZM18.4365 365.516L18.4502 366.404H17.1719C16.8118 366.404 16.4906 366.434 16.208 366.493C15.9255 366.548 15.6885 366.632 15.4971 366.746C15.3057 366.86 15.1598 367.004 15.0596 367.177C14.9593 367.345 14.9092 367.544 14.9092 367.771C14.9092 368.004 14.9616 368.216 15.0664 368.407C15.1712 368.599 15.3285 368.751 15.5381 368.865C15.7523 368.975 16.0143 369.029 16.3242 369.029C16.7116 369.029 17.0534 368.947 17.3496 368.783C17.6458 368.619 17.8805 368.419 18.0537 368.182C18.2314 367.945 18.3271 367.715 18.3408 367.491L18.8809 368.1C18.849 368.291 18.7624 368.503 18.6211 368.735C18.4798 368.968 18.2907 369.191 18.0537 369.405C17.8213 369.615 17.5433 369.79 17.2197 369.932C16.9007 370.068 16.5407 370.137 16.1396 370.137C15.6383 370.137 15.1986 370.039 14.8203 369.843C14.4466 369.647 14.1549 369.385 13.9453 369.057C13.7402 368.724 13.6377 368.353 13.6377 367.942C13.6377 367.546 13.7152 367.197 13.8701 366.896C14.0251 366.591 14.2484 366.338 14.54 366.138C14.8317 365.933 15.1826 365.778 15.5928 365.673C16.0029 365.568 16.4609 365.516 16.9668 365.516H18.4365ZM22.8457 362.604V370H21.5742V362.604H22.8457ZM21.4785 360.642C21.4785 360.437 21.54 360.263 21.6631 360.122C21.7907 359.981 21.9775 359.91 22.2236 359.91C22.4652 359.91 22.6497 359.981 22.7773 360.122C22.9095 360.263 22.9756 360.437 22.9756 360.642C22.9756 360.838 22.9095 361.006 22.7773 361.147C22.6497 361.284 22.4652 361.353 22.2236 361.353C21.9775 361.353 21.7907 361.284 21.6631 361.147C21.54 361.006 21.4785 360.838 21.4785 360.642ZM26.1406 363.766V370H24.876V362.604H26.1064L26.1406 363.766ZM28.4512 362.562L28.4443 363.738C28.3395 363.715 28.2393 363.702 28.1436 363.697C28.0524 363.688 27.9476 363.684 27.8291 363.684C27.5374 363.684 27.2799 363.729 27.0566 363.82C26.8333 363.911 26.6442 364.039 26.4893 364.203C26.3343 364.367 26.2113 364.563 26.1201 364.791C26.0335 365.014 25.9766 365.26 25.9492 365.529L25.5938 365.734C25.5938 365.288 25.637 364.868 25.7236 364.477C25.8148 364.085 25.9538 363.738 26.1406 363.438C26.3275 363.132 26.5645 362.895 26.8516 362.727C27.1432 362.553 27.4896 362.467 27.8906 362.467C27.9818 362.467 28.0866 362.478 28.2051 362.501C28.3236 362.519 28.4056 362.54 28.4512 362.562ZM33.9268 368.038C33.9268 367.856 33.8857 367.687 33.8037 367.532C33.7262 367.373 33.5645 367.229 33.3184 367.102C33.0768 366.969 32.7122 366.855 32.2246 366.76C31.8145 366.673 31.443 366.571 31.1104 366.452C30.7822 366.334 30.502 366.19 30.2695 366.021C30.0417 365.853 29.8662 365.655 29.7432 365.427C29.6201 365.199 29.5586 364.932 29.5586 364.627C29.5586 364.335 29.6224 364.06 29.75 363.8C29.8822 363.54 30.0667 363.31 30.3037 363.109C30.5452 362.909 30.8346 362.752 31.1719 362.638C31.5091 362.524 31.8851 362.467 32.2998 362.467C32.8923 362.467 33.3981 362.572 33.8174 362.781C34.2367 362.991 34.5579 363.271 34.7812 363.622C35.0046 363.968 35.1162 364.354 35.1162 364.777H33.8516C33.8516 364.572 33.79 364.374 33.667 364.183C33.5485 363.987 33.373 363.825 33.1406 363.697C32.9128 363.57 32.6325 363.506 32.2998 363.506C31.9489 363.506 31.6641 363.561 31.4453 363.67C31.2311 363.775 31.0739 363.909 30.9736 364.073C30.8779 364.237 30.8301 364.41 30.8301 364.593C30.8301 364.729 30.8529 364.853 30.8984 364.962C30.9486 365.067 31.0352 365.165 31.1582 365.256C31.2812 365.342 31.4544 365.424 31.6777 365.502C31.901 365.579 32.1859 365.657 32.5322 365.734C33.1383 365.871 33.6374 366.035 34.0293 366.227C34.4212 366.418 34.7129 366.653 34.9043 366.931C35.0957 367.209 35.1914 367.546 35.1914 367.942C35.1914 368.266 35.123 368.562 34.9863 368.831C34.8542 369.1 34.6605 369.332 34.4053 369.528C34.1546 369.72 33.8538 369.87 33.5029 369.979C33.1566 370.084 32.7669 370.137 32.334 370.137C31.6823 370.137 31.1309 370.021 30.6797 369.788C30.2285 369.556 29.8867 369.255 29.6543 368.886C29.4219 368.517 29.3057 368.127 29.3057 367.717H30.5771C30.5954 368.063 30.6956 368.339 30.8779 368.544C31.0602 368.744 31.2835 368.888 31.5479 368.975C31.8122 369.057 32.0742 369.098 32.334 369.098C32.6803 369.098 32.9697 369.052 33.2021 368.961C33.4391 368.87 33.6191 368.744 33.7422 368.585C33.8652 368.425 33.9268 368.243 33.9268 368.038Z"
                        fill="#3B9C36"
                        fill-opacity="0.46"
                      />
                      <path
                        d="M11.46 510.484C11.46 510.252 11.4235 510.047 11.3506 509.869C11.2822 509.687 11.1592 509.523 10.9814 509.377C10.8083 509.231 10.5667 509.092 10.2568 508.96C9.9515 508.828 9.56413 508.693 9.09473 508.557C8.60254 508.411 8.1582 508.249 7.76172 508.071C7.36523 507.889 7.02572 507.682 6.74316 507.449C6.46061 507.217 6.24414 506.95 6.09375 506.649C5.94336 506.349 5.86816 506.005 5.86816 505.617C5.86816 505.23 5.94792 504.872 6.10742 504.544C6.26693 504.216 6.49479 503.931 6.79102 503.689C7.0918 503.443 7.44954 503.252 7.86426 503.115C8.27897 502.979 8.74154 502.91 9.25195 502.91C9.99935 502.91 10.6328 503.054 11.1523 503.341C11.6764 503.623 12.0752 503.995 12.3486 504.455C12.6221 504.911 12.7588 505.398 12.7588 505.918H11.4463C11.4463 505.544 11.3665 505.214 11.207 504.927C11.0475 504.635 10.806 504.407 10.4824 504.243C10.1589 504.075 9.7487 503.99 9.25195 503.99C8.78255 503.99 8.39518 504.061 8.08984 504.202C7.78451 504.343 7.55664 504.535 7.40625 504.776C7.26042 505.018 7.1875 505.294 7.1875 505.604C7.1875 505.813 7.23079 506.005 7.31738 506.178C7.40853 506.346 7.54753 506.504 7.73438 506.649C7.92578 506.795 8.16732 506.93 8.45898 507.053C8.75521 507.176 9.1084 507.294 9.51855 507.408C10.0837 507.568 10.5713 507.745 10.9814 507.941C11.3916 508.137 11.7288 508.358 11.9932 508.604C12.262 508.846 12.4603 509.122 12.5879 509.432C12.7201 509.737 12.7861 510.083 12.7861 510.471C12.7861 510.876 12.7041 511.243 12.54 511.571C12.376 511.899 12.1413 512.18 11.8359 512.412C11.5306 512.645 11.1637 512.825 10.7354 512.952C10.3115 513.075 9.83757 513.137 9.31348 513.137C8.85319 513.137 8.39974 513.073 7.95312 512.945C7.51107 512.818 7.10775 512.626 6.74316 512.371C6.38314 512.116 6.09375 511.801 5.875 511.428C5.66081 511.049 5.55371 510.612 5.55371 510.115H6.86621C6.86621 510.457 6.93229 510.751 7.06445 510.997C7.19661 511.239 7.37663 511.439 7.60449 511.599C7.83691 511.758 8.09896 511.877 8.39062 511.954C8.68685 512.027 8.99447 512.063 9.31348 512.063C9.77376 512.063 10.1634 512 10.4824 511.872C10.8014 511.744 11.043 511.562 11.207 511.325C11.3757 511.088 11.46 510.808 11.46 510.484ZM17.373 505.604V506.574H13.374V505.604H17.373ZM14.7275 503.806H15.9922V511.168C15.9922 511.419 16.0309 511.608 16.1084 511.735C16.1859 511.863 16.2861 511.947 16.4092 511.988C16.5322 512.029 16.6644 512.05 16.8057 512.05C16.9105 512.05 17.0199 512.041 17.1338 512.022C17.2523 512 17.3411 511.981 17.4004 511.968L17.4072 513C17.307 513.032 17.1748 513.062 17.0107 513.089C16.8512 513.121 16.6576 513.137 16.4297 513.137C16.1198 513.137 15.835 513.075 15.5752 512.952C15.3154 512.829 15.1081 512.624 14.9531 512.337C14.8027 512.045 14.7275 511.653 14.7275 511.161V503.806ZM23.2178 511.735V507.928C23.2178 507.636 23.1585 507.383 23.04 507.169C22.9261 506.95 22.7529 506.782 22.5205 506.663C22.2881 506.545 22.001 506.485 21.6592 506.485C21.3402 506.485 21.0599 506.54 20.8184 506.649C20.5814 506.759 20.3945 506.902 20.2578 507.08C20.1257 507.258 20.0596 507.449 20.0596 507.654H18.7949C18.7949 507.39 18.8633 507.128 19 506.868C19.1367 506.608 19.3327 506.374 19.5879 506.164C19.8477 505.95 20.1576 505.781 20.5176 505.658C20.8822 505.531 21.2878 505.467 21.7344 505.467C22.2721 505.467 22.7461 505.558 23.1562 505.74C23.571 505.923 23.8945 506.198 24.127 506.567C24.3639 506.932 24.4824 507.39 24.4824 507.941V511.387C24.4824 511.633 24.5029 511.895 24.5439 512.173C24.5895 512.451 24.6556 512.69 24.7422 512.891V513H23.4229C23.359 512.854 23.3089 512.66 23.2725 512.419C23.236 512.173 23.2178 511.945 23.2178 511.735ZM23.4365 508.516L23.4502 509.404H22.1719C21.8118 509.404 21.4906 509.434 21.208 509.493C20.9255 509.548 20.6885 509.632 20.4971 509.746C20.3057 509.86 20.1598 510.004 20.0596 510.177C19.9593 510.345 19.9092 510.544 19.9092 510.771C19.9092 511.004 19.9616 511.216 20.0664 511.407C20.1712 511.599 20.3285 511.751 20.5381 511.865C20.7523 511.975 21.0143 512.029 21.3242 512.029C21.7116 512.029 22.0534 511.947 22.3496 511.783C22.6458 511.619 22.8805 511.419 23.0537 511.182C23.2314 510.945 23.3271 510.715 23.3408 510.491L23.8809 511.1C23.849 511.291 23.7624 511.503 23.6211 511.735C23.4798 511.968 23.2907 512.191 23.0537 512.405C22.8213 512.615 22.5433 512.79 22.2197 512.932C21.9007 513.068 21.5407 513.137 21.1396 513.137C20.6383 513.137 20.1986 513.039 19.8203 512.843C19.4466 512.647 19.1549 512.385 18.9453 512.057C18.7402 511.724 18.6377 511.353 18.6377 510.942C18.6377 510.546 18.7152 510.197 18.8701 509.896C19.0251 509.591 19.2484 509.338 19.54 509.138C19.8317 508.933 20.1826 508.778 20.5928 508.673C21.0029 508.568 21.4609 508.516 21.9668 508.516H23.4365ZM27.8457 505.604V513H26.5742V505.604H27.8457ZM26.4785 503.642C26.4785 503.437 26.54 503.263 26.6631 503.122C26.7907 502.981 26.9775 502.91 27.2236 502.91C27.4652 502.91 27.6497 502.981 27.7773 503.122C27.9095 503.263 27.9756 503.437 27.9756 503.642C27.9756 503.838 27.9095 504.006 27.7773 504.147C27.6497 504.284 27.4652 504.353 27.2236 504.353C26.9775 504.353 26.7907 504.284 26.6631 504.147C26.54 504.006 26.4785 503.838 26.4785 503.642ZM31.1406 506.766V513H29.876V505.604H31.1064L31.1406 506.766ZM33.4512 505.562L33.4443 506.738C33.3395 506.715 33.2393 506.702 33.1436 506.697C33.0524 506.688 32.9476 506.684 32.8291 506.684C32.5374 506.684 32.2799 506.729 32.0566 506.82C31.8333 506.911 31.6442 507.039 31.4893 507.203C31.3343 507.367 31.2113 507.563 31.1201 507.791C31.0335 508.014 30.9766 508.26 30.9492 508.529L30.5938 508.734C30.5938 508.288 30.637 507.868 30.7236 507.477C30.8148 507.085 30.9538 506.738 31.1406 506.438C31.3275 506.132 31.5645 505.895 31.8516 505.727C32.1432 505.553 32.4896 505.467 32.8906 505.467C32.9818 505.467 33.0866 505.478 33.2051 505.501C33.3236 505.519 33.4056 505.54 33.4512 505.562ZM38.9268 511.038C38.9268 510.856 38.8857 510.687 38.8037 510.532C38.7262 510.373 38.5645 510.229 38.3184 510.102C38.0768 509.969 37.7122 509.855 37.2246 509.76C36.8145 509.673 36.443 509.571 36.1104 509.452C35.7822 509.334 35.502 509.19 35.2695 509.021C35.0417 508.853 34.8662 508.655 34.7432 508.427C34.6201 508.199 34.5586 507.932 34.5586 507.627C34.5586 507.335 34.6224 507.06 34.75 506.8C34.8822 506.54 35.0667 506.31 35.3037 506.109C35.5452 505.909 35.8346 505.752 36.1719 505.638C36.5091 505.524 36.8851 505.467 37.2998 505.467C37.8923 505.467 38.3981 505.572 38.8174 505.781C39.2367 505.991 39.5579 506.271 39.7812 506.622C40.0046 506.968 40.1162 507.354 40.1162 507.777H38.8516C38.8516 507.572 38.79 507.374 38.667 507.183C38.5485 506.987 38.373 506.825 38.1406 506.697C37.9128 506.57 37.6325 506.506 37.2998 506.506C36.9489 506.506 36.6641 506.561 36.4453 506.67C36.2311 506.775 36.0739 506.909 35.9736 507.073C35.8779 507.237 35.8301 507.41 35.8301 507.593C35.8301 507.729 35.8529 507.853 35.8984 507.962C35.9486 508.067 36.0352 508.165 36.1582 508.256C36.2812 508.342 36.4544 508.424 36.6777 508.502C36.901 508.579 37.1859 508.657 37.5322 508.734C38.1383 508.871 38.6374 509.035 39.0293 509.227C39.4212 509.418 39.7129 509.653 39.9043 509.931C40.0957 510.209 40.1914 510.546 40.1914 510.942C40.1914 511.266 40.123 511.562 39.9863 511.831C39.8542 512.1 39.6605 512.332 39.4053 512.528C39.1546 512.72 38.8538 512.87 38.5029 512.979C38.1566 513.084 37.7669 513.137 37.334 513.137C36.6823 513.137 36.1309 513.021 35.6797 512.788C35.2285 512.556 34.8867 512.255 34.6543 511.886C34.4219 511.517 34.3057 511.127 34.3057 510.717H35.5771C35.5954 511.063 35.6956 511.339 35.8779 511.544C36.0602 511.744 36.2835 511.888 36.5479 511.975C36.8122 512.057 37.0742 512.098 37.334 512.098C37.6803 512.098 37.9697 512.052 38.2021 511.961C38.4391 511.87 38.6191 511.744 38.7422 511.585C38.8652 511.425 38.9268 511.243 38.9268 511.038Z"
                        fill="#3B9C36"
                        fill-opacity="0.46"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="301"
                      height="67"
                      viewBox="0 0 301 67"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M157.5 67.0089L163.274 57.0089H151.726L157.5 67.0089ZM156.5 38.9911V42.4933H158.5V38.9911H156.5ZM156.5 49.4978V56.5022H158.5V49.4978H156.5ZM157.5 67.0089L163.274 57.0089H151.726L157.5 67.0089ZM156.5 38.9911V42.4933H158.5V38.9911H156.5ZM156.5 49.4978V56.5022H158.5V49.4978H156.5Z"
                        fill="#3AA54B"
                        fill-opacity="0.5"
                      />
                      <path
                        d="M142.924 35V26.54H148.552V27.764H144.4V30.092H148.288V31.316H144.4V33.776H148.552V35H142.924ZM149.94 35V29.132H151.404V30.044C151.604 29.708 151.872 29.452 152.208 29.276C152.552 29.1 152.936 29.012 153.36 29.012C154.744 29.012 155.436 29.816 155.436 31.424V35H153.936V31.496C153.936 31.04 153.848 30.708 153.672 30.5C153.504 30.292 153.24 30.188 152.88 30.188C152.44 30.188 152.088 30.328 151.824 30.608C151.568 30.88 151.44 31.244 151.44 31.7V35H149.94ZM159.648 35.12C158.096 35.12 157.32 34.352 157.32 32.816V30.26H156.192V29.132H157.32V27.38H158.82V29.132H160.596V30.26H158.82V32.732C158.82 33.116 158.904 33.404 159.072 33.596C159.24 33.788 159.512 33.884 159.888 33.884C160 33.884 160.116 33.872 160.236 33.848C160.356 33.816 160.48 33.784 160.608 33.752L160.836 34.856C160.692 34.936 160.508 35 160.284 35.048C160.068 35.096 159.856 35.12 159.648 35.12ZM161.565 35V29.132H163.029V30.164C163.317 29.468 163.933 29.084 164.877 29.012L165.333 28.976L165.429 30.248L164.565 30.332C163.581 30.428 163.089 30.932 163.089 31.844V35H161.565ZM167.156 37.16L168.236 34.76L165.8 29.132H167.396L169.04 33.236L170.72 29.132H172.232L168.704 37.16H167.156Z"
                        fill="#3AA54B"
                      />
                      <path
                        d="M120.428 13V4.54H121.712L124.712 10.072L127.7 4.54H128.96V13H127.568V7.3L125.144 11.716H124.244L121.82 7.324V13H120.428ZM132.61 13.12C132.186 13.12 131.806 13.04 131.47 12.88C131.142 12.712 130.882 12.488 130.69 12.208C130.506 11.928 130.414 11.612 130.414 11.26C130.414 10.828 130.526 10.488 130.75 10.24C130.974 9.984 131.338 9.8 131.842 9.688C132.346 9.576 133.022 9.52 133.87 9.52H134.29V9.268C134.29 8.868 134.202 8.58 134.026 8.404C133.85 8.228 133.554 8.14 133.138 8.14C132.81 8.14 132.474 8.192 132.13 8.296C131.786 8.392 131.438 8.544 131.086 8.752L130.654 7.732C130.862 7.588 131.106 7.464 131.386 7.36C131.674 7.248 131.974 7.164 132.286 7.108C132.606 7.044 132.906 7.012 133.186 7.012C134.042 7.012 134.678 7.212 135.094 7.612C135.51 8.004 135.718 8.616 135.718 9.448V13H134.314V12.064C134.178 12.392 133.962 12.652 133.666 12.844C133.37 13.028 133.018 13.12 132.61 13.12ZM132.922 12.088C133.314 12.088 133.638 11.952 133.894 11.68C134.158 11.408 134.29 11.064 134.29 10.648V10.384H133.882C133.13 10.384 132.606 10.444 132.31 10.564C132.022 10.676 131.878 10.884 131.878 11.188C131.878 11.452 131.97 11.668 132.154 11.836C132.338 12.004 132.594 12.088 132.922 12.088ZM137.145 5.872V4.408H138.825V5.872H137.145ZM137.241 13V7.132H138.741V13H137.241ZM140.3 13V7.132H141.764V8.044C141.964 7.708 142.232 7.452 142.568 7.276C142.912 7.1 143.296 7.012 143.72 7.012C145.104 7.012 145.796 7.816 145.796 9.424V13H144.296V9.496C144.296 9.04 144.208 8.708 144.032 8.5C143.864 8.292 143.6 8.188 143.24 8.188C142.8 8.188 142.448 8.328 142.184 8.608C141.928 8.88 141.8 9.244 141.8 9.7V13H140.3ZM150.697 13V4.54H154.369C155.297 4.54 156.013 4.764 156.517 5.212C157.021 5.652 157.273 6.272 157.273 7.072C157.273 7.704 157.109 8.228 156.781 8.644C156.453 9.052 155.981 9.328 155.365 9.472C155.773 9.6 156.109 9.908 156.373 10.396L157.789 13H156.097L154.633 10.3C154.489 10.036 154.317 9.856 154.117 9.76C153.925 9.664 153.677 9.616 153.373 9.616H152.233V13H150.697ZM152.233 8.476H154.105C155.225 8.476 155.785 8.02 155.785 7.108C155.785 6.204 155.225 5.752 154.105 5.752H152.233V8.476ZM161.304 13.12C160.696 13.12 160.168 12.996 159.72 12.748C159.272 12.5 158.924 12.148 158.676 11.692C158.428 11.228 158.304 10.684 158.304 10.06C158.304 9.436 158.428 8.896 158.676 8.44C158.924 7.984 159.272 7.632 159.72 7.384C160.168 7.136 160.696 7.012 161.304 7.012C161.912 7.012 162.44 7.136 162.888 7.384C163.336 7.632 163.684 7.984 163.932 8.44C164.18 8.896 164.304 9.436 164.304 10.06C164.304 10.684 164.18 11.228 163.932 11.692C163.684 12.148 163.336 12.5 162.888 12.748C162.44 12.996 161.912 13.12 161.304 13.12ZM161.304 11.98C161.752 11.98 162.112 11.82 162.384 11.5C162.656 11.172 162.792 10.692 162.792 10.06C162.792 9.42 162.656 8.944 162.384 8.632C162.112 8.312 161.752 8.152 161.304 8.152C160.856 8.152 160.496 8.312 160.224 8.632C159.952 8.944 159.816 9.42 159.816 10.06C159.816 10.692 159.952 11.172 160.224 11.5C160.496 11.82 160.856 11.98 161.304 11.98ZM167.474 13.12C167.05 13.12 166.67 13.04 166.334 12.88C166.006 12.712 165.746 12.488 165.554 12.208C165.37 11.928 165.278 11.612 165.278 11.26C165.278 10.828 165.39 10.488 165.614 10.24C165.838 9.984 166.202 9.8 166.706 9.688C167.21 9.576 167.886 9.52 168.734 9.52H169.154V9.268C169.154 8.868 169.066 8.58 168.89 8.404C168.714 8.228 168.418 8.14 168.002 8.14C167.674 8.14 167.338 8.192 166.994 8.296C166.65 8.392 166.302 8.544 165.95 8.752L165.518 7.732C165.726 7.588 165.97 7.464 166.25 7.36C166.538 7.248 166.838 7.164 167.15 7.108C167.47 7.044 167.77 7.012 168.05 7.012C168.906 7.012 169.542 7.212 169.958 7.612C170.374 8.004 170.582 8.616 170.582 9.448V13H169.178V12.064C169.042 12.392 168.826 12.652 168.53 12.844C168.234 13.028 167.882 13.12 167.474 13.12ZM167.786 12.088C168.178 12.088 168.502 11.952 168.758 11.68C169.022 11.408 169.154 11.064 169.154 10.648V10.384H168.746C167.994 10.384 167.47 10.444 167.174 10.564C166.886 10.676 166.742 10.884 166.742 11.188C166.742 11.452 166.834 11.668 167.018 11.836C167.202 12.004 167.458 12.088 167.786 12.088ZM174.36 13.12C173.848 13.12 173.396 12.996 173.004 12.748C172.62 12.5 172.32 12.148 172.104 11.692C171.888 11.228 171.78 10.684 171.78 10.06C171.78 9.428 171.888 8.888 172.104 8.44C172.32 7.984 172.62 7.632 173.004 7.384C173.396 7.136 173.848 7.012 174.36 7.012C174.776 7.012 175.152 7.104 175.488 7.288C175.824 7.472 176.076 7.716 176.244 8.02V4.54H177.744V13H176.28V12.028C176.12 12.364 175.868 12.632 175.524 12.832C175.18 13.024 174.792 13.12 174.36 13.12ZM174.78 11.98C175.228 11.98 175.588 11.82 175.86 11.5C176.132 11.172 176.268 10.692 176.268 10.06C176.268 9.42 176.132 8.944 175.86 8.632C175.588 8.312 175.228 8.152 174.78 8.152C174.332 8.152 173.972 8.312 173.7 8.632C173.428 8.944 173.292 9.42 173.292 10.06C173.292 10.692 173.428 11.172 173.7 11.5C173.972 11.82 174.332 11.98 174.78 11.98Z"
                        fill="#3AA54B"
                      />
                      <path
                        d="M56.2929 8.70711C55.9024 8.31658 55.9024 7.68342 56.2929 7.29289L62.6569 0.928932C63.0474 0.538408 63.6805 0.538408 64.0711 0.928932C64.4616 1.31946 64.4616 1.95262 64.0711 2.34315L58.4142 8L64.0711 13.6569C64.4616 14.0474 64.4616 14.6805 64.0711 15.0711C63.6805 15.4616 63.0474 15.4616 62.6569 15.0711L56.2929 8.70711ZM99 9H96.375V7H99V9ZM91.125 9H85.875V7H91.125V9ZM80.625 9H75.375V7H80.625V9ZM70.125 9H64.875V7H70.125V9ZM59.625 9H57V7H59.625V9ZM56.2929 8.70711C55.9024 8.31658 55.9024 7.68342 56.2929 7.29289L62.6569 0.928932C63.0474 0.538408 63.6805 0.538408 64.0711 0.928932C64.4616 1.31946 64.4616 1.95262 64.0711 2.34315L58.4142 8L64.0711 13.6569C64.4616 14.0474 64.4616 14.6805 64.0711 15.0711C63.6805 15.4616 63.0474 15.4616 62.6569 15.0711L56.2929 8.70711ZM99 9H96.375V7H99V9ZM91.125 9H85.875V7H91.125V9ZM80.625 9H75.375V7H80.625V9ZM70.125 9H64.875V7H70.125V9ZM59.625 9H57V7H59.625V9Z"
                        fill="#3AA54B"
                        fill-opacity="0.5"
                      />
                      <path
                        d="M253.707 8.70711C254.098 8.31658 254.098 7.68342 253.707 7.29289L247.343 0.928932C246.953 0.538408 246.319 0.538408 245.929 0.928932C245.538 1.31946 245.538 1.95262 245.929 2.34315L251.586 8L245.929 13.6569C245.538 14.0474 245.538 14.6805 245.929 15.0711C246.319 15.4616 246.953 15.4616 247.343 15.0711L253.707 8.70711ZM211 9H213.625V7H211V9ZM218.875 9H224.125V7H218.875V9ZM229.375 9H234.625V7H229.375V9ZM239.875 9H245.125V7H239.875V9ZM250.375 9H253V7H250.375V9ZM253.707 8.70711C254.098 8.31658 254.098 7.68342 253.707 7.29289L247.343 0.928932C246.953 0.538408 246.319 0.538408 245.929 0.928932C245.538 1.31946 245.538 1.95262 245.929 2.34315L251.586 8L245.929 13.6569C245.538 14.0474 245.538 14.6805 245.929 15.0711C246.319 15.4616 246.953 15.4616 247.343 15.0711L253.707 8.70711ZM211 9H213.625V7H211V9ZM218.875 9H224.125V7H218.875V9ZM229.375 9H234.625V7H229.375V9ZM239.875 9H245.125V7H239.875V9ZM250.375 9H253V7H250.375V9Z"
                        fill="#3AA54B"
                        fill-opacity="0.5"
                      />
                      <line
                        x1="-0.000854492"
                        y1="19.9966"
                        x2="301.001"
                        y2="19.9966"
                        stroke="#515C52"
                        stroke-opacity="0.5"
                        stroke-dasharray="6 6"
                      />
                    </svg>
                  )}
                </div>
                <div
                  className={`market-layout w-100 ${
                    roadPosition === "left" ? "pl-1" : ""
                  }`}
                  style={{
                    gridTemplateColumns: `repeat(${stallPositions[0].length}, 1fr)`,
                    borderLeft: roadPosition === "left" ? "none" : "",
                    borderTop: roadPosition === "top" ? "none" : "",
                  }}
                >
                  {stallPositions.map((row, rowIndex) =>
                    row.map((isStall, colIndex) => {
                      const stallId = `${rowIndex}-${colIndex}`;

                      if (!isStall.value) {
                        return (
                          <div
                            key={stallId}
                            className="stall disabled-stall"
                            style={{
                              fontSize: "1rem",
                              cursor: "not-allowed",
                              opacity: 0.5,
                            }}
                          ></div>
                        );
                      }

                      const stall = stallList[stallIndex] || null;
                      stallIndex++;

                      const isDisabled = stall && !stall.available;

                      return (
                        <div
                          key={stallId}
                          className={`stall ${
                            isDisabled ? "disabled-stall" : ""
                          } ${
                            isStall.value
                              ? getStallClass(rowIndex, colIndex)
                              : ""
                          }`}
                          onClick={() =>
                            isStall.value &&
                            handleStallClick(rowIndex, colIndex)
                          }
                          data-pr-tooltip={stall ? stall.stallName : ""}
                          style={{
                            fontSize: "1rem",
                            cursor: isDisabled ? "not-allowed" : "pointer",
                            opacity: isDisabled ? 0.5 : 1,
                          }}
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
                                  className={`${isStall.direction} stall-image w-8 md:w-5 lg:w-6`}
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
                  {totalAmount} <i className="pi pi-indian-rupee" />
                  /-{" "}
                </span>
              </div>
              <hr />
              <div className="flex justify-content-end ">
                <Button
                  label="Pay"
                  onClick={handleShowClick}
                  className="border-2 border-round-md md:w-10rem mr-2"
                  disabled={selectedStallsRedux?.length === 0}
                />
              </div>
            </div>
          </form>
        )}
        <Tooltip target=".stall" mouse className="text-green-400" />

        {showPaymentScreen && (
          <PaymentScreen
            amount={totalAmount}
            bookStalls={bookStalls}
            setShowDetails={setShowDetails}
            onPaymentSuccess={setShowPaymentScreen}
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
                onClick={handlePaymentClick}
              />
            </>
          }
        >
          <div className="selected-stalls-details">
            {selectedStallsRedux &&
            Object.keys(selectedStallsRedux).length > 0 ? (
              Object.keys(selectedStallsRedux).map((key) => {
                const marketData = selectedStallsRedux[key];
                return (
                  <div key={key}>
                    <h3>Market Name: {marketData.market_name}</h3>
                    <h4>Date: {marketData.date}</h4>

                    <ul style={{ maxHeight: "60vh", overflowY: "auto" }}>
                      <h5>Stalls:</h5>
                      {marketData.stalls.map((stall) => (
                        <li key={stall.id}>
                          <div>
                            <strong>Stall No:</strong>{" "}
                            {stall.stallNo || "No Stall No"}
                          </div>
                          <div>
                            <strong>Stall Name:</strong>{" "}
                            {stall.name || "No Stall"}
                          </div>
                          <div>
                            <strong>Stall Price:</strong> {stall.price || 0}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })
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
