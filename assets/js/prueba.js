const imageContainer = document.getElementById('image-container');
const commentListButton = document.getElementById('commentlist-buttom');
const playlistButton = document.getElementById('playlist-buttom');
const commentList = document.querySelector('.comment-list');
const playlist = document.querySelector('.container-playlist');

// Función para mostrar el contenedor de imagen
function toggleImageContainer() {
    imageContainer.classList.toggle('hidden');
    commentList.classList.add('hidden');
    playlist.classList.add('hidden');
}

// Función para mostrar la lista de comentarios
function showComments() {
    commentList.classList.remove('hidden');
    playlist.classList.add('hidden');
}

// Función para mostrar la lista de canciones
function showPlaylist() {
    playlist.classList.remove('hidden');
    commentList.classList.add('hidden');
}

// Eventos de clic
document.getElementById('collapsed-buttom').addEventListener('click', toggleImageContainer);
commentListButton.addEventListener('click', showComments);
playlistButton.addEventListener('click', showPlaylist);
