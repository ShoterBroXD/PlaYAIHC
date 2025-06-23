window.addEventListener("DOMContentLoaded", () => {
    fetch("/components/navbar.html")
      .then(res => res.text())
      .then(html => {
        document.getElementById("navbar-container").innerHTML = html;

        const button = document.getElementById('toggle-notificaciones');
        const notificacionLayout = document.getElementById('notificacion-layout');
        if (button && notificacionLayout) {
          button.addEventListener('click', function () {
            notificacionLayout.classList.toggle('hidden');
          });
        }

      });
  });
