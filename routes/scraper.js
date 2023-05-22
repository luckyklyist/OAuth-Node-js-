const router=require('express').Router();
const scaper_data=require('../scaper');

router.get('/', async (req, res) => {
    try{
        const { seriesName,
            charName,
            castName,
            scrapeImg } = await scaper_data();
        
            console.log(seriesName);
    
        res.render("index",{seriesName,charName,castName,scrapeImg});
    }
    catch(err){
        console.log(err),
        res.send("An error occured during scraping");
    }
    
})

module.exports=router;