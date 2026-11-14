import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className="error-box">
      <h2>Página no encontrada</h2>
      <p>La dirección que ingresaste no existe.</p>
      <Link to="/" className="link-button">Ir al inicio</Link>
    </div>
  );
}