import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from "react-leaflet";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import L from "leaflet";

/* 🔧 Fix Leaflet default marker icons */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

/* 🔁 Auto-fit map bounds when houses change */
function FitBounds({ houses }) {
  const map = useMap();

  useEffect(() => {
    const valid = houses.filter((h) => h.location);
    if (valid.length === 0) return;

    const bounds = L.latLngBounds(
      valid.map((h) => [
        h.location.lat,
        h.location.lng
      ])
    );

    map.fitBounds(bounds, {
      padding: [40, 40],
      maxZoom: 13
    });
  }, [houses, map]);

  return null;
}

export default function MapView({ houses = [] }) {
  const navigate = useNavigate();

  return (
    <MapContainer
      center={[20.2961, 85.8245]}
      zoom={7}
      style={{
        height: "500px",
        width: "100%",
        borderRadius: "16px",
        overflow: "hidden"
      }}
    >
      {/* 🌍 Map Tiles */}
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* 🔥 STEP D: Auto zoom based on visible houses */}
      <FitBounds houses={houses} />

      {/* 📍 Property Markers */}
      {houses.map(
        (house) =>
          house.location && (
            <Marker
              key={house.id}
              position={[
                house.location.lat,
                house.location.lng
              ]}
            >
              <Popup>
                <strong>{house.title}</strong>
                <br />
                ₹ {house.price.toLocaleString()}
                <br />

                {house.featured && (
                  <span style={{ color: "#f59e0b" }}>
                    ⭐ Featured
                  </span>
                )}
                {house.premium && (
                  <span style={{ color: "#ec4899" }}>
                    {" "}
                    💎 Premium
                  </span>
                )}

                <br />
                <button
                  onClick={() =>
                    navigate(`/details/${house.id}`)
                  }
                  style={{
                    marginTop: "8px",
                    padding: "6px 10px",
                    borderRadius: "8px",
                    border: "none",
                    background:
                      "linear-gradient(135deg,#6366f1,#ec4899)",
                    color: "white",
                    cursor: "pointer"
                  }}
                >
                  View Details
                </button>
              </Popup>
            </Marker>
          )
      )}
    </MapContainer>
  );
}
