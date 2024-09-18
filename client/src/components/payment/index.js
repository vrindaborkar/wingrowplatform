import { Button } from "primereact/button";

const PaymentPage = ({ amount, validateStalls }) => {
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
    <Button
      type="button"
      label="Pay"
      className="border-2 te border-round-md md:w-10rem"
      onClick={displayRazorpay}
    />
  );
};

export default PaymentPage;
