const axios = require('axios');
const router = require('express').Router();

/*

    redirect_url:"http://127.0.0.1:3000/github/callback",
    authorize_url:"https://github.com/login/oauth/authorize",
    token_url:"https://github.com/login/oauth/access_token",
    user_url:"https://api.github.com/user",
    scope:"user"
*/

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
                axios.get(`${USER_URL}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'User-Agen': 'Last of Us'
                    }
                })
                    .then((resp) => {
                        const userData = resp.data;
                        console.log(userData);
                    })
                    .catch(err => console.log("Error reterving user Infromation"))
            )

        })
        .catch(err => console.log("err"))
    console.log(token)

    

    res.send(code)
   
})



// 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

module.exports = router;