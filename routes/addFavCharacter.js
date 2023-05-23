const router=require('express').Router();
const fetchUser=require('../middleware/fetchUser');
const FavCharacterModel=require('../model/addFavCharacter');

router.get('/',async(req,res)=>{
    try{
        const accessToken = req.cookies.access_token;
        const user=await fetchUser(accessToken);
        const data=req.query;
        const {login}=user;
        const addFav=await new FavCharacterModel({...data,username:login}).save();
        console.log(addFav)
        res.redirect("/");
    }
    catch(err){
        console.log(err);
        res.send("Error occured while adding the character");
    }
})

module.exports=router;