const API_URL = 'https://backendtfg-57v6.onrender.com/api'; // Cambia esto si el backend está en otro dominio

// Función para iniciar sesión
export async function loginUser(data) {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error logging in');
  return response.json(); // Devuelve el token y los datos del usuario
}

// Función para registrar un usuario
export async function registerUser(data) {
  const response = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error registering user');
  return response.json(); // Devuelve la respuesta del backend
}

export async function fetchSongs(token) {
  try {
    const response = await fetch(`${API_URL}/songs`, {
      headers: {
        Authorization: `Bearer ${token}`, // Token para rutas protegidas
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching songs: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching songs:', error);
    return [];
  }
}

export async function getUserPlaylists(token) {
  const response = await fetch(`${API_URL}/playlists/mine`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Error fetching user playlists');
  return response.json();
}

export async function createPlaylist(data, token) {
  const response = await fetch(`${API_URL}/playlists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error creating playlist');
  return response.json();
}

export async function addSongToPlaylist(playlistId, songId, token) {
  const response = await fetch(`${API_URL}/playlists/add-song`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ playlistId, songId }),
  });
  if (!response.ok) throw new Error('Error adding song to playlist');
  return response.json();
}

export async function deletePlaylist(playlistId, token) {
  const response = await fetch(`${API_URL}/playlists/${playlistId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Error deleting playlist');
  return response.json();
}

export async function getPublicPlaylists() {
  const response = await fetch(`${API_URL}/playlists/public`);
  if (!response.ok) throw new Error('Error fetching public playlists');
  return response.json();
}

export async function forgotPassword(email) {
  const response = await fetch(`${API_URL}/users/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) throw new Error('No se pudo enviar el correo de recuperación');
  return response.json();
}

export async function resetPassword(token, password) {
  const response = await fetch(`${API_URL}/users/reset-password/${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  if (!response.ok) throw new Error('No se pudo restablecer la contraseña');
  return response.json();
}

export async function createSong(data, token) {
  const response = await fetch(`${API_URL}/songs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error creando la canción');
  return response.json();
}

export async function fetchAllSingers(token) {
  const response = await fetch(`${API_URL}/users/singers/all`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Error obteniendo cantantes');
  return response.json();
}

export async function getPlaylistComments(playlistId) {
  const response = await fetch(`${API_URL}/playlists/${playlistId}/comments`);
  if (!response.ok) throw new Error('Error al cargar comentarios');
  return response.json();
}

export async function addCommentToPlaylist(playlistId, text, token) {
  const response = await fetch(`${API_URL}/playlists/${playlistId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });
  if (!response.ok) throw new Error('Error al añadir comentario');
  return response.json();
}