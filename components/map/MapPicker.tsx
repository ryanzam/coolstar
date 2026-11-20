"use client";

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';

// Fix default marker icon issue in Leaflet + Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Handles both search bar and map click events
function MapControls({
  onLocationSelect,
  onMapClick,
}: {
  onLocationSelect: (lat: number, lng: number, address: string) => void;
  onMapClick: (lat: number, lng: number) => void;
}) {
  const map = useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new (GeoSearchControl as any)({
      provider,
      style: 'button',
      autoComplete: true,
      position: 'topright',
      autoCompleteDelay: 250,
      showMarker: false,
      retainZoomLevel: false,
      popupOpenOnClick: true,
      classNames: {
        container: 'map-form-container',
      },
    });

    map.addControl(searchControl);

    const handleShowLocation = (e: any) => {
      const { location } = e;
      onLocationSelect(location.y, location.x, location.label);
    };

    map.on('geosearch/showlocation', handleShowLocation);

    return () => {
      map.removeControl(searchControl);
      map.off('geosearch/showlocation', handleShowLocation);
    };
  }, [map, onLocationSelect]);

  return null;
}

interface MapPickerProps {
  onLocationSelect: (lat: number, lng: number, address: string) => void;
}

export default function MapPicker({ onLocationSelect }: MapPickerProps) {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      () => {
        // Fallback coordinates (Bharatpur / Chitwan)
        setPosition([27.6881814, 84.432728]);
      }
    );
  }, []);

  const updateLocationWithAddress = (lat: number, lng: number) => {
    setPosition([lat, lng]);
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
      .then((res) => res.json())
      .then((data) => {
        const addr = data.display_name || 'Unknown address';
        onLocationSelect(lat, lng, addr);
      })
      .catch(() => onLocationSelect(lat, lng, ''));
  };

  if (!position) return <div>Loading map...</div>;

  return (
    <div style={{ height: '400px', width: '100%', position: 'relative' }}>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={position}
          draggable
          eventHandlers={{
            dragend: (e) => {
              const { lat, lng } = e.target.getLatLng();
              updateLocationWithAddress(lat, lng);
            },
          }}
        />

        <MapControls
          onMapClick={updateLocationWithAddress}
          onLocationSelect={(lat, lng, label) => {
            setPosition([lat, lng]);
            onLocationSelect(lat, lng, label);
          }}
        />
      </MapContainer>

      <button
        type="button"
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          padding: '10px 20px',
          background: '#0066cc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        onClick={() => {
          if (position) {
            updateLocationWithAddress(position[0], position[1]);
          }
        }}
      >
        Confirm Location
      </button>
    </div>
  );
}