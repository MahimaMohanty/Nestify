import { createContext, useContext, useEffect, useState } from "react";
import housesData from "../data/houses.json";
import toast from "react-hot-toast";

import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const HouseContext = createContext();

export function HouseProvider({ children }) {
  // 🏠 Core data
  const [houses, setHouses] = useState(housesData);

  // ❤️ User features
  const [favorites, setFavorites] = useState([]);
  const [reviews, setReviews] = useState({});

  // 🔐 Auth
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // 🌙 Theme
  const [darkMode, setDarkMode] = useState(false);

  // 👑 Admins
  const admins = [
    "ssona2533@gmail.com",
    "roshnisenapati03@gmail.com",
    "mahimamohanty588@gmail.com"
  ];
  const isAdmin = user && admins.includes(user.email);

  /* ================= AUTH ================= */

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName,
          email: currentUser.email,
          photo: currentUser.photoURL
        });
      } else {
        setUser(null);
      }
      setLoadingUser(false);
    });

    return () => unsub();
  }, []);

  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Welcome 👋");
    } catch {
      toast.error("Login failed");
    }
  };

  const logout = async () => {
    await signOut(auth);
    toast("Logged out 👋");
  };

  /* ================= THEME ================= */

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  /* ================= REVIEWS ================= */

  const addReview = (id, rating, text) => {
    setReviews((prev) => ({
      ...prev,
      [id]: [...(prev[id] || []), { rating, text }]
    }));
  };

  const getAverageRating = (id) => {
    const r = reviews[id] || [];
    if (r.length === 0) return 0;
    return (r.reduce((a, b) => a + b.rating, 0) / r.length).toFixed(1);
  };

  /* ================= ANALYTICS ================= */

  // 👁️ Increment views (Details page)
  const incrementViews = (id) => {
    setHouses((prev) =>
      prev.map((h) =>
        h.id === id ? { ...h, views: (h.views || 0) + 1 } : h
      )
    );
  };

  // 📊 Most viewed properties
  const mostViewed = [...houses]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5);

  /* ================= ADMIN ACTIONS ================= */

  const deleteHouse = (id) => {
    if (!isAdmin) {
      toast.error("Only admin can delete");
      return;
    }
    setHouses((prev) => prev.filter((h) => h.id !== id));
    toast.success("Property deleted");
  };

  const toggleFeatured = (id) => {
    if (!isAdmin) {
      toast.error("Only admin allowed");
      return;
    }
    setHouses((prev) =>
      prev.map((h) =>
        h.id === id ? { ...h, featured: !h.featured } : h
      )
    );
  };

  const togglePremium = (id) => {
    if (!isAdmin) {
      toast.error("Only admin allowed");
      return;
    }
    setHouses((prev) =>
      prev.map((h) =>
        h.id === id ? { ...h, premium: !h.premium } : h
      )
    );
  };

  /* ================= PROVIDER ================= */

  return (
    <HouseContext.Provider
      value={{
        // data
        houses,
        setHouses,

        // user features
        favorites,
        setFavorites,
        reviews,
        addReview,
        getAverageRating,

        // analytics
        incrementViews,
        mostViewed,

        // admin
        deleteHouse,
        toggleFeatured,
        togglePremium,
        isAdmin,

        // auth
        user,
        googleLogin,
        logout,

        // theme
        darkMode,
        toggleTheme
      }}
    >
      {!loadingUser && children}
    </HouseContext.Provider>
  );
}

export const useHouses = () => useContext(HouseContext);
