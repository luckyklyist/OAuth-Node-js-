const express = require('express');
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static('public'))

// Routes
const scraperPageRoute=require('./routes/scraper');
const authUserRoute=require('./routes/user-auth');

app.use('/',scraperPageRoute);

app.listen(port, () => console.log(`App listening at the port ${port}`));