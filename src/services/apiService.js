const API_URL = 'http://localhost:3000/api'; // Cambia esto si el backend está en otro dominio

export async function fetchSongs() {
  try {
    const response = await fetch(`${API_URL}/songs`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Token para rutas protegidas
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching songs: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching songs:', error);
    return []; // Devuelve un array vacío en caso de error
  }
}

export async function fetchUsers() {
  const response = await fetch(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Token del usuario autenticado
    },
  });
  if (!response.ok) throw new Error('Error fetching users');
  return response.json();
}

export async function registerUser(data) {
  const response = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error registering user');
  return response.json();
}

export async function loginUser(data) {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error logging in');
  return response.json();
}