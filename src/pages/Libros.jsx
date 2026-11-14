import { Link, useParams } from 'react-router';
import useApi from '../hooks/useApi';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const formatPrice = (value) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(value);

export default function Libros() {
  const { genre } = useParams();

  const { data: books, loading, error, retry } = useApi(
    `/api/books?genre=${encodeURIComponent(genre)}`
  );

  // Ya está en caché si vienes desde el inicio, así que no genera otra petición
  const { data: categories } = useApi('/api/categories');
  const categoryName = categories?.find((c) => c.id === genre)?.name ?? genre;

  return (
    <section>
      <Link to="/" className="back">← Volver a categorías</Link>
      <h2>{categoryName}</h2>

      {loading && <Loader text="Cargando libros..." />}
      {error && <ErrorMessage error={error} onRetry={retry} />}

      {!loading && !error && books.length === 0 && (
        <p className="empty">No hay libros disponibles en esta categoría por el momento.</p>
      )}

      {!loading && !error && books.length > 0 && (
        <ul className="grid">
          {books.map((book) => (
            <li key={book.id} className="card">
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p className="price">{formatPrice(book.price)}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}