export const API_BASE_URL = 'http://localhost:3000/api';

export interface ApiResponse<T> {
  data: T | null;
  error?: string;
}

export async function fetchApi(endpoint: string): Promise<ApiResponse<any>> {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    return { data: await response.json() };
  } catch (error) {
    return { data: null, error: 'Network error' };
  }
}
