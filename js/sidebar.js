document.addEventListener("DOMContentLoaded", () => {
  fetch('pages/components/sidebar.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('sidebar').innerHTML = data;

      // Marca el ítem activo según la ruta
      const currentPath = window.location.pathname;
      const sidebarItems = document.querySelectorAll('.sidebar-item');

      sidebarItems.forEach(item => {
        const itemPath = item.getAttribute('href');
        if (itemPath === currentPath) {
          item.classList.add('active');
        }
      });
    })
    .catch(error => console.error("Error cargando sidebar:", error));
});
