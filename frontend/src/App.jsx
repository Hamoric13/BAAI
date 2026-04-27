import { useState, useEffect } from 'react'
import Calculator from './components/Calculator'
import Results from './components/Results'
import './App.css'
import CountyMap from './components/Map'



function App() {
  const [data, setData] = useState(null);
  const [results, setResults] = useState(null);

  useEffect(() => {
    fetch('/raw_data.json')
      .then(res => res.json())
      .then(json => setData(json))
  }, [])

  return (
    <div className="app">
      <h1>Bay Area Affordability Index</h1>
      {data && <Calculator data={data} onSubmit={setResults} />}
      {results && <Results results={results} />}
      {results && <Results results={results} />}
      {results && <CountyMap results={results} />}
      </div>
  )
}

export default App