import { http, HttpResponse, delay } from 'msw';

const categories = [
  { id: 'ficcion', name: 'Ficción', description: 'Novelas y narrativa contemporánea' },
  { id: 'ciencia-ficcion', name: 'Ciencia Ficción', description: 'Futuros posibles y mundos imaginarios' },
  { id: 'fantasia', name: 'Fantasía', description: 'Magia, criaturas y aventuras épicas' },
  { id: 'misterio', name: 'Misterio', description: 'Intriga, crimen y suspenso' },
  { id: 'drama', name: 'Drama', description: 'Historias intensas (sin libros: prueba de lista vacía)' },
  { id: 'terror', name: 'Terror', description: 'Historias oscuras (simula error 500: prueba de error)' },
];

const booksByGenre = {
  ficcion: [
    { id: 1, title: 'Cien años de soledad', author: 'Gabriel García Márquez', price: 12990 },
    { id: 2, title: 'La casa de los espíritus', author: 'Isabel Allende', price: 10990 },
    { id: 3, title: 'Pedro Páramo', author: 'Juan Rulfo', price: 8990 },
  ],
  'ciencia-ficcion': [
    { id: 4, title: 'Dune', author: 'Frank Herbert', price: 15990 },
    { id: 5, title: 'Fundación', author: 'Isaac Asimov', price: 11990 },
    { id: 6, title: 'Neuromante', author: 'William Gibson', price: 10490 },
  ],
  fantasia: [
    { id: 7, title: 'El Hobbit', author: 'J.R.R. Tolkien', price: 9990 },
    { id: 8, title: 'Mistborn: El Imperio Final', author: 'Brandon Sanderson', price: 13990 },
  ],
  misterio: [
    { id: 9, title: 'Asesinato en el Orient Express', author: 'Agatha Christie', price: 8490 },
    { id: 10, title: 'El nombre de la rosa', author: 'Umberto Eco', price: 12490 },
  ],
  drama: [], // vacío a propósito, para probar el mensaje "sin libros"
};

export const handlers = [
  // Lista de categorías
  http.get('/api/categories', async () => {
    await delay(800);
    return HttpResponse.json(categories);
  }),

  // Libros por categoría: /api/books?genre=ficcion
  http.get('/api/books', async ({ request }) => {
    const genre = new URL(request.url).searchParams.get('genre');
    await delay(1000);

    // Error 500 simulado a propósito para la categoría "terror"
    if (genre === 'terror') {
      return HttpResponse.json(
        { message: 'Error interno del servidor' },
        { status: 500 }
      );
    }

    const books = booksByGenre[genre];

    // Categoría inexistente -> 404
    if (!books) {
      return HttpResponse.json(
        { message: `La categoría "${genre}" no existe.` },
        { status: 404 }
      );
    }

    return HttpResponse.json(books);
  }),
];