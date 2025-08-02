import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

let cachedSession: Session | null = null;
let lastFetch = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos en milisegundos

export async function getSessionSafe() {
  const now = Date.now();

  // Si tenemos una sesión en caché y no ha expirado, la devolvemos
  if (cachedSession && now - lastFetch < CACHE_DURATION) {
    return cachedSession;
  }

  // Si no hay caché o expiró, obtenemos una nueva sesión
  cachedSession = await getSession();
  lastFetch = now;

  return cachedSession;
}