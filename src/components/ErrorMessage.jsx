import { Link } from 'react-router';
import { ApiError } from '../services/api';

function describe(error) {
  if (error instanceof ApiError) {
    if (error.status === 404) {
      return {
        title: 'No encontrado',
        text: error.message || 'El recurso que buscas no existe.',
        canRetry: false, // reintentar no sirve si no existe
      };
    }
    if (error.status >= 500) {
      return {
        title: 'Error del servidor',
        text: 'Nuestro servidor tuvo un problema. Intenta nuevamente en unos instantes.',
        canRetry: true,
      };
    }
    return {
      title: 'No pudimos completar la solicitud',
      text: error.message || `Error ${error.status}.`,
      canRetry: true,
    };
  }
  // fetch lanza TypeError cuando no hay red
  return {
    title: 'Sin conexión',
    text: 'No pudimos conectar con el servidor. Revisa tu conexión a internet.',
    canRetry: true,
  };
}

export default function ErrorMessage({ error, onRetry }) {
  const { title, text, canRetry } = describe(error);

  return (
    <div className="error-box" role="alert">
      <h2>{title}</h2>
      <p>{text}</p>
      <div className="error-actions">
        {canRetry && onRetry && (
          <button type="button" onClick={onRetry}>
            Reintentar
          </button>
        )}
        <Link to="/" className="link-button">
          Volver a categorías
        </Link>
      </div>
    </div>
  );
}