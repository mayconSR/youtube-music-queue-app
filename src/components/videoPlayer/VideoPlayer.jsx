import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = () => {
  const [videoLinks, setVideoLinks] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    fetchMusicLinks();
  }, []);

  const fetchMusicLinks = async () => {
    // Link da api
    const apiUrl = process.env.REACT_APP_API_URL;

    try {
      const response = await fetch(apiUrl);
      const links = await response.json();
      setVideoLinks(links);
    } catch (error) {
      console.error('Erro ao buscar links de música:', error);
    }
  };

  const onVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoLinks.length);
  };

  const skipVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoLinks.length);
  };

  const videoOpts = {
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div>
      <h1>Player de Música do YouTube</h1>
      {videoLinks.length > 0 ? (
        <div>
          <YouTube
            videoId={videoLinks[currentVideoIndex]}
            opts={videoOpts}
            onEnd={onVideoEnd}
          />
          <button onClick={skipVideo}>Pular vídeo</button>
        </div>
      ) : (
        <p>Nenhum vídeo na lista.</p>
      )}
    </div>
  );
};

export default VideoPlayer;