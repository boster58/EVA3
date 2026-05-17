import { useEffect, useMemo, useState } from "react";
import "./App.css";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CourseList from "./components/CourseList";

import { getCourses } from "./services/courseService";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useLocalStorage("favoriteCourses", []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      setError(error.message || "Error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const filteredCourses = useMemo(() => {
    const normalized = searchTerm.toLowerCase().trim();

    return courses.filter((course) =>
      course.title.toLowerCase().includes(normalized)
    );
  }, [courses, searchTerm]);

  const toggleFavorite = (course) => {
    const exists = favorites.some((f) => f.id === course.id);

    if (exists) {
      setFavorites(favorites.filter((f) => f.id !== course.id));
    } else {
      setFavorites([...favorites, course]);
    }
  };

  return (
    <main className="app">
      <Header />

      <section className="summary">
        <p>Total: {courses.length}</p>
        <p>Favoritos: {favorites.length}</p>
      </section>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {loading && <p className="message">Cargando cursos...</p>}

      {error && (
        <div className="error">
          <p>{error}</p>
          <button onClick={loadCourses}>Reintentar</button>
        </div>
      )}

      {!loading && !error && (
        <CourseList
          courses={filteredCourses}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </main>
  );
}

export default App;
