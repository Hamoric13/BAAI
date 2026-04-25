import requests
import pandas as pd
import json
import os
from datetime import datetime
from dotenv import load_dotenv
load_dotenv()


HUD_token = os.getenv("HUD_token")
EIA_key = os.getenv("EIA_key")
BLS_key = os.getenv("BLS_key")

with open("/Users/suriharamrit/BAAI/raw_data.json", "r") as f:
    raw = json.load(f)

county_data = raw["county_rent"]
combined_data = raw["gas_prices"]
grocery_data = raw["grocery_cpi"]
combined_utility_data = raw["utility_data"]





# url = "https://www.huduser.gov/hudapi/public/fmr/listCounties/CA"
# headers = {"Authorization" : "Bearer " + HUD_token}
# response = requests.get(url, headers=headers)

# data = response.json()
# bay_area_only_data = []
# bay_area = ["Alameda County", "Contra Costa County", "Marin County", "Napa County", "San Francisco County", "San Mateo County", "Santa Clara County", "Solano County", "Sonoma County"]

# for x in data :
#     if x["county_name"] in bay_area :
#         bay_area_only_data.append(x)

# new_data = []

# for x in bay_area_only_data :
#     new_url = f"https://www.huduser.gov/hudapi/public/fmr/data/{x['fips_code']}"
#     new_data.append(requests.get(new_url, headers=headers).json())


# # county_data: list of 9 dicts, one per Bay Area county
# # keys: county_name, efficiency, one_bedroom, two_bedroom, three_bedroom, four_bedroom
# # source: HUD Fair Market Rents 2026

# county_data =[]
# for x in new_data :
#     if isinstance(x["data"]["basicdata"], dict) :
#         county_data.append({
#             "county_name": x["data"]["county_name"],
#             "efficiency": x["data"]["basicdata"]["Efficiency"],
#             "one_bedroom": x["data"]["basicdata"]["One-Bedroom"],
#             "two_bedroom": x["data"]["basicdata"]["Two-Bedroom"],
#             "three_bedroom": x["data"]["basicdata"]["Three-Bedroom"],
#             "four_bedroom": x["data"]["basicdata"]["Four-Bedroom"]
#         })
#     else :
#         county_data.append({
#             "county_name": x["data"]["county_name"],
#             "efficiency": x["data"]["basicdata"][0]["Efficiency"],
#             "one_bedroom": x["data"]["basicdata"][0]["One-Bedroom"],
#             "two_bedroom": x["data"]["basicdata"][0]["Two-Bedroom"],
#             "three_bedroom": x["data"]["basicdata"][0]["Three-Bedroom"],
#             "four_bedroom": x["data"]["basicdata"][0]["Four-Bedroom"]
#         }
#         )




# # combined_data: california, SF, and national gas price data for 52 weeks
# # keys: period, area_name, value
# # source: EIA Weekly Retail Gasoline and Diesel Prices

# cali_gas_url = f"https://api.eia.gov/v2/petroleum/pri/gnd/data/?api_key={EIA_key}&frequency=weekly&data[0]=value&facets[series][]=EMM_EPM0_PTE_SCA_DPG&sort[0][column]=period&sort[0][direction]=desc&length=52"
# cali_gas_data = requests.get(cali_gas_url).json()

# #print(cali_gas_data)

# sf_gas_url = f"https://api.eia.gov/v2/petroleum/pri/gnd/data/?api_key={EIA_key}&frequency=weekly&data[0]=value&facets[series][]=EMM_EPMRR_PTE_Y05SF_DPG&sort[0][column]=period&sort[0][direction]=desc&length=52"
# sf_gas_data = requests.get(sf_gas_url).json()


# nat_gas_url = f"https://api.eia.gov/v2/petroleum/pri/gnd/data/?api_key={EIA_key}&frequency=weekly&data[0]=value&facets[series][]=EMM_EPM0_PTE_NUS_DPG&sort[0][column]=period&sort[0][direction]=desc&length=52"
# nat_gas_data = requests.get(nat_gas_url).json()

# combined_data = []

# for x in cali_gas_data["response"]["data"] :
#     combined_data.append({
#         "period": x["period"],
#         "area_name": x['area-name'],
#         "value": x["value"]
#     })

# for x in sf_gas_data["response"]["data"] :
#     combined_data.append({
#         "period": x["period"],
#         "area_name": x['area-name'],
#         "value": x["value"]
#     })

# for x in nat_gas_data["response"]["data"] :
#     combined_data.append({
#         "period": x["period"],
#         "area_name": x['area-name'],
#         "value": x["value"]
#     })

# #print(combined_data)

# bls_url = "https://api.bls.gov/publicAPI/v2/timeseries/data/"
# bls_payload = {
#     "seriesid": ["CUUSS49BSAF11", "CUUR0000SAF11", "CUUR0400SAF11"],
#     "startyear": "2019",
#     "endyear": "2026",
#     "registrationkey": BLS_key
# }
# print(bls_payload)
# bls_response = requests.post(bls_url, json=bls_payload).json()
# #print(bls_response)

