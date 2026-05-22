/**
 * Configuração base para chamadas de API.
 * Em um cenário real, a URL base viria de uma variável de ambiente.
 */
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
    throw new Error(error.message || `Erro na requisição: ${response.status}`);
  }


  if (response.status === 204 || response.headers.get('content-length') === '0') {
    return {} as T;
  }

  return response.json();
}
