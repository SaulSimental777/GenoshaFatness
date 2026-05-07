import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './RelatedVideosComponent.css'
import { PiBarbellLight } from "react-icons/pi";
import customFetch from '../../Utils/customFetch';



const RelatedVideosComponent = ({ exerciseName }) => {

const [videos, setVideos] = useState([]);

useEffect(() => {
    const fetchVideos = async () => {

      const res = await customFetch.get(`/videos/videoReference?find=${exerciseName} tutorial ejercicios`)
      setVideos(res.data.items)

        };

    fetchVideos();
  }, [exerciseName]);

  return (
    <div>
    <div className="videos-grid">
      {videos.map((video) => (
        <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noreferrer">
            <div className="video-card">
                <div className="video-card-thumbnail">
                    <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
                </div>
                <div className="video-card-specs">
                    <h3>{video.snippet.title}</h3>
                    <h4>{video.snippet.channelTitle}</h4>
                </div>
                <div className="video-card-logo">
                <PiBarbellLight size={50} color='#0099ff'/>
                </div>
            </div>
        </a>
      ))}
    </div>
  </div>
  )
}

export default RelatedVideosComponent