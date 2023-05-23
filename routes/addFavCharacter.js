const router = require('express').Router();
const fetchUser = require('../middleware/fetchUser');
const FavCharacterModel = require('../model/addFavCharacter');

router.get('/add', async (req, res) => {
    try {
        const referer = req.headers.referer
        const accessToken = req.cookies.access_token;
        const user = await fetchUser(accessToken);
        const data = req.query;
        const { login } = user;
        const addFav = await new FavCharacterModel({ ...data, username: login }).save();
        const {showName}=data;
        
        res.redirect(referer);
    }
    catch (err) {
        console.log(err);
        res.send("Error occured while adding the character");
    }
})

router.get('/delete/:id',async(req,res)=>{
    try{
        await FavCharacterModel.deleteOne({"_id":req.params.id});
        res.redirect('/profile');
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router;