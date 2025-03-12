const MSG91 = require("msg91-sdk");

const sendOtp = async (phone, otp) => {
    const msg91 = new MSG91("YOUR_API_KEY", "SENDER_ID", "ROUTE");

    const message = `Your verification code is: ${otp}`;
    return msg91.send(phone, message);
};

module.exports = sendOtp;
