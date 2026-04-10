export default function FilterPanel({ maxPrice, setMaxPrice }) {
  return (
    <input
      type="number"
      placeholder="Max price"
      value={maxPrice}
      onChange={(e) => setMaxPrice(e.target.value)}
      style={{
        padding: "10px 14px",
        width: "150px",
        borderRadius: "10px",
        border: "1px solid #ddd"
      }}
    />
  );
}
