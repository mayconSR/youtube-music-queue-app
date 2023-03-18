import React, { useState, useEffect } from 'react';

const VideoPlayer = () => {
  const [videoLinks, setVideoLinks] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    fetchMusicLinks();
  }, []);

  const fetchMusicLinks = async () => {
    // Link da api
    const apiUrl = 'https://youtube-music-queue-api.vercel.app/api/music';

    try {
      const response = await fetch(apiUrl);
      const links = await response.json();
      setVideoLinks(links);
    } catch (error) {
      console.error('Erro ao buscar links de música:', error);
    }
  };

  const onPlayerReady = (event) => {
    event.target.playVideo();
  };

  const onPlayerStateChange = (event) => {
    if (event.data === 0) {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoLinks.length);
    }
  };

  return (
    <div>
      <h1>Player de Música do YouTube</h1>
      {videoLinks.length > 0 ? (
        <div>
          <iframe
            title="YouTube Player"
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoLinks[currentVideoIndex]}?autoplay=1&origin=https://youtube-music-queue-app.vercel.app`}
            allowFullScreen
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            onLoad={onPlayerReady}
            onStateChange={onPlayerStateChange}
          />
          <button onClick={() => setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoLinks.length)}>Pular vídeo</button>
        </div>
      ) : (
        <p>Nenhum vídeo na lista.</p>
      )}
    </div>
  );
};

export default VideoPlayer;