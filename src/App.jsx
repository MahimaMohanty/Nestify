import { Routes, Route, useLocation } from "react-router-dom";
import { useHouses } from "./context/HouseContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Details from "./pages/Details";
import Welcome from "./pages/Welcome";
import Admin from "./pages/Admin";
import { AnimatePresence, motion } from "framer-motion";
import ChatBox from "./components/ChatBox";


export default function App() {
  const { darkMode, user } = useHouses();
  const location = useLocation();

  // 🔐 Lock app until login
  if (!user) return <Welcome />;

  return (
    <div
      style={{
        background: darkMode ? "#020617" : "#eef2ff",
        minHeight: "100vh",
        transition: "0.4s"
      }}
    >
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.35 }}
          style={{ minHeight: "calc(100vh - 70px)" }}  // 👈 important fix
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <ChatBox />

    </div>
  );
}
