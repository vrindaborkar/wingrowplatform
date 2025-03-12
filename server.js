const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');
require('dotenv/config')
var bodyParser = require('body-parser');
const path = require('path');
const fileUpload = require('express-fileupload')
const bookingRoutes = require('./routes/bookingRoutes.routes');
const stallStatusRoutes = require('./routes/stallStatusRoutes.routes');
const cityRoutes = require('./routes/cityRoutes.routes');
const marketRoutes = require('./routes/marketRoutes.routes');
const offersRoutes = require('./routes/offersRoutes.routes'); // Adjust path as needed

const feedbackRoutes = require('./routes/feedback.routes');
const inwardRoutes = require('./routes/inwardRoutes.routes');
const outwardRoutes = require('./routes/outwardRoutes.routes');
// const otpRoutes = require('./routes/otp.routes');
const proxyRoutes = require("./routes/proxy.routes");
// const authRoutes = require("./routes/auth.routes");




// const https = require('https');
// const fs = require('fs');

// // certificates
// const privateKey = fs.readFileSync('/etc/letsencrypt/live/wingrowmarket.com/privkey.pem','utf8');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/wingrowmarket.com/cert.pem','utf8');
// const ca = fs.readFileSync('/etc/letsencrypt/live/wingrowmarket.com/chain.pem','utf8');

// const credentials = {
//   key: privateKey,
//   cert: certificate,
//   ca: ca

// };

// const https_server = https.createServer(credentials,app)

const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};

// const cors = require("cors");

// app.use(cors({
//     origin: "http://localhost:3000", // Allow your frontend origin
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
// }));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors(corsOptions));

app.use('/api/bookings', bookingRoutes);
app.use('/api/stallStatus', stallStatusRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/markets', marketRoutes);
app.use('/api/bookings', marketRoutes);
app.use('/api', marketRoutes);
app.use('/api', offersRoutes);
app.use('/api', feedbackRoutes);

// app.use("/auth", authRoutes);
app.use('/api', proxyRoutes);


app.use('/api/inward', inwardRoutes);
app.use('/api/outward', outwardRoutes);
app.use('/api', proxyRoutes);
app.use(express.static('client/build'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload({useTempFiles:true}))

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/payment.routes")(app);
require("./routes/stalls.routes")(app);
require("./routes/twilio.routes")(app);


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

app.use(express.json());

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
app.timeout = 120000;


// // const PORT = process.env.PORT || 4000;
// https_server.listen('8443',() => {
//   console.log("https server running at 8443");
// })

// app.timeout = 120000;
