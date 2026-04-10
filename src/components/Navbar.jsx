import { useHouses } from "../context/HouseContext";

export default function Navbar() {
  const { darkMode, toggleTheme, user, logout } = useHouses();

  return (
    <nav
      style={{
        padding: "14px 20px",
        background: darkMode
          ? "linear-gradient(135deg,#020617,#0f172a)"
          : "linear-gradient(135deg,#0f172a,#1e293b)",
        color: "white",
        boxShadow: "0 10px 30px rgba(0,0,0,.35)",
        position: "sticky",
        top: 0,
        zIndex: 50
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <h2 style={{ fontWeight: "600", letterSpacing: "0.5px" }}>
          🏡 HomeHub
        </h2>

        <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
          <button
            onClick={toggleTheme}
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "none",
              color: "white",
              padding: "6px 12px",
              borderRadius: "999px",
              cursor: "pointer",
              fontSize: "14px",
              transition: "0.3s"
            }}
          >
            {darkMode ? "🌞 Light" : "🌙 Dark"}
          </button>

          {user && (
            <>
              <img
                src={user.photo}
                alt="User"
                width="36"
                height="36"
                style={{
                  borderRadius: "50%",
                  border: "2px solid white"
                }}
              />

              <span style={{ fontSize: "14px", fontWeight: "500" }}>
                {user.name}
              </span>

              <button
                onClick={logout}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "none",
                  color: "white",
                  padding: "6px 14px",
                  borderRadius: "999px",
                  cursor: "pointer",
                  fontSize: "14px",
                  transition: "0.3s"
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
