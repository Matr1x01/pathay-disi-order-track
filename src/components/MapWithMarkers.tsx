import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapWithMarkersProps {
  pickupCoords: [number, number];
  deliveryCoords: [number, number];
  status: string;
}

// Fix default marker icons
const greenIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const blueIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function FitBounds({ coords }: { coords: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (coords.length >= 2) {
      const bounds = L.latLngBounds(coords.map((c) => L.latLng(c[0], c[1])));
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [coords, map]);
  return null;
}

const MapWithMarkers = ({ pickupCoords, deliveryCoords, status }: MapWithMarkersProps) => {
  const center: [number, number] = [
    (pickupCoords[0] + deliveryCoords[0]) / 2,
    (pickupCoords[1] + deliveryCoords[1]) / 2,
  ];

  // Mock rider position between pickup and delivery
  const riderProgress = status === "out_for_delivery" ? 0.7 : status === "in_transit" ? 0.4 : status === "delivered" ? 1 : 0.1;
  const riderCoords: [number, number] = [
    pickupCoords[0] + (deliveryCoords[0] - pickupCoords[0]) * riderProgress,
    pickupCoords[1] + (deliveryCoords[1] - pickupCoords[1]) * riderProgress,
  ];

  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-border">
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom={false}
        className="w-full h-full"
        style={{ minHeight: "250px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds coords={[pickupCoords, deliveryCoords]} />
        <Marker position={pickupCoords} icon={greenIcon} />
        <Marker position={deliveryCoords} icon={redIcon} />
        {status !== "placed" && status !== "delivered" && (
          <Marker position={riderCoords} icon={blueIcon} />
        )}
        <Polyline
          positions={[pickupCoords, riderCoords, deliveryCoords]}
          pathOptions={{ color: "hsl(160, 84%, 39%)", weight: 3, dashArray: "8 8" }}
        />
      </MapContainer>
    </div>
  );
};

export default MapWithMarkers;
