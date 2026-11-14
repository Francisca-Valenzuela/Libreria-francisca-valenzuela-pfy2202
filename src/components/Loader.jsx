export default function Loader({ text = 'Cargando...' }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <div className="spinner" />
      <p>{text}</p>
    </div>
  );
}