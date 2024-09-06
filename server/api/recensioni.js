import { db, initDB } from '~/utils/db.js';
import { getQuery } from 'h3'; // Usa getQuery per Nuxt 3

const SESSION_TOKEN = 'session-token';  // Token generato al login

export default defineEventHandler(async (event) => {
  await initDB();
  const method = event.req.method;

  // Verifica il token di sessione per POST e DELETE
  if (method === 'POST' || method === 'DELETE') {
    const token = event.req.headers['x-access-token'];
    
    if (token !== SESSION_TOKEN) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Non autorizzato. Token errato.'
      });
    }
  }

  if (method === 'GET') {
    return db.data.recensioni;
  }

  if (method === 'POST') {
    const newReview = await readBody(event);
    const lastId = db.data.recensioni.reduce((max, item) => item.id > max ? item.id : max, 0);
    newReview.id = lastId + 1;
    db.data.recensioni.push(newReview);
    await db.write();
    return newReview;
  }

  if (method === 'DELETE') {
    const query = getQuery(event); // Usa getQuery per ottenere i parametri della query
    const reviewId = parseInt(query.id);

    if (!reviewId || isNaN(reviewId)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID non valido'
      });
    }

    const reviewIndex = db.data.recensioni.findIndex(item => item.id === reviewId);

    if (reviewIndex === -1) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Recensione non trovata'
      });
    }

    db.data.recensioni.splice(reviewIndex, 1);
    await db.write();
    return { message: `Recensione con ID ${reviewId} eliminata` };
  }
});
