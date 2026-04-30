import { Link } from 'react-router-dom'

function Footer({ lastUpdated }) {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Bay Area Affordability Index</h4>
          <p>A data-driven tool for understanding the true cost of living across all 9 Bay Area counties.</p>
        </div>
        <div className="footer-section">
          <h4>Pages</h4>
          <Link to="/">Calculator</Link>
          <Link to="/trends">Trends</Link>
          <Link to="/methodology">Methodology</Link>
        </div>
        <div className="footer-section">
          <h4>Data</h4>
          <p>Data last updated: {lastUpdated || 'N/A'}</p>
          <p>For sources and methodology, see our <Link to="/methodology">Methodology page</Link>.</p>
          <p>© 2026 Haramrit Singh Suri</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer