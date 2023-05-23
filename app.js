const express = require('express');
const dotenv = require('dotenv').config();
const cookieParser=require('cookie-parser');
const dbConnect=require('./config/db/dbConnection');
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded());
app.use(cookieParser());

// db connection 
dbConnect();

// Routes
const scraperPageRoute=require('./routes/scraper');
const authUserRoute=require('./routes/user-auth');
const profileUserRoute=require('./routes/profile');
const addFavCharacterRoute=require('./routes/addFavCharacter');

app.use('/',scraperPageRoute);
app.use('/github',authUserRoute);
app.use('/profile',profileUserRoute);
app.use('/add',addFavCharacterRoute);

app.listen(port, () => console.log(`App listening at the port ${port}`));