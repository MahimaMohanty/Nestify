export default function SearchBar({ query, setQuery }) {
  return (
    <input
      type="text"
      placeholder="Search by name or city..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      style={{
        padding: "10px 14px",
        width: "100%",
        maxWidth: "300px",
        borderRadius: "10px",
        border: "1px solid #ddd"
      }}
    />
  );
}
