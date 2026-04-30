import { useState } from 'react'
import Calculator from '../components/Calculator'
import Results from '../components/Results'
import CountyMap from '../components/Map'

function Home({ data }) {
    const [results, setResults] = useState(null);
    const [income, setIncome] = useState(null);
  
    return (
      <div className="page">
        <div className="hero">
        <h2 style={{ fontSize: '36px', marginBottom: '16px' }}>Can you afford to live in the Bay Area?</h2>          <p>Enter your income and household details to see a personalized affordability breakdown across all 9 Bay Area counties.</p>
        </div>
        
        {data && <Calculator data={data} onSubmit={(results, inc) => { setResults(results); setIncome(inc); }} onInputChange={() => { setResults(null); setIncome(null); }} />}        
        {results && <CountyMap results={results} />}
        
        {results && <Results results={results} income={income} />}        
        {!results && <div className="placeholder">Fill in the calculator and hit Calculate to see your results.</div>}
      </div>
    )
  }

export default Home