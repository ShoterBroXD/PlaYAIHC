window.addEventListener("DOMContentLoaded", () => {
    // Cargar todos los pasos
    Promise.all([
        fetch('/components/upload/step-select.html').then(res => res.text()),
        fetch('/components/upload/step-details.html').then(res => res.text()),
        fetch('/components/upload/step-privacy.html').then(res => res.text()),
        fetch('/components/upload/step-review').then(res => res.text()),
        fetch('/components/upload/step-progress.html').then(res => res.text())
    ]).then(([select, details, privacy, review, progress]) => {
        document.getElementById('upload-step-container').innerHTML =
            select + details + privacy + review + progress;

        const steps = [
            'step-select',
            'step-details',
            'step-privacy',
            'step-review',
            'step-progress'
        ];
        let currentStep = 0;

        function showStep(index) {
            steps.forEach((id, i) => {
                const el = document.getElementById(id);
                if (el) el.classList.toggle('hidden', i !== index);
            });
            currentStep = index;
        }

        // Mostrar solo el primer paso al inicio
        showStep(0);

        // Delegación de eventos para next y back
        document.getElementById('upload-step-container').addEventListener('click', (e) => {
            if (e.target.id === 'next-btn') {
                if (currentStep < steps.length - 1) showStep(currentStep + 1);
            }
            if (e.target.id === 'back-btn') {
                if (currentStep > 0) showStep(currentStep - 1);
            }
        });

        const closeBtn = document.getElementById('close-btn');
        const cancelBtn = document.getElementById('canceled-btn');
        const subirBtn = document.getElementById('subir-btn');
        const subirMusic = document.getElementById('step-select');

        if (subirBtn && subirMusic) {
            subirBtn.addEventListener('click', () => {
                showStep(0);
                subirMusic.classList.remove('hidden');
            });
        }
        if (closeBtn && subirMusic) {
            closeBtn.addEventListener('click', () => {
                subirMusic.classList.add('hidden');
            });
        }
        if (cancelBtn && subirMusic) {
            cancelBtn.addEventListener('click', () => {
                subirMusic.classList.add('hidden');
            });
        }
    });
});