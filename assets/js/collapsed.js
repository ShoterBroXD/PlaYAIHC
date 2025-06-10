document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggle-sidebar');
    const sidebar = document.querySelector('aside');

    toggleButton.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        if (sidebar.classList.contains('collapsed')) {
            toggleButton.querySelector('.button-text').textContent = 'Desplegar';
        } else {
            toggleButton.querySelector('.button-text').textContent = 'Plegar';
        }
    });

    //const footer = document.querySelector('footer');
    const footer = document.getElementById('collapsed-buttom');
    
    footer.addEventListener('click', function(event) {
        const imageContainer = document.getElementById('image-container');
        const songList = document.querySelector('.container-playlist');
        const commentList = document.querySelector('.comment-list');

        imageContainer.classList.toggle('hidden');

        const songBtn = event.target.closest('#Play-list');
        const commentBtn = event.target.closest('#Comment-list');

        if (songBtn) {
            showSongList(); // Mostrar lista de canciones
        } else if (commentBtn) {
            showCommentList(); // Mostrar lista de comentarios
        }
        if (imageContainer.classList.contains('hidden')) {
            songList.classList.add('hidden');
            commentList.classList.add('hidden');
        }
    });

    function showSongList() {
        songList.classList.remove('hidden');
        commentList.classList.add('hidden');
    }

    function showCommentList() {
        commentList.classList.remove('hidden');
        songList.classList.add('hidden');
    }
});
