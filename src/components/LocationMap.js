import React, { useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import "./LocationMap.css";
import IconLocation from '../images/icon-location.svg'
import L from 'leaflet';
const iconLocation = new L.Icon({
    iconUrl: IconLocation,
    iconRetinaUrl: IconLocation,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    popupAnchor: [-0, -0],
    iconSize: [42, 52],
    pane: null,
    className: 'leaflet-div-icon'
});
export default function LocationMap({ position = [51.505, -0.09] }) {
    const [map, setMap] = useState()

    React.useEffect(() => {
        if (window.innerWidth < window.innerHeight) {
            map && map.setView([position[0] + 0.008, position[1]])

        } else {
            map && map.setView([position[0] - 0.003, position[1]])
        }

    }, [position, map])
    return (
        <MapContainer doubleClickZoom={false} touchZoom={false} dragging={false} markerZoomAnimation whenCreated={setMap} zoom={13} scrollWheelZoom={false} zoomControl={false} className="mapWrapper" zoom={15} scrollWheelZoom={false}>
            <TileLayer

                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

            />
            <Marker icon={iconLocation} interactive position={position}>
                <Popup zoomAnimation>
                    Your Location
                </Popup>
            </Marker>
        </MapContainer>
    )


}       