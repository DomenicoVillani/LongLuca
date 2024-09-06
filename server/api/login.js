// server/api/login.js
const SECRET_PASSWORD = 'password123';  // Definisci una password statica

export default defineEventHandler(async (event) => {
  const { password } = await readBody(event);  // Ottieni la password dal body della richiesta

  if (password === SECRET_PASSWORD) {
    const token = 'session-token';  // Genera un token statico di sessione
    return { token };
  } else {
    throw createError({
      statusCode: 403,
      statusMessage: 'Password errata.'
    });
  }
});
