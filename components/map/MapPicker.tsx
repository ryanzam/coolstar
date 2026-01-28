"use client";

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';

// Fix default marker icon issue in Leaflet + webpack/Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Dynamically import to avoid SSR issues
const SearchControl = dynamic(
    () => import('leaflet-geosearch').then(mod => {
        // eslint-disable-next-line react/display-name
        return ({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number, address: string) => void }) => {
            const map = useMapEvents({});

            useEffect(() => {
                const provider = new OpenStreetMapProvider();

                const searchControl = new (GeoSearchControl as any)({
                    provider,
                    style: 'button',           // or 'button'
                    autoComplete: true,
                    position: "topright",
                    autoCompleteDelay: 250,
                    showMarker: false,      // we'll handle our own marker
                    retainZoomLevel: false,
                    popupOpenOnClick: true,
                    classNames: {
                        container: "map-form-container"
                    }
                });

                map.addControl(searchControl);

                // Listen to search results
                map.on('geosearch/showlocation', (e: any) => {
                    const { location } = e;
                    onLocationSelect(location.y, location.x, location.label); // y=lat, x=lng
                });

                return () => {
                    map.removeControl(searchControl);
                };
            }, [map]);

            return null;
        };
    }),
    { ssr: false }
);

interface MapPickerProps {
    onLocationSelect: (lat: number, lng: number, address: string) => void;
}

export default function MapPicker({ onLocationSelect }: MapPickerProps) {
    const [position, setPosition] = useState<[number, number] | null>(null);

    // Optional: Try to get user location on mount
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosition([pos.coords.latitude, pos.coords.longitude]);
            },
            () => {
                // Fallback to a default (e.g. Kathmandu since user is likely there)
                setPosition([27.6881814, 84.432728]);
            }
        );
    }, []);

    const handleClick = (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);

        // Optional: reverse geocode to get approximate address
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
            .then(res => res.json())
            .then(data => {
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

                {position && <Marker position={position} draggable eventHandlers={{
                    dragend: (e) => {
                        const { lat, lng } = e.target.getLatLng();
                        setPosition([lat, lng]);
                        // You can reverse geocode here too if needed
                    }
                }} />}

                <SearchControl onLocationSelect={(lat, lng, label) => {
                    setPosition([lat, lng]);
                    onLocationSelect(lat, lng, label);
                }} />
            </MapContainer>

            <button
                type='button'
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
                        // You can fetch reverse geocoding again here if address is missing
                        onLocationSelect(position[0], position[1], 'Confirmed location');
                    }
                }}
            >
                Confirm Location
            </button>
        </div>
    );
}