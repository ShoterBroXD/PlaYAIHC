window.addEventListener("DOMContentLoaded", () => {
    const subirBtn = document.getElementById('subir-btn');
    const subirMusic = document.getElementById('subir-music');
    const closeBtn = document.getElementById('close-btn');

    if (subirBtn && subirMusic) {
        subirBtn.addEventListener('click', () => {
            subirMusic.classList.remove('hidden');
        });
    }
    if (closeBtn && subirMusic) {
        closeBtn.addEventListener('click', () => {
            subirMusic.classList.add('hidden');
        });
    }
});