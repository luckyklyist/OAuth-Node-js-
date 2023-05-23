const puppeteer = require('puppeteer');


const scraper = async (showName) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.hbo.com/${showName}`);

    const seriesName = await page.evaluate(() => {
        const nameTags = document.querySelector(".sc-g8nqnn-0.dXApWk h1");
        return nameTags.innerText;
    })

    const { charName, castName } = await page.evaluate(() => {

        const castTags = document.querySelectorAll(".content-tray-item .sc-s7bz8o-0 .card-border.container-fluid .no-gutters.default-variant .card-content.col-12 .card-metadata-content .card-metadata .card-metadata-info .card-metadata-button.usePointer .card-subtitle");

        const characterTags = document.querySelectorAll(".content-tray-item .sc-s7bz8o-0 .card-border.container-fluid .no-gutters.default-variant .card-content.col-12 .card-metadata-content .card-metadata .card-metadata-info .card-metadata-button.usePointer .card-title");

        const characterNames = [];
        const castNames = []
        characterTags.forEach((charName) => {
            characterNames.push(charName.innerHTML);
        })
        castTags.forEach((castName) => {
            castNames.push(castName.innerHTML);
        })
        return { charName: characterNames, castName: castNames };
    })

    const scrapeImg = await page.evaluate(() => {
        const charImgTag = document.querySelectorAll(".content-tray-item .sc-s7bz8o-0 .card-border.container-fluid .no-gutters.default-variant .card-content.col-12.usePointer .sc-1yqdqs7-0 img")
        const charImages = [];

        charImgTag.forEach((charImg) => {
            charImages.push(charImg.src);
        })
        return charImages;
    })

    const charDetail=await page.evaluate(()=>{
        const castDetailTags = document.querySelectorAll(".content-tray-item .sc-s7bz8o-0.kecPSH.card-container.h-100.link-card.card-container-default .card-button.usePointer");
        const charDetail=[];
        castDetailTags.forEach((char)=>{
            charDetail.push(char.href);
        })
        return charDetail;
    })
    await browser.close()

    return {
        seriesName,
        charName,
        castName,
        scrapeImg,
        charDetail
    }
}
// (async () => {
//     const data = await scraper();
//     console.log(data.charDetail);
// })();


module.exports=scraper;