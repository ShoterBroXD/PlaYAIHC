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
});
