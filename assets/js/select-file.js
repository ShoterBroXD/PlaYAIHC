// script.js
document.getElementById('fileInput').addEventListener('change', function() {
    const files = this.files;
    const filePreview = document.getElementById('filePreview');
    const validationMessage = document.getElementById('validationMessage');
    const continueButton = document.getElementById('continueButton');

    filePreview.innerHTML = "";
    validationMessage.textContent = "";

    if (files.length === 0) {
        continueButton.disabled = true;
        return;
    }

    for (const file of files) {
        // Validar tipo de archivo
        const validTypes = ['audio/mp3', 'audio/wav', 'audio/flac', 'audio/aiff', 'audio/alac'];
        if (!validTypes.includes(file.type)) {
            validationMessage.textContent = "Formato no válido. Asegúrate de cargar archivos MP3, WAV, FLAC, AIFF o ALAC.";
            continueButton.disabled = true;
            return;
        }

        // Validar tamaño de archivo
        if (file.size > 6 * 1024 * 1024 * 1024) {
            validationMessage.textContent = "El tamaño del archivo es demasiado grande. Máximo 6 GB.";
            continueButton.disabled = true;
            return;
        }

        // Crear una previsualización de archivo
        const fileInfo = document.createElement('div');
        fileInfo.textContent = `${file.name} - ${Math.round(file.size / 1024)} KB`;
        filePreview.appendChild(fileInfo);
    }

    continueButton.disabled = false;
});
