import { useEffect, useState } from "react";
import { socket } from "../utils/socket";
import { useHouses } from "../context/HouseContext";

export default function ChatBox() {
  const { user, isAdmin } = useHouses();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // Join socket room when user logs in
  useEffect(() => {
    if (!user) return;

    socket.emit("join", { userId: user.email });

    const handleReceive = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("receiveMessage", handleReceive);

    return () => {
      socket.off("receiveMessage", handleReceive);
    };
  }, [user]);

  const sendMessage = () => {
    if (!text.trim()) return;

    socket.emit("sendMessage", {
      userId: user.email,
      message: text,
      sender: isAdmin ? "admin" : "user",
    });

    // ❌ NO optimistic UI here
    setText("");
  };

  // If user not logged in, do not show chat
  if (!user) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "320px",
        background: "white",
        borderRadius: "14px",
        boxShadow: "0 10px 40px rgba(0,0,0,.2)",
        zIndex: 1000,
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#6366f1",
          color: "white",
          padding: "12px",
          fontWeight: 600,
        }}
      >
        💬 Chat with Us
      </div>

      {/* Messages */}
      <div
        style={{
          height: "220px",
          padding: "10px",
          overflowY: "auto",
          fontSize: "14px",
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: m.sender === "user" ? "right" : "left",
              marginBottom: "6px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                background:
                  m.sender === "user" ? "#6366f1" : "#e5e7eb",
                color:
                  m.sender === "user" ? "white" : "#000",
                padding: "6px 10px",
                borderRadius: "12px",
                maxWidth: "80%",
              }}
            >
              {m.message}
            </span>
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{ display: "flex", borderTop: "1px solid #eee" }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            border: "none",
            padding: "10px",
            outline: "none",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            background: "#6366f1",
            color: "white",
            border: "none",
            padding: "0 16px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
