document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggle-sidebar');
    const sidebar = document.querySelector('aside'); // Selecciona la sidebar
    toggleButton.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed'); // Alterna la clase 'collapsed'
        // Cambia el texto del botón según el estado
        if (sidebar.classList.contains('collapsed')) {
            toggleButton.querySelector('.button-text').textContent = 'Desplegar'; // Cambia el texto a "Desplegar"
        } else {
            toggleButton.querySelector('.button-text').textContent = 'Plegar'; // Cambia el texto a "Plegar"
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const footer = document.querySelector('footer');
    const imageContainer = document.getElementById('image-container');
    const songList = document.querySelector('.song-list');
    const commentList = document.querySelector('.comment-list');

    footer.addEventListener('click', function() {
        imageContainer.classList.toggle('hidden'); // Muestra u oculta la imagen

        // Si la imagen se oculta, también oculta las listas
        if (imageContainer.classList.contains('hidden')) {
            songList.classList.add('hidden');
            commentList.classList.add('hidden');
        }
    });

    // Funciones para mostrar listas
    function showSongList() {
        songList.classList.remove('hidden');
        commentList.classList.add('hidden');
    }

    function showCommentList() {
        commentList.classList.remove('hidden');
        songList.classList.add('hidden');
    }
});
