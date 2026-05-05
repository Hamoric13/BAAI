import { useState } from 'react'

function Results({ results, income }) {
    const [showTable, setShowTable] = useState(false);
    const monthlyIncome = Math.round(income / 12);

    return (
        <div className="results">
            <h2>Affordability by County</h2>
            <p style={{ color: '#666', marginBottom: '24px' }}>Based on ${monthlyIncome.toLocaleString()}/mo gross income</p>
            
            <div className="card-grid">
                {results.map(county => (
                    <div key={county.county_name} className="score-card" style={{ borderLeftColor: county.color }}>
                        <div className="county-name">{county.county_name.replace(', CA', '')}</div>
                        <div className="score-pct" style={{ color: county.color }}>{Math.round(county.ratio * 100)}%</div>
                        <div className="score-sub">${county.breakdown.total.toLocaleString()}/mo of ${monthlyIncome.toLocaleString()}</div>
                    </div>
                ))}
            </div>
            <div style={{ textAlign: 'center', margin: '20px 0' }}>   
            <button className="toggle-btn" onClick={() => setShowTable(!showTable)}>
                {showTable ? 'Hide breakdown' : 'View full breakdown'}
            </button>
            </div>

            {showTable && (
                <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', width: '100%', display: 'block' }}>                
                <table className="data-table" style={{ minWidth: '700px' }}>
                <thead>
                        <tr>
                            <th>County</th>
                            <th>% of income 📊</th>
                            <th>Rent 🏠</th>
                            <th>Tax 🏛️</th>
                            <th>Gas ⛽</th>
                            <th>Groceries 🛒</th>
                            <th>Utilities 💡</th>
                            <th>Healthcare 🏥</th>
                            <th>Total/mo 💰</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map(county => (
                            <tr key={county.county_name}>
                                <td><span className="dot" style={{ background: county.color }}></span>{county.county_name.replace(', CA', '')}</td>
                                <td style={{ color: county.color, fontWeight: 500 }}>{Math.round(county.ratio * 100)}%</td>
                                <td>${county.breakdown.rent.toLocaleString()}</td>
                                <td>${county.breakdown.tax.toLocaleString()}</td>
                                <td>${county.breakdown.gas.toLocaleString()}</td>
                                <td>${county.breakdown.groceries.toLocaleString()}</td>
                                <td>${county.breakdown.utilities.toLocaleString()}</td>
                                <td>${county.breakdown.healthcare.toLocaleString()}</td>
                                <td><strong>${county.breakdown.total.toLocaleString()}</strong></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            )}
        </div>
    )
}

export default Results