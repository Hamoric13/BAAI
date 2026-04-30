import { useState, useEffect } from 'react'
import Map, { Source, Layer, Popup } from 'react-map-gl'
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
  const COUNTY_CENTROIDS = {
    'Alameda County, CA': { lat: 37.6017, lng: -121.7195 },
    'Contra Costa County, CA': { lat: 37.9271, lng: -121.9913 },
    'Marin County, CA': { lat: 38.0834, lng: -122.7633 },
    'Napa County, CA': { lat: 38.5025, lng: -122.2654 },
    'San Francisco County, CA': { lat: 37.7749, lng: -122.4194 },
    'San Mateo County, CA': { lat: 37.4337, lng: -122.4024 },
    'Santa Clara County, CA': { lat: 37.3382, lng: -121.8863 },
    'Solano County, CA': { lat: 38.2494, lng: -121.9018 },
    'Sonoma County, CA': { lat: 38.5780, lng: -122.9888 }
};

function CountyMap({ results }) {
    const [selectedCounty, setSelectedCounty] = useState(null);
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
          onClick={(e) => {
            const features = e.features;
            if (features && features.length > 0) {
                const fipsId = String(features[0].id).padStart(5, '0');
                const countyName = COUNTY_FIPS_MAP[fipsId];
                const county = results ? results.find(r => r.county_name === countyName) : null;
                if (county) setSelectedCounty(county);
            }
        }}
        interactiveLayerIds={['county-fill']}
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
            {selectedCounty && (
                <Popup
                    longitude={COUNTY_CENTROIDS[selectedCounty.county_name].lng}
                    latitude={COUNTY_CENTROIDS[selectedCounty.county_name].lat}
                    onClose={() => setSelectedCounty(null)}
                    closeOnClick={false}
                >
                    <div style={{ padding: '8px', minWidth: '200px' }}>
                        <strong style={{ color: selectedCounty.color }}>{selectedCounty.county_name.replace(', CA', '')}</strong>
                        <p style={{ margin: '8px 0 4px', fontSize: '20px', fontWeight: 500 }}>{Math.round(selectedCounty.ratio * 100)}% of income</p>
                        <div style={{ fontSize: '12px', color: '#666', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                            <span>🏠 Rent: ${selectedCounty.breakdown.rent.toLocaleString()}</span>
                            <span>🏛️ Tax: ${selectedCounty.breakdown.tax.toLocaleString()}</span>
                            <span>⛽ Gas: ${selectedCounty.breakdown.gas.toLocaleString()}</span>
                            <span>🛒 Groceries: ${selectedCounty.breakdown.groceries.toLocaleString()}</span>
                            <span>💡 Utilities: ${selectedCounty.breakdown.utilities.toLocaleString()}</span>
                            <span>🏥 Healthcare: ${selectedCounty.breakdown.healthcare.toLocaleString()}</span>
                            <span style={{ fontWeight: 500, marginTop: '4px' }}>💰 Total: ${selectedCounty.breakdown.total.toLocaleString()}/mo</span>
                        </div>
                    </div>
                </Popup>
            )}
        
          
        </Map>
      </div>
    )
  }
  
  export default CountyMap
