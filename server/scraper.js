const cheerio = require("cheerio");
const axios = require("axios");

const fetchData = async (url) => {
    const result = await axios.get(url);
    return cheerio.load(result.data);
};

const getResults = async (url) => {
    let title;
    let contents = new Set();

    const $ = await fetchData(url);

    /*$(".col3 h1").each((index, element) => {
        title.add($(element).text());
    });*/

    title = $(".col3 h1").text();

    $(".longText p").each((index, element) => {
        contents.add($(element).text());
    });

    let results = {
        title: title,
        contents: [...contents],
    };

    console.log(results);

    return results;
};

module.exports = getResults;
