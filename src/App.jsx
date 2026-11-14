import { NavLink, Route, Routes } from 'react-router';
import Categorias from './pages/Categorias';
import Libros from './pages/Libros';
import NotFound from './pages/NotFound';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>📚 Librería Online</h1>
        <nav>
          <NavLink to="/" end>Categorías</NavLink>
        </nav>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<Categorias />} />
          <Route path="/categoria/:genre" element={<Libros />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="footer">Frontend II · Semana 4 · Mock REST con MSW</footer>
    </div>
  );
}
