const router = require('express').Router();
const scaper_data = require('../scaper');

router.get('/', async (req, res) => {
    try {
        res.render('index', { scraped: false, error: false, showName: '' })
    }
    catch (err) {
        console.log(err)
        res.send("Erro loading sites")
    }
})

router.post('/', async (req, res) => {
    const showN = req.body.showName;
    const showName = showN.replace(/\s+$/g, '').toLowerCase().replace(/\s/g, '-');
    try {
        const { seriesName,
            charName,
            castName,
            scrapeImg } = await scaper_data(showName);

        console.log(seriesName);

        res.render("index", { scraped: true, seriesName, charName, castName, scrapeImg, error: false, showName: showN });
    }
    catch (err) {
        console.log(err),
            res.render('index', { error: true, scraped: false, showName: showN });
    }

})

router.get('/shows', async (req, res) => {


})

module.exports = router;