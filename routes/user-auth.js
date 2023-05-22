const axios = require('axios');
const router = require('express').Router();

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET_KEY
const GITHUB_AUTH_LINK = "https://github.com/login/oauth/access_token"
const REDIRECT_URL = "http://127.0.0.1:3000/github/callback"
const USER_URL = "https://api.github.com/user"

router.get('/auth', (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`);
});

router.get('/callback', (req, res) => {
    const code = req.query.code || "no code";
    let token;

    axios.post(`${GITHUB_AUTH_LINK}`, { client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code }, {
        headers: { accept: 'application/json' }
    })
        .then(resp => {
            console.log(resp.data.access_token,
                token = resp.data.access_token,
                res.cookie('access_token',token,{httpOnly:true}),
                res.redirect('/profile')
            )
        })
        .catch(err => console.log("err"))
})



/*

axios.get(`${USER_URL}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'User-Agen': 'Last of Us'
                    }
                })
                    .then((resp) => {
                        const userData = resp.data;
                        
                        res.render('profile',{userData})
                    })
                    .catch(err => console.log("Error reterving user Infromation"))
*/

module.exports = router;