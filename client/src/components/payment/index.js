import React, { useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast } from "primereact/toast";
const PaymentPage = ({
  modalStalls,
  showDetails,
  setShowDetails,
  amount,
  validateStalls,
}) => {
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

  const displayRazorpay = async () => {
    if (!validateStalls()) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail:
          "Please select at least one stall before proceeding to payment.",
      });
      return;
    }

    const selectedStallsPayload = Object.keys(modalStalls).map((marketName) => {
      return {
        dates: Object.keys(modalStalls[marketName]).map((date) => ({
          market_name: marketName,
          date: date,
          stalls: modalStalls[marketName][date].map((stall) => ({
            stall_id: stall.id,
            stall_no: stall.stallNo,
            stall_name: stall.name,
            price: stall.price,
          })),
        })),
      };
    });

    const res = await loadScript(
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
  };
  return (
    <>
      <Toast ref={toast} />
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
              onClick={displayRazorpay}
            />
          </>
        }
      >
        <div className="selected-stalls-details">
          {Object.keys(modalStalls).map((marketName) => (
            <div key={marketName}>
              {Object.keys(modalStalls[marketName]).map((date) => (
                <div key={date}>
                  <h3>Market Name: {marketName}</h3>
                  <h4>Date: {date}</h4>
                  {modalStalls[marketName][date] && (
                    <ul style={{ maxHeight: "60vh", overflowY: "auto" }}>
                      <h5>Stalls:</h5>
                      {modalStalls[marketName][date].map((stall) => (
                        <div>
                          <div>
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
                          </div>
                        </div>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Dialog>
    </>
  );
};

export default PaymentPage;
