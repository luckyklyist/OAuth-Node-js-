const router = require('express').Router();
const axios = require('axios');
const fetchUser = require('../middleware/fetchUser');
const FavCharacterModel=require('../model/addFavCharacter');

const USER_URL = "https://api.github.com/user"

router.get('/', async (req, res) => {
    try {
        const authenticated = req.cookies.access_token ? true : false;
        const accessToken = req.cookies.access_token;
        const user = await fetchUser(accessToken);
        const {login}=user;
        const favChar=await FavCharacterModel.find({username:login})
        res.render('profile', { userData:user, authenticated ,favChar})
    }
    catch (err) {
        console.log(err)
        res.send("Error occured fetching the profile")
    }
})

module.exports = router;