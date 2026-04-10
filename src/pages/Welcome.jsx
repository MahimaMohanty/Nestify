import { useState, useEffect } from "react";
import { useHouses } from "../context/HouseContext";

export default function Welcome() {
  const { googleLogin } = useHouses();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 300);
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>

      <div style={styles.glow1}></div>
      <div style={styles.glow2}></div>

      <div style={styles.center}>
        <div
          style={{
            ...styles.card,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)"
          }}
        >
          <h1 style={styles.title}>Welcome to HomeHub</h1>
          <p style={styles.subtitle}>Find your perfect apartment</p>

          <button style={styles.button} onClick={googleLogin}>
            Sign in with Google
          </button>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
        @keyframes breathe {
          0%,100% { box-shadow: 0 0 25px rgba(99,102,241,.5); }
          50% { box-shadow: 0 0 45px rgba(236,72,153,.8); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2000&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    overflow: "hidden"
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(135deg, rgba(2,6,23,.85), rgba(15,23,42,.75))"
  },
  glow1: {
    position: "absolute",
    width: "450px",
    height: "450px",
    background: "radial-gradient(circle,#6366f1,transparent)",
    top: "-120px",
    left: "-120px",
    filter: "blur(90px)"
  },
  glow2: {
    position: "absolute",
    width: "450px",
    height: "450px",
    background: "radial-gradient(circle,#ec4899,transparent)",
    bottom: "-120px",
    right: "-120px",
    filter: "blur(90px)"
  },
  center: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  card: {
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(25px)",
    padding: "50px",
    borderRadius: "30px",
    width: "380px",
    textAlign: "center",
    boxShadow: "0 40px 80px rgba(0,0,0,.45)",
    animation: "float 6s ease-in-out infinite",
    transition: "1s cubic-bezier(.22,1,.36,1)"
  },
  title: {
    color: "white",
    fontSize: "32px",
    marginBottom: "6px"
  },
  subtitle: {
    color: "#c7d2fe",
    marginBottom: "20px",
    fontSize: "15px"
  },
  button: {
    width: "100%",
    padding: "14px",
    borderRadius: "999px",
    border: "none",
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
    cursor: "pointer",
    background: "linear-gradient(135deg,#6366f1,#ec4899)",
    animation: "breathe 3s ease-in-out infinite"
  }
};
