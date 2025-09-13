// Utilitário de comunicação com a API

const DEFAULT_BASE_URL = 'http://192.168.100.21:3000/api/v1';

export function getApiBaseUrl(): string {
	const envBase = (import.meta as any)?.env?.VITE_API_BASE_URL as string | undefined;
	const storedBase = typeof window !== 'undefined' ? localStorage.getItem('apiBaseUrl') || undefined : undefined;
	return envBase || storedBase || DEFAULT_BASE_URL;
}

export function getAuthToken(): string | undefined {
	const envToken = (import.meta as any)?.env?.VITE_API_TOKEN as string | undefined;
	const storedToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') || undefined : undefined;
	return envToken || storedToken;
}

export async function apiFetch(path: string, init: RequestInit & { noAuth?: boolean } = {}) {
	const base = getApiBaseUrl();
	const token = (init as any)?.noAuth ? undefined : getAuthToken();
	const headers: HeadersInit = {
		...(init.headers || {}),
	};
	if (token) {
		(headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
	}
	const res = await fetch(`${base}${path}`, {
		...init,
		headers,
	});
	if (!res.ok) {
		const text = await res.text().catch(() => '');
		throw new Error(`Erro ${res.status}: ${text || res.statusText}`);
	}
	return res.json();
}


