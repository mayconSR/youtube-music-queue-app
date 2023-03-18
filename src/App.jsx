import React from 'react'
import './App.css'
import Rotas from './routes'
import { BrowserRouter as Router } from 'react-router-dom';

function App() {

  return (
    <Router>
      <div className="App">
        <Rotas />
      </div>
    </Router>
  )
}

export default App
