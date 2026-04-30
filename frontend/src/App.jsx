import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Trends from './pages/Trends'
import Methodology from './pages/Methodology'
import './App.css'
import Footer from './components/Footer'

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/raw_data.json')
      .then(res => res.json())
      .then(json => setData(json))
  }, []);

  return (
    <BrowserRouter>
        <header className="header">
          <h1>Bay Area Affordability Index</h1>
          <nav>
            <Link to="/">Calculator</Link>
            <Link to="/trends">Trends</Link>
            <Link to="/methodology">Methodology</Link>
          </nav>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home data={data} />} />
            <Route path="/trends" element={<Trends data={data} />} />
            <Route path="/methodology" element={<Methodology />} />
          </Routes>
        </main>
        <Footer lastUpdated={data?.last_updated} />
    </BrowserRouter>
  )
}

export default App