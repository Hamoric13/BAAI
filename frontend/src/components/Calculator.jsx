import { useState } from 'react'
import { bayAreaCountiesComparision } from '../utils/affordability'

function Calculator({ data, onSubmit}) {

    const [income, setIncome] = useState('');
    const [filingStatus, setFilingStatus] = useState('single');
    const [householdSize, setHouseholdSize] = useState(1);
    const [bedrooms, setBedrooms] = useState(1);
    const [monthlyMiles, setMonthlyMiles] = useState(1250);
    const [mpg, setMpg] = useState(28);

    function handleSubmit(){
        console.log(bedrooms, householdSize, filingStatus, income);
        const results = bayAreaCountiesComparision(data, +income, filingStatus, householdSize, bedrooms, monthlyMiles, mpg);
        onSubmit(results);
    }

    return (
        <div className = "calculator">
            <h2>Calculator Your Affordability</h2>

            <label>Annual Income (pre-tax) </label>
            <input
                type="number"
                value={income}
                onChange={e => setIncome(e.target.value)}
                placeholder="e.g. 75000"
            />

            <label>Filing Status</label>
            <div>
                <input type="radio" name="filing" value="single" checked={filingStatus === 'single'} onChange={e => setFilingStatus(e.target.value)} /> Single 
                <input type="radio" name="filing" value="head_of_household" checked={filingStatus === 'head_of_household'} onChange={e => setFilingStatus(e.target.value)} /> Head of Household 
                <input type="radio" name="filing" value="married" checked={filingStatus === 'married'} onChange={e => setFilingStatus(e.target.value)} /> Married  
            </div>

            <label>Household Size</label>
            <input type="number" min="1" max="6" value={householdSize} onChange={e => setHouseholdSize(+e.target.value)} />

            <label>Bedrooms</label>
            <select value={bedrooms} onChange={e => setBedrooms(+e.target.value)}>
                <option value={0}>Studio</option>
                <option value={1}>1 Bedroom</option>
                <option value={2}>2 Bedrooms</option>
                <option value={3}>3 Bedrooms</option>
                <option value={4}>4 Bedrooms</option>
            </select>
            
            <label>Monthly Miles Driven</label>
            <input type="number" value={monthlyMiles} onChange={e => setMonthlyMiles(+e.target.value)} />

            <label>Vehicle MPG</label>
            <input type="number" value={mpg} onChange={e => setMpg(+e.target.value)} />

            <button onClick={handleSubmit}>Calculate</button>

        </div>
    )
}

export default Calculator