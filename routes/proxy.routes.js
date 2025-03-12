const express = require('express');
const axios = require('axios');
const router = express.Router();

// Proxy for OTP Verification
router.post('/otp/verify', async (req, res) => {
    const { otp, phone } = req.body;

    try {
        const response = await axios.get(
            `https://control.msg91.com/api/v5/otp/verify`,
            {
                params: { otp, phone },
                headers: {
                    'authkey': process.env.MSG91_AUTH_KEY, // Add your MSG91 Auth Key in .env
                },
            }
        );

        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error in OTP verification proxy:', error.message);
        res.status(error.response?.status || 500).json(error.response?.data || {
            message: 'Failed to verify OTP',
        });
    }
});

module.exports = router;
