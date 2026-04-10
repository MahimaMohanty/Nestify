import HouseCard from "./HouseCard";
import withLoader from "../hoc/withLoader";

function HouseGrid({ houses, onDelete }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "28px",

        marginTop: "25px",

        paddingBottom: "32px",   // 🛠 prevents card cut-off
        marginBottom: "24px"     // 🛠 prevents next section overlap
      }}
    >
      {houses.length === 0 && (
        <div
          style={{
            gridColumn: "1 / -1",
            textAlign: "center",
            padding: "40px",
            opacity: 0.6
          }}
        >
          <h3>No properties found</h3>
          <p>Try adjusting your search or filters.</p>
        </div>
      )}

      {houses.map((house) => (
        <HouseCard key={house.id} house={house} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default withLoader(HouseGrid);
