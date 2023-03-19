import React, { useState, useEffect } from 'react';
import { google } from 'googleapis';

const VideoPlayer = () => {
  const [videoIds, setVideoIds] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    fetchVideoIds();
  }, []);

  const fetchVideoIds = async () => {
    const apiUrl = 'https://youtube-music-queue-api.vercel.app/api/music';

    try {
      const response = await fetch(apiUrl);
      const links = await response.json();

      const youtube = google.youtube({
        version: 'v3',
        auth: process.env.YOUTUBE_KEY // api-key do youtube
      });

      const ids = await Promise.all(
        links.map(async (link) => {
          if (isValidYouTubeLink(link)) {
            const id = await getYoutubeVideoId(youtube, link);
            return id;
          }
        })
      );

      setVideoIds(ids.filter((id) => id != null));
    } catch (error) {
      console.error('Erro ao buscar IDs de vídeo:', error);
    }
  };

  const getYoutubeVideoId = async (youtube, url) => {
    let videoId = url.split('v=')[1];
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }

    try {
      const { data } = await youtube.videos.list({
        part: 'player',
        id: videoId
      });

      if (data.items.length > 0) {
        return videoId;
      } else {
        console.error(`O vídeo com ID ${videoId} não pôde ser encontrado.`);
        return null;
      }
    } catch (error) {
      console.error(`Erro ao buscar o vídeo com ID ${videoId}:`, error);
      return null;
    }
  };

  const isValidYouTubeLink = (url) => {
    const regex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return url.match(regex);
  };

  const onPlayerReady = (event) => {
    setPlayer(event.target);
  };

  const onVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoIds.length);
  };

  const skipVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoIds.length);
  };

  useEffect(() => {
    if (player) {
      player.loadVideoById(videoIds[currentVideoIndex]);
    }
  }, [player, videoIds, currentVideoIndex]);

  return (
    <div>
      <h1>Player de Música do YouTube</h1>
      {videoIds.length > 0 ? (
        <div>
          <div id="player" />
          <button onClick={skipVideo}>Pular vídeo</button>
        </div>
      ) : (
        <p>Nenhum vídeo na lista.</p>
      )}
    </div>
  );
};

export default VideoPlayer;