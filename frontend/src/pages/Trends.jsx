import Charts from '../components/Charts'

function Trends({ data }) {
  return (
    <div className="page">
        <h2 style={{ fontSize: '36px', marginBottom: '16px' }}>Cost Trends Over Time</h2>      <p>Historical data on gas prices, grocery costs, and utilities in the Bay Area compared to national averages.</p>
      {data && <Charts data={data} />}
    </div>
  )
}

export default Trends