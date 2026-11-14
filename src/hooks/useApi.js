import { useCallback, useEffect, useState } from 'react';
import { getJSON } from '../services/api';

export default function useApi(url) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setState({ data: null, loading: true, error: null });

    getJSON(url)
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((error) => {
        if (!cancelled) setState({ data: null, loading: false, error });
      });

    // Evita actualizar el estado si el componente se desmontó o cambió la URL
    return () => {
      cancelled = true;
    };
  }, [url, attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  return { ...state, retry };
}