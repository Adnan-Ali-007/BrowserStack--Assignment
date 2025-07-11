const { Builder, By, until, WebDriver } = require("selenium-webdriver");
const fs = require("fs");
const axios = require("axios");
const path = require("path");
//Scrapping top 5 articles
// scrapeElPaisOpinion(); for testing this script worked
async function scrapeElPaisOpinion() {
 const articleTitles=[];
 let cookiesAccepted=false;  
const chrome = require("selenium-webdriver/chrome");
const chromeDriverPath = require("chromedriver").path;
const service = new chrome.ServiceBuilder(chromeDriverPath);
const driver = await new Builder()
  .forBrowser("chrome")
  .setChromeService(service)
  .build();
 try{
   //navigating to elpaisopinion
    await driver.get("https://elpais.com/opinion");
    //wait for articles to get loaded
    await driver.wait(until.elementsLocated(By.css("article")), 10000);
    if(!cookiesAccepted)
    {
      try{
      const acceptCookieBtn =await driver.findElement(
         By.id("didomi-notice-agree-button")
      )
       await driver.wait(until.elementIsVisible(acceptCookieBtn), 10000);
       await acceptCookieBtn.click();
       cookiesAccepted = true;
      }
      catch(err){
      console.warn("Cookie acceptance button not found or failed to be clicked:",err.message)  
      
   }
    }
   // getting links of articles
    const articleAnchorElements = await driver.findElements(By.css("article h2 a"));
    const articleLinks = await Promise.all(articleAnchorElements.map(async (link) => await link.getAttribute("href")));
    let articlesProcessed = 0;
    for(const link of articleLinks )
    {
      if (articlesProcessed >= 5) break;
      try{
         await driver.get(link);
         //just in case there is cookies in /article as we might have missed the /opinions
           if (!cookiesAccepted) {
          try {
            // Try to locate the cookie acceptance button
            const acceptCookieBtn = await driver.findElement(
              By.id("didomi-notice-agree-button")
            );
             // Wait for the button to be visible
            await driver.wait(until.elementIsVisible(acceptCookieBtn), 10000);
            //clicking the button
            await acceptCookieBtn.click();
            cookiesAccepted = true;
          } catch (error) {
            console.warn("Cookie popup not found on article page:", error.message);
          }
        }
          // Wait for article to load
           await driver.wait(until.elementsLocated(By.css("article")), 10000);
         // Get article title
           const titleElement = await driver.findElement(By.css("article h1.a_t"));
           const title = await titleElement.getText();

        // Get content first
       await driver.wait(until.elementLocated(By.css('[data-dtm-region="articulo_cuerpo"]')), 10000);
       const contentElement = await driver.wait(until.elementIsVisible(
       driver.findElement(By.css('[data-dtm-region="articulo_cuerpo"]'))
       ), 10000);
     const content = await contentElement.getText();
// Only push title if content was fetched
if (!title || !content) {
  console.warn("Missing title or content. Skipping...");
  continue;
}

articleTitles.push(title);
        // Print title and content
        console.log("----------------- Article Start ---------------------");
        console.log("**Title**:", title);
        console.log("**Content**:", content);
        console.log("----------------- Article End -----------------------");
      
    // downloading cover image if it exists
       try{
        const coverImageElement=await driver.findElement(By.css("article img._re.a_m-h"))
        const coverImageUrl = await coverImageElement.getAttribute("src");
        const imageResponse = await axios.get(coverImageUrl, { responseType: "stream" });
        const sanitizedTitle = title
        .replace(/[<>:"\/\\|?*]/g, "")
        .replace(/\s+/g, "-");
          const imagePath = path.join(__dirname, "..", "assets", `${sanitizedTitle}.jpg`);
          const writer = fs.createWriteStream(imagePath);
          imageResponse.data.pipe(writer);
          console.log(`Cover image saved: ${imagePath}`);
        } 
        catch (err) {
          console.log("Image not found for this article.");
        }
        articlesProcessed++;  
       }  
      
        catch(error) {
        console.log("Error fetching article. Skipping to next...");
      }
    }
 }
       catch (error) {
        console.error("An error occurred during scraping:", error);
  }

  finally {
    await driver.quit();
  }

  return articleTitles;
}
module.exports = scrapeElPaisOpinion;
