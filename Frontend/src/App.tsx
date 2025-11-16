import { useContext, useEffect, useState } from 'react';
import './App.css'
import { MovieModal } from './components/MovieModal/MovieModal'
import { isOpenContext } from './context/isOpenContext';
import type { movieInterface } from './interfaces/movieInterface';
import { getMovies, deleteMovie } from './services/servicesMovies';
import MovieCard from './components/MovieCard.tsx/MovieCard';
import LoginModal from './components/LoginModal/LoginModal';
import { useAuth } from './context/authContext';

function App() {
  const [movies, setMovies] = useState<movieInterface[]>([]);
  const [editingMovie, setEditingMovie] = useState<movieInterface | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const isOpencontext = useContext(isOpenContext);
  if (!isOpencontext) throw new Error('ToggleButton debe estar dentro de IsOpenProvider');
  const { isOpen, handleOpen } = isOpencontext;
  console.log(isOpen);
  const { user, logout } = useAuth();

  const fetchMovies = () => {
    getMovies()
      .then(setMovies)
      .catch((err) => console.error('Error fetching movies', err));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main className="app">
      <header className="app__header">
        <h1 className="app__title">Movies</h1>
        <div className="app__actions">
          <button className="btn btn--primary" onClick={() => handleOpen()}>Agregar película</button>
          {user ? (
            <button className="btn" onClick={logout}>Salir ({user.username})</button>
          ) : (
            <button className="btn" onClick={() => setShowLogin(true)}>Iniciar sesión</button>
          )}
        </div>
      </header>

      <section className="meta">
        <span className="muted">Películas cargadas: {movies.length}</span>
      </section>

      <section className="grid">
        {movies.map((m) => (
          <MovieCard
            key={m._id ?? m.Title}
            movie={m}
            onEdit={(mm) => { setEditingMovie(mm); handleOpen(); }}
            onDelete={async (id) => {
              if (!confirm('¿Eliminar esta película?')) return;
              try { await deleteMovie(id); fetchMovies(); } catch (e) { console.error(e); }
            }}
          />
        ))}
      </section>

      {isOpen && (
        <MovieModal
          onCreated={() => { fetchMovies(); setEditingMovie(null); }}
          onClose={() => setEditingMovie(null)}
          editingMovie={editingMovie || undefined}
        />
      )}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </main>
  )
}

export default App
