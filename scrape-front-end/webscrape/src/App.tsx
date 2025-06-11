import { useState } from 'react';
import axios from 'axios';
import NewsItem from './components/NewsItem';

const App = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
      setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/scrape');
      setNews(response.data.news);
    } catch (err) {
      console.error('Failed to fetch news:', err);
      alert('Error fetching news.');
    } 
      setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-950">News Scraper</h1>
      <div className="flex justify-center mb-4">
        <button
          onClick={fetchNews}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          {loading ? 'Loading...' : 'Fetch News'}
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {news.map((item, idx) => (
          <NewsItem key={idx} item={item} />
        ))}
      </div>
    </div>
  );
};

export default App;
