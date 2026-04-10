import { useHouses } from "../context/HouseContext";

export default function SavedSearches({ applySearch }) {
  const { savedSearches = [], removeSavedSearch } = useHouses();

  if (savedSearches.length === 0) {
    return <p style={{ opacity: 0.6 }}>No saved searches yet</p>;
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Saved Searches</h3>

      {savedSearches.map((s, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "8px",
            alignItems: "center"
          }}
        >
          <button
            onClick={() => applySearch(s)}
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              cursor: "pointer"
            }}
          >
            {s.search || "Any"} | {s.city || "All"} | ₹{s.minPrice || 0} – ₹
            {s.maxPrice || "∞"}
          </button>

          <button
            onClick={() => removeSavedSearch(i)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            ❌
          </button>
        </div>
      ))}
    </div>
  );
}
