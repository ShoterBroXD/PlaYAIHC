fetch('/components/footer.html')
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
                });
/*
fetch('/components/navbar.html')
                .then(res => res.text())
                .then(html => {
                    document.getElementById('navbar-placeholder').innerHTML = html;

                    // Activar interacción del footer
                });

fetch('/components/sidebar.html')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('sidebar-placeholder').innerHTML = data;
                    // Espera a que el contenido se cargue y luego marca el ítem activo
                    const currentPath = window.location.pathname;
                    const sidebarItems = document.querySelectorAll('.sidebar-item');
                    sidebarItems.forEach(item => {
                        const itemPath = item.getAttribute('href');
                        if (currentPath === itemPath) {
                            item.classList.add('active');
                        }
                    });
                    // Agregar funcionalidad para el botón de toggle del sidebar
                    const toggleButton = document.getElementById('toggle-sidebar');
                    const sidebar = document.querySelector('aside');
                    toggleButton.addEventListener('click', function() {
                        sidebar.classList.toggle('collapsed');
                    });
                });*/