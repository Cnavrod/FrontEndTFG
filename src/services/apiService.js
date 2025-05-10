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
  return response.json(); // Devuelve el token y los datos del usuario
}

export async function createPlaylist(data) {
  const response = await fetch(`${API_URL}/users/playlists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Token para autenticación
    },
    body: JSON.stringify(data), // Enviar los datos de la playlist al backend
  });
  if (!response.ok) throw new Error('Error creating playlist');
  return response.json();
}

export async function addSongToPlaylist(playlistId, songId) {
  const response = await fetch(`${API_URL}/users/playlists/add-song`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ playlistId, songId }),
  });
  if (!response.ok) throw new Error('Error adding song to playlist');
  return response.json();
}

export async function getUserPlaylists() {
  const response = await fetch(`${API_URL}/users/playlists`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  if (!response.ok) throw new Error('Error fetching user playlists');
  return response.json();
}

export async function getPublicPlaylists() {
  const response = await fetch(`${API_URL}/users/playlists/public`);
  if (!response.ok) throw new Error('Error fetching public playlists');
  return response.json();
}