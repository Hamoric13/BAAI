
const bedroomGuide = {
    0: "efficiency",
    1: "one_bedroom",
    2: "two_bedroom",
    3: "three_bedroom",
    4: "four_bedroom"
};

const groceryBaseline2024 = {
    1: 270,
    2: 480,
    3: 610,
    4: 730,
    5: 840,
    6: 920
};


const utilityBaseline2024 = {
    "electricity": 503,
    "natural_gas": 24
};

export async function loadData() {
    const response = await fetch('raw_data.json');
    const data = await response.json();
    return data
}

export function affordabilityScore(data, countyName, annualIncome, filingStatus, householdSize, bedrooms, monthlyMiles = 1250, mpg = 28) {

    const taxRates = data.tax_rates;
    const fixedTaxes = data.fixed_taxes;
    const countyData = data.county_rent;
    const combinedData = data.gas_prices;
    const groceryData = data.grocery_cpi;
    const utilityData = data.utility_data;

    let totalCombinedMonthlyCost = 0.0;

    // tax calculation
    let effectiveTax = 0.0
    if ( filingStatus in taxRates ) {
        for ( const x of taxRates[filingStatus] ) {
            if ( annualIncome <= x["max_income"]) {
                effectiveTax = annualIncome * x["effective_rate"];
                break;
            }
        }
    }

    const socialSecurityAnnualCost = Math.min(annualIncome, fixedTaxes["social_security_wage_cap"]) * fixedTaxes["social_security_rate"];
    const medicareAnnualCost = ( annualIncome <= fixedTaxes["additional_medicare_threshold"][filingStatus] ) ? ( annualIncome * fixedTaxes["medicare_rate"] ) : ( ( annualIncome * fixedTaxes["medicare_rate"] ) + ( (annualIncome - fixedTaxes["additional_medicare_threshold"][filingStatus]) * fixedTaxes["additional_medicare_rate"] ) );
    const sdiAnnualCost = annualIncome * fixedTaxes["ca_sdi_rate"];
    const annualTax = effectiveTax + socialSecurityAnnualCost + medicareAnnualCost + sdiAnnualCost;
    const monthlyTax = annualTax / 12;
    totalCombinedMonthlyCost += monthlyTax;



    //monthly rent calculation
    let monthlyRent = 0.0;
    for ( const x of countyData ) {
        if (x["county_name"]== countyName) {
            monthlyRent = x[bedroomGuide[bedrooms]];
        }
    }
    totalCombinedMonthlyCost += monthlyRent;


    //gas cost calculator
    let gasPrice = 0.0;
    for (const x of combinedData) {
        if (x["area_name"] == "CALIFORNIA"){
            gasPrice = +x["value"];
            break;
        }
    }

    const monthlyGasCost = ( gasPrice * monthlyMiles ) / mpg;
    totalCombinedMonthlyCost += monthlyGasCost;

    //grocery cost calculation
    const sfGroupedCounties = ["Alameda County, CA", "Contra Costa County, CA", "Marin County, CA", "San Francisco County, CA", "San Mateo County, CA"];
    let cpiValue = 0.0;

    if ( sfGroupedCounties.includes(countyName) ) {
        for (const x of groceryData){
            if (x["series_id"] == "CUUSS49BSAF11"){
                cpiValue = +x["value"];
                break;
            }
        }
    } else {
        for (const x of groceryData){
            if (x["series_id"] == "CUUR0400SAF11"){
                cpiValue = +x["value"];
                break;
            }
        }
    }

    let national2024Values = [];
    for (const x of groceryData ){
        if (x["series_id"] == "CUUR0000SAF11" && x["year"] == "2024") {
            national2024Values.push(+x["value"]);
        }
    }

   const nationalCpi2024 = national2024Values.reduce((acc, val) => acc + val, 0) / national2024Values.length;
   const cpiRatio = cpiValue / nationalCpi2024;

   const monthlyGroceryCost = groceryBaseline2024[householdSize] * cpiRatio;
   totalCombinedMonthlyCost += monthlyGroceryCost;


   //utility cost calculation
   let electrictyPrice = 0.0;
   let natuaralGasPrice = 0.0;

   for (const x of utilityData){
    if (x["type"] == "electricity" && x["statedescription"] == "California"){
        electrictyPrice = +x["price"];
        break;
    }
   }

   for (const x of utilityData){
    if (x["type"] == "natural_gas" && x["statedescription"] == "California"){
        natuaralGasPrice = +x["price"];
        break;
    }
   }
   const utilityCost = ( (electrictyPrice/100) * utilityBaseline2024["electricity"]) + ((natuaralGasPrice/10) *utilityBaseline2024["natural_gas"]);
   totalCombinedMonthlyCost += utilityCost;
   let monthlyHealthcare = 0;
    if (filingStatus === 'single' && householdSize === 1) {
        monthlyHealthcare = 150;
    } else if (filingStatus === 'married' && householdSize === 2) {
        monthlyHealthcare = 400;
    } else {
        monthlyHealthcare = 550;
    }
   totalCombinedMonthlyCost += monthlyHealthcare;

   const affordabilityScoreRatio = totalCombinedMonthlyCost / (annualIncome/12);
   return {
        ratio: affordabilityScoreRatio,
        breakdown: {
            tax: Math.round(monthlyTax),
            rent: Math.round(monthlyRent),
            gas: Math.round(monthlyGasCost),
            groceries: Math.round(monthlyGroceryCost),
            utilities: Math.round(utilityCost),
            healthcare: Math.round(monthlyHealthcare),
            total: Math.round(totalCombinedMonthlyCost)
        }

   };

}

export function bayAreaCountiesComparision(data, annualIncome, filingStatus, householdSize, bedrooms, monthlyMiles=1250, mpg=28){

    let allCountyAffordabilityData = [];
    const countyColorMap = {
        'Alameda County, CA': '#e63946',
        'Contra Costa County, CA': '#2a9d8f',
        'Marin County, CA': '#e9c46a',
        'Napa County, CA': '#f4a261',
        'San Francisco County, CA': '#264653',
        'San Mateo County, CA': '#6a4c93',
        'Santa Clara County, CA': '#1982c4',
        'Solano County, CA': '#8ac926',
        'Sonoma County, CA': '#fb5607'
    };

    for (const x of data.county_rent){
        const result = affordabilityScore(data, x["county_name"], annualIncome, filingStatus, householdSize, bedrooms, monthlyMiles, mpg);
        const county = {
            "county_name": x["county_name"],
            "ratio": result.ratio,
            "breakdown": result.breakdown,
            "color": countyColorMap[x["county_name"]]
        };
        allCountyAffordabilityData.push(county);
    }
    const ratios = allCountyAffordabilityData.map(x => x["ratio"]);
    const minRatio = Math.min(...ratios);
    const maxRatio = Math.max(...ratios);

    for (const x of allCountyAffordabilityData){
        x["normalized_score"] = ( (x["ratio"] - minRatio) / (maxRatio - minRatio)).toFixed(3);
    }
    allCountyAffordabilityData.sort((a, b) => a.ratio - b.ratio);
    return allCountyAffordabilityData;

}