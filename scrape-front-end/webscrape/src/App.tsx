import { useState } from "react";
import axios from "axios";
import NewsItem from "./components/NewsItem";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

const App = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const fetchNews = async () => {
    if (!input.trim()) {
      alert("Please enter a valid URL.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/scrape", {
        params: { url: input },
      });
      setNews(response.data.news);
    } catch (err) {
      console.error("Failed to fetch news:", err);
      alert("Error fetching news.");
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
        <div className="min-h-screen bg-gray-100 font-mono">
          <div className="pt-12">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mb-6">
              <input
              type="text"
              placeholder="Enter news section URL"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full text-black sm:w-2/3 p-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={fetchNews}
              className={`px-4 py-2 rounded-md font-semibold text-white ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={loading}
            >
              {loading ? "Loading..." : "Fetch News"}
            </button>
            </div>
          </div>

          <div className="min-h-280 mr-15 ml-15 font-mono">
            {news.length === 0 && !loading ? (
              <p className="text-center text-gray-600">No news to display.</p>
            ) : (
              news.map((item, idx) => <NewsItem key={idx} item={item} />)
            )}
          </div>
        </div>
      <Footer />
    </>
  );
};

export default App;
