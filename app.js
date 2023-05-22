const express = require('express');
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded());

// Routes
const scraperPageRoute=require('./routes/scraper');
const authUserRoute=require('./routes/user-auth');

app.use('/',scraperPageRoute);
app.use('/github',authUserRoute);

app.listen(port, () => console.log(`App listening at the port ${port}`));