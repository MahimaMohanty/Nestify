import { useState } from "react";
import HouseGrid from "../components/HouseGrid";
import SavedSearches from "../components/SavedSearches";
import MapView from "../components/MapView";
import { useHouses } from "../context/HouseContext";

export default function Home() {
  const { houses, saveSearch, deleteHouse } = useHouses();

  // 🔍 Filters
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  /* ================= TRENDING ================= */
  // Using your existing field (safe)
  const trending = houses.filter((h) => h.isTrending);

  /* ================= APPLY SAVED SEARCH ================= */
  const applySearch = (filters) => {
    setSearch(filters.search || "");
    setCity(filters.city || "");
    setMinPrice(filters.minPrice || "");
    setMaxPrice(filters.maxPrice || "");
  };

  /* ================= FILTER LOGIC ================= */
  const filteredHouses = houses.filter(
    (h) =>
      h.title.toLowerCase().includes(search.toLowerCase()) &&
      (!city || h.city === city) &&
      (!minPrice || h.price >= Number(minPrice)) &&
      (!maxPrice || h.price <= Number(maxPrice))
  );

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "auto",
        padding: "40px 20px",
      }}
    >
      {/* 🔥 TRENDING SECTION */}
      <section style={{ marginBottom: "110px" }}>
        <h2 style={{ marginBottom: "24px" }}>🔥 Trending Properties</h2>

        <div style={{ paddingBottom: "60px", overflow: "visible" }}>
          <HouseGrid
            houses={trending.slice(0, 4)}
            onDelete={deleteHouse}
          />
        </div>
      </section>

      {/* 🗺️ MAP SECTION (SYNCED WITH FILTERS) */}
      <section style={{ marginBottom: "80px" }}>
        <h2 style={{ marginBottom: "18px" }}>
          📍 Property Locations
        </h2>

        {/* 🔥 IMPORTANT: pass filtered houses */}
        <MapView houses={filteredHouses} />
      </section>

      {/* 🔍 SEARCH & FILTERS */}
      <section style={{ marginBottom: "60px" }}>
        <h2 style={{ marginBottom: "18px" }}>
          Find Your Next Home
        </h2>

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "28px",
          }}
        >
          <input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <input
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />

          <input
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />

          <button
            onClick={() =>
              saveSearch({ search, city, minPrice, maxPrice })
            }
            style={{
              padding: "10px 16px",
              borderRadius: "10px",
              border: "none",
              background:
                "linear-gradient(135deg,#6366f1,#ec4899)",
              color: "white",
              cursor: "pointer",
            }}
          >
            💾 Save Search
          </button>
        </div>

        {/* 🏠 FILTERED RESULTS */}
        <HouseGrid
          houses={filteredHouses}
          onDelete={deleteHouse}
        />
      </section>

      {/* 📋 SAVED SEARCHES */}
      <section style={{ marginTop: "50px" }}>
        <SavedSearches applySearch={applySearch} />
      </section>
    </div>
  );
}
