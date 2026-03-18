import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import { pueblosMagicos } from './data';
import './styles.css';

export default function MexicoMapWidget() {
  return (
    <div className="mexico-map-widget">
      <MapContainer 
        center={[23.6345, -102.5528]} 
        zoom={5} 
        zoomControl={true}
      >
        {/* Base Satellite Imagery */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
        />
        
        {/* Reference Labels and Boundaries */}
        <TileLayer
          url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
        />

        {/* Pueblos Magicos Markers */}
        {pueblosMagicos.map((pueblo) => (
          <CircleMarker
            key={pueblo.id}
            center={[pueblo.latitude, pueblo.longitude]}
            radius={4}
            pathOptions={{
              color: '#374151', // Subtle dark grey border
              fillColor: '#ffffff',
              fillOpacity: 1,
              weight: 1.5
            }}
            eventHandlers={{
              mouseover: (e) => {
                e.target.setStyle({
                  radius: 8,
                });
              },
              mouseout: (e) => {
                e.target.setStyle({
                  radius: 4,
                });
              },
            }}
          >
            <Tooltip 
              direction="top" 
              offset={[0, -10]} 
              opacity={1} 
              className="custom-tooltip"
            >
              <div style={{ fontWeight: 'bold', fontSize: '1.125rem', color: '#C8573A' }}>
                {pueblo.name}
              </div>
              <div style={{ fontSize: '0.875rem', color: '#d1d5db' }}>{pueblo.state}</div>
              {pueblo.year && (
                <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}>
                  Designated: {pueblo.year}
                </div>
              )}
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
