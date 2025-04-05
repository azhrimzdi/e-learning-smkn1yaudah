import { AuthResponse } from './types';

const API_URL = 'http://localhost:5000/api';

export const login = async (username: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    return await response.json();
  } catch (error) {
    console.error('Login error:', error);
    return { 
      success: false, 
      message: 'Gagal terhubung ke server' 
    };
  }
};
