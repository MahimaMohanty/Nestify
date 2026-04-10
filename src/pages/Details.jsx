import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHouses } from "../context/HouseContext";

export default function Details() {
  const { id } = useParams();
  const {
    houses = [],
    reviews = {},
    addReview,
    getAverageRating,
    darkMode,
    incrementViews
  } = useHouses();

  /* 🛡 Safety */
  if (!houses.length) {
    return (
      <h2 style={{ padding: 60, textAlign: "center" }}>
        Loading property...
      </h2>
    );
  }

  const house = houses.find((h) => String(h.id) === String(id));

  if (!house) {
    return (
      <h2 style={{ padding: 60, textAlign: "center" }}>
        Property not found
      </h2>
    );
  }

  /* 👁️ Analytics */
  useEffect(() => {
    incrementViews?.(house.id);
  }, [house.id]);

  /* ⭐ Review state */
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  /* 🖼 Gallery */
  const [selectedImage, setSelectedImage] = useState(
    house.image || house.gallery?.[0]
  );

  /* 💸 EMI */
  const [years, setYears] = useState(20);
  const interest = 8.5;
  const P = house.price;
  const r = interest / 12 / 100;
  const n = years * 12;
  const emi = Math.round(
    (P * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1)
  );

  const houseReviews = reviews[id] || [];
  const avgRating = getAverageRating(id);

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "auto",
        padding: "40px 20px",
        color: darkMode ? "#f8fafc" : "#0f172a"
      }}
    >
      {/* 🖼 MAIN IMAGE */}
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            borderRadius: "24px",
            overflow: "hidden",
            position: "relative"
          }}
        >
          <img
            src={selectedImage}
            alt={house.title}
            style={{ width: "100%", display: "block" }}
          />

          {/* ⭐ BADGES */}
          {house.featured && (
            <span
              style={{
                position: "absolute",
                top: "16px",
                left: "16px",
                background: "gold",
                padding: "6px 12px",
                borderRadius: "999px",
                fontWeight: 700
              }}
            >
              ⭐ Featured
            </span>
          )}

          {house.premium && (
            <span
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "#ec4899",
                color: "white",
                padding: "6px 12px",
                borderRadius: "999px",
                fontWeight: 700
              }}
            >
              💎 Premium
            </span>
          )}
        </div>
      </div>

      {/* 🖼 GALLERY */}
      {house.gallery?.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "30px",
            overflowX: "auto"
          }}
        >
          {house.gallery.map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              onClick={() => setSelectedImage(img)}
              style={{
                height: "80px",
                cursor: "pointer",
                borderRadius: "10px",
                border:
                  selectedImage === img
                    ? "3px solid #6366f1"
                    : "2px solid transparent"
              }}
            />
          ))}
        </div>
      )}

      {/* 📄 INFO */}
      <h1>{house.title}</h1>
      <p style={{ opacity: 0.7 }}>{house.city}</p>

      <h2>₹ {house.price.toLocaleString()}</h2>

      {avgRating > 0 && (
        <h3 style={{ color: "#facc15" }}>
          ⭐ {avgRating} / 5
        </h3>
      )}

      <p style={{ opacity: 0.6 }}>
        👁️ {house.views ?? 0} views
      </p>

      <hr style={{ margin: "30px 0", opacity: 0.2 }} />

      {/* 💸 EMI */}
      <h2>EMI Calculator</h2>
      <div style={{ maxWidth: "400px", marginBottom: "30px" }}>
        <label>Loan Tenure: {years} years</label>
        <input
          type="range"
          min="5"
          max="30"
          value={years}
          onChange={(e) => setYears(+e.target.value)}
          style={{ width: "100%" }}
        />
        <p>
          <strong>Monthly EMI:</strong> ₹{" "}
          {emi.toLocaleString()}
        </p>
      </div>

      <hr style={{ margin: "30px 0", opacity: 0.2 }} />

      {/* ⭐ ADD REVIEW */}
      <h2>Add Review</h2>

      <select
        value={rating}
        onChange={(e) => setRating(+e.target.value)}
      >
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>
            {r} Stars
          </option>
        ))}
      </select>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your review..."
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "10px",
          marginTop: "10px"
        }}
      />

      <button
        onClick={() => {
          if (!text.trim()) return;
          addReview(id, rating, text);
          setText("");
        }}
        style={{
          marginTop: "10px",
          background:
            "linear-gradient(135deg,#6366f1,#ec4899)",
          color: "white",
          padding: "10px 18px",
          borderRadius: "999px",
          border: "none",
          cursor: "pointer"
        }}
      >
        Submit Review
      </button>

      <hr style={{ margin: "30px 0", opacity: 0.2 }} />

      {/* 🗨️ REVIEWS */}
      <h2>Reviews</h2>

      {houseReviews.length === 0 && (
        <p>No reviews yet.</p>
      )}

      {houseReviews.map((r, i) => (
        <div
          key={i}
          style={{
            background: darkMode ? "#020617" : "white",
            padding: "15px",
            borderRadius: "12px",
            marginBottom: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,.1)"
          }}
        >
          <strong style={{ color: "#facc15" }}>
            ⭐ {r.rating}
          </strong>
          <p style={{ marginTop: "6px" }}>{r.text}</p>
        </div>
      ))}
    </div>
  );
}
