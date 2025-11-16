type ViteEnv = { VITE_API_BASE_URL?: string };
const API_BASE = ((import.meta as unknown as { env?: ViteEnv }).env?.VITE_API_BASE_URL) || 'http://localhost:3000/api/v1';

export interface LoginResponse {
  token: string;
  user: { id: string; username: string; role: number };
}

export async function login(username: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) throw new Error(`Login failed: ${res.status}`);
  return res.json();
}
