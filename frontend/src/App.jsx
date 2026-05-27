import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites";
import Register from "./pages/Register";
import NotFound from "./components/NotFound";

// Sending cookies with every request automatically (identify logged in user)
axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  function toggleFavorite(movie) {
    setFavorites((prev) => {
      const exists = prev.some((fav) => fav.id === movie.id);

      if (exists) {
        return prev.filter((fav) => fav.id !== movie.id);
      }

      return [...prev, movie];
    });
  }

  // Making sure user is logged in
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/me");
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return <div className="bg-gray-800 min-h-screen">Loading...</div>;
  }

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              user={user}
              favorites={favorites}
              onFavoriteClick={toggleFavorite}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            user ? (
              <Favorites
                favorites={favorites}
                onFavoriteClick={toggleFavorite}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            user ? <Navigate to="/" replace /> : <Login setUser={setUser} />
          }
        />
        <Route
          path="/register"
          element={
            user ? <Navigate to="/" replace /> : <Register setUser={setUser} />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