# #saving raw data locally for now so script doesnt hit api and refresh it every time
# grocery_data = []

# for x in bls_response["Results"]["series"] :

#     for y in x["data"] :

#         if y["value"] == "-" :
#             continue

#         else :
#             grocery_data.append({
#                 "series_id": x["seriesID"],
#                 "year": y["year"],
#                 "period": y["period"],
#                 "value": y["value"]
#             }
#             )

#print(grocery_data)



# cali_electric_url = f"https://api.eia.gov/v2/electricity/retail-sales/data/?api_key={EIA_key}&frequency=monthly&data[0]=price&facets[stateid][]=CA&facets[sectorid][]=RES&sort[0][column]=period&sort[0][direction]=desc&length=84"
# cali_electric_data = requests.get(cali_electric_url).json()

# nat_electric_url = f"https://api.eia.gov/v2/electricity/retail-sales/data/?api_key={EIA_key}&frequency=monthly&data[0]=price&facets[stateid][]=US&facets[sectorid][]=RES&sort[0][column]=period&sort[0][direction]=desc&length=84"
# nat_electric_data = requests.get(nat_electric_url).json()

# combined_utility_data = [] 

# for x in cali_electric_data["response"]["data"] :
#     combined_utility_data.append(
#         {
#             "period": x["period"],
#             "statedescription": "California",
#             "price": x["price"],
#             "type": "electricity"
#         }
#     )

# for x in nat_electric_data["response"]["data"] :
#     combined_utility_data.append(
#         {
#             "period": x["period"],
#             "statedescription": "U.S.",
#             "price": x["price"],
#             "type": "electricity"
#         }
#     )

# cali_natgas_url = f"https://api.eia.gov/v2/natural-gas/pri/sum/data/?api_key={EIA_key}&frequency=monthly&data[0]=value&facets[duoarea][]=SCA&facets[process][]=PRS&sort[0][column]=period&sort[0][direction]=desc&length=84"
# cali_natgas_data = requests.get(cali_natgas_url).json()

# nat_natgas_url = f"https://api.eia.gov/v2/natural-gas/pri/sum/data/?api_key={EIA_key}&frequency=monthly&data%5B0%5D=value&facets%5Bduoarea%5D%5B%5D=NUS&facets%5Bprocess%5D%5B%5D=PRS&sort%5B0%5D%5Bcolumn%5D=period&sort%5B0%5D%5Bdirection%5D=desc&length=84"
# nat_natgas_data = requests.get(nat_natgas_url).json()




# for x in cali_natgas_data["response"]["data"] :
#     combined_utility_data.append(
#         {
#             "period": x["period"],
#             "statedescription": "California",
#             "price": x["value"],
#             "type": "natural_gas"
#         }
#     )

# for x in nat_natgas_data["response"]["data"] :
#     combined_utility_data.append(
#         {
#             "period": x["period"],
#             "statedescription": "U.S.",
#             "price": x["value"],
#             "type": "natural_gas"
#         }
#     )


# tax_rates: combined federal + CA state effective rates by filing status and income bracket
# fixed_taxes: flat rate taxes applied regardless of bracket
# source: IRS and CA FTB 2026 tax tables (approximate effective rates)
# disclaimer: assumes standard deduction and W-2 income only

tax_rates = {
    "single": [
        {"max_income": 30000, "effective_rate": 0.08},
        {"max_income": 50000, "effective_rate": 0.13},
        {"max_income": 75000, "effective_rate": 0.17},
        {"max_income": 100000, "effective_rate": 0.22},
        {"max_income": 150000, "effective_rate": 0.27},
        {"max_income": 200000, "effective_rate": 0.31},
        {"max_income": float("inf"), "effective_rate": 0.36}
    ],
    "head_of_household": [
        {"max_income": 40000, "effective_rate": 0.07},
        {"max_income": 65000, "effective_rate": 0.12},
        {"max_income": 100000, "effective_rate": 0.17},
        {"max_income": 150000, "effective_rate": 0.22},
        {"max_income": 200000, "effective_rate": 0.27},
        {"max_income": 300000, "effective_rate": 0.31},
        {"max_income": float("inf"), "effective_rate": 0.35}
    ],
    "married": [
        {"max_income": 60000, "effective_rate": 0.07},
        {"max_income": 100000, "effective_rate": 0.12},
        {"max_income": 150000, "effective_rate": 0.17},
        {"max_income": 200000, "effective_rate": 0.22},
        {"max_income": 300000, "effective_rate": 0.27},
        {"max_income": 400000, "effective_rate": 0.31},
        {"max_income": float("inf"), "effective_rate": 0.34},
    ]
}

fixed_taxes = {
    "social_security_rate": 0.062,
    "social_security_wage_cap": 176100,
    "medicare_rate": 0.0145,
    "ca_sdi_rate": 0.011,
    "additional_medicare_rate": 0.009,
    "additional_medicare_threshold": {
        "single": 200000,
        "head_of_household": 275000,
        "married": 250000
    }
}

bedroom_guide = {
    0: "efficiency",
    1: "one_bedroom",
    2: "two_bedroom",
    3: "three_bedroom",
    4: "four_bedroom"
}

