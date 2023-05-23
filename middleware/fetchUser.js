const axios = require('axios');

const USER_URL = "https://api.github.com/user"
let userData;
const fetchUser = async(accessToken) => {
    try {
        const resp=await axios.get(`${USER_URL}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'User-Agen': 'Last of Us'
            }
        })
        return resp.data;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = fetchUser;
