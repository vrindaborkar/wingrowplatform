const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const config = require('./config/app.config');

// Import routes
const bookingRoutes = require('./routes/bookingRoutes.routes');
const stallStatusRoutes = require('./routes/stallStatusRoutes.routes');
const cityRoutes = require('./routes/cityRoutes.routes');
const marketRoutes = require('./routes/marketRoutes.routes');
const offersRoutes = require('./routes/offersRoutes.routes');
const feedbackRoutes = require('./routes/feedback.routes');
const inwardRoutes = require('./routes/inwardRoutes.routes');
const outwardRoutes = require('./routes/outwardRoutes.routes');
const proxyRoutes = require("./routes/proxy.routes");
const authRoutes = require("./routes/auth.routes");

// CORS configuration
app.use(cors(config.cors));

// Basic middleware (moved up to ensure body parsing before routes)
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({useTempFiles: true}));

// Load stall routes (now after body parsers)
require("./routes/stalls.routes")(app);

// Global headers middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", config.cors.origin);
  res.header("Access-Control-Allow-Methods", config.cors.methods);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Mount routes
app.use(config.api.prefix + '/stallStatus', stallStatusRoutes);
app.use(config.api.prefix + '/cities', cityRoutes);
app.use(config.api.prefix + '/markets', marketRoutes);
app.use(config.api.prefix, offersRoutes);
app.use(config.api.prefix + '/inward', inwardRoutes);
app.use(config.api.prefix + '/outward', outwardRoutes);
app.use(config.api.prefix, proxyRoutes);
app.use(config.api.prefix, authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!'
  });
});

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(process.env.DB_CONNECTION, 
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false} , 
    console.log("connected to db"));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.timeout = 120000;
