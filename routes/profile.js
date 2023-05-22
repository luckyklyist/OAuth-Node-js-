const router = require('express').Router();
const axios = require('axios');

const USER_URL = "https://api.github.com/user"

router.get('/', (req, res) => {
    try {
        const authenticated=req.cookies.access_token ? true : false;
        const accessToken = req.cookies.access_token;

        axios.get(`${USER_URL}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'User-Agen': 'Last of Us'
            }
        })
            .then((resp) => {
                const userData = resp.data;
                console.log(userData)

                res.render('profile', { userData,authenticated })
            })
            .catch(err => console.log("Error reterving user Infromation"))
    }
    catch (err) {
        console.log(err)
        res.send("Error occured fetching the profile")
    }
})

module.exports = router;