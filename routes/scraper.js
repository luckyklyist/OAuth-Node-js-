const router = require('express').Router();
const scaper_data = require('../scaper');

router.get('/', async (req, res) => {
    try {
        res.render('index',{scraped:false})
    }
    catch (err) {
        console.log(err)
        res.send("Erro loading sites")
    }
})

router.post('/',async(req,res)=>{
    const showName=req.body.showName;
    console.log(showName,"heyyyyyyyyyyyyy")
    try {
        const { seriesName,
            charName,
            castName,
            scrapeImg } = await scaper_data(showName);

        console.log(seriesName);

        res.render("index", { scraped:true,seriesName, charName, castName, scrapeImg });
    }
    catch (err) {
        console.log(err),
            res.send("An error occured during scraping");
    }

})

router.get('/shows', async (req, res) => {
    

})

module.exports = router;