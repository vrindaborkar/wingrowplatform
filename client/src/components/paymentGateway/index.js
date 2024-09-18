import React from "react";
import axios from "axios";
import { Button } from "primereact/button";

const PaymentGateway = () => {
  const loadRazorpay = async () => {
    try {
      const result = await axios.post("/create-order", {
        amount: 50000,
      });

      const { amount, id: order_id, currency } = result.data;

      const options = {
        key: "YOUR_RAZORPAY_KEY_ID",
        amount: amount.toString(),
        currency: currency,
        name: "Your Company Name",
        description: "Payment for Order",
        order_id: order_id,
        handler: async function (response) {
          const paymentId = response.razorpay_payment_id;
          const orderId = response.razorpay_order_id;
          const signature = response.razorpay_signature;

          try {
            const verifyResult = await axios.post("/verify-payment", {
              paymentId,
              orderId,
              signature,
            });

            if (verifyResult.data.success) {
              alert("Payment successful! Thank you for your purchase.");
            } else {
              alert("Payment failed, verification failed.");
            }
          } catch (verifyError) {
            alert("Payment verification failed. Please try again.");
          }
        },
        prefill: {
          name: "Your Name",
          email: "yourname@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Your Address",
        },
        theme: {
          color: "#F37254",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      alert("Payment initiation failed. Try again later.");
    }
  };

  return (
    <div>
      <Button
        type="submit"
        label=""
        className="border-2 te border-round-md md:w-5rem justify-content-center"
      >
        Pay
      </Button>
    </div>
  );
};

export default PaymentGateway;
