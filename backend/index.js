const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { connectDB } = require("./db/db");

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL
}))

app.use(bodyParser.urlencoded({extended: true}))

connectDB();

const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=> {
    console.log(`App is running on http://localhost:${PORT}`);
})