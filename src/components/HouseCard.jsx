import { Link } from "react-router-dom";
import { useHouses } from "../context/HouseContext";

export default function HouseCard({ house, onDelete }) {
  const { favorites, setFavorites, isAdmin } = useHouses();
  const isFav = favorites.some((f) => f.id === house.id);

  const toggleFavorite = () => {
    setFavorites((prev) =>
      isFav ? prev.filter((f) => f.id !== house.id) : [...prev, house]
    );
  };

  return (
    <div
      style={{
        borderRadius: "18px",
        background: "#fff",
        boxShadow: house.premium
          ? "0 20px 50px rgba(236,72,153,.35)"
          : "0 20px 40px rgba(0,0,0,.12)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        border: house.premium ? "2px solid #ec4899" : "none",
      }}
    >
      {/* ⭐ FEATURED BADGE */}
      {house.featured && (
        <span
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            background: "gold",
            color: "#000",
            padding: "4px 10px",
            borderRadius: "999px",
            fontSize: "12px",
            fontWeight: 700,
            zIndex: 2,
          }}
        >
          ⭐ Featured
        </span>
      )}

      {/* 💎 PREMIUM BADGE */}
      {house.premium && (
        <span
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "#ec4899",
            color: "#fff",
            padding: "4px 10px",
            borderRadius: "999px",
            fontSize: "12px",
            fontWeight: 700,
            zIndex: 2,
          }}
        >
          💎 Premium
        </span>
      )}

      {/* 🖼️ IMAGE */}
      <div style={{ height: "180px", overflow: "hidden" }}>
        <img
          src={house.image}
          alt={house.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "0.4s",
          }}
        />
      </div>

      {/* 📄 CONTENT */}
      <div
        style={{
          padding: "16px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3 style={{ marginBottom: "4px" }}>{house.title}</h3>
        <p style={{ opacity: 0.7, marginBottom: "6px" }}>
          {house.city}
        </p>

        {/* 🏷️ TAG */}
        {house.tag && (
          <span
            style={{
              alignSelf: "flex-start",
              background: "#eef2ff",
              color: "#3730a3",
              padding: "4px 10px",
              borderRadius: "999px",
              fontSize: "12px",
              marginBottom: "8px",
            }}
          >
            {house.tag}
          </span>
        )}

        <strong style={{ fontSize: "18px" }}>
          ₹ {house.price}
        </strong>

        {/* 👁️ VIEWS */}
        <p style={{ fontSize: "13px", opacity: 0.6, marginTop: "4px" }}>
          👁️ {house.views ?? 0} views
        </p>

        {/* 🔘 ACTIONS */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            gap: "10px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* 🧭 VIEW */}
          <Link
            to={`/details/${house.id}`}
            style={{
              background: "linear-gradient(135deg,#6366f1,#ec4899)",
              color: "white",
              padding: "8px 16px",
              borderRadius: "999px",
              textDecoration: "none",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            View
          </Link>

          {/* 🗑 DELETE (ADMIN ONLY) */}
          {isAdmin && (
            <button
              onClick={() => onDelete(house.id)}
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "8px 14px",
                borderRadius: "999px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          )}

          {/* ❤️ FAVORITE */}
          <button
            onClick={toggleFavorite}
            title="Add to favorites"
            style={{
              background: "none",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            {isFav ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
    </div>
  );
}
