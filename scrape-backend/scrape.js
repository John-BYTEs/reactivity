const axios = require("axios");
const express = require("express");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = 8080;


const headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  "Accept-Language": "en-US,en;q=0.9",
  "Accept-Encoding": "gzip, deflate, br",
  "Referer": "https://www.google.com/",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"};


app.get("/scrape", async (req, res) => {
  const query = req.query.url;
  const headlineLinksSet = new Set();
  const limitNews = 9;

  try {
    const response = await axios.get(query, {headers});
    const $ = cheerio.load(response.data);

    $(".container__link, div[class*='MuiGrid-root'], div[class*='just-in-content']").each((_, element) => {
      if(headlineLinksSet.size >= limitNews) return false;
      let url = $(element).attr("href");
      if (url && !url.startsWith("http")) {
        url = query + url;
      }
      headlineLinksSet.add(url);
    });

    const headlineLinks = Array.from(headlineLinksSet);
    const results = [];

    for (const link of headlineLinks) {
      const article = await scrapeHeadline(link);
      if (article) results.push(article);
    }
    
    res.json({news: results });
  } catch (err) {
    console.error("Failed!", err.message);
    res.status(500).send("Error occurred while scraping.");
  }
});


async function scrapeHeadline(url) {
  try {
    const response = await axios.get(url, {headers});
    const $ = cheerio.load(response.data);

    const headline = $("meta[property='og:title']").attr('content') || "Unavailable";
    const author = $("meta[name='author']").attr('content') || "Anonymous";
    const pubDate = $("meta[property='og:pubdate'], meta[name='pubdate'], meta[property='article:published_time']").attr('content') || "Unavailable";

    return { headline, author, pubDate, url};
  } catch (err) {
    console.error(`Error scraping:`, err.message);
    return null;
  }
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));