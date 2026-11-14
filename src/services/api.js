export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

// Caché en memoria: guarda la promesa de cada URL, así no se repiten consultas
const cache = new Map();

export function getJSON(url) {
  if (cache.has(url)) {
    return cache.get(url);
  }

  const request = fetch(url)
    .then(async (res) => {
      if (!res.ok) {
        let message = '';
        try {
          const body = await res.json();
          message = body.message || '';
        } catch {
          // la respuesta de error no traía JSON
        }
        throw new ApiError(res.status, message);
      }
      return res.json();
    })
    .catch((err) => {
      // Si falla, no se guarda en caché para poder reintentar
      cache.delete(url);
      throw err;
    });

  cache.set(url, request);
  return request;
}