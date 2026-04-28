function Results({ results }) {

    return (
        <div className="results">
            <h2>Affordability by County</h2>
            {results.map((county) => (
                <div key={county.county_name} style={{ borderLeft: `4px solid ${county.color}`, padding: '12px', marginBottom: '12px' }}>
                    <strong>{county.county_name}</strong>
                    <span> — {Math.round(county.ratio * 100)}% of gross income</span>
                    {county.breakdown && (
                        <div style={{ marginTop: '6px', fontSize: '13px', color: '#666' }}>
                            <span>Rent: ${county.breakdown.rent}/mo</span> &nbsp;·&nbsp;
                            <span>Tax: ${county.breakdown.tax}/mo</span> &nbsp;·&nbsp;
                            <span>Gas: ${county.breakdown.gas}/mo</span> &nbsp;·&nbsp;
                            <span>Groceries: ${county.breakdown.groceries}/mo</span> &nbsp;·&nbsp;
                            <span>Utilities: ${county.breakdown.utilities}/mo</span> &nbsp;·&nbsp;
                            <strong>Total: ${county.breakdown.total}/mo</strong>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Results