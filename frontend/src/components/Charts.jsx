import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

function Charts({ data }) {
  const gasRef = useRef(null);
  const groceryRef = useRef(null);
  const utilityRef = useRef(null);

    useEffect(() => {
    if (!data || !gasRef.current) return;

    const gasData = data.gas_prices
        .filter(d => d.area_name === 'CALIFORNIA')
        .map(d => ({ date: new Date(d.period), value: +d.value }))
        .sort((a, b) => a.date - b.date);

    const width = 600, height = 300;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    const svg = d3.select(gasRef.current)
        .attr('width', width)
        .attr('height', height);

    const x = d3.scaleTime()
        .domain(d3.extent(gasData, d => d.date))
        .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(gasData, d => d.value)])
        .range([height - margin.bottom, margin.top]);

    svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x));

    svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

    svg.append('path')
        .datum(gasData)
        .attr('fill', 'none')
        .attr('stroke', '#e74c3c')
        .attr('stroke-width', 1.5)
        .attr('d', d3.line()
            .x(d => x(d.date))
            .y(d => y(d.value))
        );
}, [data]);

useEffect(() => {
    if (!data || !groceryRef.current) return;

    const series = [
        { id: 'CUUSS49BSAF11', label: 'SF Metro', color: '#e74c3c' },
        { id: 'CUUR0400SAF11', label: 'West Region', color: '#f39c12' },
        { id: 'CUUR0000SAF11', label: 'National', color: '#3498db' }
    ];

    const width = 600, height = 300;
    const margin = { top: 20, right: 80, bottom: 30, left: 50 };

    const svg = d3.select(groceryRef.current)
        .attr('width', width)
        .attr('height', height);

    const allDates = data.grocery_cpi.map(d => {
        const month = d.period.startsWith('S') ? (d.period === 'S01' ? '06' : '12') : d.period.replace('M', '');
        return new Date(`${d.year}-${month}-01`);
    });

    const x = d3.scaleTime()
        .domain(d3.extent(allDates))
        .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
        .domain([200, d3.max(data.grocery_cpi, d => +d.value)])
        .range([height - margin.bottom, margin.top]);

    svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x));

    svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

    series.forEach(s => {
        const seriesData = data.grocery_cpi
            .filter(d => d.series_id === s.id)
            .map(d => {
                const month = d.period.startsWith('S') ? (d.period === 'S01' ? '06' : '12') : d.period.replace('M', '');
                return { date: new Date(`${d.year}-${month}-01`), value: +d.value };
            })
            .sort((a, b) => a.date - b.date);

        svg.append('path')
            .datum(seriesData)
            .attr('fill', 'none')
            .attr('stroke', s.color)
            .attr('stroke-width', 1.5)
            .attr('d', d3.line()
                .x(d => x(d.date))
                .y(d => y(d.value))
            );
        svg.append('text')
            .attr('x', width - margin.right + 5)
            .attr('y', y(seriesData[seriesData.length - 1].value))
            .attr('dy', '0.35em')
            .attr('fill', s.color)
            .style('font-size', '11px')
            .text(s.label);    
    });
}, [data]);
    useEffect(() => {
    if (!data || !utilityRef.current) return;

    const series = [
        { filter: d => d.type === 'electricity' && d.statedescription === 'California', label: 'CA Electricity', color: '#e74c3c' },
        { filter: d => d.type === 'electricity' && d.statedescription === 'U.S.', label: 'US Electricity', color: '#3498db' },
        { filter: d => d.type === 'natural_gas' && d.statedescription === 'California', label: 'CA Gas', color: '#f39c12' },
        { filter: d => d.type === 'natural_gas' && d.statedescription === 'U.S.', label: 'US Gas', color: '#2ecc71' }
    ];

    const width = 600, height = 300;
    const margin = { top: 20, right: 100, bottom: 30, left: 50 };

    const svg = d3.select(utilityRef.current)
        .attr('width', width)
        .attr('height', height);

    const x = d3.scaleTime()
        .domain(d3.extent(data.utility_data, d => new Date(d.period)))
        .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data.utility_data, d => +d.price)])
        .range([height - margin.bottom, margin.top]);

    svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x));

    svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

    series.forEach(s => {
        const seriesData = data.utility_data
            .filter(s.filter)
            .map(d => ({ date: new Date(d.period), value: +d.price }))
            .sort((a, b) => a.date - b.date);

        svg.append('path')
            .datum(seriesData)
            .attr('fill', 'none')
            .attr('stroke', s.color)
            .attr('stroke-width', 1.5)
            .attr('d', d3.line()
                .x(d => x(d.date))
                .y(d => y(d.value))
            );

        svg.append('text')
            .attr('x', width - margin.right + 5)
            .attr('y', y(seriesData[seriesData.length - 1].value))
            .attr('dy', '0.35em')
            .attr('fill', s.color)
            .style('font-size', '11px')
            .text(s.label);
    });
}, [data]);


  return (
    <div className="charts">
      <h2>Trends Over Time</h2>
      <h3>Gas Prices</h3>
      <svg ref={gasRef}></svg>
      <h3>Grocery CPI</h3>
      <svg ref={groceryRef}></svg>
      <h3>Utility Costs</h3>
      <svg ref={utilityRef}></svg>
    </div>
  )
}

export default Charts