import React, { useEffect, useState } from 'react'
import './FitnessNewsComponent.css'
import customFetch from '../../Utils/customFetch'
import { PiBarbellLight } from "react-icons/pi";

const FitnessNewsComponent = () => {

    const [news, setNews] = useState([])

    useEffect(() => {
        const fetchNews = async () => {
            const res = await customFetch.get('/news/fitnessNews')
            setNews(res.data)
        };
        fetchNews();
    },[])

  return (
    <div className="news-background">
        <div className="news-background-header">
            <div className="news-background-header-logo">
                <PiBarbellLight size={50} color='#0099ff'/>
            </div>
            <div className="news-background-header-top">
                <h1>Noticias Fitness</h1>
            </div>
            <div className="news-background-header-bottom">
                <h4>Mantente al tanto con las ultimas tendencias, investigaciones y tips
                    del mundo del fitness para ayudarte a alcanzar tus
                    metas.
                </h4>
            </div>
        </div>
        <hr />
        <div className="news-background-map">
            {news.map((article) => (
                    <div className="news-container">
                        <div className="news-container-image">
                            <img src={article.urlToImage} alt='article-image' />
                        </div>
                        <div className="news-container-specs">
                            <h3>{article.title}</h3>
                            <h4>{article.author}</h4>
                        </div>
                        <div className="news-container-description">
                            <p>{article.description}</p>
                        </div>
                        <a href={article.url}>
                            <div className="news-container-button">
                                <button>Leer mas</button>
                            </div>
                        </a>
                    </div>
            ))}
        </div>

    </div>
  )
}

export default FitnessNewsComponent