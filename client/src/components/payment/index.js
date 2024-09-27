import React, { useRef } from "react";
import axios from "axios";
import { Toast } from "primereact/toast";

const PaymentPage = (props) => {
  const{
    selectedStalls,
    amount,

  }=props

  const toast = useRef(null);
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const selectedStallsPayload = Object.keys(selectedStalls).map((marketName) => {
    return {
      dates: Object.keys(selectedStalls[marketName]).map((date) => ({
        market_name: marketName,
        date: date,
        stalls: selectedStalls[marketName][date].map((stall) => ({
          stall_id: stall.id,
          stall_no: stall.stallNo,
          stall_name: stall.name,
          price: stall.price,
        })),
      })),
    };
  });

    const res = loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
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
            "/api/bookmultiplestalls",
            paymentSuccessPayload
          );
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Stalls booked successfully",
          });
          console.log("API Response:", apiResponse.data);
        } catch (error) {
          console.error("Error booking stalls:", error);
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Error booking stalls",
          });
        }
      },
      prefill: {
        name: "Kapil",
        email: "kapil.email@example.com",
        contact: "1234567890",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

  return (
    <>
      <Toast ref={toast} />
      
    </>
  );
};

export default PaymentPage;
