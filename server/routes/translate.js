var express = require("express");
var router = express.Router();

// Imports the Google Cloud client library
const { Translate } = require("@google-cloud/translate").v2;

// Creates a client
const translate = new Translate();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// const text = 'The text to translate, e.g. Hello, world!';
// const target = 'The target language, e.g. ru';

async function translateText(text) {
    // Translates the text into the target language. "text" can be a string for
    // translating a single piece of text, or an array of strings for translating
    // multiple texts.
    let [translations] = await translate.translate(text, "en");
    //translations = Array.isArray(translations) ? translations : [translations];
    //console.log("Translations:", translations);
    //translations.forEach((translation, i) => {
    //    console.log(`${text[i]} => (${target}) ${translation}`);
    //});
    return translations;
}

router.post("/", async (req, res) => {
    var qu = req.body.q;

    console.log(qu);
    translated = await translateText(qu);

    console.log(translated);

    res.send(translated);

    /*
    var options = {
        method: "POST",
        url: "https://translation.googleapis.com/language/translate/v2",
        form: {
            q: "Hallo",
            source: "de",
            target: "en",
            format: "text",
        },
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(error, response, body);
        res.send(body);
    });*/
});

module.exports = router;
