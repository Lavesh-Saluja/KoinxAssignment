const express = require('express');
const app = express();
const dotenv = require("dotenv");
dotenv.config({path:'./config.env'});

const port = process.env.PORT;

const server = app.listen(port, '0.0.0.0', () => console.log(`Listening on port number ${port}`));
const rateLimit = require('express-rate-limit')

require("./scheduler/etherPriceSchedule")
app.use(express.json());
// Rate limiter configuration
const apiLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 500, // Limit each IP to 3 OTP requests per windowMs
    message: 'Too many requests, please try again after 5 minutes',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use("/api/v1",apiLimiter)
app.use("/api/v1",require('./routes/api/v1'));

