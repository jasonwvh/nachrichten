const express = require("express");
const router = express.Router();
const getResults = require("../scraper");

/* GET home page. */
router.get("/", async function (req, res, next) {
    let url = req.query.url;
    console.log("retrieving news");

    const result = await getResults(url);
    //res.render("test", result);
    res.send(result);
});
module.exports = router;
