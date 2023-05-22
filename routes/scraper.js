const router = require('express').Router();
const scaper_data = require('../scaper');
const checkAuth=require('../middleware/checkAuthentication');
router.get('/', async (req, res) => {
    try {
        const authenticated=req.cookies.access_token ? true : false;
        console.log(req.user)
        res.render('index', { scraped: false, error: false, showName: '' ,authenticated})
    }
    catch (err) {
        console.log(err)
        res.send("Erro loading sites")
    }
})

router.post('/', checkAuth,async (req, res) => {
    const authenticated=req.cookies.access_token ? true : false;
    const showN = req.body.showName;
    const showName = showN.replace(/\s+$/g, '').toLowerCase().replace(/\s/g, '-');
    console.log(showName)
    try {
        const { seriesName,
            charName,
            castName,
            scrapeImg } = await scaper_data(showName);

        console.log(seriesName);

        res.render("index", { scraped: true, seriesName, charName, castName, scrapeImg, error: false, showName: showN,authenticated });
    }
    catch (err) {
        console.log(err),
            res.render('index', { error: true, scraped: false, showName: showN ,authenticated});
    }

})

router.get('/shows', async (req, res) => {


})

module.exports = router;