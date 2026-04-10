import { useState } from "react";

export default function AddHouseForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !city || !price) return;

    const newHouse = {
      id: Date.now(),
      title,
      city,
      price: Number(price),
      image: image || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
    };

    onAdd(newHouse);

    setTitle("");
    setCity("");
    setPrice("");
    setImage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "rgba(255,255,255,0.9)",
        padding: "24px",
        borderRadius: "16px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
        marginBottom: "25px",
        display: "grid",
        gap: "12px"
      }}
    >
      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ padding: "12px 14px", borderRadius: "10px", border: "1px solid #ddd" }}
      />

      <input
        placeholder="City"
        value={city}
        onChange={e => setCity(e.target.value)}
        style={{ padding: "12px 14px", borderRadius: "10px", border: "1px solid #ddd" }}
      />

      <input
        placeholder="Price"
        type="number"
        value={price}
        onChange={e => setPrice(e.target.value)}
        style={{ padding: "12px 14px", borderRadius: "10px", border: "1px solid #ddd" }}
      />

      <input
        placeholder="Image URL (optional)"
        value={image}
        onChange={e => setImage(e.target.value)}
        style={{ padding: "12px 14px", borderRadius: "10px", border: "1px solid #ddd" }}
      />

      <button
        style={{
          background: "linear-gradient(135deg,#6366f1,#ec4899)",
          border: "none",
          padding: "12px",
          color: "white",
          borderRadius: "10px",
          cursor: "pointer"
        }}
      >
        Add Property
      </button>
    </form>
  );
}