grocery_baseline_2024 = {
    1: 270,
    2: 480,
    3: 610,
    4: 730,
    5: 840,
    6: 920
}

utility_baseline_2024 = {
    "electricity": 503,
    "natural_gas": 24
}



def affordability_score(county_name, annual_income, filing_status, household_size, bedrooms, monthly_miles=1250, mpg=28) :
   
    total_combined_cost = 0.0

    #tax caclulation block
    effective_tax = 0.0
    if filing_status in tax_rates :
        for x in tax_rates[filing_status] :
            if annual_income <= x["max_income"] :
                effective_tax = annual_income * x["effective_rate"]
                break

    social_security_annual_cost = min(annual_income, fixed_taxes["social_security_wage_cap"])  * fixed_taxes["social_security_rate"] 
    medicare_annual_cost = annual_income * fixed_taxes["medicare_rate"] if annual_income <= fixed_taxes["additional_medicare_threshold"][filing_status] else ( ( annual_income * fixed_taxes["medicare_rate"] ) + ( (annual_income - fixed_taxes["additional_medicare_threshold"][filing_status]) * fixed_taxes["additional_medicare_rate"] ) )
    sdi_annual_cost = annual_income * fixed_taxes["ca_sdi_rate"]
    annual_tax = effective_tax + social_security_annual_cost + medicare_annual_cost + sdi_annual_cost
    monthly_tax = annual_tax / 12
    total_combined_cost += monthly_tax
    

    # monthly rent calculation
    monthly_rent = 0.0
    for x in county_data :
        if x["county_name"] == county_name :
            monthly_rent = x[bedroom_guide[bedrooms]]
    
    total_combined_cost += monthly_rent


    #gas cost calculation
    gas_price = 0.0
    for x in combined_data :
        if x["area_name"] == "CALIFORNIA" :
            gas_price = float(x["value"])
            break
    
    monthly_gas_cost = gas_price * monthly_miles / mpg
    total_combined_cost += monthly_gas_cost

    #grocery cost calculation
    sf_bls_grouped_counties = ["Alameda County, CA", "Contra Costa County, CA", "Marin County, CA", "San Francisco County, CA", "San Mateo County, CA"]
    cpi_value = 0.0
    if county_name in sf_bls_grouped_counties :
        for x in grocery_data :
            if x["series_id"] == "CUUSS49BSAF11" :
                cpi_value = float(x["value"])
                break
    else :
        for x in grocery_data :
            if x["series_id"] == "CUUR0400SAF11" :
                cpi_value = float(x["value"])
                break
    
    national_2024_values = [float(x["value"]) for x in grocery_data if x["series_id"] == "CUUR0000SAF11" and x["year"] == "2024"]
    national_2024_cpi = sum(national_2024_values) / len(national_2024_values)
    cpi_ratio = cpi_value / national_2024_cpi

    monthly_grocery_cost = grocery_baseline_2024[household_size] * cpi_ratio
    total_combined_cost += monthly_grocery_cost


    #utility cost calculation
    electricty_price = 0.0
    natural_gas_price = 0.0
    for x in combined_utility_data :
        if x["type"] == "electricity" and x["statedescription"] == "California" :
            electricty_price = float(x["price"])
            break
    

    for x in combined_utility_data :
        if x["type"] == "natural_gas" and x["statedescription"] == "California" :
            natural_gas_price = float(x["price"])
            break
    
    utility_cost = ( ( electricty_price / 100 ) * utility_baseline_2024["electricity"] ) + ( ( natural_gas_price / 10 ) * utility_baseline_2024["natural_gas"] )
    total_combined_cost += utility_cost
    

    #affordability score calculator
    affordability_score_ratio = total_combined_cost / (annual_income / 12)
    return affordability_score_ratio
    
def bay_counties_comparision(annual_income, filing_status, household_size, bedrooms, monthly_miles=1250, mpg=28) :
    
    all_county_affordability_data = []
    for x in county_data:
        ratio = { 
            "county_name": x["county_name"],
            "ratio": affordability_score(x["county_name"], annual_income, filing_status, household_size, bedrooms, monthly_miles, mpg)
        }
        all_county_affordability_data.append(ratio)


    min_ratio = min(all_county_affordability_data, key = lambda x: x["ratio"])["ratio"]
    max_ratio = max(all_county_affordability_data, key = lambda x: x["ratio"])["ratio"]

    
    for x in all_county_affordability_data :
        x["normalized_score"] = round(( x["ratio"] - min_ratio ) / ( max_ratio - min_ratio ), 3)
    

    return all_county_affordability_data

output = {
    "county_rent": county_data,
    "gas_prices": combined_data,
    "grocery_cpi": grocery_data,
    "utility_data": combined_utility_data,
    "tax_rates": tax_rates,
    "fixed_taxes": fixed_taxes,
    "last_updated": datetime.now().strftime("%Y-%m-%d")
}

with open("/Users/suriharamrit/BAAI/raw_data.json", "w") as f:
    json.dump(output, f)

print("Data saved!")