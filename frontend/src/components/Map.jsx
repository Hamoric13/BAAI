import { useState, useEffect } from 'react'
import Map, { Source, Layer } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
const BAY_AREA_FIPS = ['06001', '06013', '06041', '06055', '06075', '06081', '06085', '06095', '06097'];
const COUNTY_FIPS_MAP = {
    '06001': 'Alameda County, CA',
    '06013': 'Contra Costa County, CA',
    '06041': 'Marin County, CA',
    '06055': 'Napa County, CA',
    '06075': 'San Francisco County, CA',
    '06081': 'San Mateo County, CA',
    '06085': 'Santa Clara County, CA',
    '06095': 'Solano County, CA',
    '06097': 'Sonoma County, CA'
  };

function CountyMap({ results }) {
    const [viewport, setViewport] = useState({
        latitude: 37.85,
        longitude: -122.4194,
        zoom: 7
      });
      const [geojson, setGeojson] = useState(null);
  
      useEffect(() => {
          fetch('/california_counties.geojson')
            .then(res => res.json())
            .then(data => {
              const filtered = {
                ...data,
                features: data.features.filter(f => BAY_AREA_FIPS.includes(f.id))
              };
              setGeojson(filtered);
            });
      }, []);
  
      const coloredGeojson = geojson ? {
        ...geojson,
        features: geojson.features.map(f => {
            const countyName = COUNTY_FIPS_MAP[f.id];
            const county = results ? results.find(r => r.county_name === countyName) : null;
            const color = county ? county.color : '#ccc';
            return {
                ...f,
                properties: { ...f.properties, color }
            };
        })
    } : null;

    return (
      <div className="map-container" style={{ height: '500px' }}>
        <Map
          initialViewState={viewport}
          mapStyle="mapbox://styles/mapbox/light-v11"
          mapboxAccessToken={MAPBOX_TOKEN}
          minZoom={6}
          maxZoom={12}
        >
          {geojson && (
            <Source type="geojson" data={coloredGeojson}>
              <Layer
                id="county-fill"
                type="fill"
                paint={{
                  'fill-color': ['get', 'color'],
                  'fill-opacity': 0.5
                }}
              />
              <Layer
                id="county-border"
                type="line"
                paint={{
                  'line-color': '#333',
                  'line-width': 1
                }}
              />
              <Layer
                id="county-labels"
                type="symbol"
                layout={{
                    'text-field': ['get', 'NAME'],
                    'text-size': 12,
                    'text-anchor': 'center'
                }}
                paint={{
                    'text-color': '#333',
                    'text-halo-color': '#fff',
                    'text-halo-width': 1
                }}
                />  
              
            </Source>
          )}
        </Map>
      </div>
    )
  }
  
  export default CountyMap
