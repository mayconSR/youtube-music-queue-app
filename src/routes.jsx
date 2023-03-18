import React from "react";
import { Routes, Route } from "react-router-dom"; 

import VideoPlayer from "./components/videoPlayer/VideoPlayer";
import SubmitLink from "./components/submitLink/SubmitLink";

const Rotas = () => {
    return (
        <Routes>
            <Route path="/" element={<SubmitLink />} />
            <Route path="/player" element={<VideoPlayer />} /> 
        </Routes>
    );
}

export default Rotas;