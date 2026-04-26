function Results({ results }) {

    function getColor(normalizedScore) {
        if (normalizedScore <= 0.33) return 'green';
        if (normalizedScore <= 0.66) return 'orange';

        return 'red';
    }


    return (
        <div className="results">
          <h2>Affordability by County</h2>
          {results.map(county => (
            <div key={county.county_name} style={{ borderLeft: `4px solid ${getColor(+county.normalized_score)}`, padding: '8px', marginBottom: '8px' }}>
              <strong>{county.county_name}</strong>
              <span> — {Math.round(county.ratio * 100)}% of gross income</span>
            </div>
          ))}
        </div>
      )
    }
    
    export default Results