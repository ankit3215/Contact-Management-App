import React, { useState, useEffect } from 'react';
import { useCountryData } from '../api/api';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

const Maps: React.FC = () => {
  const { data: countryData, isLoading } = useCountryData();
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '500px',
    latitude: 0,
    longitude: 0,
    zoom: 2,
  });

  useEffect(() => {
    if (countryData && countryData.length > 0) {
      const { lat, long } = countryData[0].countryInfo;
      setViewport((prevState) => ({
        ...prevState,
        latitude: lat,
        longitude: long,
      }));
    }
  }, [countryData]);

  if (isLoading || !countryData) {
    return <div>Loading map...</div>;
  }

  const handleMarkerClick = (country: any) => {
    setSelectedCountry(country);
  };

  const handlePopupClose = () => {
    setSelectedCountry(null);
  };

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <h2 className="text-2xl font-semibold mb-4">Charts and Maps</h2>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken='pk.eyJ1IjoiYW5raXQzMjE1IiwiYSI6ImNsaXN0cXhidDB4YW0zdHBodjBleWNiY3oifQ.-B2OpVUG_AmeKHLVvpbg8A'
        onViewportChange={(newViewport) => setViewport(newViewport)}
      >
        {countryData.map((country: any) => (
          <Marker
            key={country.countryInfo._id}
            latitude={country.countryInfo.lat}
            longitude={country.countryInfo.long}
            onClick={() => handleMarkerClick(country)}
          >
            <span role="img" aria-label={country.country}>
              📍
            </span>
          </Marker>
        ))}
        {selectedCountry && (
          <Popup
            latitude={selectedCountry.countryInfo.lat}
            longitude={selectedCountry.countryInfo.long}
            closeButton={true}
            onClose={handlePopupClose}
          >
            <div>
              <h3>{selectedCountry.country}</h3>
              <p>Total Cases: {selectedCountry.cases}</p>
              <p>Total Deaths: {selectedCountry.deaths}</p>
              <p>Total Recovered: {selectedCountry.recovered}</p>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
};

export default Maps;