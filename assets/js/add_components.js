function loadComponent(id, path, callback) {
  fetch(path)
    .then(res => res.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
      if (typeof callback === "function") callback(); // Ejecuta lógica una vez cargado
    });
}

// Cargar footer y configurar eventos
loadComponent("footer-placeholder", "/components/footer.html", () => {
const imgBtn = document.getElementById("collapsed-buttom");
const seccion = document.getElementById("footer-content");

imgBtn?.addEventListener("click", () => {
  seccion?.classList.toggle("hidden");
  if (seccion?.classList.contains("hidden")) {
    document.querySelector(".comment-list")?.classList.add("hidden");
    document.querySelector(".container-playlist")?.classList.add("hidden");
  }
});

// --- Control de play/pause dinámico ---
const audio = document.getElementById('audio-player');
const playBtn = document.querySelector('.play-botom');
const pauseBtn = document.querySelector('.pause-botom');

function actualizarBotones() {
  if (audio.paused) {
    playBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
  } else {
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';
  }
}

if (playBtn && pauseBtn && audio) {
  playBtn.addEventListener('click', () => audio.play());
  pauseBtn.addEventListener('click', () => audio.pause());
  audio.addEventListener('play', actualizarBotones);
  audio.addEventListener('pause', actualizarBotones);
  actualizarBotones();
}
});
  
  // Cargar portada
  loadComponent("cover-placeholder", "/components/player-cover.html", () => {
    document.getElementById("close-cover")?.addEventListener("click", () => {
      document.getElementById("player-cover")?.classList.add("hidden");
    });
  });
  
  // Cargar lista de comentarios
  loadComponent("comments-placeholder", "/components/comments.html", () => {
    document.getElementById("commentlist-buttom")?.addEventListener("click", () => {
      const isVisible = !document.getElementById("footer-content")?.classList.contains("hidden");
      if (isVisible) {
        document.querySelector(".comment-list")?.classList.remove("hidden");
        document.querySelector(".container-playlist")?.classList.add("hidden");
      }
    });
  });
  
  // Cargar lista de canciones
  loadComponent("playlist-placeholder", "/components/playlist.html", () => {
    document.getElementById("playlist-buttom")?.addEventListener("click", () => {
      const isVisible = !document.getElementById("footer-content")?.classList.contains("hidden");
      if (isVisible) {
        document.querySelector(".container-playlist")?.classList.remove("hidden");
        document.querySelector(".comment-list")?.classList.add("hidden");
      }
    });
  });
  

  // ...existing code...

  document.addEventListener("DOMContentLoaded", function () {
    const footer = document.getElementById('footer-placeholder');
    const trackItems = document.querySelectorAll('.track-item');
  
    // Mostrar el footer si ya se activó antes
    if (localStorage.getItem('footerVisible') === 'true') {
      if (footer) footer.style.display = 'block';
    }
  
    // Al hacer clic en una pista, mostrar el footer y guardar el flag
    trackItems.forEach(item => {
      item.addEventListener('click', function () {
        if (footer) {
          footer.style.display = 'block';
          localStorage.setItem('footerVisible', 'true');
        }
      });
    });
  });

// ...existing code...

document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById('audio-player');
  document.querySelectorAll('.track-item').forEach(item => {
    item.addEventListener('click', function () {
      const src = this.getAttribute('data-audio');
      if (src && audio) {
        audio.src = src;
        audio.play();
      }
    });
  });
});

// ...existing code...

// ...existing code...

/*fetch('/components/footer.html')
                .then(res => res.text())
                .then(html => {
                    document.getElementById('footer-placeholder').innerHTML = html;
            
                    const imgBtn = document.getElementById('collapsed-buttom');
                    const seccion = document.getElementById('footer-content');
                    const commentBtn = document.getElementById('commentlist-buttom');
                    const playlistBtn = document.getElementById('playlist-buttom');
                    const commentList = document.querySelector('.comment-list');
                    const playlistList = document.querySelector('.container-playlist');
            
                    imgBtn?.addEventListener('click', () => {
                        seccion?.classList.toggle('hidden');
                        // Si se oculta image-container, oculta ambas listas
                        if (seccion?.classList.contains('hidden')) {
                            commentList?.classList.add('hidden');
                            playlistList?.classList.add('hidden');
                        }
                    });
            
                    commentBtn?.addEventListener('click', () => {
                        if (seccion && !seccion.classList.contains('hidden')) {
                            commentList?.classList.remove('hidden');
                            playlistList?.classList.add('hidden');
                        }
                    });
            
                    playlistBtn?.addEventListener('click', () => {
                        if (seccion && !seccion.classList.contains('hidden')) {
                            playlistList?.classList.remove('hidden');
                            commentList?.classList.add('hidden');
                        }
                    });
                });*/
