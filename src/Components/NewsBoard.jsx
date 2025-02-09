import { useEffect, useState } from "react"
import NewsItem from "./NewsItem";

function NewsBoard({category}) {
    const [articles, setArticles] = useState([]);
    useEffect(()=>{
        const fetchNews = async () => {
            try {
                let url = `https://newsapi.org/v2/everything?q=${category}&apiKey=${import.meta.env.VITE_API_KEY}`;

                const response = await fetch(url);
                if (!response.ok) throw new Error("Failed to fetch news");

                const data = await response.json();
                setArticles(data.articles || []);
            } catch (err) {
                console.error("Error fetching news:", err);
            }
        };

        fetchNews();
    },[category])
    return(
        <div>
            <h2 className="text-center">Latest <span className="badge bg-danger">News</span></h2>
            {articles.map((news,index)=>{
                return <NewsItem key={index} title={news.title} description={news.description} src={news.urlToImage} url={news.url}/>
            })}
        </div>
    )
}
export default NewsBoard