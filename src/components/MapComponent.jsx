import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons for pickup and drop
const pickupIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const dropIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

function MapEvents({ onMapClick }) {
    useMapEvents({
        click(e) {
            if (onMapClick) onMapClick(e.latlng);
        },
    });
    return null;
}

function MapComponent({ pickupCoords, dropCoords, pickupAddress, dropAddress, onMapClick }) {
    const [pickupPos, setPickupPos] = useState(pickupCoords);
    const [dropPos, setDropPos] = useState(dropCoords);

    useEffect(() => {
        setPickupPos(pickupCoords);
    }, [pickupCoords]);

    useEffect(() => {
        setDropPos(dropCoords);
    }, [dropCoords]);

    return (
        <div className="h-full w-full rounded-2xl overflow-hidden">
            <MapContainer
                center={[28.6139, 77.2090]} // Default to Delhi
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                className="rounded-2xl"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapEvents onMapClick={onMapClick} />
                {pickupPos && (
                    <Marker position={pickupPos} icon={pickupIcon}>
                        <Popup>
                            <strong>Pickup:</strong> {pickupAddress || 'Selected Location'}
                            <br />
                            Lat: {pickupPos.lat.toFixed(4)}, Lng: {pickupPos.lng.toFixed(4)}
                        </Popup>
                    </Marker>
                )}
                {dropPos && (
                    <Marker position={dropPos} icon={dropIcon}>
                        <Popup>
                            <strong>Drop:</strong> {dropAddress || 'Selected Location'}
                            <br />
                            Lat: {dropPos.lat.toFixed(4)}, Lng: {dropPos.lng.toFixed(4)}
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
}

export default MapComponent;