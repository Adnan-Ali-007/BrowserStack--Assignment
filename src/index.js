const scrapeElPaisOpinion = require("./scrapeArticles.js");
const translateTitles = require("./translateTitles.js");
const filterWordsByOccurrence = require("./filterByOccurence.js");
(async function index() {
  const articleTitlesInSpanish = await scrapeElPaisOpinion(); //Scrape Articles from the Opinion Section

  console.log("----------------- Articles Section End ------------------");

  const translatedTitles = await translateTitles(articleTitlesInSpanish);
  console.log("----------------- Translated Titles ---------------------");
  translatedTitles.forEach((title, index) => {
    console.log(`${index + 1}. ${title}`);
  });
  console.log("--------------------------------------------------------");
  const repeatedWordsMoreThanTwice = filterWordsByOccurrence(translatedTitles);
  console.log("----------- Words Repeated More than twice -------------");
  for (const [key, value] of Object.entries(repeatedWordsMoreThanTwice)) {
    console.log(`${key} : ${value}`);
  }
  console.log("---------------------------------------------------------");
})();