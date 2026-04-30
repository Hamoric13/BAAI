import { useState } from 'react'
import { bayAreaCountiesComparision } from '../utils/affordability'

function Calculator({ data, onSubmit}) {

    const [income, setIncome] = useState('');
    const [filingStatus, setFilingStatus] = useState('single');
    const [householdSize, setHouseholdSize] = useState(1);
    const [bedrooms, setBedrooms] = useState(1);
    const [monthlyMiles, setMonthlyMiles] = useState(1250);
    const [mpg, setMpg] = useState(28);

    const [errors, setErrors] = useState({});

    function validate() {
        const newErrors = {};
        if (!income || +income <= 0) newErrors.income = 'Please enter a valid income';
        if (householdSize < 1 || householdSize > 6) newErrors.householdSize = 'Must be between 1 and 6';
        if (mpg <= 0 || mpg > 150) newErrors.mpg = 'Please enter a realistic MPG';
        if (monthlyMiles <= 0 || monthlyMiles > 10000) newErrors.monthlyMiles = 'Must be between 1 and 10,000';
        return newErrors;
    }
    function handleSubmit() {
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});
        const results = bayAreaCountiesComparision(data, +income, filingStatus, householdSize, bedrooms, monthlyMiles, mpg);
        onSubmit(results, +income);
    }

    return (
        <div className = "calculator">
            <h2>Calculate Your Affordability</h2>

            <label>Annual Income (pre-tax) </label>
            <input
                type="number"
                min="1"
                max="100000000"
                value={income}
                onChange={e => setIncome(e.target.value)}
                placeholder="e.g. 75000"
            />
            {errors.income && <span style={{ color: 'red', fontSize: '12px' }}>{errors.income}</span>}

            <label>Filing Status</label>
            <div className="radio-group">
                <label >
                    <input type="radio" name="filing" value="single" checked={filingStatus === 'single'} onChange={e => setFilingStatus(e.target.value)} /> Single 
                </label>
                <label >
                    <input type="radio" name="filing" value="head_of_household" checked={filingStatus === 'head_of_household'} onChange={e => setFilingStatus(e.target.value)} /> Head of Household 
                </label>    
                <label >
                    <input type="radio" name="filing" value="married" checked={filingStatus === 'married'} onChange={e => setFilingStatus(e.target.value)} /> Married  
                </label>
            </div>

            <label>Household Size</label>
            <input type="number" min="1" max="6" value={householdSize} onChange={e => setHouseholdSize(+e.target.value)} />
            {errors.householdSize && <span style={{ color: 'red', fontSize: '12px' }}>{errors.householdSize}</span>}

            <label>Bedrooms</label>
            <select value={bedrooms} onChange={e => setBedrooms(+e.target.value)}>
                <option value={0}>Studio</option>
                <option value={1}>1 Bedroom</option>
                <option value={2}>2 Bedrooms</option>
                <option value={3}>3 Bedrooms</option>
                <option value={4}>4 Bedrooms</option>
            </select>
            
            <label>Monthly Miles Driven</label>
            <input type="number" min="1" max="100000" value={monthlyMiles} onChange={e => setMonthlyMiles(+e.target.value)} />
            {errors.monthlyMiles && <span style={{ color: 'red', fontSize: '12px' }}>{errors.monthlyMiles}</span>}

            <label>Vehicle MPG</label>
            <input type="number" min="1" max="150" value={mpg} onChange={e => setMpg(+e.target.value)} />
            {errors.mpg && <span style={{ color: 'red', fontSize: '12px' }}>{errors.mpg}</span>}
            <div style ={{textAlign: 'center', marginTop: '20px'}}>
            <button onClick={handleSubmit}>Calculate</button>
            </div>
        </div>
    )
}

export default Calculator