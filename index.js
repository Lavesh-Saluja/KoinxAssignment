const express = require('express');
const app = express();
const dotenv = require("dotenv");
dotenv.config({path:'./config.env'});

const port = process.env.PORT;

const server = app.listen(port, '0.0.0.0',() => console.log(`Listening on port number ${port}`));
require("./scheduler/etherPriceSchedule")
app.use(express.json());


app.use("/api/v1", require('./routes/api/v1'));

