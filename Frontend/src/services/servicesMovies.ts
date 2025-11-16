import type { movieInterface } from '../interfaces/movieInterface';

type ViteEnv = { VITE_API_BASE_URL?: string };
const API_BASE = ((import.meta as unknown as { env?: ViteEnv }).env?.VITE_API_BASE_URL) || 'http://localhost:3000/api/v1';
const authHeader = (): Record<string, string> => {
	const token = localStorage.getItem('token');
	return token ? { Authorization: `Bearer ${token}` } : {};
};

export async function getMovies(): Promise<movieInterface[]> {
	const res = await fetch(`${API_BASE}/movies`, { headers: { ...authHeader() } });
	if (!res.ok) throw new Error(`Error fetching movies: ${res.status}`);
	return res.json();
}

export async function getMovie(id: string): Promise<movieInterface> {
	const res = await fetch(`${API_BASE}/movies/${id}`, { headers: { ...authHeader() } });
	if (!res.ok) throw new Error(`Error fetching movie ${id}: ${res.status}`);
	return res.json();
}

export async function createMovie(movie: movieInterface): Promise<{ message: string } | movieInterface> {
	const res = await fetch(`${API_BASE}/movies`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', ...authHeader() },
		body: JSON.stringify(movie)
	});
	if (!res.ok) throw new Error(`Error creating movie: ${res.status}`);
	return res.json();
}

export async function updateMovie(id: string, movie: Partial<movieInterface>): Promise<movieInterface> {
	const res = await fetch(`${API_BASE}/movies/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json', ...authHeader() },
		body: JSON.stringify(movie)
	});
	if (!res.ok) throw new Error(`Error updating movie ${id}: ${res.status}`);
	return res.json();
}

export async function deleteMovie(id: string): Promise<{ message: string }> {
	const res = await fetch(`${API_BASE}/movies/${id}`, { method: 'DELETE', headers: { ...authHeader() } });
	if (!res.ok) throw new Error(`Error deleting movie ${id}: ${res.status}`);
	return res.json();
}
