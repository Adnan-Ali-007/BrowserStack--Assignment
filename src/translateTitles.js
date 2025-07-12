const axios =require("axios");
require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
async function translateTitles(titles){
 const translatedTitles = [];
 const options={
   method:"Post",
   url: "https://google-translate113.p.rapidapi.com/api/v1/translator/text",
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": "google-translate113.p.rapidapi.com",
      "Content-Type": "application/json",
    },
  };
  try{
      for (const title of titles) {
      const response = await axios.request({
        ...options,
        data: {
          from: "es",
          to: "en",
          text: title,
        },
      });

      translatedTitles.push(response.data.trans);
    }
  }
  catch(error){
  console.error("Translation failed here",error.message)
  }
  return translatedTitles;
 }
 module.exports = translateTitles;
 