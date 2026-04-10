import { useHouses } from "../context/HouseContext";

export default function Admin() {
  const { houses, toggleFeatured } = useHouses();

  return (
    <div style={{ padding: "40px" }}>
      <h2>Admin Dashboard</h2>

      {houses.map(h => (
        <div key={h.id} style={{ marginBottom: "10px" }}>
          <strong>{h.title}</strong>
          <button onClick={() => toggleFeatured(h.id)}>
            {h.featured ? "Remove Featured" : "Make Featured"}
          </button>
        </div>
      ))}
    </div>
  );
}
