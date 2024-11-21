import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Toast } from "primereact/toast";
import moment from "moment";
import { baseUrl } from "../../services/PostAPI";
import { API_PATH } from "../../constant/urlConstant";

const PaymentPage = (props) => {
  const { selectedStalls, amount, onPaymentSuccess } = props;
  const toast = useRef(null);

  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    // useEffect(() => {
    const checkScriptLoaded = async () => {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (res) {
        setScriptLoaded(true);
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Razorpay SDK failed to load. Are you online?",
        });
      }
    };
    checkScriptLoaded();
  }, []);

  console.log("selectedStalls123", selectedStalls);

  const formatDate = (dateString) => {
    return moment(dateString, "MM/DD/YYYY").format("YYYY/MM/DD");
  };
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  const selectedStallsPayload = selectedStalls.map((market) => ({
    location: market.market_name,
    date: formatDate(market.date),
    bookedBy: userId,
    bookedAt: formatDate(market.date),
    isBooked: true,
    stalls: market.stalls.map((stall) => ({
      stallNo: stall.stallNo,
      stallName: stall.name,
      stallPrice: stall.price,
      address: stall.address,
    })),
  }));
  const handlePayment = async () => {
    if (!scriptLoaded) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Razorpay SDK failed to load. Are you online?",
      });
      return;
    }

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: amount * 100,
      currency: "INR",
      name: "Wingrow Market",
      description: "Payment for stalls",
      handler: async function (response) {
        const paymentSuccessPayload = {
          payment_id: response.razorpay_payment_id,
          BookedStalls: selectedStallsPayload,
        };

        console.log("Payment successful! Payload:", paymentSuccessPayload);

        try {
          const apiResponse = await axios.post(
            `${baseUrl}${API_PATH.STALL.BOOK}`,
            selectedStallsPayload
          );

          console.log("selectedStallsPayload", selectedStallsPayload);

          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Stalls booked successfully",
          });
          console.log("API Response:", apiResponse.data);
          onPaymentSuccess();
        } catch (error) {
          console.error("Error booking stalls after payment:", error);
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Payment succeeded, but stall booking failed.",
          });
        }
      },
      prefill: {
        name: "Wingrow Market",
        email: "wingrowmarket.com",
        contact: "1234567890",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  useEffect(() => {
    if (scriptLoaded) {
      handlePayment();
    }
  }, [scriptLoaded]);

  return (
    <>
      <Toast ref={toast} />
    </>
  );
};

export default PaymentPage;
