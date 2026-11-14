import { Link } from 'react-router';
import useApi from '../hooks/useApi';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

export default function Categorias() {
  const { data: categories, loading, error, retry } = useApi('/api/categories');

  if (loading) return <Loader text="Cargando categorías..." />;
  if (error) return <ErrorMessage error={error} onRetry={retry} />;
  if (categories.length === 0) {
    return <p className="empty">No hay categorías disponibles por ahora.</p>;
  }

  return (
    <section>
      <h2>Explora nuestras categorías</h2>
      <ul className="grid">
        {categories.map((cat) => (
          <li key={cat.id} className="card">
            <Link to={`/categoria/${cat.id}`}>
              <h3>{cat.name}</h3>
              <p>{cat.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}