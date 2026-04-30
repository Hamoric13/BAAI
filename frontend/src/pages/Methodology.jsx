function Methodology() {
    return (
      <div className="page methodology" >
        <h2 style={{ fontSize: '36px', marginBottom: '16px' }}>Methodology</h2>        <p style={{ color: '#666', marginBottom: '40px', fontSize: '16px' }}>
          The Bay Area Affordability Index calculates a composite affordability score for each of the 9 Bay Area counties based on real cost-of-living data from federal government sources.
        </p>
  
        <h3>How the Score Works</h3>
        <p>The affordability score represents the percentage of your gross monthly income consumed by essential living costs. A score of 80% means 80 cents of every dollar you earn goes toward basic expenses before any discretionary spending.</p>
        <p style={{ marginTop: '12px' }}>Scores are normalized relative to other Bay Area counties — not national benchmarks — since our tool is designed for people who have already decided to live in the Bay Area and want to compare options within the region.</p>
        <p style={{ marginTop: '12px' }}>Note: At higher incomes, scores can increase due to progressive taxation. A household earning $400k pays a significantly higher effective tax rate than one earning $300k, meaning a larger share of gross income goes to taxes even though living costs remain constant.</p>
  
        <h3 style={{ marginTop: '32px' }}>Cost Components</h3>
  
        <div style={{ marginTop: '16px' }}>
        <div style={{ background: 'white', border: '0.5px solid #e0e0e0', borderLeft: '4px solid #0f2d52', borderRadius: '8px', padding: '20px', marginTop: '16px' }}>
          <h4>🏠 Housing</h4>
          <p>Rent data comes from HUD Fair Market Rents 2026 — the 40th percentile gross rent for standard quality units ranging from studio to 4 bedrooms. Market rate rents only — housing subsidies and Section 8 are not factored in as eligibility is income-restricted and waitlists are multi-year.</p>
          <p style={{ marginTop: '8px', color: '#888', fontSize: '13px' }}>Note: San Francisco, San Mateo, and Marin counties share identical rent data — HUD groups them into the same metropolitan area. Santa Clara uses HUD's MSA-level average as the county baseline.</p>
          <p style={{ marginTop: '4px', color: '#888', fontSize: '13px' }}>Source: U.S. Department of Housing and Urban Development.</p>
          <p style={{ marginTop: '4px', color: '#888', fontSize: '13px' }}>Data: <a href="https://www.huduser.gov/portal/datasets/fmr.html" target="_blank" style={{ color: '#0f2d52' }}>HUD Fair Market Rents 2026</a></p>
        </div>
        </div>
  
        <div style={{ marginTop: '20px' }}>
        <div style={{ background: 'white', border: '0.5px solid #e0e0e0', borderLeft: '4px solid #0f2d52', borderRadius: '8px', padding: '20px', marginTop: '16px' }}>
          <h4>🏛️ Taxes</h4>
          <p>Combined federal and California state effective tax rates by income bracket and filing status. Includes Social Security (6.2% up to $176,100), Medicare (1.45% + 0.9% above threshold), and California SDI (1.1%). Assumes standard deduction and W-2 wage income only. Pre-tax contributions such as 401(k) or HSA would reduce actual tax burden.</p>
          <p style={{ marginTop: '8px', color: '#888', fontSize: '13px' }}>Note: SF employers pay an additional payroll tax. This is employer-side and does not reduce employee take-home pay directly, but may affect compensation negotiations and job offers in SF.</p>
          <p style={{ marginTop: '4px', color: '#888', fontSize: '13px' }}>Source: IRS and CA FTB 2026 tax tables.</p>
          <p style={{ marginTop: '4px', color: '#888', fontSize: '13px' }}>Data: <a href="https://www.irs.gov/filing/federal-income-tax-rates-and-brackets" target="_blank" style={{ color: '#0f2d52' }}>IRS Tax Tables 2026</a></p>
        </div>
        </div>
  
        <div style={{ marginTop: '20px' }}>
        <div style={{ background: 'white', border: '0.5px solid #e0e0e0', borderLeft: '4px solid #0f2d52', borderRadius: '8px', padding: '20px', marginTop: '16px' }}>
          <h4>⛽ Transportation</h4>
          <p>Gas cost calculated using weekly California retail gasoline prices from the EIA, applied to a default assumption of 1,250 miles/month at 28 MPG. Both values are customizable in the calculator. All Bay Area counties use the California statewide average — county-level variation across the Bay Area is minimal (under $0.30/gallon).</p>
          <p style={{ marginTop: '4px', color: '#888', fontSize: '13px' }}>Source: U.S. Energy Information Administration Weekly Retail Gasoline Prices.</p>
          <p style={{ marginTop: '4px', color: '#888', fontSize: '13px' }}>Data: <a href="https://www.eia.gov/petroleum/gasdiesel/" target="_blank" style={{ color: '#0f2d52' }}>EIA Weekly Retail Gasoline Prices</a></p>
        </div>
        </div>
  
        <div style={{ marginTop: '20px' }}>
        <div style={{ background: 'white', border: '0.5px solid #e0e0e0', borderLeft: '4px solid #0f2d52', borderRadius: '8px', padding: '20px', marginTop: '16px' }}>
          <h4>🛒 Groceries</h4>
          <p>Grocery costs use BLS Consumer Expenditure Survey 2024 baselines by household size, scaled by the local Consumer Price Index relative to the 2024 national average. SF metro counties (Alameda, Contra Costa, Marin, San Francisco, San Mateo) use the SF-Oakland-Hayward CPI series — a combined metro index covering those 5 counties specifically. The remaining 4 counties use the West Region CPI, which covers all 13 western states.</p>
          <p style={{ marginTop: '8px', color: '#888', fontSize: '13px' }}>Note: The SF-Oakland-Hayward series is semiannual — published twice a year as first and second half rather than monthly. The West Region and national series are monthly.</p>
          <p style={{ marginTop: '4px', color: '#888', fontSize: '13px' }}>Source: U.S. Bureau of Labor Statistics Consumer Price Index and Consumer Expenditure Survey 2024.</p>
          <p style={{ marginTop: '4px', color: '#888', fontSize: '13px' }}>Data: <a href="https://www.bls.gov/cpi/" target="_blank" style={{ color: '#0f2d52' }}>BLS Consumer Price Index</a>, <a href="https://www.bls.gov/cex/" target="_blank" style={{ color: '#0f2d52' }}>BLS Consumer Expenditure Survey 2024</a></p>
        </div>
        </div>
  
        <div style={{ marginTop: '20px' }}>
        <div style={{ background: 'white', border: '0.5px solid #e0e0e0', borderLeft: '4px solid #0f2d52', borderRadius: '8px', padding: '20px', marginTop: '16px' }}>
          <h4>💡 Utilities</h4>
          <p>Electricity cost assumes 503 kWh/month (EIA 2024 California residential average) at the current California retail rate. Natural gas assumes 24 therms/month — a weighted annual average of California winter usage (40 therms/month for 4 months) and mild/summer usage (16 therms/month for 8 months). California residential electricity prices are nearly double the national average.</p>
          <p style={{ marginTop: '8px', color: '#888', fontSize: '13px' }}>Note: Water, trash, and internet costs are excluded due to lack of consistent public data across Bay Area counties. County sales tax on utilities not yet included — planned for a future update.</p>
          <p style={{ marginTop: '4px', color: '#888', fontSize: '13px' }}>Source: U.S. Energy Information Administration Electricity and Natural Gas Data.</p>
          <p style={{ marginTop: '4px', color: '#888', fontSize: '13px' }}>Data: <a href="https://www.eia.gov/electricity/data.php" target="_blank" style={{ color: '#0f2d52' }}>EIA Electricity Retail Sales</a>, <a href="https://www.eia.gov/naturalgas/data.php" target="_blank" style={{ color: '#0f2d52' }}>EIA Natural Gas Prices</a></p>
        </div>
        </div>
  
        <div style={{ marginTop: '20px' }}>
        <div style={{ background: 'white', border: '0.5px solid #e0e0e0', borderLeft: '4px solid #0f2d52', borderRadius: '8px', padding: '20px', marginTop: '16px' }}>
          <h4>🏥 Healthcare</h4>
          <p>Employee health insurance premium contributions based on KFF Employer Health Benefits Survey 2025. Single coverage: $150/month. Employee + dependent: $400/month. Family coverage: $550/month. These represent the employee's out-of-pocket premium contribution only — employer contributions are excluded as they are not a direct cost to the employee.</p>
          <p style={{ marginTop: '4px', color: '#888', fontSize: '13px' }}>Source: Kaiser Family Foundation Employer Health Benefits Survey 2025.</p>
          <p style={{ marginTop: '4px', color: '#888', fontSize: '13px' }}>Data: <a href="https://www.kff.org/health-costs/report/2025-employer-health-benefits-survey/" target="_blank" style={{ color: '#0f2d52' }}>KFF Employer Health Benefits Survey 2025</a></p>
        </div>
        </div>
  
        <h3 style={{ marginTop: '32px' }}>Assumptions & Limitations</h3>
        <ul style={{ color: '#555', lineHeight: '1.8', marginTop: '12px' }}>
          <li>Tax estimates assume standard deduction and W-2 wage income only</li>
          <li>Retirement contributions (401k, HSA) and itemized deductions are not factored in and would reduce actual tax burden</li>
          <li>Gas assumes personal vehicle usage — public transit users will have lower transportation costs</li>
          <li>County sales tax not yet included in grocery or utility costs — coming in a future update</li>
          <li>Housing subsidies and Section 8 not factored in</li>
          <li>Water, trash, and internet excluded due to lack of consistent county-level public data</li>
          <li>Grocery baselines updated annually when BLS publishes new CE Survey data (typically December)</li>
          <li>All scores are relative within the Bay Area, not absolute national benchmarks</li>
          <li>Scores reflect current costs at time of calculation using the most recent available data point for each category</li>
        </ul>
  
        <h3 style={{ marginTop: '32px' }}>Data Sources</h3>
        <ul style={{ color: '#555', lineHeight: '1.8', marginTop: '12px' }}>
          <li><a href="https://www.huduser.gov/portal/datasets/fmr.html" target="_blank" style={{ color: '#0f2d52' }}>HUD Fair Market Rents 2026</a></li>
          <li><a href="https://www.eia.gov/petroleum/gasdiesel/" target="_blank" style={{ color: '#0f2d52' }}>EIA Weekly Retail Gasoline Prices</a></li>
          <li><a href="https://www.bls.gov/cpi/" target="_blank" style={{ color: '#0f2d52' }}>BLS Consumer Price Index</a></li>
          <li><a href="https://www.eia.gov/electricity/data.php" target="_blank" style={{ color: '#0f2d52' }}>EIA Electricity Retail Sales Data</a></li>
          <li><a href="https://www.eia.gov/naturalgas/data.php" target="_blank" style={{ color: '#0f2d52' }}>EIA Natural Gas Prices</a></li>
          <li><a href="https://www.kff.org/health-costs/" target="_blank" style={{ color: '#0f2d52' }}>KFF Employer Health Benefits Survey 2025</a></li>
          <li><a href="https://www.bls.gov/cex/" target="_blank" style={{ color: '#0f2d52' }}>BLS Consumer Expenditure Survey 2024</a></li>
        </ul>
  
        <p style={{ marginTop: '40px', color: '#999', fontSize: '13px' }}>
          Built by Haramrit Singh Suri · Data refreshed from government APIs · For questions or feedback, visit <a href="https://github.com/Hamoric13/BAAI" target="_blank" style={{ color: '#0f2d52' }}>GitHub</a>
        </p>
      </div>
    )
  }
  
  export default Methodology