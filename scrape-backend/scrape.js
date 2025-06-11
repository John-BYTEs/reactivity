const axios = require('axios');
const express = require('express');
const cheerio = require('cheerio');
const cors = require('cors');
// const newsSources = require('./newsURL.js');
const url = "https://edition.cnn.com/world/asia";

const app = express();
app.use(cors());
const PORT = 8080;


app.get('/scrape', async (req, res) => {
  const newsItems = [];

  try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
      });

      const $ = cheerio.load(response.data);

      $('.card.container__item').each((i, element) => {
        const url = $(element).find('a.container__link').attr('href');
        const headline = $(element).find('.container__text').text().trim();
        const date = $(element).find('data-page').attr('datetime') || '';

        const fullLink = url.startsWith('http') ? url : `https://edition.cnn.com${url}`;
        
          newsItems.push({
            headline,
            date,
            url: fullLink
          });
        
      });
    
    res.json({ news: newsItems });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error scraping the websites.' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
