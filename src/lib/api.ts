/**
 * API base URL.
 * In development uses the local backend server (via Vite proxy).
 * In production the Express server serves both the API and the static frontend,
 * so relative URLs work out of the box.
 */
export const API_BASE = import.meta.env.DEV ? 'http://localhost:3002' : '';
