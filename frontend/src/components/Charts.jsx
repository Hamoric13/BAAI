import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

function Charts({ data }) {
  const gasRef = useRef(null);
  const groceryRef = useRef(null);
  const utilityRef = useRef(null);

  useEffect(() => {
    if (!data || !gasRef.current) return;

    const width = gasRef.current.parentElement.offsetWidth || 600;

    const caData = data.gas_prices
        .filter(d => d.area_name === 'CALIFORNIA')
        .map(d => ({ date: new Date(d.period), value: +d.value }))
        .sort((a, b) => a.date - b.date);

    const natData = data.gas_prices
        .filter(d => d.area_name === 'U.S.')
        .map(d => ({ date: new Date(d.period), value: +d.value }))
        .sort((a, b) => a.date - b.date);
        


    const height = 300;
    const margin = { top: 20, right: 80, bottom: 40, left: 50 };

    d3.select(gasRef.current).selectAll('*').remove();

    const svg = d3.select(gasRef.current)
        .attr('width', width)
        .attr('height', height);

    const x = d3.scaleTime()
        .domain(d3.extent(caData, d => d.date))
        .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
        .domain([3, d3.max(caData, d => d.value) + 0.5])
        .range([height - margin.bottom, margin.top]);

    svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(d3.timeMonth.every(2)).tickFormat(d3.timeFormat('%b %Y')))
        .selectAll('text')
        .attr('transform', 'rotate(-35)')
        .style('text-anchor', 'end');

    svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).tickFormat(d => `$${d}`));

    // CA line
    svg.append('path')
        .datum(caData)
        .attr('fill', 'none')
        .attr('stroke', '#e74c3c')
        .attr('stroke-width', 2)
        .attr('d', d3.line().x(d => x(d.date)).y(d => y(d.value)));

    svg.append('text')
        .attr('x', width - margin.right + 5)
        .attr('y', y(caData[caData.length - 1].value))
        .attr('dy', '0.35em')
        .attr('fill', '#e74c3c')
        .style('font-size', '11px')
        .text('California');

    // National line
    svg.append('path')
        .datum(natData)
        .attr('fill', 'none')
        .attr('stroke', '#3498db')
        .attr('stroke-width', 2)
        .attr('d', d3.line().x(d => x(d.date)).y(d => y(d.value)));

    svg.append('text')
        .attr('x', width - margin.right + 5)
        .attr('y', y(natData[natData.length - 1].value))
        .attr('dy', '0.35em')
        .attr('fill', '#3498db')
        .style('font-size', '11px')
        .text('National');

    const caCircle = svg.append('circle')
        .attr('r', 5)
        .attr('fill', '#e74c3c')
        .style('opacity', 0);
    
    const natCircle = svg.append('circle')
        .attr('r', 5)
        .attr('fill', '#3498db')
        .style('opacity', 0);

    // Tooltip
    const tooltip = d3.select('body').append('div')
        .style('position', 'absolute')
        .style('background', '#333')
        .style('color', 'white')
        .style('padding', '6px 10px')
        .style('border-radius', '4px')
        .style('font-size', '12px')
        .style('pointer-events', 'none')
        .style('opacity', 0);

    const bisect = d3.bisector(d => d.date).left;

    svg.append('rect')
        .attr('width', width - margin.left - margin.right)
        .attr('height', height - margin.top - margin.bottom)
        .attr('x', margin.left)
        .attr('y', margin.top)
        .attr('fill', 'none')
        .attr('pointer-events', 'all')
        .on('mousemove', function(event) {
            const [mx] = d3.pointer(event);
            const date = x.invert(mx);
            const i = bisect(caData, date);
            const dCa = caData[Math.min(i, caData.length - 1)];
            const j = bisect(natData, date);
            const dNat = natData[Math.min(j, natData.length - 1)];
    
    caCircle
        .style('opacity', 1)
        .attr('cx', x(dCa.date))
        .attr('cy', y(dCa.value));
    
    natCircle
        .style('opacity', 1)
        .attr('cx', x(dNat.date))
        .attr('cy', y(dNat.value));

    tooltip
        .style('opacity', 1)
        .html(`${d3.timeFormat('%b %d, %Y')(dCa.date)}<br/>CA: $${dCa.value.toFixed(2)}/gal<br/>National: $${dNat.value.toFixed(2)}/gal`)
        .style('left', `${event.pageX + 10}px`)
        .style('top', `${event.pageY - 20}px`);
    })
        .on('mouseleave', () => {
            tooltip.style('opacity', 0);
            caCircle.style('opacity', 0);
            natCircle.style('opacity', 0);
    });
    return () => {
        tooltip.remove();
    };

}, [data]);
useEffect(() => {
    if (!data || !groceryRef.current) return;

    const width = gasRef.current.parentElement.offsetWidth || 600;


    

    d3.select(groceryRef.current).selectAll('*').remove();

    const series = [
        { id: 'CUUSS49BSAF11', label: 'SF Metro', color: '#e74c3c' },
        { id: 'CUUR0400SAF11', label: 'West Region', color: '#f39c12' },
        { id: 'CUUR0000SAF11', label: 'National', color: '#3498db' }
    ];

    const height = 300;
    const margin = { top: 20, right: 100, bottom: 40, left: 50 };

    const svg = d3.select(groceryRef.current)
        .attr('width', width)
        .attr('height', height);

    const parseData = (id) => data.grocery_cpi
        .filter(d => d.series_id === id)
        .map(d => {
            const month = d.period.startsWith('S') ? (d.period === 'S01' ? '06' : '12') : d.period.replace('M', '');
            return { date: new Date(`${d.year}-${month}-01`), value: +d.value };
        })
        .sort((a, b) => a.date - b.date);

    const allData = series.flatMap(s => parseData(s.id));

    const x = d3.scaleTime()
        .domain(d3.extent(allData, d => d.date))
        .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
        .domain([200, d3.max(allData, d => d.value) + 10])
        .range([height - margin.bottom, margin.top]);

    svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(d3.timeYear.every(1)).tickFormat(d3.timeFormat('%Y')))
        .selectAll('text')
        .style('text-anchor', 'middle');

    svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));
    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -height/2)
        .attr('y', 12)
        .attr('text-anchor', 'middle')
        .style('font-size', '11px')
        .style('fill', '#666')
        .text('CPI Index (1982-84 = 100)');

    const seriesDataMap = {};
    series.forEach(s => {
        const sd = parseData(s.id);
        seriesDataMap[s.id] = sd;

        svg.append('path')
            .datum(sd)
            .attr('fill', 'none')
            .attr('stroke', s.color)
            .attr('stroke-width', 2)
            .attr('d', d3.line().x(d => x(d.date)).y(d => y(d.value)));

        svg.append('text')
            .attr('x', width - margin.right + 5)
            .attr('y', y(sd[sd.length - 1].value))
            .attr('dy', '0.35em')
            .attr('fill', s.color)
            .style('font-size', '11px')
            .text(s.label);
    });

    const circles = {};
    series.forEach(s => {
        circles[s.id] = svg.append('circle')
            .attr('r', 5)
            .attr('fill', s.color)
            .style('opacity', 0);
    });

    const tooltip = d3.select('body').append('div')
        .style('position', 'absolute')
        .style('background', '#333')
        .style('color', 'white')
        .style('padding', '6px 10px')
        .style('border-radius', '4px')
        .style('font-size', '12px')
        .style('pointer-events', 'none')
        .style('opacity', 0);

    const bisect = d3.bisector(d => d.date).left;

    svg.append('rect')
        .attr('width', width - margin.left - margin.right)
        .attr('height', height - margin.top - margin.bottom)
        .attr('x', margin.left)
        .attr('y', margin.top)
        .attr('fill', 'none')
        .attr('pointer-events', 'all')
        .on('mousemove', function(event) {
            const [mx] = d3.pointer(event);
            const date = x.invert(mx);

            let html = `${d3.timeFormat('%b %Y')(date)}<br/>`;
            series.forEach(s => {
                const sd = seriesDataMap[s.id];
                const i = bisect(sd, date);
                const d = sd[Math.min(i, sd.length - 1)];
                circles[s.id].style('opacity', 1).attr('cx', x(d.date)).attr('cy', y(d.value));
                html += `<span style="color:${s.color}">${s.label}: ${d.value.toFixed(1)} CPI</span><br/>`;            });

            tooltip.style('opacity', 1).html(html)
                .style('left', `${event.pageX + 10}px`)
                .style('top', `${event.pageY - 20}px`);
        })
        .on('mouseleave', () => {
            tooltip.style('opacity', 0);
            series.forEach(s => circles[s.id].style('opacity', 0));
        });
        return () => {
            tooltip.remove();
        };

}, [data]);
useEffect(() => {
    if (!data || !utilityRef.current) return;

    const width = gasRef.current.parentElement.offsetWidth || 600;


    d3.select(utilityRef.current).selectAll('*').remove();

    const series = [
        { filter: d => d.type === 'electricity' && d.statedescription === 'California', label: 'CA Electricity', color: '#e74c3c' },
        { filter: d => d.type === 'electricity' && d.statedescription === 'U.S.', label: 'US Electricity', color: '#3498db' },
        { filter: d => d.type === 'natural_gas' && d.statedescription === 'California', label: 'CA Gas', color: '#f39c12' },
        { filter: d => d.type === 'natural_gas' && d.statedescription === 'U.S.', label: 'US Gas', color: '#2ecc71' }
    ];

    const height = 300;
    const margin = { top: 20, right: 110, bottom: 40, left: 50 };

    const svg = d3.select(utilityRef.current)
        .attr('width', width)
        .attr('height', height);

    const parseData = (filterFn) => data.utility_data
        .filter(filterFn)
        .map(d => ({ date: new Date(d.period), value: +d.price }))
        .sort((a, b) => a.date - b.date);

    const allParsed = series.map(s => parseData(s.filter));

    const x = d3.scaleTime()
        .domain(d3.extent(allParsed.flat(), d => d.date))
        .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(allParsed.flat(), d => d.value) + 2])
        .range([height - margin.bottom, margin.top]);

    svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(d3.timeYear.every(1)).tickFormat(d3.timeFormat('%Y')))
        .selectAll('text')
        .style('text-anchor', 'middle');

    svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));
    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -height/2)
        .attr('y', 12)
        .attr('text-anchor', 'middle')
        .style('font-size', '11px')
        .style('fill', '#666')
        .text('Price (¢/kWh for electricity, $/MCF for gas)');

    const seriesDataList = [];
    series.forEach((s, i) => {
        const sd = allParsed[i];
        seriesDataList.push({ ...s, data: sd });

        svg.append('path')
            .datum(sd)
            .attr('fill', 'none')
            .attr('stroke', s.color)
            .attr('stroke-width', 2)
            .attr('d', d3.line().x(d => x(d.date)).y(d => y(d.value)));

        svg.append('text')
            .attr('x', width - margin.right + 5)
            .attr('y', y(sd[sd.length - 1].value))
            .attr('dy', '0.35em')
            .attr('fill', s.color)
            .style('font-size', '11px')
            .text(s.label);
    });

    const circles = seriesDataList.map(s =>
        svg.append('circle')
            .attr('r', 5)
            .attr('fill', s.color)
            .style('opacity', 0)
    );

    const tooltip = d3.select('body').append('div')
        .style('position', 'absolute')
        .style('background', '#333')
        .style('color', 'white')
        .style('padding', '6px 10px')
        .style('border-radius', '4px')
        .style('font-size', '12px')
        .style('pointer-events', 'none')
        .style('opacity', 0);

    const bisect = d3.bisector(d => d.date).left;

    svg.append('rect')
        .attr('width', width - margin.left - margin.right)
        .attr('height', height - margin.top - margin.bottom)
        .attr('x', margin.left)
        .attr('y', margin.top)
        .attr('fill', 'none')
        .attr('pointer-events', 'all')
        .on('mousemove', function(event) {
            const [mx] = d3.pointer(event);
            const date = x.invert(mx);
            let html = `${d3.timeFormat('%b %Y')(date)}<br/>`;

            seriesDataList.forEach((s, i) => {
                const idx = bisect(s.data, date);
                const d = s.data[Math.min(idx, s.data.length - 1)];
                circles[i].style('opacity', 1).attr('cx', x(d.date)).attr('cy', y(d.value));
                html += `<span style="color:${s.color}">${s.label}: ${d.value.toFixed(2)} ${s.label.includes('Electricity') ? '¢/kWh' : '$/MCF'}</span><br/>`;            });

            tooltip.style('opacity', 1).html(html)
                .style('left', `${event.pageX + 10}px`)
                .style('top', `${event.pageY - 20}px`);
        })
        .on('mouseleave', () => {
            tooltip.style('opacity', 0);
            circles.forEach(c => c.style('opacity', 0));
        });

    return () => { tooltip.remove(); };

}, [data]);


  return (
    <div className="charts">
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