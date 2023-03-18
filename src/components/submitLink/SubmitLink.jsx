import React, { useState } from 'react';

const SubmitLink = () => {
  const [link, setLink] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // URL da API
    const apiUrl = 'https://youtube-music-queue-api.vercel.app/api/music';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link }),
      });

      if (response.ok) {
        setMessage('Link de música adicionado com sucesso.');
        setLink('');
      } else {
        const errorResponse = await response.json();
        setMessage(errorResponse.error);
      }
    } catch (error) {
      setMessage('Ocorreu um erro ao enviar o link. Por favor, tente novamente.');
    }
  };

  return (
    <div>
      <h1>Enviar link de música do YouTube</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="link">Link do YouTube:</label>
        <input
          type="text"
          id="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
        <button type="submit">Enviar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SubmitLink;