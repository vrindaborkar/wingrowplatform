// middlewares/auth.isAdmin.js
const jwt_decode = require('jwt-decode');
const User = require('../models/User');

const isAdmin = async (req, res, next) => {
    try {
        let token = req.headers["x-access-token"];
        const { id } = jwt_decode(token);

        // Find the user by the ID obtained from the token
        const user = await User.findById(id);

        if (user && user.role === 'Admin') {
            next();
        } else {
            return res.status(403).json({
                message: 'Require Admin Role!'
            });
        }
    } catch (error) {
        console.error('Error in isAdmin middleware:', error);
        res.status(500).json({
            message: 'Server error while checking admin privileges'
        });
    }
};

module.exports = isAdmin;
