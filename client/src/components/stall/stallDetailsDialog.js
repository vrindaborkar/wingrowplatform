import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import PaymentPage from "../payment";

const StallDetailsDialog = ({
  modalStalls,
  showDetails,
  setShowDetails,
  amount,
  validateStalls,
}) => {
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
      alert("Please select at least one stall before proceeding to payment.");
      return;
    }
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "rzp_test_ehrurA0I4kPpho",
      amount: amount * 100,
      currency: "INR",
      name: "Multigenesys pvt. ltd.",
      description: "Payment for stalls",
      handler: function (response) {
        alert(response.razorpay_payment_id + " Payment successful");
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
            <h3>Market Name: {marketName}</h3>
            {Object.keys(modalStalls[marketName]).map((date) => (
              <div key={date}>
                <h4>Date: {date}</h4>
                {modalStalls[marketName][date] && (
                  <ul style={{ maxHeight: "60vh", overflowY: "auto" }}>
                    {modalStalls[marketName][date].map((stall) => (
                      <li key={stall.id}>
                        <div>
                          <strong>Stall ID:</strong> {stall.id}
                        </div>
                        <div>
                          <strong>Stall Name:</strong> {stall.name}
                        </div>
                        <div>
                          <strong>Stall Price:</strong> {stall.price}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </Dialog>
  );
};

export default StallDetailsDialog;
